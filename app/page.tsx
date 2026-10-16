import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { FaqList } from "@/components/Blocks";
import { DemoForm } from "@/components/DemoForm";
import {
  AttendanceBoard,
  CallDesk,
  DossierSearch,
  HeroStage,
  HomeworkFlow,
  MarksBoard,
  RolePanels,
  Walkthrough,
  WhatsAppCrm,
} from "@/components/LandingShow";
import { faqs } from "@/content/faqs";
import { whatsappHref } from "@/content/site";
import { getSettings } from "@/lib/settings";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

const description =
  "Attendance, homework, exam results, fees, and every parent conversation — connected inside one school CRM.";

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta("One student. Every detail. One place.", description, "/");
}

function Dark({ kicker, title, body, children }: { kicker: string; title: string; body: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 bg-navy-950 py-14 text-white lg:py-20">
      <div className="container-site">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{kicker}</p>
        <h2 className="mt-3 max-w-3xl font-display text-[1.8rem] leading-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">{body}</p>
        <div className="mt-8 lg:mt-10">{children}</div>
      </div>
    </section>
  );
}

const directorQuestions = [
  "Is this allowed by Meta?",
  "Does each school share one database with other schools?",
  "Will you sit with our staff?",
];

export default async function HomePage() {
  const settings = await getSettings();
  const questions = faqs.filter((item) => directorQuestions.includes(item.q));
  const talk = whatsappHref(settings.whatsappMessage, settings.whatsappNumber);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="stage-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-site relative py-12 lg:py-16">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 bg-[#2EC4D6]" aria-hidden />
            One school. One WhatsApp number. Complete control.
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.1rem] leading-[1.08] sm:text-6xl">
            One student. Every detail. One place.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-lg">{description}</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/demo" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-navy-950">
              Book a live demo
            </Link>
            <Link href="/features" className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/30">
              Explore Task Book
            </Link>
          </div>
          <div className="mt-10">
            <HeroStage />
          </div>
        </div>
      </section>

      <Dark
        kicker="WhatsApp"
        title="One WhatsApp number. Your entire school connected."
        body="Teachers and staff use their own logins. Parents still receive everything from one official number, and the history stays on the student."
      >
        <WhatsAppCrm />
      </Dark>

      <Dark
        kicker="Student file"
        title="Everything about a student. One search away."
        body="Search a demonstration record by name, roll number, or registered mobile. The file opens on that same student."
      >
        <DossierSearch />
      </Dark>

      <Dark
        kicker="Attendance"
        title="Every attendance. Recorded on the student."
        body="Mark present, absent, or on leave. The student file updates. A parent message is sent only when the school turns that WhatsApp on."
      >
        <AttendanceBoard />
      </Dark>

      <Dark
        kicker="Homework"
        title="Homework delivered. Progress tracked."
        body="The teacher creates it. The coordinator or the admin sends it. Opened is the link. Done is a separate mark by staff."
      >
        <HomeworkFlow />
      </Dark>

      <Dark
        kicker="Exams"
        title="Every test. Every mark. Every milestone."
        body="Unit tests and half-yearly results stay on the student. Staff can send the mark on the institute WhatsApp."
      >
        <MarksBoard />
      </Dark>

      <Dark
        kicker="Calls"
        title="Every call has a reason. Every follow-up has a record."
        body="Staff choose the student and the reason. The admin filters the list by that reason."
      >
        <CallDesk />
      </Dark>

      <Dark
        kicker="Who uses it"
        title="Built for the people who run the school."
        body="Directors see the campus. Teachers work the student. Parents receive the school's WhatsApp. Parents do not get the admin screens."
      >
        <RolePanels />
      </Dark>

      <section className="border-t border-navy-900/10 bg-[#F6F7FA] py-14 lg:py-20">
        <div className="container-site">
          <h2 className="max-w-3xl font-display text-[1.8rem] leading-tight text-navy-900 sm:text-4xl">See how Task Book works.</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-navy-700">
            Open a part. These are the same demonstration records, not a screenshot of a customer's school.
          </p>
          <div className="mt-8">
            <Walkthrough />
          </div>
        </div>
      </section>

      <section className="border-t border-navy-900/10 bg-white py-14 lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[1.8rem] leading-tight text-navy-900 sm:text-4xl">Your entire school. Finally connected.</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy-700">
              See how Task Book brings communication, academics, and the office into one system.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/demo" className="inline-flex h-12 items-center justify-center rounded-full bg-navy-900 px-5 text-sm font-semibold text-white">
                Book your live demo
              </Link>
              <a href={talk} className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-navy-900 ring-1 ring-navy-900/15">
                Talk to our team
              </a>
            </div>
          </div>
          <DemoForm />
        </div>
      </section>

      <section className="border-t border-navy-900/10 bg-[#F6F7FA]">
        <div className="container-site py-12">
          <h2 className="font-display text-3xl text-navy-900">Before you decide</h2>
          <div className="mt-4">
            <FaqList items={questions} />
          </div>
          <p className="mt-4 text-sm text-navy-700">
            Packs and prices are on <Link href="/pricing" className="font-semibold text-navy-900">Pricing</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
