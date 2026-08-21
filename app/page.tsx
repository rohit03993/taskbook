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

const howShots: Record<string, string> = {
  "1": "/inside/how-01.png",
  "2": "/inside/how-02.png",
  "3": "/inside/how-03.png",
  "4": "/inside/how-04.png",
  "5": "/inside/how-05.png",
  "6": "/inside/how-06.png",
};

export default async function HomePage() {
  const [home, locations] = await Promise.all([getHomeContent(), listLocations({ publishedOnly: true })]);
  const { hero, pains, howItWorks } = home;
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-bl from-navy-50/80 to-transparent lg:block" />
        <div className="container-site grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:py-20">
          <div>
            <p className="kicker">For school, college and institute owners</p>
            <h1 className="mt-3 max-w-xl font-display text-[1.85rem] leading-[1.15] text-navy-900 sm:mt-5 sm:text-5xl lg:text-[3.15rem]">
              {hero.headline}
            </h1>
            <p className="mt-4 hidden max-w-md text-base leading-relaxed text-navy-700 sm:mt-6 sm:block sm:text-lg">
              {hero.subhead}
            </p>

            <ul className="mt-5 space-y-2.5 sm:hidden">
              {pains.map((p) => (
                <li key={p.n} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-navy-800">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[10px] font-semibold text-white">
                    {p.n.replace(/^0/, "")}
                  </span>
                  {p.title}
                </li>
              ))}
            </ul>

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
          <ol className="mt-8 snap-row lg:mt-12">
            {pains.map((p, i) => (
              <li
                key={p.n}
                className="snap-card flex flex-col rounded-[1.35rem] bg-white p-5 ring-1 ring-navy-900/[0.06] sm:p-8 lg:rounded-[1.6rem]"
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

          <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-5 sm:px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
            {howItWorks.map((s) => (
              <article
                key={s.step}
                className="w-[min(88vw,22rem)] shrink-0 snap-center overflow-hidden rounded-[1.25rem] bg-[#F6F7FA] ring-1 ring-navy-900/[0.06]"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={howShots[s.step]} alt={s.title} fill sizes="90vw" className="object-cover object-top" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">Step {s.step}</p>
                  <h3 className="mt-1 font-display text-lg leading-snug text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-navy-600 lg:hidden">Swipe the steps →</p>

          <div className="mt-16 hidden space-y-20 lg:block">
            {howItWorks.map((s, i) => (
              <div
                key={s.step}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[#F6F7FA] ring-1 ring-navy-900/[0.06]">
                  <Image
                    src={howShots[s.step]}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="inline-flex items-center rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                    Step {s.step}
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-navy-900 sm:text-[1.75rem]">{s.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-navy-700">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-12 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-lg overflow-hidden rounded-[1.35rem] bg-[#F6F7FA] ring-1 ring-navy-900/[0.06] lg:order-2 lg:rounded-[1.6rem]">
            <Image
              src="/inside/after-pdf.png"
              alt="XYZ School fee receipt PDF with View PDF and Download PDF"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain object-top p-3 sm:p-4"
            />
          </div>
          <div className="lg:order-1">
            <p className="kicker">After collection</p>
            <h2 className="mt-3 font-display text-[1.65rem] leading-snug text-navy-900 sm:text-4xl">
              The receipt is a PDF from the software
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-700 sm:text-base">
              Same layout the CRM prints: school name, receipt number, student, roll, amount in words. Staff open View
              PDF or Download PDF on the student. Nothing is written by hand.
            </p>
            <Link href="/features/fees" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-navy-600 hover:text-navy-900">
              Fees & receipts →
            </Link>
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
          <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
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
