import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { pageMeta } from "@/lib/seo";

const title = "Bangladesh CRM";
const description =
  "Task Book for a school or institute in Bangladesh. One campus, one student file, one official WhatsApp number. The same packs as India. The final amount is confirmed on the demo.";

export const metadata: Metadata = pageMeta("School CRM for Bangladesh", description, "/bangladesh-crm");

const faqs = [
  {
    q: "Is there a separate Bangladesh version of Task Book?",
    a: "No. It is the same school CRM. One campus gets its own install. Your students are not mixed with another school.",
  },
  {
    q: "Are the prices in Taka on this page?",
    a: "No. The published packs are Starter ₹3,000, Academic Plus ₹6,000 and Full CRM ₹10,000 a month. GST is extra on an India invoice. For a campus in Bangladesh, we confirm the amount on the demo. We do not show a fake Taka price here.",
  },
  {
    q: "Can parents in Bangladesh get attendance on WhatsApp?",
    a: "Yes, if you take Full CRM and you switch that message on. The attendance itself can be marked on Starter. The WhatsApp needs a Meta-approved template, and Meta bills those messages.",
  },
  {
    q: "Does the parent get an admin login?",
    a: "No. Parents receive the institute WhatsApp, and on Full CRM they can get a parent login for receipts and attendance. They do not get the office screens.",
  },
] as const;

export default function BangladeshCrmPage() {
  return (
    <GuideArticle path="/bangladesh-crm" kicker="Bangladesh CRM" title={title} description={description} faqs={faqs}>
      <p>
        A school in Dhaka, Chattogram, or a smaller town has the same office problem as a school anywhere else. The parent calls and asks if the child has reached. The fee is pending and nobody is sure of the last receipt. Homework was sent in a group, and later nobody can say who finished it. The chat often sits on one person’s phone. If that person is away, the office starts from zero.
      </p>
      <p>
        Task Book is the CRM we set up for that campus. It is not a different product for Bangladesh. You search the student by name, roll number, or the registered mobile. The call, the attendance, the fee, the marks and the homework stay on that student. Staff use their own login. The parent still sees one official WhatsApp number.
      </p>
      <h2 className="font-display text-2xl text-navy-950">What the school actually uses</h2>
      <p>
        On Starter, ₹3,000 a month, the school marks attendance and keeps marks. The punch can come from a biometric machine, a face camera, or the class teacher. Marks can be uploaded from Excel. This pack does not send WhatsApp to the parent.
      </p>
      <p>
        Academic Plus, ₹6,000 a month, adds the fee counter and the PDF receipt, late fee as per your rule, homework, and teacher tracking. Teacher tracking means the course plan and how far the class has reached. The academic head can check it. It is not a public score for the teacher.
      </p>
      <p>
        Full CRM, ₹10,000 a month, adds the enquiry, the call log, admission with roll number and batch, cases, the WhatsApp inbox, the parent login, and reports. Many staff can reply on the same school number. If one counsellor is on leave, the next person opens the same chat. Attendance WhatsApp and the fee reminder go only when you turn them on.
      </p>
      <p>
        Full results is quoted. That is when you publish the result, print the marksheet PDF, and issue certificates such as a transfer certificate. We have not put a Bangladesh-only certificate format on this page. Those details are set during the demo for your campus.
      </p>
      <h2 className="font-display text-2xl text-navy-950">Price and WhatsApp</h2>
      <p>
        The prices above are the India list, in rupees. GST is extra on that invoice. We do not print a Taka rate here, because a campus outside India is confirmed on the call. Meta bills the WhatsApp messages on its own. That bill is not inside our monthly fee.
      </p>
      <p>
        Parents in Bangladesh already live on WhatsApp, so the message is useful. It is still not automatic. You choose the template, Meta approves it, and you switch the message on. If you leave it off, the attendance and the fee are still saved on the student. The office can answer the parent from the file instead of guessing.
      </p>
      <p>
        A call is saved the same way as in India. The office marks it outgoing or incoming, notes who spoke — father, mother, the student, a guardian, or someone else — and picks a reason such as fee query, attendance, academic, documents, complaint, general, callback needed, or resolved. If the call connected, the note is at least ten characters. The next staff member opens the same student and reads it. They do not need the counsellor’s personal phone.
      </p>
      <p>
        Search works by name, roll number, or the registered mobile. A college desk that only wants enquiries and calls uses Full CRM in this same install. We have not made a separate college page. The day after admission still sits on the student: attendance, fee, homework and marks, as written on the school CRM page.
      </p>
      <p>
        Homework is the same rule as on the <Link href="/school-crm" className="font-semibold text-navy-950">school CRM</Link> page. Opened means the parent opened the link. Done is a mark your staff make later. A coaching centre in Bangladesh should also read <Link href="/institute-crm" className="font-semibold text-navy-950">institute CRM</Link>. Packs are on <Link href="/pricing" className="font-semibold text-navy-950">pricing</Link>.
      </p>
      <p>
        We do not claim a list of schools in Bangladesh on this page, and we do not share one database between campuses. <Link href="/demo" className="font-semibold text-navy-950">Book a demo</Link> and we will set the classes, the fee rules and the logins for your institute.
      </p>
    </GuideArticle>
  );
}
