import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta(title: string, description: string, path = ""): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website",
    },
  };
}
