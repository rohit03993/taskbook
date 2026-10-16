import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { pageMeta } from "@/lib/seo";

const title = "Institute website";
const description =
  "Full CRM includes a simple website for one campus: home, courses, and contact. A message from the contact form can become an enquiry. It is not this Task Book website.";

export const metadata: Metadata = pageMeta("School website with the CRM", description, "/institute-website");

const faqs = [
  {
    q: "Is the website on the ₹3,000 pack?",
    a: "No. The institute website is on Full CRM at ₹10,000 a month. Starter and Academic Plus do not include it.",
  },
  {
    q: "Is this the same site as taskbook.co.in?",
    a: "No. taskbook.co.in is our marketing site. Your campus gets its own home, courses, and contact pages on your install.",
  },
  {
    q: "Does the contact form create a student?",
    a: "No. On Full CRM the form can save an enquiry. The person becomes a student only when admission gives a roll number and a batch.",
  },
  {
    q: "Can parents edit the website?",
    a: "No. Staff edit the public pages from the CRM. Parents do not get those screens.",
  },
] as const;

export default function InstituteWebsitePage() {
  return (
    <GuideArticle path="/institute-website" kicker="Institute website" title={title} description={description} faqs={faqs}>
      <p>
        Parents look for the school online before they call. They want the courses, a phone number, and a way to leave their name. Many institutes still send a PDF brochure on WhatsApp, or they pay for a website that never talks to the office register. The enquiry then starts again when the person walks in.
      </p>
      <p>
        Full CRM includes a simple website for that one campus. The public pages are the home page, the courses page, and the contact page. Staff change the wording from the CRM. Parents and visitors only see those pages. They do not see attendance, fees, or the WhatsApp inbox.
      </p>
      <h2 className="font-display text-2xl text-navy-950">What a visitor can do</h2>
      <p>
        A visitor reads the home page and the courses. On the contact page they can send a message. On Full CRM that message can be saved as an enquiry, because enquiries are on the same licence. It does not create a roll number by itself. Admission still has to approve the student, set the fee plan, and assign a batch. Until then, the person is a visitor. The old message stays on that mobile.
      </p>
      <p>
        This is not a full website builder. There is no separate blog, no online exam, and no live class on these pages. Homework, if you use it, is still given by the teacher inside the CRM. The public homework link is a different screen, and it needs the homework module, which starts on Academic Plus. The website itself needs Full CRM.
      </p>
      <p>
        The site belongs to the campus install. It is not taskbook.co.in, and it is not mixed with another school. One campus is one install. Your logo and your institute name are the ones staff set in the CRM. We do not host a hundred schools on one public website.
      </p>
      <h2 className="font-display text-2xl text-navy-950">What it does not replace</h2>
      <p>
        The office day is still the <Link href="/school-crm" className="font-semibold text-navy-950">school CRM</Link>: the call, the attendance, the fee, the homework, and the marks. A coaching centre should read <Link href="/institute-crm" className="font-semibold text-navy-950">institute CRM</Link> for the visit and the batch. A complaint after admission is a <Link href="/cases" className="font-semibold text-navy-950">case</Link>. A transfer certificate is on <Link href="/certificates" className="font-semibold text-navy-950">certificates</Link>, which is Full results and is quoted.
      </p>
      <p>
        Starter at ₹3,000 does not include this website. Academic Plus at ₹6,000 does not include it either. Full CRM is ₹10,000 a month. GST is extra. WhatsApp to parents is also on Full CRM, and Meta bills those messages separately. The website does not send those WhatsApp messages by itself.
      </p>
      <p>
        Prices are on <Link href="/pricing" className="font-semibold text-navy-950">pricing</Link>. If you want the home, courses, and contact pages on your own name, <Link href="/demo" className="font-semibold text-navy-950">book a demo</Link>. We set them with the people who will edit them.
      </p>
    </GuideArticle>
  );
}
