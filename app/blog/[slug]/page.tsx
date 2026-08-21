import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { MarkdownBody } from "@/components/MarkdownBody";
import { publicPostBySlug } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await publicPostBySlug(slug);
  if (!post) return {};
  const meta = pageMeta(post.metaTitle || post.title, post.metaDescription || post.description, post.canonicalPath || `/blog/${slug}`);
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      title: `${post.ogTitle || post.title} · Task Book`,
      description: post.ogDescription || post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await publicPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="container-site max-w-3xl py-14">
        <p className="text-xs text-navy-700">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-navy-700">{post.description}</p>
        <div className="mt-10">
          <MarkdownBody source={post.body} />
        </div>
        <DualCta className="mt-10" />
      </article>
      <CtaBanner title="See the same flow on your campus." body="WhatsApp or book a demo." />
    </>
  );
}
