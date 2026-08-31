import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const DEFAULT_LOGO = "/logos/taskbook-icon.png";
export const DEFAULT_FAVICON = "/logos/taskbook-icon.png";

const MAX_BYTES = 2 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export function publicBrandSrc(url: string | undefined, fallback = DEFAULT_LOGO) {
  const value = (url ?? "").trim();
  if (!value) return fallback;
  if (value.startsWith("/uploads/branding/") || value.startsWith("/logos/")) return value;
  return fallback;
}

export async function saveBrandingUpload(file: File | null, kind: "logo" | "favicon"): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (file.size > MAX_BYTES) throw new Error("Image must be under 2 MB.");
  const ext = TYPES[file.type];
  if (!ext) throw new Error("Use a PNG, JPG, or WebP image.");

  const dir = path.join(process.cwd(), "public", "uploads", "branding");
  await mkdir(dir, { recursive: true });
  const name = `${kind}-${Date.now()}.${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/branding/${name}`;
}
