import type { MetadataRoute } from "next";
import { publicPosts } from "@/lib/blog";
import { modules } from "@/content/modules";
import { site } from "@/content/site";
import { listLocations } from "@/lib/locations";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, locations] = await Promise.all([publicPosts(), listLocations({ publishedOnly: true })]);

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
    "/locations",
  ];

  return [
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
    ...locations.map((l) => ({
      url: `${site.url}/locations/${l.slug}`,
      lastModified: l.updatedAt,
    })),
  ];
}
