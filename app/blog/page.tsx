import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/DualCta";
import { PageHero } from "@/components/Blocks";
import { RelatedLinks } from "@/components/RelatedLinks";
import { publicPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta(
  "School CRM guides",
  "Guides for school, college, and institute owners on attendance, fees, homework, WhatsApp, and the student file.",
  "/blog",
);

export default async function BlogPage() {
  const posts = await publicPosts();

  return (
    <>
      <section className="container-site py-14">
        <PageHero
          kicker="Blog"
          title="How owners actually use WhatsApp, fees, and the student file."
          body="Each guide links to the screen it describes, and back to the school CRM page."
        />
        <p className="mt-6 text-sm leading-relaxed text-navy-800">
          Start with <Link href="/school-crm" className="font-semibold text-navy-950">what to check in a school CRM</Link>, then open the job you actually run.
        </p>
        <div className="mt-12 grid gap-5">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl border border-navy-900/10 bg-white p-6 hover:border-navy-600"
            >
              <p className="text-xs text-navy-700">
                {p.date} · {p.readMinutes} min
              </p>
              <p className="mt-2 font-display text-2xl text-navy-900">{p.title}</p>
              <p className="mt-2 text-sm text-navy-700">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <RelatedLinks path="/blog" />
      <CtaBanner title="Read enough. See the screens." body="Book a demo or talk on WhatsApp." />
    </>
  );
}
