import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { pageMeta } from "@/lib/seo";

const title = "College CRM";
const description =
  "Task Book for a college admissions desk. The enquiry, the call, and the WhatsApp stay on one number. After admission, the student file holds attendance, fees, and marks.";

export const metadata: Metadata = pageMeta("College CRM", description, "/college-crm");

const faqs = [
  {
    q: "Is there a different product for a college?",
    a: "No. It is the same Task Book install. A college uses Full CRM for the enquiry desk, the calls, and the WhatsApp inbox. One campus is one install.",
  },
  {
    q: "Does the ₹3,000 pack include the admissions inbox?",
    a: "No. Starter is attendance and marks. The enquiry, the call list, admission, and WhatsApp are on Full CRM at ₹10,000 a month. Meta bills the WhatsApp messages.",
  },
  {
    q: "If the counsellor is on leave, can someone else reply?",
    a: "Yes, on Full CRM. Many staff can open the same college number. The parent or the student still sees that one number. The reply shows the staff name.",
  },
  {
    q: "When does the enquiry become a student?",
    a: "Admission sets the fee plan, approves the student, gives a unique roll number, and assigns a batch. The old visits and calls stay on the same mobile.",
  },
] as const;

export default function CollegeCrmPage() {
  return (
    <GuideArticle path="/college-crm" kicker="College CRM" title={title} description={description} faqs={faqs}>
      <p>
        A college desk lives on the next call. Someone enquires about a course. The counsellor promises to call back. The chat sits on one phone. Fees start only after the student joins, but the office still cannot find what was said last week. The same person is asked the same questions again.
      </p>
      <p>
        Task Book keeps that person on one mobile number. Before admission, Full CRM stores the visit and the call: who they met, what they asked, and the next follow-up. After admission, the same number opens the student: roll number, batch, attendance, fee, homework, and marks. Parents and students do not get the office screens.
      </p>
      <h2 className="font-display text-2xl text-navy-950">What a college desk actually uses</h2>
      <p>
        Starter is ₹3,000 a month. It marks attendance and keeps marks, including an Excel upload. It does not store the enquiry desk and it does not send WhatsApp.
      </p>
      <p>
        Academic Plus is ₹6,000 a month. It adds the fee counter and the PDF receipt, late fee as per your rule, homework, and the course plan. The receipt carries the institute name, the receipt number, and the amount in words. This pack still does not include the shared WhatsApp inbox.
      </p>
      <p>
        Full CRM is ₹10,000 a month. This is the pack for the admissions desk. It adds the walk-in, the call list, admission, cases, the WhatsApp inbox, the parent login, reports, and a simple website. Many logins, one college number. If a counsellor leaves, the chat does not leave with their phone. GST is extra. Meta bills WhatsApp on its own. One college campus is one install.
      </p>
      <p>
        A call is saved as outgoing or incoming. The office notes who spoke — father, mother, the student, a guardian, or someone else — and picks a reason: fee query, attendance, academic, documents, complaint, general, callback needed, or resolved. If the call connected, the note is at least ten characters.
      </p>
      <h2 className="font-display text-2xl text-navy-950">After the student joins</h2>
      <p>
        Attendance is present, absent, or on leave. The mark is saved even if you never message the parent. The WhatsApp goes only when you switch it on, and only on Full CRM. Homework works the same way as on the <Link href="/school-crm" className="font-semibold text-navy-950">school CRM</Link> page. Opened means the link was opened. Done is a mark your staff make later.
      </p>
      <p>
        A complaint after admission is a <Link href="/cases" className="font-semibold text-navy-950">case</Link> on that enrolled student. Certificates such as a transfer certificate are on <Link href="/certificates" className="font-semibold text-navy-950">certificates</Link>, which is Full results and is quoted. The public home, courses, and contact pages are the <Link href="/institute-website" className="font-semibold text-navy-950">institute website</Link>.
      </p>
      <p>
        A coaching centre should read <Link href="/institute-crm" className="font-semibold text-navy-950">institute CRM</Link>. Packs are on <Link href="/pricing" className="font-semibold text-navy-950">pricing</Link>. For your own courses, <Link href="/demo" className="font-semibold text-navy-950">book a demo</Link>. We set the fee rules, the logins, and the WhatsApp templates with your staff.
      </p>
    </GuideArticle>
  );
}
