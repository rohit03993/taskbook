import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { FaqList } from "@/components/Blocks";
import { DemoForm } from "@/components/DemoForm";
import { HeroOpening, RolePanels, StudentJourney, TeacherWatch, WhatsAppCrm } from "@/components/LandingShow";
import { faqs } from "@/content/faqs";
import { whatsappHref } from "@/content/site";
import { getSettings } from "@/lib/settings";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

const description =
  "School owners and teachers lose the call, the attendance, the homework, and the fee in different places. Task Book is a school CRM that keeps that day on one student.";

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta("The school day, then Task Book.", description, "/");
}

function Dark({ kicker, title, body, children, frame = false }: { kicker: string; title: string; body: string; children: ReactNode; frame?: boolean }) {
  return (
    <section className={`border-t border-white/10 bg-navy-950 text-white ${frame ? "py-2 sm:py-14 lg:py-20" : "py-14 lg:py-20"}`}>
      <div className="container-site">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{kicker}</p>
        <h2 className={`max-w-3xl font-display leading-tight sm:text-4xl ${frame ? "mt-1.5 text-[1.35rem] sm:mt-3" : "mt-3 text-[1.8rem]"}`}>{title}</h2>
        <p className={`max-w-2xl leading-relaxed text-white/70 ${frame ? "mt-1.5 text-sm sm:mt-3 sm:text-[15px]" : "mt-3 text-[15px]"}`}>{body}</p>
        <div className={frame ? "mt-3 sm:mt-8 lg:mt-10" : "mt-8 lg:mt-10"}>{children}</div>
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
          <HeroOpening />
        </div>
      </section>

      <Dark
        kicker="One student"
        frame
        title="Let's do the demo on one student."
        body="Fill this form and try the demo. You can move forward only after that."
      >
        <StudentJourney />
      </Dark>

      <Dark
        kicker="WhatsApp"
        title="One WhatsApp number. Your entire school connected."
        body="Teachers and staff use their own logins. Parents still receive everything from one official number, and the history stays on the student."
      >
        <WhatsAppCrm />
      </Dark>

      <Dark
        kicker="Who uses it"
        title="Teachers use it. Parents receive it."
        body="Teachers mark the day from their login. Parents only receive the school WhatsApp. They do not get the admin screens."
      >
        <RolePanels />
      </Dark>

      <Dark
        kicker="Teacher tracking"
        title="Homework given. Homework checked. The class, in one view."
        body="Class teacher and subject teachers sit on one board. The score comes from homework given, homework checked, and how the class is doing. Parents do not see this screen."
      >
        <TeacherWatch />
      </Dark>

      <section className="border-t border-navy-900/10 bg-white py-14 lg:py-20">
        <div className="container-site grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-between rounded-[1.6rem] bg-navy-950 p-6 text-white sm:p-8">
            <div>
              <h2 className="font-display text-[1.8rem] leading-tight sm:text-4xl">Your entire school. Finally connected.</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75">
                One student file. The day stays on that student.
              </p>
              <ol className="mt-8 space-y-4">
                {[
                  ["1", "Save the call", "The reason stays on the student."],
                  ["2", "Mark the day", "Attendance, fees, marks, and homework."],
                  ["3", "Open the file", "Every step is already there."],
                ].map(([n, title, line]) => (
                  <li key={n} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2EC4D6] text-xs font-bold text-navy-950">{n}</span>
                    <span>
                      <span className="block text-sm font-semibold">{title}</span>
                      <span className="block text-sm text-white/65">{line}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/demo" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-navy-950">
                Book your live demo
              </Link>
              <a href={talk} className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/30">
                Talk to our team
              </a>
            </div>
          </div>
          <DemoForm dense />
        </div>
      </section>

      <section className="border-t border-navy-900/10 bg-[#F6F7FA]">
        <div className="container-site py-12">
          <h2 className="font-display text-3xl text-navy-900">Before you decide</h2>
          <div className="mt-4">
            <FaqList items={questions} />
          </div>
          <p className="mt-4 text-sm text-navy-700">
            A buyer’s guide is on <Link href="/school-crm" className="font-semibold text-navy-900">school CRM</Link>. Packs and prices are on <Link href="/pricing" className="font-semibold text-navy-900">Pricing</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
