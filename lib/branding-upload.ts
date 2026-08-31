import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_BYTES = 2 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

function extFromName(name: string) {
  const ext = name.toLowerCase().split(".").pop();
  if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "webp" || ext === "ico") {
    return ext === "jpeg" ? "jpg" : ext;
  }
  return "";
}

export async function saveBrandingUpload(file: File | null, kind: "logo" | "favicon"): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (file.size > MAX_BYTES) throw new Error("Image must be under 2 MB.");
  const ext = TYPES[file.type] || extFromName(file.name);
  if (!ext) throw new Error("Use a PNG, JPG, WebP, or ICO image.");
  if (kind === "logo" && ext === "ico") throw new Error("Use a PNG, JPG, or WebP image for the header logo.");

  const dir = path.join(process.cwd(), "public", "uploads", "branding");
  await mkdir(dir, { recursive: true });
  const name = kind === "favicon" ? `favicon.${ext}` : `logo.${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/branding/${name}`;
}
