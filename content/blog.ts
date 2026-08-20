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
      "How school owners stop the morning ‘has my child reached?’ calls by sending punch-in attendance on official WhatsApp.",
    date: "2026-08-12",
    readMinutes: 5,
    body: [
      "The first call of the day is rarely an emergency. It is a parent asking whether the child reached the gate. Your receptionist answers fifty of those before assembly is over.",
      "Task Book treats that as a software job. When the student punches in — biometric, face camera, or a teacher marking the batch present — the parent can get an official WhatsApp. The office phone stays free for the calls that actually need a human.",
      "This is not a personal staff number and a broadcast list. It is Meta WhatsApp from the same system that stores the student. If auto-send is on, present students are queued with the date and the batch name already filled.",
      "Staff attendance sits next to student attendance. You can know who is on campus without a paper register at the gate.",
      "Parents still call sometimes. That is fine. They call less when the punch already landed on their phone.",
    ],
  },
  {
    slug: "late-fee-reminder-whatsapp-schools",
    title: "Late fee reminder software for schools (WhatsApp)",
    description:
      "Why chasing dues on paper fails, and how daily WhatsApp fee reminders plus automatic late fees change collection.",
    date: "2026-08-13",
    readMinutes: 5,
    body: [
      "Most schools do not have a fee problem. They have a telling-the-parent problem. The due date passed. The ledger is correct. The parent says nobody informed them.",
      "Task Book accrues late fees on the rule you set — grace days, daily rate, switch off if you do not want new penalties. Existing unpaid late fees stay until they are paid or waived with a reason.",
      "Every morning the fee reminder job can send Meta-approved templates: student name, pending amount, due date, institute name. That is the message parents already trust, on the app they already open.",
      "The accountant still collects in the office, prints a receipt, and sees defaulters on a dashboard. WhatsApp does not replace the counter. It stops the surprise.",
      "If you also give parents a portal login, they can open the same dues later. WhatsApp is the nudge. The portal is the record.",
    ],
  },
  {
    slug: "school-crm-whatsapp-inbox-admissions",
    title: "School CRM with a WhatsApp inbox for admissions",
    description:
      "Stop running admissions from one counsellor’s personal phone. Shared inbox, named replies, call queue in the same software.",
    date: "2026-08-14",
    readMinutes: 6,
    body: [
      "Admissions WhatsApp on a personal phone looks fast until that counsellor is on leave. The parent is still typing. Nobody else can see the thread.",
      "Task Book puts the official WhatsApp inbox inside the CRM. Any staff with messaging access opens the same conversation. Each reply is tagged with the staff name. There is no chat lock. The next agent continues where the last one stopped.",
      "Calling sits beside chat. The counsellor works a queue, taps to dial, logs the call, and can send a WhatsApp after a connected call. The lead is not a name in a notebook and a chat in another app.",
      "Find student by mobile. If they are new, create the enquiry. If they already visited, you see the visits, the calls, and the messages on one profile.",
      "That is the conversion story for a college or coaching desk: the parent never starts over, and the owner can see who followed up.",
    ],
  },
  {
    slug: "student-profile-attendance-fees-marks",
    title: "Student profile software — attendance, fees, and marks in one place",
    description:
      "One click on a student should show the owner everything that used to live in three spreadsheets and a WhatsApp backup.",
    date: "2026-08-15",
    readMinutes: 5,
    body: [
      "Ask a class teacher for attendance, an accountant for pending fees, and a coordinator for last exam marks. You will wait. You will get three answers that do not agree.",
      "Task Book’s student profile is the one-click glimpse. Overview, documents, campus visits, calls, cases, certificates, WhatsApp messages, fees, receipts, attendance, homework, exams — tabs appear for the modules you have licensed.",
      "Front office finds the student by name or number. The same record is what the counsellor used yesterday and what the parent was messaged about this morning.",
      "This is not a ‘360 dashboard’ poster. It is the screen staff already work on. That is why owners use it in a meeting: open the child, stop arguing about whose Excel is right.",
      "If you only remember one Task Book habit, remember this: do not hunt modules. Hunt the student.",
    ],
  },
  {
    slug: "staff-attendance-system-schools",
    title: "Staff attendance system for schools",
    description:
      "Student punch is half the story. School owners also need staff IN/OUT, optionally on WhatsApp, without a separate HR product.",
    date: "2026-08-16",
    readMinutes: 4,
    body: [
      "Parents notice when a teacher is missing. Owners notice a week later, from gossip. A paper register at the gate is not a system.",
      "Task Book records staff attendance next to student attendance. Biometric and face punch can apply to both. Staff can get a WhatsApp on their own punch if you switch that on.",
      "Roles stay separate. A teacher marks their class. They do not need the fee waive screen. Super Admin still sees the login log and the punch report.",
      "You do not need a full payroll product to know who arrived. You need the same discipline you already demand from students.",
      "Pair this with live parent WhatsApp on student punch, and the campus story is complete: children and staff, both accounted for.",
    ],
  },
  {
    slug: "coaching-institute-admission-fee-software",
    title: "Coaching institute admission and fee software",
    description:
      "Enquiry, demo class, batch, and fee collection for institute owners — with WhatsApp campaigns when a due date hits.",
    date: "2026-08-17",
    readMinutes: 5,
    body: [
      "Coaching institutes do not fail on teaching first. They fail on follow-up. The parent visited. Nobody called. The fee for the demo batch is still ‘we will see’.",
      "Task Book is built for that loop: find student, enquiry, campus visit, convert to admission with a fee plan, put them in a batch, mark attendance, collect.",
      "Batch present can notify parents on WhatsApp. Fee reminders go on templates. Quick and bulk campaigns cover result day and the last week before an exam.",
      "Homework and tests exist without pretending you bought a full LMS. Upload marks from Excel when the test is done.",
      "The owner’s Saturday report should be an export, not a rebuild. That is the difference between software and a folder of sheets named final_final_3.",
    ],
  },
  {
    slug: "college-enquiry-calling-whatsapp",
    title: "College enquiry management with calling and WhatsApp",
    description:
      "Call queue, visit log, and a shared WhatsApp inbox so college admissions does not depend on one person’s phone.",
    date: "2026-08-18",
    readMinutes: 5,
    body: [
      "A college enquiry is a phone number, a course, and a promise to call back. If that lives in a counsellor’s WhatsApp, you have a person, not a process.",
      "Task Book gives admissions a call queue. Tap to dial, log connected or not, keep the student in the pipeline. After a connected call you can send a WhatsApp from the same software.",
      "Campus visits are status, not memory. Follow-ups are a list. Convert when the fee plan is agreed. Enrollment and roll number follow.",
      "The shared inbox means the evening shift can answer the parent the morning shift started. Replies show the staff name. You do not pretend the chat is locked to one hero counsellor.",
      "Fee defaulters after admission are the accounts team’s problem — with a dashboard, not a forwarded screenshot.",
    ],
  },
  {
    slug: "parent-portal-vs-whatsapp-updates",
    title: "Parent portal vs WhatsApp updates — why you need both",
    description:
      "WhatsApp is the alert. The portal is the record. School software that offers only one of them leaves a gap.",
    date: "2026-08-19",
    readMinutes: 5,
    body: [
      "WhatsApp is where parents already are. A punch at 8:42 AM belongs there. A fee reminder belongs there. If you only build a portal, half the parents will never open it in time.",
      "A portal is where they download a receipt, check last month’s attendance, or look at published marks without scrolling a chat. If you only use WhatsApp, the record is a message history you cannot audit.",
      "Task Book uses both, on purpose. Automations and the inbox run on official WhatsApp. The parent/student portal is a login — password or WhatsApp OTP — with the tabs that match the modules you licensed.",
      "They can install that portal as a home-screen app for your institute. It is not a public Play Store product for every school in the country. It is your school’s app.",
      "Owners who pick only chat look modern for a month. Owners who pick chat plus a record sleep during result week.",
    ],
  },
];

export function postBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
