import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { postBySlug, posts } from "@/content/blog";
import { pageMeta } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return pageMeta(post.title, post.description, `/blog/${slug}`);
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="container-site max-w-3xl py-14">
        <p className="text-xs text-navy-700">
          {post.date} · {post.readMinutes} min read
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-navy-700">{post.description}</p>
        <div className="mt-10 space-y-5 text-base leading-relaxed text-navy-800">
          {post.body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
        <DualCta className="mt-10" />
      </article>
      <CtaBanner title="See the same flow on your campus." body="WhatsApp or book a demo." />
    </>
  );
}
