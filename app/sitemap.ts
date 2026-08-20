import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { modules } from "@/content/modules";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/features",
    "/pricing",
    "/demo",
    "/about",
    "/contact",
    "/schools",
    "/colleges",
    "/institutes",
    "/blog",
    "/privacy",
    "/terms",
  ];

  const urls = [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p || "/"}`,
      lastModified: new Date(),
    })),
    ...modules.map((m) => ({
      url: `${site.url}/features/${m.slug}`,
      lastModified: new Date(),
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
    })),
  ];

  return urls;
}
