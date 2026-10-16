import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { pageMeta } from "@/lib/seo";

const title = "Certificates";
const description =
  "Full results prints a PDF certificate from the enrolled student: transfer, bonafide, character, birth, and fee. It is quoted. It is not on the monthly packs.";

export const metadata: Metadata = pageMeta("School certificate software", description, "/certificates");

const faqs = [
  {
    q: "Are certificates included in Full CRM at ₹10,000?",
    a: "No. Transfer, bonafide, character, birth, and fee certificates are on Full results. That licence is quoted. Full CRM does not issue them.",
  },
  {
    q: "Can I print a certificate for a visitor?",
    a: "No. The student has to be enrolled. The PDF uses the active class or batch on that student.",
  },
  {
    q: "Is the birth certificate a government certificate?",
    a: "No. It is a school PDF from the date of birth saved on the student. It is not a municipal birth certificate.",
  },
  {
    q: "Does the parent get the marksheet on WhatsApp automatically?",
    a: "No. Publishing the result and the marksheet PDF is also Full results. The parent sees published marks on the parent login only when that licence and the portal are both on.",
  },
] as const;

export default function CertificatesPage() {
  return (
    <GuideArticle path="/certificates" kicker="Certificates" title={title} description={description} faqs={faqs}>
      <p>
        The office is asked for the same papers every season. A transfer certificate when a child leaves. A bonafide letter for a bank or a board form. A character certificate. A fee certificate that says the dues are clear. Someone opens Word, types the name again, and hopes the class and the father’s name match the register.
      </p>
      <p>
        Task Book prints those from the enrolled student. The PDF is A4. It carries the institute name from your settings, a serial number, the date, and the staff member who issued it. You can add a short remark. The student must already be enrolled. A visitor does not get a certificate.
      </p>
      <h2 className="font-display text-2xl text-navy-950">Which papers the software can issue</h2>
      <p>
        The types are a transfer certificate, a bonafide certificate, a character certificate, a birth certificate, and a fee certificate. The birth certificate here is the school’s own PDF. It uses the date of birth already saved on the student. It is not the government birth certificate.
      </p>
      <p>
        The PDF also takes the name, the father’s name, the mobile, the address, the course, the class or batch, and the session, from the student file at the time you issue it. The serial looks like your institute prefix, then CERT, the year, and a running number. If you need the file again, the same certificate can be generated again. It stays on that student.
      </p>
      <p>
        Marks entered in class are a different screen, and they start on Starter at ₹3,000 a month. The PDF marksheet and publishing the result are on the same Full results licence as these certificates. A parent sees published marks on the parent login only when Full results and the portal are both on. Sending a mark on WhatsApp is not the same thing, and WhatsApp itself is Full CRM, with Meta billing the message.
      </p>
      <h2 className="font-display text-2xl text-navy-950">Which pack this sits in</h2>
      <p>
        Starter, Academic Plus, and Full CRM do not issue these certificates. Full results is quoted. It includes the rest of the product as well: attendance, fees, homework, calls, WhatsApp, and the parent login. GST on the other packs is extra. We do not print a monthly price for Full results on this page.
      </p>
      <p>
        A coaching institute uses the same certificate screen once the student has a roll number and a batch. Read <Link href="/institute-crm" className="font-semibold text-navy-950">institute CRM</Link> for admission, and <Link href="/school-crm" className="font-semibold text-navy-950">school CRM</Link> for the day-to-day file. Day-to-day marks are on the exam screen. A complaint that is not a certificate is a <Link href="/cases" className="font-semibold text-navy-950">case</Link>.
      </p>
      <p>
        The public pages of the campus are separate. Home, courses, and contact are the <Link href="/institute-website" className="font-semibold text-navy-950">institute website</Link>, on Full CRM. Packs are listed on <Link href="/pricing" className="font-semibold text-navy-950">pricing</Link>.
      </p>
      <p>
        <Link href="/demo" className="font-semibold text-navy-950">Book a demo</Link> if you want to see one certificate taken from a real student file, with your institute name on it.
      </p>
    </GuideArticle>
  );
}
