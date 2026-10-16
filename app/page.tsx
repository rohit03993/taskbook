import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/Blocks";
import { DualCta } from "@/components/DualCta";
import { DemoForm } from "@/components/DemoForm";
import { AudienceMark, PainIcon } from "@/components/HomeVisuals";
import { HeroChat, StoryStage } from "@/components/StoryStage";
import { audiences } from "@/content/audiences";
import { faqs } from "@/content/faqs";
import { getHomeContent } from "@/lib/content";
import { listLocations } from "@/lib/locations";
import { plans } from "@/content/plans";
import { clients } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeContent();
  return pageMeta("School, college & institute CRM", home.hero.subhead, "/");
}

const painIcons = ["phone", "parents", "visitor"] as const;

export default async function HomePage() {
  const [home, locations] = await Promise.all([getHomeContent(), listLocations({ publishedOnly: true })]);
  const { hero, pains, howItWorks } = home;
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
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base">{hero.subhead}</p>
            <DualCta onDark className="mt-6 sm:mt-8" />
          </div>
          <HeroChat />
        </div>
        <div className="relative border-t border-white/10">
          <div className="container-site flex flex-wrap items-center gap-x-8 gap-y-2 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Live with</p>
            {clients.map((client) => (
              <p key={client.host} className="text-sm font-semibold text-white">
                {client.name}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-12 text-white lg:py-20">
        <div className="container-site">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">One student</p>
          <h2 className="mt-3 max-w-xl font-display text-[1.7rem] leading-snug sm:text-4xl">
            From the first visit to the fee PDF.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">
            Tap a step, or let it play. This is the same path your staff will walk on the demo.
          </p>
          <div className="mt-8 lg:mt-12">
            <StoryStage steps={howItWorks} />
          </div>
        </div>
      </section>

      <section className="border-t border-navy-900/[0.06] py-12 lg:py-20">
        <div className="container-site">
          <h2 className="max-w-2xl font-display text-[1.65rem] leading-snug text-navy-900 sm:text-4xl">
            What owners lose before the software.
          </h2>
          <ol className="mt-8 grid gap-3 lg:grid-cols-3 lg:gap-4">
            {pains.map((pain, i) => (
              <li key={pain.n} className="rounded-xl bg-white p-5 ring-1 ring-navy-900/[0.06]">
                <div className="flex items-center justify-between">
                  <PainIcon name={painIcons[i] ?? "phone"} />
                  <span className="font-display text-sm text-navy-600">{pain.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug text-navy-900">{pain.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-700">{pain.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-12 lg:py-20">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="kicker">After collection</p>
            <h2 className="mt-3 font-display text-[1.65rem] leading-snug text-navy-900 sm:text-4xl">
              The receipt is a PDF from the software
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-700 sm:text-base">
              Same layout the CRM prints: school name, receipt number, student, roll, amount in words. Staff open View
              PDF or Download PDF on the student.
            </p>
            <Link href="/features/fees" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-navy-600 hover:text-navy-900">
              Fees and receipts →
            </Link>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl bg-white ring-1 ring-navy-900/[0.06] lg:max-w-lg">
            <Image
              src="/inside/after-pdf.png"
              alt="Fee receipt PDF with the institute name, receipt number, and amount in words"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain object-top p-3 sm:p-4"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/[0.06] bg-white py-12 lg:py-16">
        <div className="container-site">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[1.65rem] text-navy-900 sm:text-3xl">School, college, or coaching</h2>
            <Link href="/features" className="hidden min-h-11 items-center text-sm font-semibold text-navy-600 sm:inline-flex">
              All features →
            </Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {Object.values(audiences).map((audience) => (
              <Link
                key={audience.slug}
                href={`/${audience.slug}`}
                className="rounded-xl bg-[#F6F7FA] p-5 ring-1 ring-navy-900/[0.06]"
              >
                <AudienceMark name={audience.slug as "schools" | "colleges" | "institutes"} />
                <p className="mt-4 font-display text-lg leading-snug text-navy-900">{audience.title}</p>
                <p className="mt-3 text-sm font-semibold text-navy-600">{audience.label} →</p>
              </Link>
            ))}
          </div>
          {locations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-[#F6F7FA] px-4 text-sm font-medium text-navy-800 ring-1 ring-navy-900/10"
                >
                  {location.city}
                </Link>
              ))}
            </div>
          )}
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
      </section>

      <section className="border-t border-navy-900/[0.06] bg-white">
        <div className="container-site py-12 lg:py-16">
          <h2 className="font-display text-[1.65rem] text-navy-900 sm:text-3xl">Questions</h2>
          <div className="mt-4">
            <FaqList />
          </div>
          <p className="mt-4 text-xs text-navy-700">{faqs.length} answers. Still unsure? WhatsApp us.</p>
        </div>
      </section>

      <section className="border-t border-navy-900/[0.06]">
        <div className="container-site grid gap-8 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <h2 className="font-display text-[1.65rem] leading-snug text-navy-900 sm:text-3xl">See it on a live walkthrough.</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy-700">
              WhatsApp us or fill the form. We show the walk-in, the chat, and the fee PDF on your kind of institute.
            </p>
          </div>
          <DemoForm />
        </div>
      </section>
    </>
  );
}
