export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "live-school-attendance-on-whatsapp",
    title: "Live school attendance on WhatsApp for parents",
    description:
      "A biometric, face, or teacher punch is stored on Starter. The parent WhatsApp is a Meta template on the Full CRM licence, from the institute number.",
    date: "2026-08-12",
    readMinutes: 6,
    body: [
      "When a student punches in, Task Book can send the parent a WhatsApp from the institute’s Meta-approved number. Recording attendance is on the Starter licence at ₹3,000 a month. Sending that WhatsApp needs the Full CRM licence at ₹10,000 a month, and Meta has to approve the template first.",
      "## What the parent receives",
      "The template can carry the student name, the date, and the batch. It is not a text from a teacher’s personal phone, and it is not a broadcast list saved on that phone. A staff punch can send a separate WhatsApp if you turn that on.",
      "## What has to be true first",
      "The parent mobile has to be stored on the student. The punch can come from a biometric machine, a face camera, or a teacher marking the batch. Turning attendance off hides the screen and keeps the punches already stored.",
      "## What this does not do",
      "Task Book does not include bus tracking. A parent who still calls can be answered from the student file, because the punch is already on that child. Book a demo if you want to see the punch and the message on one screen.",
    ],
  },
  {
    slug: "late-fee-reminder-whatsapp-schools",
    title: "Late fee reminder software for schools (WhatsApp)",
    description:
      "Academic Plus generates the fee PDF and applies your late-fee rule. The daily WhatsApp reminder needs the Full CRM licence and a Meta-approved template.",
    date: "2026-08-13",
    readMinutes: 6,
    body: [
      "Academic Plus, ₹6,000 a month, collects the fee in the office and generates the PDF receipt: institute name, receipt number, and amount in words. Late fee follows the rule you set, including grace days and a daily rate. The WhatsApp that tells the parent the pending amount is on the Full CRM licence, not on Academic Plus alone.",
      "## What the reminder contains",
      "The approved template uses the student name, the pending amount, the due date, and the institute name. It goes from the same Meta number as the inbox. It does not replace the counter. Staff still take the payment and open View PDF or Download PDF on the student file.",
      "## What stays in your control",
      "You can stop new penalties. Amounts already pending stay until they are paid or waived with a reason. A mistaken receipt is not deleted: the latest payment can be sent to the owner to cancel, which voids the receipt and reverses the ledger entry.",
      "## Portal copy",
      "If the Full CRM portal is also on, the parent can open the same dues and download the receipt later. WhatsApp is the nudge. The login is the record. Online payment inside the fee screen is not part of this product yet.",
    ],
  },
  {
    slug: "school-crm-whatsapp-inbox-admissions",
    title: "School CRM with a WhatsApp inbox for admissions",
    description:
      "Full CRM keeps the institute WhatsApp in the software. Any staff login with access can continue the thread, and the reply shows their name.",
    date: "2026-08-14",
    readMinutes: 6,
    body: [
      "On the Full CRM licence, the institute’s Meta WhatsApp number lives inside Task Book. A counsellor on leave does not take the chat with them. The next person with inbox access opens the same thread and replies. The parent still sees the institute number. The reply shows the staff name. There is no chat lock.",
      "## Calling sits on the same person",
      "The call queue is in the CRM. Staff dial, log whether the call connected, and can send a WhatsApp after a connected call. The visit, the call, and the chat stay on that mobile number. This is not a separate dialer, and Task Book does not include a predictive dialer.",
      "## From enquiry to roll number",
      "Find the person by mobile. If they are new, the enquiry is created. If they already visited, you see the earlier visits. Admission sets the fee plan, approves them, gives a unique roll number, and assigns a batch. The old visits do not disappear.",
      "## What the owner can see",
      "The owner can open the same file in a meeting. API keys for WhatsApp stay with the owner, not on a staff phone. One campus is one install. Another school’s chats are not in this database.",
    ],
  },
  {
    slug: "student-profile-attendance-fees-marks",
    title: "Student profile software — attendance, fees, and marks in one place",
    description:
      "Type the registered mobile. The enrolled student file is on every licence. Visitor history, fees, WhatsApp, and exams appear only for the modules that are turned on.",
    date: "2026-08-15",
    readMinutes: 6,
    body: [
      "Staff type the registered mobile. If that person is an enrolled student, the file opens on every Task Book licence. If they are still a visitor or a lead, the visits and calls open on the Full CRM licence. Tabs for fees, WhatsApp, homework, and exams show only when that module is on.",
      "## What one file can hold",
      "The profile is the working screen: documents, visits, calls, cases, certificates, messages, fees, receipts, attendance, homework, and exams. A case stays on the student until it is transferred or closed. Certificates — TC, bonafide, character, and fee — are the Full results licence, which is quoted, not part of the ₹10,000 Full CRM pack.",
      "## Marks and the receipt",
      "Marks and exam windows, including an Excel upload, are on Starter. The PDF receipt is on Academic Plus. Publishing the result and the marksheet PDF is Full results. Staff do not keep a second Excel as the source of truth after the number is in the file.",
      "## One campus",
      "This file is for your institute only. Task Book does not put many schools in one shared production database. Search the student. Do not hunt through separate apps for the same child.",
    ],
  },
  {
    slug: "staff-attendance-system-schools",
    title: "Staff attendance system for schools",
    description:
      "Starter records staff IN and OUT next to student attendance, from a machine, a face camera, or a manual mark. A WhatsApp on that punch needs Full CRM.",
    date: "2026-08-16",
    readMinutes: 5,
    body: [
      "Starter records staff attendance beside student attendance. The punch can come from a biometric machine, a face camera, or a manual mark. A WhatsApp about that staff punch needs the Full CRM licence and an approved template. You do not buy a separate HR product to know who reached campus.",
      "## Logins are not one shared password",
      "Every licence gives each staff member their own login. A teacher can mark a class without seeing the fee-waiver screen. The owner still sees the punch report. Staff attendance is the same Starter module as student attendance.",
      "## What is not included",
      "Payroll, leave balances, and a full HR suite are not in Task Book. The useful question this screen answers is who is in and who is out. Pair it with the parent WhatsApp on a student punch when Full CRM is on, and both the child and the staff member are on the record.",
    ],
  },
  {
    slug: "coaching-institute-admission-fee-software",
    title: "Coaching institute admission and fee software",
    description:
      "A coaching desk uses Full CRM for the visit and the call, Academic Plus for the fee PDF and homework, and Starter for batch attendance and marks.",
    date: "2026-08-17",
    readMinutes: 6,
    body: [
      "A coaching enquiry is a visit, a call, and then a batch. Full CRM logs the walk-in: who they met and what they asked. The call queue records the follow-up. Admission sets a fee plan, a unique roll number, and a batch, and keeps the earlier visits on the same mobile.",
      "## Fees, homework, and marks",
      "Academic Plus generates the fee receipt PDF and holds homework with a file, marked done or not done. Starter holds batch attendance and marks uploaded from Excel. A WhatsApp for a due date or a homework link needs the Full CRM licence. This is not an online-exam or live-class product.",
      "## The Saturday list",
      "Full CRM exports attendance, fees, admissions, and calls to Excel, CSV, or PDF after you filter the date and the batch. Teacher tracking, also on Academic Plus, stores the course plan and the section progress the academic head finalizes. Parents see topics on the portal when that licence is on. They do not see internal notes.",
    ],
  },
  {
    slug: "college-enquiry-calling-whatsapp",
    title: "College enquiry management with calling and WhatsApp",
    description:
      "Full CRM gives a college a call queue, a visit log, and one Meta WhatsApp inbox. The evening shift continues the thread the morning shift started.",
    date: "2026-08-18",
    readMinutes: 6,
    body: [
      "A college enquiry in Task Book is a mobile number, a course, and a follow-up on the Full CRM licence. The call queue is the list. Staff log a connected call or a missed one. After a connected call they can send WhatsApp from the same file, on the institute Meta number.",
      "## The shift change",
      "The inbox is shared. The evening shift sees the thread the morning shift started. The reply shows the staff name. The chat is not locked to one counsellor, and it does not sit on a personal phone.",
      "## After they join",
      "Campus visits have a status. Admission approves the fee plan, assigns a roll number and a batch, and keeps the enquiry history. Fee defaulters are on the fee dashboard once Academic Plus is on. The WhatsApp reminder for that pending amount needs Full CRM. Task Book does not add a second database for the college and the school wing. One campus is one install.",
    ],
  },
  {
    slug: "parent-portal-vs-whatsapp-updates",
    title: "Parent portal vs WhatsApp updates — why you need both",
    description:
      "Full CRM sends the instant WhatsApp and also gives a parent login for the receipt, attendance, homework, and published marks.",
    date: "2026-08-19",
    readMinutes: 6,
    body: [
      "The Full CRM licence includes both. WhatsApp is the message the parent already knows how to open: a punch, a fee reminder, or a reply from the shared inbox. The portal is the login where they download the receipt or check last month without scrolling a chat.",
      "## How they sign in",
      "The parent or student signs in with a password or a WhatsApp OTP. One mobile can switch between children. The home-screen icon is for your institute. It is not a public app store listing for every school in the country.",
      "## What each tab depends on",
      "Attendance on the portal needs the attendance module. The receipt needs fees. Homework needs homework. Published marks need the Full results licence as well as the portal. A module that is off is hidden. The data stays.",
      "## What to skip",
      "A portal with no WhatsApp means many parents never open it the morning of the punch. WhatsApp with no login means the receipt lives only as a chat bubble. Task Book keeps the alert and the record on the same campus install.",
    ],
  },
];

export function postBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
