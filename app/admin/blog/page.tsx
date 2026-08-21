import { AdminShell } from "@/app/admin/AdminShell";
import { ScoreBadge } from "@/app/admin/ui";
import { listPosts } from "@/lib/blog";
import { scoreKeyword } from "@/lib/keyword-score";
import Link from "next/link";

export const metadata = { title: "Blog CMS", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listPosts();

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy-900">Blog</h1>
          <p className="mt-2 text-sm text-navy-700">Write, score the focus keyword, then publish. Score is on-page, not Google rank.</p>
        </div>
        <Link href="/admin/blog/new" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
          New post
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-navy-700">No posts yet. Seed the database or write the first one.</p>
      ) : (
        <div className="mt-8 space-y-3">
          {posts.map((p) => {
            const report = scoreKeyword({
              focusKeyword: p.focusKeyword,
              title: p.title,
              slug: p.slug,
              metaDescription: p.metaDescription || p.description,
              body: p.body,
              extraKeywords: p.extraKeywords,
              cityTag: p.cityTag,
            });
            return (
              <Link
                key={p.id}
                href={`/admin/blog/${p.id}`}
                className="block rounded-[1.3rem] bg-white p-5 ring-1 ring-navy-900/[0.06] hover:ring-navy-600"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-navy-900">{p.title}</p>
                    <p className="mt-1 text-sm text-navy-700">
                      /blog/{p.slug}
                      {p.published ? "" : " · draft"}
                    </p>
                  </div>
                  <ScoreBadge score={report.score} label={report.label} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
