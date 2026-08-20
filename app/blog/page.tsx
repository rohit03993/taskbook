import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/DualCta";
import { PageHero } from "@/components/Blocks";
import { posts } from "@/content/blog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Blog",
  "Practical notes for school, college, and institute owners on WhatsApp attendance, fees, and admissions.",
  "/blog",
);

export default function BlogPage() {
  return (
    <>
      <section className="container-site py-14">
        <PageHero
          kicker="Blog"
          title="How owners actually use WhatsApp, fees, and the student file."
          body="Short pieces. Each one ends with a demo or WhatsApp — the same two doors as the rest of the site."
        />
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
      <CtaBanner title="Read enough. See the screens." body="Book a demo or talk on WhatsApp." />
    </>
  );
}
