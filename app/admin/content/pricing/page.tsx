import { AdminShell } from "@/app/admin/AdminShell";
import { ContentForm } from "@/app/admin/content/ContentForm";
import { getPricingContent } from "@/lib/content";

export const metadata = { title: "Pricing copy", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPricingContentPage() {
  const pricing = await getPricingContent();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">Pricing copy</h1>
      <p className="mt-2 text-sm text-navy-700">Do not add a fake rupee price. Pack names and blurbs only.</p>
      <ContentForm
        fields={[
          { key: "pricing.kicker", label: "Kicker", value: pricing.kicker },
          { key: "pricing.title", label: "Title", rows: 2, value: pricing.title },
          { key: "pricing.body", label: "Intro body", rows: 4, value: pricing.body },
          ...pricing.plans.flatMap((p) => [
            { key: `plan.${p.id}.name`, label: `${p.id} name`, value: p.name },
            { key: `plan.${p.id}.blurb`, label: `${p.id} blurb`, rows: 2, value: p.blurb },
            {
              key: `plan.${p.id}.includes`,
              label: `${p.id} includes`,
              hint: "One item per line",
              rows: 8,
              value: p.includes.join("\n"),
            },
          ]),
        ]}
      />
    </AdminShell>
  );
}
