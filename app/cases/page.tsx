import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { pageMeta } from "@/lib/seo";

const title = "Cases";
const description =
  "On Full CRM, a complaint stays on the enrolled student. Staff open it, give it to a person, and close it. It is not lost in a WhatsApp group.";

export const metadata: Metadata = pageMeta("School complaint and case software", description, "/cases");

const faqs = [
  {
    q: "Is a case included in the ₹3,000 or ₹6,000 pack?",
    a: "No. Cases are on Full CRM at ₹10,000 a month. Starter and Academic Plus do not open cases.",
  },
  {
    q: "Can I open a case for a visitor who has not joined?",
    a: "No. A case is only for an enrolled student. A visitor stays as an enquiry and a call until admission.",
  },
  {
    q: "Does the parent see the case screen?",
    a: "No. Parents do not get the office screens. The case is for your staff. The parent still sees the institute WhatsApp number when you message them.",
  },
  {
    q: "What happens if the staff member is on leave?",
    a: "The case can be given to another active staff login. The note and the student stay the same. It does not sit on one person’s phone.",
  },
] as const;

export default function CasesPage() {
  return (
    <GuideArticle path="/cases" kicker="Cases" title={title} description={description} faqs={faqs}>
      <p>
        A parent comes to the office with a complaint. Fees were deducted twice. The child was marked absent on a day they were present. A document is still pending. In many schools that complaint is spoken once, written in a diary, or dropped in a staff WhatsApp group. A week later nobody can say who was supposed to finish it.
      </p>
      <p>
        On Full CRM, that complaint becomes a case on the student. The office opens it only after the child is enrolled. A visitor who has not joined is still an enquiry and a call, not a case. The same student file that already has attendance, fees, and homework now also has this open item.
      </p>
      <h2 className="font-display text-2xl text-navy-950">What the office fills in</h2>
      <p>
        The case needs a title. The staff member picks a type: fees or payment, an academic doubt, documents, a general query, or a complaint. They can add a short summary. They must give the case to an active staff login. An inactive login cannot take it. The software gives the case a number, marks it open, and keeps who opened it.
      </p>
      <p>
        Later, another person can take the same case. The handoff stays on the record, so the next staff member does not start from a blank chat. When the work is done, the case is closed. Open and closed are the two states. There is no separate app for this.
      </p>
      <p>
        This is not on Starter at ₹3,000, and it is not on Academic Plus at ₹6,000. It is part of Full CRM at ₹10,000 a month. GST is extra. The parent does not get a login to the case list. If you also send a WhatsApp, that message is a separate switch on the same Full CRM licence, and Meta bills it.
      </p>
      <h2 className="font-display text-2xl text-navy-950">How it sits with the rest of the day</h2>
      <p>
        Search the student by name, roll number, or the registered mobile. The call you logged earlier, the fee, and the case are on that one person. A fee complaint does not need a new register. The case type can be fees, and the receipt is still the fee screen on Academic Plus and above.
      </p>
      <p>
        A coaching institute uses the same case. The student must already have a roll number and a batch. Read <Link href="/institute-crm" className="font-semibold text-navy-950">institute CRM</Link> for the visit and the admission, and <Link href="/school-crm" className="font-semibold text-navy-950">school CRM</Link> for the packs. Prices are on <Link href="/pricing" className="font-semibold text-navy-950">pricing</Link>.
      </p>
      <p>
        Cases do not print a certificate and they do not publish the result. Those PDFs are on <Link href="/certificates" className="font-semibold text-navy-950">certificates</Link>, which is the Full results licence. The public site of the campus, with home, courses, and contact, is the <Link href="/institute-website" className="font-semibold text-navy-950">institute website</Link>.
      </p>
      <p>
        If you want this on your own students, <Link href="/demo" className="font-semibold text-navy-950">book a demo</Link>. We will open a case on one enrolled student and show who it is assigned to.
      </p>
    </GuideArticle>
  );
}
