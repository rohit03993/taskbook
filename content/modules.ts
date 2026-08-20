export type ModulePage = {
  slug: string;
  nav: string;
  title: string;
  pain: string;
  does: string;
  bullets: string[];
  whatsappWhen: string;
  featured?: boolean;
};

export const modules: ModulePage[] = [
  {
    slug: "whatsapp-inbox",
    nav: "WhatsApp inside the CRM",
    title: "Chat from the CRM. Not from one person’s phone.",
    pain: "Today the institute WhatsApp is on one counsellor’s mobile. If they are on leave, nobody can see the parent messages. If they leave the job, the history walks out with them.",
    does: "Task Book uses one Meta-approved WhatsApp number for your institute. Staff log in to the CRM and chat from there. Many logins, same number. Every reply shows the staff name. The chat stays in the software forever — not on a personal phone.",
    bullets: [
      "Official Meta WhatsApp — as per Meta rules, one business number for the institute.",
      "Any staff with login can open the same chat and continue.",
      "Call the lead from the CRM, then keep talking on WhatsApp in the same file.",
    ],
    whatsappWhen: "This is the inbox itself. Attendance, fee reminders and campaigns also use this same number.",
    featured: true,
  },
  {
    slug: "whatsapp-attendance",
    nav: "Attendance & fee WhatsApp",
    title: "Child punches in — parent gets WhatsApp. Fee pending — parent gets a reminder.",
    pain: "Parents call: has my child reached? Why is fee pending? You cannot sit on the phone all morning.",
    does: "When attendance is marked (machine, face camera, or teacher), the parent can get a WhatsApp. Fee reminders go the same way, on approved templates. Staff punch can also notify staff.",
    bullets: [
      "Live attendance message to the parent.",
      "Fee reminder with pending amount and due date.",
      "Staff IN/OUT can also go on WhatsApp.",
    ],
    whatsappWhen: "These messages go from your Meta-approved institute number, not from a personal group.",
    featured: true,
  },
  {
    slug: "student-360",
    nav: "Type the mobile number",
    title: "Enter the mobile number. The full file opens.",
    pain: "Staff ask three people for one student. Fees in one place, attendance in another, WhatsApp on a phone. A visitor who came last month is a new face every time.",
    does: "Any staff with login types the registered mobile. If they are a student, you see visits, complaints, attendance, fees, receipts, WhatsApp, homework and exams. If they are still a visitor or lead, you see visits, whom they met, the talk, and how many times you called.",
    bullets: [
      "One search: student or visitor — the number decides.",
      "Parent visits and live grievances stay on the student file.",
      "Find student is the fastest screen at the front desk.",
    ],
    whatsappWhen: "The Messages tab is the same WhatsApp chat as the inbox. Nothing is on a personal phone.",
    featured: true,
  },
  {
    slug: "leads",
    nav: "Leads, visits & calling",
    title: "Every visit, every call, every meeting — stored on that person.",
    pain: "A parent visits twice. Third time, staff ask the same questions. Nobody knows whom they met last time, or how many times the team already called.",
    does: "This is a visitor system plus a calling CRM. Walk-in is logged: who they met, why they came, what was said. Assigned calling list, call log, follow-up. When they take admission, they get a roll number and a batch. Old visits do not disappear.",
    bullets: [
      "See first-time visitors and people who came again.",
      "Call queue — log the call so the next staff can see it.",
      "Convert to student: unique roll number, batch assigned.",
    ],
    whatsappWhen: "After a connected call you can send WhatsApp from the CRM. The chat stays with the same person.",
  },
  {
    slug: "admissions",
    nav: "Admission to roll number",
    title: "Lead becomes a student. Roll number and batch in the same step.",
    pain: "Admission is a pile of forms. Roll number is given later. Batch is a separate list. The visit history is already lost.",
    does: "Convert the enquiry with a fee plan. Approve admission. Unique roll number. Assign the batch. That person is now an enrolled student — same mobile, same visit history.",
    bullets: [
      "Fee plan is set at conversion.",
      "Roll number is unique. Batch is assigned here.",
      "From this day, attendance and fees sit on this student.",
    ],
    whatsappWhen: "Follow-up after visit or call can go on WhatsApp from the same file.",
  },
  {
    slug: "fees",
    nav: "Fees, slips & late fees",
    title: "Collect fees. System generates the PDF receipt. Remind on WhatsApp if pending.",
    pain: "Slips are written by hand. Late fee is guessed. Parent says nobody told them.",
    does: "Collect in the office. Task Book generates the fee receipt PDF — institute name, receipt number, amount in words — same as the live CRM. Staff click View PDF or Download PDF. Late fee follows your rule. Daily WhatsApp reminder can go to the parent.",
    bullets: [
      "Fee receipt PDF is generated after collection — not handwritten.",
      "View PDF and Download PDF from the student Receipts tab.",
      "Late fee reminder on WhatsApp.",
    ],
    whatsappWhen: "Fee reminder uses the same Meta number as attendance and the inbox.",
  },
  {
    slug: "portal",
    nav: "Parent & student login",
    title: "Parents can also open fees, attendance and homework in a login.",
    pain: "WhatsApp is fast, but parents still ask for last month’s receipt or attendance copy.",
    does: "Parent or student logs in with password or WhatsApp OTP. Same mobile can switch children. They can add this as a home-screen app for your institute.",
    bullets: [
      "Receipts, attendance, homework, published marks.",
      "Complaints / cases can sit on the student, not only in a group.",
      "No Play Store app for the whole country — this is your institute login.",
    ],
    whatsappWhen: "WhatsApp for the instant update. Login for the copy they can download later.",
  },
  {
    slug: "exams",
    nav: "Exams & marksheets",
    title: "Marks in Excel. Result when you say publish. Marksheet as PDF.",
    pain: "Marks live in a teacher’s sheet. Result day is a rush. Parent is not told.",
    does: "Create the exam, upload marks, check, then publish. PDF marksheets with your institute name.",
    bullets: [
      "Upload from Excel.",
      "Publish only when you are ready.",
      "Parent can see published marks on the login.",
    ],
    whatsappWhen: "You can notify on WhatsApp after results are published.",
  },
  {
    slug: "homework",
    nav: "Homework",
    title: "Give homework. Mark done or not done. Send on WhatsApp if you want.",
    pain: "Homework is on the board or in a group that one teacher owns.",
    does: "Teacher assigns, attaches file, ticks done / not done. Parent can get a WhatsApp with a link.",
    bullets: [
      "Class-wise homework with file.",
      "Review for the coordinator.",
      "Not-done can be reminded.",
    ],
    whatsappWhen: "Homework WhatsApp uses the same institute number.",
  },
  {
    slug: "reports",
    nav: "Reports",
    title: "Reports come out of the system. You do not make Excel on Saturday.",
    pain: "Owner asks for a list. Staff spend half a day making a sheet.",
    does: "Reports for attendance, fees, admissions, calling — download Excel, CSV or PDF. Filter date and batch first.",
    bullets: [
      "Owner reports without rebuilding a file.",
      "Call report for the telecalling team.",
      "Fee collection and pending lists.",
    ],
    whatsappWhen: "Parents already got the daily update on WhatsApp. Reports are for you.",
  },
  {
    slug: "staff",
    nav: "Staff logins",
    title: "Every staff member gets a login. Same WhatsApp number. Different work.",
    pain: "One shared password, or WhatsApp on one phone. Both are a problem.",
    does: "Counsellor, admission, accountant, teacher, messaging — each gets a login. They type a mobile and work. WhatsApp chats use the institute Meta number. Staff attendance is also here.",
    bullets: [
      "Many logins. One Meta-approved WhatsApp number.",
      "Teacher does not need the fee waive screen.",
      "Staff punch in and out, like students.",
    ],
    whatsappWhen: "Inbox is for the people who talk to parents. API keys stay with the owner.",
  },
];

export function moduleBySlug(slug: string) {
  return modules.find((m) => m.slug === slug);
}

export const featureHubExtras = [
  {
    title: "Complaints / cases",
    body: "A grievance stays on the student. Open, give to another staff, close. Not lost in a group chat.",
  },
  {
    title: "Certificates",
    body: "TC, bonafide, character, fee certificate — PDF with your letterhead.",
  },
  {
    title: "Your institute website",
    body: "Simple public site for the school — home, courses, contact. Separate from this Task Book site.",
  },
  {
    title: "Biometric, face, gate screen",
    body: "Machine or face camera for punch. A TV at the gate can show the latest punch with photo.",
  },
] as const;
