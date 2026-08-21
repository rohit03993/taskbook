import { posts as staticPosts } from "../content/blog";
import { prisma, withDb } from "./prisma";
import { scoreKeyword } from "./keyword-score";

export type BlogInput = {
  slug: string;
  title: string;
  description: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
  focusKeyword: string;
  extraKeywords: string;
  cityTag: string;
  published: boolean;
  readMinutes: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function makeSlug(value: string) {
  return slugify(value);
}

function withScore(input: BlogInput) {
  const report = scoreKeyword({
    focusKeyword: input.focusKeyword,
    title: input.title,
    slug: input.slug,
    metaDescription: input.metaDescription || input.description,
    body: input.body,
    extraKeywords: input.extraKeywords,
    cityTag: input.cityTag,
  });
  return { ...input, keywordScore: report.score, report };
}

export async function listPosts(opts?: { publishedOnly?: boolean }) {
  return withDb(async (db) => {
    return db.blogPost.findMany({
      where: opts?.publishedOnly ? { published: true } : undefined,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
  }, []);
}

export async function getPostBySlug(slug: string, publishedOnly = false) {
  return withDb(async (db) => {
    return db.blogPost.findFirst({
      where: publishedOnly ? { slug, published: true } : { slug },
    });
  }, null);
}

export async function getPostById(id: string) {
  return withDb(async (db) => db.blogPost.findUnique({ where: { id } }), null);
}

export async function savePost(id: string | null, input: BlogInput) {
  const scored = withScore({
    ...input,
    slug: slugify(input.slug || input.title),
  });
  const data = {
    slug: scored.slug,
    title: scored.title,
    description: scored.description,
    body: scored.body,
    metaTitle: scored.metaTitle,
    metaDescription: scored.metaDescription,
    ogTitle: scored.ogTitle,
    ogDescription: scored.ogDescription,
    canonicalPath: scored.canonicalPath,
    focusKeyword: scored.focusKeyword,
    extraKeywords: scored.extraKeywords,
    cityTag: scored.cityTag,
    published: scored.published,
    readMinutes: scored.readMinutes || Math.max(3, Math.round(scored.body.split(/\s+/).length / 180)),
    keywordScore: scored.keywordScore,
    publishedAt: scored.published ? new Date() : null,
  };

  if (id) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    const row = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt: scored.published ? existing?.publishedAt ?? new Date() : null,
      },
    });
    return { row, report: scored.report };
  }

  const row = await prisma.blogPost.create({ data });
  return { row, report: scored.report };
}

export async function deletePost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
}

export function postPath(slug: string) {
  return `/blog/${slug}`;
}

export type PublicPost = {
  slug: string;
  title: string;
  description: string;
  body: string;
  date: string;
  readMinutes: number;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
};

function fromStatic(): PublicPost[] {
  return staticPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    body: p.body.join("\n\n"),
    date: p.date,
    readMinutes: p.readMinutes,
    metaTitle: p.title,
    metaDescription: p.description,
    ogTitle: p.title,
    ogDescription: p.description,
    canonicalPath: `/blog/${p.slug}`,
  }));
}

export async function publicPosts(): Promise<PublicPost[]> {
  const rows = await listPosts({ publishedOnly: true });
  if (!rows.length) return fromStatic();
  return rows.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    body: p.body,
    date: (p.publishedAt ?? p.createdAt).toISOString().slice(0, 10),
    readMinutes: p.readMinutes,
    metaTitle: p.metaTitle || p.title,
    metaDescription: p.metaDescription || p.description,
    ogTitle: p.ogTitle || p.title,
    ogDescription: p.ogDescription || p.description,
    canonicalPath: p.canonicalPath || `/blog/${p.slug}`,
  }));
}

export async function publicPostBySlug(slug: string): Promise<PublicPost | null> {
  const list = await publicPosts();
  return list.find((p) => p.slug === slug) ?? null;
}
