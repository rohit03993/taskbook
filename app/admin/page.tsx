import { AdminShell } from "@/app/admin/AdminShell";
import { listPosts } from "@/lib/blog";
import { leadCounts } from "@/lib/leads";
import { listLocations } from "@/lib/locations";
import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [counts, settings, posts, locations] = await Promise.all([
    leadCounts(),
    getSettings(),
    listPosts(),
    listLocations(),
  ]);
  const publishedPosts = posts.filter((p) => p.published).length;

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">Overview</h1>
      <p className="mt-2 text-sm text-navy-700">Leads, published blogs, city pages, and the WhatsApp number on the site.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[1.4rem] bg-white p-6 ring-1 ring-navy-900/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">Leads</p>
          <p className="mt-2 font-display text-3xl text-navy-900">{counts.total}</p>
          <p className="mt-1 text-xs text-navy-700">{counts.fresh} new</p>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 ring-1 ring-navy-900/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">Blogs</p>
          <p className="mt-2 font-display text-3xl text-navy-900">{publishedPosts}</p>
          <p className="mt-1 text-xs text-navy-700">{posts.length} total</p>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 ring-1 ring-navy-900/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">Cities</p>
          <p className="mt-2 font-display text-3xl text-navy-900">{locations.length}</p>
        </div>
        <div className="rounded-[1.4rem] bg-white p-6 ring-1 ring-navy-900/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">WhatsApp</p>
          <p className="mt-2 font-display text-2xl text-navy-900">{settings.whatsappNumber || "Not set"}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/leads" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
          Open leads
        </Link>
        <Link href="/admin/blog" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 ring-1 ring-navy-900/10">
          Write a blog
        </Link>
        <Link href="/admin/content" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 ring-1 ring-navy-900/10">
          Edit homepage
        </Link>
      </div>
    </AdminShell>
  );
}
