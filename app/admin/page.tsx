import { AdminShell } from "@/app/admin/AdminShell";
import { listPosts } from "@/lib/blog";
import { leadCounts } from "@/lib/leads";
import { listLocations } from "@/lib/locations";
import { getSettings } from "@/lib/settings";
import Link from "next/link";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function waLooksWrong(number: string) {
  return number.replace(/\D/g, "").length < 11;
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

  return (
    <AdminShell>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-navy-900">Home</h1>
          <p className="mt-1 text-sm text-navy-700">Leads, blogs, and the public site copy.</p>
        </div>
        <Link href="/" className="hidden text-sm font-medium text-navy-600 hover:text-navy-900 sm:inline">
          Open website
        </Link>
      </div>

      {waBad && (
        <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm text-amber-950">
          <span>WhatsApp number is incomplete. Visitors cannot chat you.</span>
          <Link href="/admin/settings" className="shrink-0 font-semibold text-navy-800">
            Fix
          </Link>
        </div>
      )}

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "New leads", value: counts.fresh, sub: `${counts.total} total` },
          { label: "Live blogs", value: publishedPosts, sub: drafts ? `${drafts} draft` : "All live" },
          { label: "Cities", value: locations.length, sub: "SEO pages" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-navy-900/10 bg-white px-4 py-3.5">
            <p className="text-[11px] font-medium text-navy-600">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-navy-900">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-navy-700">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-navy-900/10 bg-white">
        {[
          { href: "/admin/leads", title: "Leads", meta: counts.fresh ? `${counts.fresh} new` : "None new" },
          { href: "/admin/blog", title: "Blog", meta: `${publishedPosts} live` },
          { href: "/admin/locations", title: "City pages", meta: locations.map((l) => l.city).join(", ") || "None" },
          { href: "/admin/content", title: "Homepage copy", meta: "Hero, problems, steps" },
          { href: "/admin/settings", title: "WhatsApp & email", meta: settings.whatsappNumber || "Not set" },
        ].map((row, i, arr) => (
          <Link
            key={row.href}
            href={row.href}
            className={`flex items-center justify-between gap-3 px-4 py-3.5 text-sm hover:bg-navy-50 ${
              i < arr.length - 1 ? "border-b border-navy-900/10" : ""
            }`}
          >
            <span className="font-medium text-navy-900">{row.title}</span>
            <span className="flex items-center gap-2 text-navy-600">
              <span className="max-w-[10rem] truncate text-right text-[13px]">{row.meta}</span>
              <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
