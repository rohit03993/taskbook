import type { Metadata } from "next";
import Link from "next/link";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { PageHero } from "@/components/Blocks";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "About",
  "Task Book keeps WhatsApp in the CRM, remembers every visitor, and opens the full file from a mobile number.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <section className="container-site max-w-3xl py-14">
        <PageHero
          kicker="About"
          title="We built this for the owner who is tired of one phone holding the whole institute."
          body={`${site.name} is software we set up for your school, college or coaching. Staff log in. Parents get WhatsApp. The chat does not sit on one person’s mobile.`}
        />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-navy-800">
          <p>
            The problem is simple. One counsellor has WhatsApp. They talk to parents and leads. When they are away, the
            next person cannot see the chat. A visitor comes the third time and nobody remembers the first two visits.
          </p>
          <p>
            In Task Book, staff type the mobile number. If the person is a student, the full file opens — visits,
            complaints, attendance, fees, WhatsApp. If they are still a visitor, you see how many times they came, whom
            they met, and how many times you called. When they take admission they get a roll number and a batch. Old
            history stays.
          </p>
          <p>
            WhatsApp is official Meta, one number for the institute. Many staff logins. Same number. Attendance and fee
            reminders go to parents. Fee slips and reports come from the system.
          </p>
        </div>
        <DualCta className="mt-10" />
        <p className="mt-8 text-sm">
          <Link href="/contact" className="font-semibold text-navy-600">
            Contact
          </Link>{" "}
          ·{" "}
          <Link href="/pricing" className="font-semibold text-navy-600">
            Pricing
          </Link>
        </p>
      </section>
      <CtaBanner title="Ask for a walkthrough. Not a brochure." body="WhatsApp or book a demo." />
    </>
  );
}
