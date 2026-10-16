import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/Blocks";
import { CtaBanner, DualCta } from "@/components/DualCta";
import { DemoForm } from "@/components/DemoForm";
import { AudienceMark, HeroVisual, PainIcon } from "@/components/HomeVisuals";
import { InsideSection } from "@/components/InsideSection";
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
      <section className="bg-white">
        <div className="container-site grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:py-16">
          <div>
            <p className="kicker">For school, college and institute owners</p>
            <h1 className="mt-3 max-w-xl font-display text-[1.85rem] leading-[1.15] text-navy-900 sm:mt-5 sm:text-5xl lg:text-[3.15rem]">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-700 sm:mt-6 sm:text-lg">
              {hero.subhead}
            </p>

            <DualCta className="mt-6 hidden sm:flex sm:mt-9" />
            <p className="mt-5 hidden text-xs leading-relaxed text-navy-700 sm:mt-8 sm:block">
              Live at {clients.map((c) => c.host).join(" · ")}
            </p>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="border-t border-navy-900/[0.06] py-12 lg:py-24">
        <div className="container-site">
          <p className="kicker">The problem they come to solve</p>
          <h2 className="mt-3 max-w-2xl font-display text-[1.65rem] leading-snug text-navy-900 sm:text-4xl">
            We did not start with modules. We started with what owners lose every day.
          </h2>
          <ol className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-3 lg:gap-4">
            {pains.map((p, i) => (
              <li
                key={p.n}
                className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-navy-900/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <PainIcon name={painIcons[i]} />
                  <span className="font-display text-sm text-navy-600">{p.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug text-navy-900 sm:mt-8 sm:text-[1.35rem]">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-navy-900/[0.06] bg-white py-12 lg:py-24">
        <div className="container-site">
          <p className="kicker">How it works</p>
          <h2 className="mt-3 max-w-2xl font-display text-[1.65rem] leading-snug text-navy-900 sm:text-4xl">
            One person. One mobile number. From the first visit to the fee PDF.
          </h2>

          <ol className="mt-8 divide-y divide-navy-900/10 border-y border-navy-900/10">
            {howItWorks.map((s) => (
              <li key={s.step} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5">
                <p className="font-display text-2xl text-navy-600">{s.step}</p>
                <div>
                  <h3 className="font-display text-lg leading-snug text-navy-900 sm:text-xl">{s.title}</h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-navy-700 sm:text-base">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-12 lg:py-24">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="kicker">After collection</p>
            <h2 className="mt-3 font-display text-[1.65rem] leading-snug text-navy-900 sm:text-4xl">
              The receipt is a PDF from the software
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-700 sm:text-base">
              Same layout the CRM prints: school name, receipt number, student, roll, amount in words. Staff open View
              PDF or Download PDF on the student. Nothing is written by hand.
            </p>
            <Link href="/features/fees" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-navy-600 hover:text-navy-900">
              Fees and receipts →
            </Link>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl bg-[#F6F7FA] ring-1 ring-navy-900/[0.06] lg:max-w-lg">
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

      <section className="border-y border-navy-900/[0.06] bg-white py-12 lg:py-24">
        <div className="container-site">
          <p className="kicker">What is inside</p>
          <div className="mb-8 mt-3 flex items-end justify-between gap-4 lg:mb-14">
            <h2 className="max-w-xl font-display text-[1.65rem] leading-snug text-navy-900 sm:text-4xl">
              WhatsApp for parents. A file for every person. PDFs instead of Excel.
            </h2>
            <Link href="/features" className="hidden shrink-0 text-sm font-semibold text-navy-600 hover:text-navy-900 sm:inline">
              All features →
            </Link>
          </div>
          <InsideSection />
          <Link href="/features" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-navy-600 sm:hidden">
            All features →
          </Link>
        </div>
      </section>

      <section className="container-site py-12 lg:py-20">
        <p className="kicker">Who it is for</p>
        <h2 className="mt-3 font-display text-[1.65rem] text-navy-900 sm:text-3xl">School, college, or coaching</h2>
        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
          {Object.values(audiences).map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className="group rounded-[1.25rem] bg-white p-5 ring-1 ring-navy-900/[0.06] transition hover:-translate-y-0.5 hover:shadow-card sm:rounded-[1.6rem] sm:p-7"
            >
              <AudienceMark name={a.slug as "schools" | "colleges" | "institutes"} />
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-navy-600 sm:mt-6">{a.label}</p>
              <p className="mt-2 font-display text-lg leading-snug text-navy-900 group-hover:text-navy-700 sm:text-xl">{a.title}</p>
              <p className="mt-3 text-sm font-semibold text-navy-600 sm:mt-4">See this →</p>
            </Link>
          ))}
        </div>
        {locations.length > 0 && (
          <div className="mt-8 sm:mt-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">Cities</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {locations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 ring-1 ring-navy-900/10 hover:bg-navy-50"
                >
                  School software in {l.city}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="border-y border-navy-900/[0.06] bg-white py-12 lg:py-20">
        <div className="container-site">
          <p className="kicker">Packs</p>
          <h2 className="mt-3 font-display text-[1.65rem] text-navy-900 sm:text-3xl">Packs you can take</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-700">
            GST extra. Meta WhatsApp usage billed by Meta. One campus per install. Full CRM is what most owners take.
          </p>
          <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
            {plans.map((p) => (
              <Link
                key={p.id}
                href="/pricing"
                className={`rounded-[1.25rem] p-5 ring-1 sm:rounded-[1.4rem] ${
                  p.featured
                    ? "bg-navy-900 text-white ring-navy-900"
                    : "bg-white text-navy-900 ring-navy-900/10"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wider ${p.featured ? "text-white/70" : "text-navy-600"}`}>
                  {p.featured ? "Most owners" : "Pack"}
                </p>
                <p className="mt-1 font-display text-xl">{p.name}</p>
                <p className="mt-2 font-display text-2xl">
                  {p.price}
                  <span className={`ml-1 text-sm font-sans font-medium ${p.featured ? "text-white/70" : "text-navy-700"}`}>
                    {p.priceSuffix}
                  </span>
                </p>
                <p className={`mt-2 text-sm leading-snug ${p.featured ? "text-white/80" : "text-navy-700"}`}>{p.blurb}</p>
              </Link>
            ))}
          </div>
          <Link href="/pricing" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-navy-600 hover:text-navy-900">
            Compare packs →
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-12 sm:gap-10">
            {clients.map((c) => (
              <div key={c.host}>
                <p className="text-sm font-semibold text-navy-900">{c.name}</p>
                <p className="text-xs text-navy-700">{c.host}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-12 lg:py-20">
        <p className="kicker">Questions</p>
        <h2 className="mt-3 font-display text-[1.65rem] text-navy-900 sm:text-3xl">Simple questions</h2>
        <div className="mt-6 overflow-hidden rounded-[1.25rem] bg-white px-4 ring-1 ring-navy-900/[0.06] sm:mt-8 sm:rounded-[1.6rem] sm:px-8">
          <FaqList />
        </div>
        <p className="mt-4 text-xs text-navy-700">{faqs.length} answers · still unsure? WhatsApp us.</p>
      </section>

      <section className="border-t border-navy-900/[0.06] bg-white">
        <div className="container-site grid gap-8 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="lg:pt-6">
            <p className="kicker">Demo</p>
            <h2 className="mt-3 font-display text-[1.65rem] text-navy-900 sm:text-3xl">See it on a live walkthrough.</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy-700 sm:text-base">
              WhatsApp us or fill the form. We show the walk-in, the chat, and the fee PDF — on your kind of institute.
            </p>
          </div>
          <DemoForm />
        </div>
      </section>

      <CtaBanner
        title="Stop keeping WhatsApp on one mobile."
        body="Type a number. Open the file. Chat from the CRM."
      />
    </>
  );
}
