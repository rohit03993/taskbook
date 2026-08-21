import { AdminShell } from "@/app/admin/AdminShell";
import { ContentForm } from "@/app/admin/content/ContentForm";
import { getFeatureHubContent, getResolvedModules } from "@/lib/content";
import Link from "next/link";

export const metadata = { title: "Feature copy", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminFeaturesContentPage() {
  const [hub, mods] = await Promise.all([getFeatureHubContent(), getResolvedModules()]);

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">Features copy</h1>
      <p className="mt-2 text-sm text-navy-700">Hub text plus each module page. Open a module to edit bullets (one per line or JSON array).</p>
      <ContentForm
        fields={[
          { key: "features.kicker", label: "Hub kicker", value: hub.kicker },
          { key: "features.title", label: "Hub title", rows: 2, value: hub.title },
          { key: "features.body", label: "Hub body", rows: 3, value: hub.body },
        ]}
      />
      <h2 className="mt-12 font-display text-2xl text-navy-900">Modules</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {mods.map((m) => (
          <Link
            key={m.slug}
            href={`/admin/content/features/${m.slug}`}
            className="rounded-[1.2rem] bg-white p-5 ring-1 ring-navy-900/[0.06] hover:ring-navy-600"
          >
            <p className="font-medium text-navy-900">{m.nav}</p>
            <p className="mt-1 text-sm text-navy-700">/features/{m.slug}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
