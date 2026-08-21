import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { bootstrapCms } from "../lib/bootstrap";
import { normalizePhone } from "../lib/phone";

function loadEnvFile(file: string) {
  try {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    /* missing file is fine */
  }
}

loadEnvFile(path.join(process.cwd(), ".env"));
loadEnvFile(path.join(process.cwd(), ".env.local"));

const prisma = new PrismaClient();

async function seedOwner() {
  const phone = normalizePhone(process.env.ADMIN_PHONE ?? "");
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!phone || password.length < 8) {
    console.log("Skip owner: set ADMIN_PHONE and ADMIN_PASSWORD (min 8 chars).");
    return;
  }
  const existing = await prisma.adminUser.findUnique({ where: { phone } });
  if (existing) {
    console.log("Owner already exists.");
    return;
  }
  if (await prisma.adminUser.count()) {
    console.log("Staff already exist; not creating a second owner from env.");
    return;
  }
  await prisma.adminUser.create({
    data: {
      phone,
      name: "Owner",
      passwordHash: await bcrypt.hash(password, 12),
      role: "owner",
    },
  });
  console.log("Created owner", phone);
}

async function seedLeads() {
  if (await prisma.lead.count()) return;
  const file = path.join(process.cwd(), "data", "leads.json");
  try {
    const raw = JSON.parse(await readFile(file, "utf8")) as unknown;
    if (!Array.isArray(raw)) return;
    for (const item of raw) {
      const row = item as Record<string, unknown>;
      const status = row.status === "contacted" || row.status === "done" ? row.status : "new";
      await prisma.lead.create({
        data: {
          name: String(row.name ?? ""),
          mobile: String(row.mobile ?? ""),
          institute: String(row.institute ?? ""),
          type: String(row.type ?? ""),
          city: String(row.city ?? ""),
          students: String(row.students ?? ""),
          headache: String(row.headache ?? ""),
          status,
          note: String(row.note ?? ""),
          createdAt: row.at ? new Date(String(row.at)) : undefined,
        },
      });
    }
    console.log("Imported leads from data/leads.json");
  } catch {
    console.log("No data/leads.json to import.");
  }
}

async function main() {
  await seedOwner();
  await bootstrapCms();
  await seedLeads();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
