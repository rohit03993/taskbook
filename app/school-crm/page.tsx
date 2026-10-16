import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { pageMeta } from "@/lib/seo";

const title = "School CRM";
const description =
  "Task Book is a school CRM for one campus. Attendance, fees, homework and marks stay on one student. WhatsApp goes to the parent only when you switch it on.";

export const metadata: Metadata = pageMeta("Best CRM for school management", description, "/school-crm");

const faqs = [
  {
    q: "Is WhatsApp included in the ₹3,000 pack?",
    a: "No. Starter is ₹3,000 a month for attendance and marks. The parent WhatsApp, the inbox, and the fee reminder are on Full CRM at ₹10,000 a month. Meta bills the messages separately.",
  },
  {
    q: "If the parent opens the homework link, is the work done?",
    a: "No. Opened only means the link was opened. Done is marked separately by your staff. A WhatsApp read is not homework completed.",
  },
  {
    q: "Will every absent or present mark send a WhatsApp?",
    a: "No. The mark is saved on the student either way. The parent message goes only when the school turns that message on, and only on the Full CRM licence.",
  },
  {
    q: "Can another person reply if the counsellor is on leave?",
    a: "Yes, on Full CRM. The chat sits in the software on one official school number. The next staff member with access opens the same thread. The parent still sees the school number. The reply shows the staff name.",
  },
  {
    q: "Do you keep many schools in one database?",
    a: "No. One campus is one install. Your students and chats stay with you. GST is extra on the monthly price.",
  },
] as const;

export default function SchoolCrmPage() {
  return (
    <GuideArticle path="/school-crm" kicker="School CRM" title={title} description={description} faqs={faqs}>
      <p>
        If you run a school, the office hears the same questions every morning. Has the child reached? What is the pending fee? Was homework given? The class teacher has the attendance. The counter has the fee. Homework is often in a WhatsApp group that one teacher owns. The parent’s call is written in a diary, or nobody writes it down.
      </p>
      <p>
        Task Book keeps that day on one student. Staff search by name, roll number, or the registered mobile. The file shows the call, the attendance, the fee, the marks and the homework. Teachers and office staff use their own login. Parents do not get these screens. They receive messages from one official WhatsApp number, and only for the messages you switch on.
      </p>
      <h2 className="font-display text-2xl text-navy-950">What each pack actually includes</h2>
      <p>
        Starter is ₹3,000 a month. You get student and staff attendance, and marks. Attendance can come from a biometric machine, a face camera, or the teacher marking the class. Marks can be entered in the software or uploaded from Excel. This pack does not send WhatsApp.
      </p>
      <p>
        Academic Plus is ₹6,000 a month. It includes Starter, and adds fee collection, the PDF receipt, late fee as per the rule you set, homework, and teacher tracking. The receipt carries the institute name, the receipt number, and the amount in words. Teacher tracking is the course plan and how far a section has reached. The academic head can close that progress. It is not a score we print for a teacher. Parents do not see the internal notes.
      </p>
      <p>
        Full CRM is ₹10,000 a month. It includes Academic Plus, and adds enquiries, calls, admission, cases, WhatsApp, the parent login, reports, and a simple website for the institute. Many staff can use the WhatsApp inbox. The parent still sees one school number. Reports for attendance, fees, admission and calls can be downloaded as Excel, CSV or PDF. GST is extra. Meta bills the WhatsApp usage. One campus is one install.
      </p>
      <p>
        Full results is quoted. It adds publishing the result, the PDF marksheet, and certificates such as TC, bonafide, character and fee certificate. Published marks show on the parent login only when that licence and the portal are both on.
      </p>
      <h2 className="font-display text-2xl text-navy-950">How a normal school day is saved</h2>
      <p>
        A parent calls about the fee. The office logs the call on the student: outgoing or incoming, and who spoke — father, mother, the student, a guardian, or someone else. They pick a reason: fee query, attendance, academic, documents, complaint, general, callback needed, or resolved. If the call connected, the note has to be at least ten characters, so the next person can read what was said instead of calling again.
      </p>
      <p>
        The class teacher marks the child present, absent, or on leave. That mark is saved even if you never message the parent. If you have turned the attendance message on, and you are on Full CRM, the parent can get WhatsApp from the school number. Meta has to approve the template first. If the switch is off, no message goes out.
      </p>
      <p>
        Fee collected at the counter is written on the same student, with the receipt, on Academic Plus. A reminder for pending fee on WhatsApp needs Full CRM as well. Homework works the same way. The teacher gives the work. The office can send it to the parent. If the parent opens the link, the software shows the link as opened. Your staff still mark the work done or not done. We do not treat a read receipt as homework finished.
      </p>
      <p>
        Test marks stay on the student from Starter onwards. Sending those marks on WhatsApp needs the Full CRM WhatsApp. You can try this order on the <Link href="/" className="font-semibold text-navy-950">homepage</Link> with one practice student. The packs are listed on <Link href="/pricing" className="font-semibold text-navy-950">pricing</Link>. A coaching centre should read <Link href="/institute-crm" className="font-semibold text-navy-950">institute CRM</Link>.
      </p>
      <p>
        When you want this on your own campus, <Link href="/demo" className="font-semibold text-navy-950">book a demo</Link>. We set the classes, the fee rules, the logins and the WhatsApp templates with the people who will use them.
      </p>
    </GuideArticle>
  );
}
