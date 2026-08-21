import type { Metadata } from "next";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { PageHero } from "@/components/Blocks";
import { getPricingContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pricing = await getPricingContent();
  return pageMeta("Pricing", pricing.body.slice(0, 160), "/pricing");
}

export default async function PricingPage() {
  const pricing = await getPricingContent();

  return (
    <>
      <section className="container-site py-10 pb-28 lg:pb-16">
        <PageHero kicker={pricing.kicker} title={pricing.title} body={pricing.body} />
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {pricing.plans.map((p) => (
            <article
              key={p.id}
              className={`flex flex-col rounded-2xl bg-white p-5 ring-1 ${
                p.featured ? "ring-navy-600" : "ring-navy-900/10"
              }`}
            >
              <div className="min-h-[1.25rem]">
                {p.featured ? (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-600">Most owners take this</p>
                ) : (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-600/40">&nbsp;</p>
                )}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-navy-900">{p.name}</h2>
              <div className="mt-3 min-h-[4.25rem]">
                {p.price ? (
                  <>
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-[1.65rem] font-semibold tabular-nums tracking-tight text-navy-900">{p.price}</span>
                      <span className="text-sm text-navy-600">{p.priceSuffix}</span>
                    </p>
                    <p className="mt-1 text-xs text-navy-600">{p.priceCaption}</p>
                  </>
                ) : (
                  <>
                    <p className="text-[1.35rem] font-semibold text-navy-900">Custom</p>
                    <p className="mt-1 text-xs text-navy-600">{p.priceCaption}</p>
                  </>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">{p.blurb}</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-navy-800">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-600" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/demo"
                className={`mt-5 inline-flex h-10 items-center justify-center rounded-full text-sm font-semibold ${
                  p.featured ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-900"
                }`}
              >
                {p.price ? "Book a demo" : "Get a quote"}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-navy-700">{pricing.footnote}</p>
        <DualCta className="mt-8" />
      </section>
      <CtaBanner
        title="Three packs. One campus."
        body="Starter ₹3,000 · Starter + Fees ₹6,000 · Full CRM ₹10,000 a month. GST extra. WhatsApp usage as per Meta."
      />
    </>
  );
}
