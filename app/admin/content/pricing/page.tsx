import { AdminShell } from "@/app/admin/AdminShell";
import { ContentForm } from "@/app/admin/content/ContentForm";
import { getPricingContent } from "@/lib/content";

export const metadata = { title: "Pricing copy", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPricingContentPage() {
  const pricing = await getPricingContent();

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold tracking-tight text-navy-900">Pricing</h1>
      <p className="mt-2 text-sm text-navy-700">
        Starter ₹3,000, Starter + Fees ₹6,000, Full CRM ₹10,000. Change a number here and the public page updates.
      </p>
      <ContentForm
        fields={[
          { key: "pricing.kicker", label: "Kicker", value: pricing.kicker },
          { key: "pricing.title", label: "Title", rows: 2, value: pricing.title },
          { key: "pricing.body", label: "Intro body", rows: 4, value: pricing.body },
          { key: "pricing.footnote", label: "Note under the packs", rows: 3, value: pricing.footnote },
          ...pricing.plans.flatMap((p) => [
            { key: `plan.${p.id}.name`, label: `${p.name} — name`, value: p.name },
            { key: `plan.${p.id}.blurb`, label: `${p.name} — blurb`, rows: 2, value: p.blurb },
            { key: `plan.${p.id}.price`, label: `${p.name} — price`, hint: "Example ₹3,000. Empty = Custom quote", value: p.price },
            { key: `plan.${p.id}.priceSuffix`, label: `${p.name} — period`, hint: "/ month", value: p.priceSuffix },
            { key: `plan.${p.id}.priceCaption`, label: `${p.name} — small line under price`, value: p.priceCaption },
            {
              key: `plan.${p.id}.includes`,
              label: `${p.name} — includes`,
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
