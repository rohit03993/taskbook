import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { DEFAULT_FAVICON } from "@/lib/branding";
import { getSettings } from "@/lib/settings";

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  ico: "image/x-icon",
};

function absPublic(url: string) {
  return path.join(process.cwd(), "public", url.replace(/^\//, ""));
}

function mimeFor(filePath: string) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return MIME[ext] || "image/png";
}

async function readPublic(url: string) {
  const abs = absPublic(url);
  if (!existsSync(abs)) return null;
  const body = await readFile(abs);
  if (!body.length) return null;
  return { body, contentType: mimeFor(abs) };
}

export async function readFaviconBytes() {
  try {
    const settings = await getSettings();
    const custom = await readPublic(settings.faviconUrl);
    if (custom) return custom;
  } catch {
    // DB can be down during build; still serve the default mark.
  }

  return (
    (await readPublic(DEFAULT_FAVICON)) ||
    (await readPublic("/logos/taskbook-icon.png")) ||
    { body: Buffer.from(""), contentType: "image/png" }
  );
}

export function faviconResponse(body: Buffer, contentType: string) {
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
