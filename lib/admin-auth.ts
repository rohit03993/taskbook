import { createHash, randomBytes } from "crypto";
import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";
import type { AdminRole } from "@prisma/client";
import { dbConfigured, prisma } from "@/lib/prisma";
import { normalizePhone, phoneLooksValid } from "@/lib/phone";

const COOKIE = "tb_session";
const MAX_AGE = 60 * 60 * 24 * 7;
const LOCK_AFTER = 5;
const LOCK_MINUTES = 15;
const IP_WINDOW_MS = 15 * 60 * 1000;
const IP_MAX_FAILS = 20;
const BCRYPT_ROUNDS = 12;

export type Staff = {
  id: string;
  phone: string;
  name: string;
  role: AdminRole;
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function cookieSecure() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "").startsWith("https");
}

export function adminConfigured() {
  return dbConfigured() && Boolean(process.env.ADMIN_PHONE && process.env.ADMIN_PASSWORD);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function ensureOwner() {
  if (!dbConfigured()) return;
  const count = await prisma.adminUser.count();
  if (count > 0) return;
  const phone = normalizePhone(process.env.ADMIN_PHONE ?? "");
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!phoneLooksValid(phone) || password.length < 8) return;
  await prisma.adminUser.create({
    data: {
      phone,
      name: "Owner",
      passwordHash: await hashPassword(password),
      role: "owner",
    },
  });
}

async function clientIp() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

export async function loginBlocked(phone: string) {
  const ip = await clientIp();
  const since = new Date(Date.now() - IP_WINDOW_MS);
  const ipFails = await prisma.loginAttempt.count({
    where: { ip, success: false, createdAt: { gte: since } },
  });
  if (ipFails >= IP_MAX_FAILS) {
    return "Too many failed logins from this network. Wait 15 minutes.";
  }
  const user = await prisma.adminUser.findUnique({ where: { phone } });
  if (user?.lockedUntil && user.lockedUntil > new Date()) {
    return "This account is locked for 15 minutes after too many wrong passwords.";
  }
  return null;
}

async function recordAttempt(phone: string, success: boolean) {
  await prisma.loginAttempt.create({
    data: { phone, ip: await clientIp(), success },
  });
}

export async function loginWithPhone(phoneRaw: string, password: string) {
  if (!dbConfigured()) {
    return {
      error:
        "Database is not connected. In .env.local set DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD (the ones you created in CloudPanel), then restart the site.",
    };
  }
  await ensureOwner();
  const { bootstrapCms } = await import("@/lib/bootstrap");
  await bootstrapCms().catch(() => undefined);
  if (!(await prisma.adminUser.count())) {
    return { error: "Set ADMIN_PHONE and ADMIN_PASSWORD (min 8 characters) then restart." };
  }

  const phone = normalizePhone(phoneRaw);
  if (!phoneLooksValid(phone) || !password) {
    return { error: "Enter your staff phone and password." };
  }

  const blocked = await loginBlocked(phone);
  if (blocked) return { error: blocked };

  const user = await prisma.adminUser.findUnique({ where: { phone } });
  const dummy = await hashPassword("not-the-real-password-placeholder");
  const ok = user ? await bcrypt.compare(password, user.passwordHash) : await bcrypt.compare(password, dummy);

  if (!user || !ok) {
    await recordAttempt(phone, false);
    if (user) {
      const fails = user.failedLogins + 1;
      await prisma.adminUser.update({
        where: { id: user.id },
        data: {
          failedLogins: fails,
          lockedUntil: fails >= LOCK_AFTER ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000) : user.lockedUntil,
        },
      });
    }
    return { error: "Wrong phone or password." };
  }

  await recordAttempt(phone, true);
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { failedLogins: 0, lockedUntil: null },
  });
  await createSession(user.id);
  return { ok: true as const };
}

async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  await prisma.session.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt: new Date(Date.now() + MAX_AGE * 1000),
    },
  });
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getStaff(): Promise<Staff | null> {
  if (!dbConfigured()) return null;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const row = await prisma.session.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: true },
    });
    if (!row || row.expiresAt < new Date()) {
      if (row) await prisma.session.delete({ where: { id: row.id } }).catch(() => undefined);
      return null;
    }
    return { id: row.user.id, phone: row.user.phone, name: row.user.name, role: row.user.role };
  } catch {
    return null;
  }
}

export async function isAdmin() {
  return Boolean(await getStaff());
}

export async function requireOwner() {
  const staff = await getStaff();
  if (!staff || staff.role !== "owner") return null;
  return staff;
}

export async function clearAdminCookie() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token && dbConfigured()) {
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } }).catch(() => undefined);
  }
  jar.delete(COOKIE);
}
