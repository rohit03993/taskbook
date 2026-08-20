import type { Metadata } from "next";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { PageHero } from "@/components/Blocks";
import { plans } from "@/content/plans";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Pricing",
  "Starter, Academic+, Full CRM, Full CRM + Results. Ask for a quote — we do not put a fake price here.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <>
      <section className="container-site py-14">
        <PageHero
          kicker="Pricing"
          title="Choose a pack. Ask for a quote. We set it up for your institute."
          body="These are the real packs in the product. We do not print a made-up rupee number. Full CRM is what most owners take — WhatsApp in the CRM, leads, calling, and parent login."
        />
        <DualCta className="mt-8" />
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col rounded-[1.5rem] bg-white p-6 ring-1 ${
                p.featured ? "ring-navy-600 shadow-card" : "ring-navy-900/[0.06]"
              }`}
            >
              {p.featured && (
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">Most owners take this</p>
              )}
              <p className="mt-1 font-display text-2xl text-navy-900">{p.name}</p>
              <p className="mt-2 text-sm text-navy-700">{p.blurb}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-navy-800">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <a href="/demo" className="mt-6 text-sm font-semibold text-navy-600">
                Get a quote →
              </a>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-navy-700">
          Each institute is set up on its own. This is not one login for a hundred schools. You can also pick modules if
          Full CRM is more than you need.
        </p>
      </section>
      <CtaBanner title="Price depends on size and WhatsApp use." body="Talk on WhatsApp. We will not guess on this page." />
    </>
  );
}
