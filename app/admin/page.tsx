import { AdminShell } from "@/app/admin/AdminShell";
import { listPosts } from "@/lib/blog";
import { leadCounts } from "@/lib/leads";
import { listLocations } from "@/lib/locations";
import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function waLooksWrong(number: string) {
  const digits = number.replace(/\D/g, "");
  return digits.length < 11;
}

export default async function AdminHomePage() {
  const [counts, settings, posts, locations] = await Promise.all([
    leadCounts(),
    getSettings(),
    listPosts(),
    listLocations(),
  ]);
  const publishedPosts = posts.filter((p) => p.published).length;
  const drafts = posts.length - publishedPosts;
  const waBad = waLooksWrong(settings.whatsappNumber);

  const jobs = [
    {
      href: "/admin/leads",
      title: "Leads",
      body: counts.fresh ? `${counts.fresh} new demo request${counts.fresh === 1 ? "" : "s"} waiting.` : "No new leads. Open the list anytime.",
      cta: counts.fresh ? "Open new leads" : "See leads",
      primary: counts.fresh > 0,
    },
    {
      href: "/admin/blog",
      title: "Blog",
      body: drafts ? `${publishedPosts} live · ${drafts} draft` : `${publishedPosts} live posts. Write the next one when you want rank for a keyword.`,
      cta: "Write or edit",
      primary: false,
    },
    {
      href: "/admin/locations",
      title: "City pages",
      body: locations.length ? `${locations.map((l) => l.city).join(", ")}` : "Add Agra or another city page.",
      cta: "Edit cities",
      primary: false,
    },
    {
      href: "/admin/content",
      title: "Homepage text",
      body: "Hero, problems, and How it works. Change words without a rebuild.",
      cta: "Edit homepage",
      primary: false,
    },
  ];

  return (
    <AdminShell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-600">Today</p>
      <h1 className="mt-2 font-display text-3xl text-navy-900 sm:text-4xl">What do you want to do?</h1>
      <p className="mt-2 max-w-xl text-sm text-navy-700">Use the left menu. Daily work is leads. Publish is blogs and cities. Website text is the public pages.</p>

      {waBad && (
        <div className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-950 ring-1 ring-amber-200">
          WhatsApp on the public site looks incomplete ({settings.whatsappNumber || "empty"}). Put the full number with country code, like 9198xxxxxxxx.
          <Link href="/admin/settings" className="ml-2 font-semibold underline">
            Fix numbers
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-navy-900/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">New leads</p>
          <p className="mt-2 font-display text-4xl text-navy-900">{counts.fresh}</p>
          <p className="mt-1 text-xs text-navy-700">{counts.total} total</p>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-navy-900/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">Live blogs</p>
          <p className="mt-2 font-display text-4xl text-navy-900">{publishedPosts}</p>
          <p className="mt-1 text-xs text-navy-700">{drafts} draft</p>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-navy-900/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">City pages</p>
          <p className="mt-2 font-display text-4xl text-navy-900">{locations.length}</p>
          <p className="mt-1 text-xs text-navy-700">SEO landings</p>
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {jobs.map((job) => (
          <Link
            key={job.href}
            href={job.href}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-5 py-5 ring-1 ring-navy-900/[0.06] transition hover:ring-navy-600"
          >
            <div>
              <p className="font-semibold text-navy-900">{job.title}</p>
              <p className="mt-1 text-sm text-navy-700">{job.body}</p>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                job.primary ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-800"
              }`}
            >
              {job.cta}
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
