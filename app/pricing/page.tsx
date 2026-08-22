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
        <div className="mt-10 grid items-stretch gap-4 sm:mt-12 lg:grid-cols-3">
          {pricing.plans.map((p) => (
            <article
              key={p.id}
              className={`flex flex-col rounded-[1.35rem] p-5 ring-1 sm:rounded-2xl sm:p-6 ${
                p.featured
                  ? "bg-navy-900 text-white ring-navy-900 lg:scale-[1.03]"
                  : "bg-white text-navy-900 ring-navy-900/10"
              }`}
            >
              <div className="min-h-[1.25rem]">
                {p.featured ? (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    Most owners take this
                  </p>
                ) : (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-600/40">&nbsp;</p>
                )}
              </div>
              <h2 className="mt-2 font-display text-2xl">{p.name}</h2>
              <div className="mt-3 min-h-[4.25rem]">
                {p.price ? (
                  <>
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-[1.85rem] font-semibold tabular-nums tracking-tight">{p.price}</span>
                      <span className={`text-sm ${p.featured ? "text-white/70" : "text-navy-600"}`}>{p.priceSuffix}</span>
                    </p>
                    <p className={`mt-1 text-xs ${p.featured ? "text-white/60" : "text-navy-600"}`}>{p.priceCaption}</p>
                  </>
                ) : (
                  <>
                    <p className="text-[1.35rem] font-semibold">Custom</p>
                    <p className={`mt-1 text-xs ${p.featured ? "text-white/60" : "text-navy-600"}`}>{p.priceCaption}</p>
                  </>
                )}
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${p.featured ? "text-white/80" : "text-navy-700"}`}>
                {p.blurb}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        p.featured ? "bg-white/15 text-white" : "bg-navy-50 text-navy-700"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={p.featured ? "text-white/90" : "text-navy-800"}>{i}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/demo"
                className={`mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold ${
                  p.featured ? "bg-white text-navy-900" : "bg-navy-50 text-navy-900"
                }`}
              >
                {p.price ? "Book a demo" : "Get a quote"}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-navy-700">{pricing.footnote}</p>
        <DualCta className="mt-8 hidden sm:flex" />
      </section>
      <CtaBanner
        title="Three packs. One campus."
        body="Starter ₹3,000 · Starter + Fees ₹6,000 · Full CRM ₹10,000 a month. GST extra. WhatsApp usage as per Meta."
      />
    </>
  );
}
