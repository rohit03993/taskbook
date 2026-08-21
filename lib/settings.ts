import { site } from "@/content/site";
import { prisma, withDb } from "@/lib/prisma";

export type SiteSettings = {
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  webhookUrl: string;
};

export function emptySettings(): SiteSettings {
  return {
    whatsappNumber: site.whatsappNumber,
    whatsappMessage: "Hi, I run a school/college/institute and want a Task Book demo.",
    email: site.email,
    webhookUrl: process.env.LEADS_WEBHOOK_URL ?? "",
  };
}

function cleanSettings(next: SiteSettings): SiteSettings {
  return {
    whatsappNumber: next.whatsappNumber.replace(/\D/g, ""),
    whatsappMessage: next.whatsappMessage.trim(),
    email: next.email.trim(),
    webhookUrl: next.webhookUrl.trim(),
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const fallback = emptySettings();
  return withDb(async (db) => {
    const row = await db.setting.findUnique({ where: { id: "site" } });
    if (!row) return fallback;
    return {
      whatsappNumber: (row.whatsappNumber || fallback.whatsappNumber).replace(/\D/g, ""),
      whatsappMessage: row.whatsappMessage || fallback.whatsappMessage,
      email: row.email || fallback.email,
      webhookUrl: row.webhookUrl || fallback.webhookUrl,
    };
  }, fallback);
}

export async function saveSettings(next: SiteSettings) {
  const clean = cleanSettings(next);
  await prisma.setting.upsert({
    where: { id: "site" },
    create: { id: "site", ...clean },
    update: clean,
  });
  return clean;
}

export function waLink(number: string, message?: string) {
  const text = message || emptySettings().whatsappMessage;
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
