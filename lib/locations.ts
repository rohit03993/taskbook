import { prisma, withDb } from "@/lib/prisma";

export type LocationFaq = { q: string; a: string };

export type LocationInput = {
  slug: string;
  city: string;
  headline: string;
  intro: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  faqs: LocationFaq[];
  published: boolean;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function parseFaqs(raw: string): LocationFaq[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        const row = item as Record<string, unknown>;
        return { q: String(row.q ?? ""), a: String(row.a ?? "") };
      })
      .filter((f) => f.q && f.a);
  } catch {
    return [];
  }
}

export async function listLocations(opts?: { publishedOnly?: boolean }) {
  return withDb(async (db) => {
    return db.locationPage.findMany({
      where: opts?.publishedOnly ? { published: true } : undefined,
      orderBy: { city: "asc" },
    });
  }, []);
}

export async function getLocationBySlug(slug: string, publishedOnly = false) {
  return withDb(async (db) => {
    return db.locationPage.findFirst({
      where: publishedOnly ? { slug, published: true } : { slug },
    });
  }, null);
}

export async function getLocationById(id: string) {
  return withDb(async (db) => db.locationPage.findUnique({ where: { id } }), null);
}

export async function saveLocation(id: string | null, input: LocationInput) {
  const data = {
    slug: slugify(input.slug || input.city),
    city: input.city.trim(),
    headline: input.headline.trim(),
    intro: input.intro.trim(),
    body: input.body.trim(),
    metaTitle: input.metaTitle.trim(),
    metaDescription: input.metaDescription.trim(),
    focusKeyword: input.focusKeyword.trim(),
    faqsJson: JSON.stringify(input.faqs.filter((f) => f.q.trim() && f.a.trim())),
    published: input.published,
  };
  if (id) {
    return prisma.locationPage.update({ where: { id }, data });
  }
  return prisma.locationPage.create({ data });
}

export async function deleteLocation(id: string) {
  await prisma.locationPage.delete({ where: { id } });
}
