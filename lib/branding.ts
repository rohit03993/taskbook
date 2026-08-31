export const DEFAULT_LOGO = "/logos/taskbook-icon.png";
export const DEFAULT_FAVICON = "/logos/taskbook-favicon.png";

export function publicBrandSrc(url: string | undefined, fallback = DEFAULT_LOGO) {
  const value = (url ?? "").trim();
  if (!value) return fallback;
  if (value.startsWith("/uploads/branding/") || value.startsWith("/logos/")) return value;
  return fallback;
}
