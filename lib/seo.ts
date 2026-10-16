import type { Metadata } from "next";
import { site } from "@/content/site";

const shareImage = "/logos/taskbook-logo-full.png";

export function pageMeta(title: string, description: string, path = ""): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: shareImage, alt: "Task Book" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}
