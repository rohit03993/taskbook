import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/Blocks";
import { DualCta } from "@/components/DualCta";
import { DemoForm } from "@/components/DemoForm";
import { DayStory, HeroChat } from "@/components/StoryStage";
import { faqs } from "@/content/faqs";
import { getHomeContent } from "@/lib/content";
import { plans } from "@/content/plans";
import { clients } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeContent();
  return pageMeta("School, college & institute CRM", home.hero.subhead, "/");
}

const directorQuestions = [
  "Is this allowed by Meta?",
  "Does each school share one database with other schools?",
  "Will you sit with our staff?",
];

export default async function HomePage() {
  const home = await getHomeContent();
  const questions = faqs.filter((item) => directorQuestions.includes(item.q));

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="stage-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-site relative grid items-center gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:py-16">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="h-1.5 w-1.5 bg-[#2EC4D6]" aria-hidden />
              School, college and institute CRM
            </p>
            <h1 className="mt-4 max-w-xl font-display text-[1.85rem] leading-[1.12] text-white sm:text-5xl">
              {home.hero.headline}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base">
              Parents stop calling the gate for this.
            </p>
            <DualCta onDark className="mt-6 sm:mt-8" />
          </div>
          <HeroChat />
        </div>
      </section>

      <section className="bg-navy-950 py-12 text-white lg:py-20">
        <div className="container-site">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">The rest of the day</p>
          <h2 className="mt-3 max-w-xl font-display text-[1.7rem] leading-snug sm:text-4xl">
            Gate, office, admission, accounts.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">Same student. The words change for a school, a college, or an institute.</p>
          <div className="mt-8 lg:mt-12">
            <DayStory />
          </div>
        </div>
      </section>

      <section className="container-site py-12 lg:py-16">
        <h2 className="font-display text-[1.65rem] text-navy-900 sm:text-3xl">Packs you can take</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-700">
          GST extra. Meta WhatsApp usage billed by Meta. One campus per install. Full CRM is what most owners take.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href="/pricing"
              className={`rounded-xl p-5 ring-1 ${
                plan.featured ? "bg-navy-900 text-white ring-navy-900" : "bg-white text-navy-900 ring-navy-900/10"
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider ${plan.featured ? "text-white/70" : "text-navy-600"}`}>
                {plan.featured ? "Most owners" : "Pack"}
              </p>
              <p className="mt-1 font-display text-xl">{plan.name}</p>
              <p className="mt-2 font-display text-2xl">
                {plan.price || "Custom"}
                {plan.priceSuffix && (
                  <span className={`ml-1 text-sm font-sans font-medium ${plan.featured ? "text-white/70" : "text-navy-700"}`}>
                    {plan.priceSuffix}
                  </span>
                )}
              </p>
              <p className={`mt-2 text-sm leading-snug ${plan.featured ? "text-white/80" : "text-navy-700"}`}>{plan.blurb}</p>
            </Link>
          ))}
        </div>
        <Link href="/pricing" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-navy-600 hover:text-navy-900">
          Compare packs →
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">Live with</p>
          {clients.map((client) => (
            <p key={client.host} className="text-sm font-semibold text-navy-900">
              {client.name}
            </p>
          ))}
        </div>
      </section>

      <section className="border-t border-navy-900/[0.06] bg-white">
        <div className="container-site py-12 lg:py-16">
          <h2 className="font-display text-[1.65rem] text-navy-900 sm:text-3xl">Before you decide</h2>
          <div className="mt-4">
            <FaqList items={questions} />
          </div>
        </div>
      </section>

      <section className="border-t border-navy-900/[0.06]">
        <div className="container-site grid gap-8 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <h2 className="font-display text-[1.65rem] leading-snug text-navy-900 sm:text-3xl">See it with your staff.</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy-700">
              Tell us the institute. We walk the people who will use it through the same day.
            </p>
          </div>
          <DemoForm />
        </div>
      </section>
    </>
  );
}
