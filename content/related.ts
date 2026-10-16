export type ReadLink = { href: string; label: string; note: string };

const crm: ReadLink = {
  href: "/school-crm",
  label: "School CRM",
  note: "Attendance, fees, homework and marks on one student. WhatsApp only when you switch it on.",
};
const institute: ReadLink = {
  href: "/institute-crm",
  label: "Institute CRM",
  note: "Visit, call, batch, fee and homework for a coaching institute.",
};
const pricing: ReadLink = {
  href: "/pricing",
  label: "School CRM pricing",
  note: "Starter ₹3,000, Academic Plus ₹6,000, Full CRM ₹10,000. GST extra.",
};
const features: ReadLink = {
  href: "/features",
  label: "School CRM features",
  note: "The student file, WhatsApp, fees, homework, marks, and staff logins.",
};
const blog: ReadLink = {
  href: "/blog",
  label: "School CRM guides",
  note: "Short notes on attendance, fees, admissions, and the parent login.",
};

const feature = (slug: string, label: string, note: string): ReadLink => ({
  href: `/features/${slug}`,
  label,
  note,
});
const post = (slug: string, label: string, note: string): ReadLink => ({
  href: `/blog/${slug}`,
  label,
  note,
});

const file = feature("student-360", "Student file", "Search by name, roll, or registered mobile.");
const attendance = feature("whatsapp-attendance", "School attendance software", "Present, absent, or on leave. Parent WhatsApp only if you turn it on.");
const fees = feature("fees", "School fee management software", "The receipt is on Academic Plus. The WhatsApp reminder needs Full CRM.");
const homework = feature("homework", "School homework software", "Opened is the link. Done is a separate mark by staff.");
const marks = feature("exams", "School exam software", "Marks start on Starter. The PDF marksheet is Full results.");
const inbox = feature("whatsapp-inbox", "School WhatsApp CRM", "Many staff logins. Parents still see one institute number.");
const leads = feature("leads", "Enquiry and calling", "The visit and the call stay on that mobile. Full CRM.");
const admissions = feature("admissions", "Admission to roll number", "The old visits stay after the student gets a roll number.");
const portal = feature("portal", "Parent login", "The receipt and the record. WhatsApp is the alert.");
const staff = feature("staff", "Staff logins", "Each person has a login. The WhatsApp number stays the institute’s.");
const tracking = feature("teacher-tracking", "Teacher tracking", "Course plan and class progress. Academic Plus. Not a sold score.");
const cases: ReadLink = {
  href: "/cases",
  label: "Cases",
  note: "A complaint stays on the enrolled student. Full CRM. Open, assign, close.",
};
const certificates: ReadLink = {
  href: "/certificates",
  label: "Certificates",
  note: "TC, bonafide, character, birth, and fee certificate. Full results.",
};
const website: ReadLink = {
  href: "/institute-website",
  label: "Institute website",
  note: "Home, courses, and contact for one campus. Full CRM.",
};

export const featureSeoTitle: Record<string, string> = {
  "whatsapp-inbox": "School WhatsApp CRM",
  "whatsapp-attendance": "School attendance software",
  "student-360": "Student information system",
  leads: "School enquiry and calling CRM",
  admissions: "School admission software",
  fees: "School fee management software",
  portal: "Parent login for a school",
  exams: "School exam and marksheet software",
  homework: "School homework software",
  reports: "School CRM reports",
  staff: "Staff logins for a school CRM",
  "teacher-tracking": "Teacher tracking for schools",
};

const byPath: Record<string, ReadLink[]> = {
  "/school-crm": [institute, cases, certificates, website, file, attendance, fees, homework, marks, inbox, pricing, blog],
  "/institute-crm": [crm, cases, certificates, website, admissions, fees, homework, leads, pricing],
  "/cases": [crm, institute, file, leads, pricing],
  "/certificates": [crm, institute, marks, file, pricing],
  "/institute-website": [crm, institute, leads, pricing],
  "/features": [crm, institute, cases, certificates, website, pricing, blog],
  "/pricing": [crm, institute, inbox, fees, homework],
  "/blog": [crm, institute, features, pricing],
  "/about": [crm, institute, features, pricing],
  "/features/whatsapp-inbox": [crm, institute, leads, staff, post("school-crm-whatsapp-inbox-admissions", "WhatsApp inbox for admissions", "One number. The next shift continues the thread.")],
  "/features/whatsapp-attendance": [crm, fees, file, post("live-school-attendance-on-whatsapp", "Live attendance on WhatsApp", "The punch is stored first. The message is a switch.")],
  "/features/student-360": [crm, cases, fees, marks, institute, post("student-profile-attendance-fees-marks", "One student profile", "Attendance, fees, and marks on the same file.")],
  "/features/leads": [crm, institute, website, admissions, inbox],
  "/features/admissions": [crm, leads, file, institute],
  "/features/fees": [crm, institute, attendance, pricing, post("late-fee-reminder-whatsapp-schools", "Fee reminders", "The PDF receipt, then the WhatsApp if Full CRM is on.")],
  "/features/portal": [crm, inbox, fees, homework, post("parent-portal-vs-whatsapp-updates", "Portal and WhatsApp", "The alert and the record are both on Full CRM.")],
  "/features/exams": [crm, certificates, institute, file, pricing, homework],
  "/features/homework": [crm, institute, fees, tracking, marks],
  "/features/reports": [crm, fees, attendance, pricing],
  "/features/staff": [crm, inbox, attendance, post("staff-attendance-system-schools", "Staff attendance", "Who reached campus, on the same Starter module.")],
  "/features/teacher-tracking": [crm, homework, institute],
  "/blog/live-school-attendance-on-whatsapp": [crm, attendance, file, pricing],
  "/blog/late-fee-reminder-whatsapp-schools": [crm, fees, institute, pricing],
  "/blog/school-crm-whatsapp-inbox-admissions": [crm, inbox, leads, admissions, institute],
  "/blog/student-profile-attendance-fees-marks": [crm, file, fees, marks, institute],
  "/blog/staff-attendance-system-schools": [crm, staff, attendance],
  "/blog/coaching-institute-admission-fee-software": [institute, crm, admissions, fees, homework],
  "/blog/college-enquiry-calling-whatsapp": [crm, institute, leads, inbox],
  "/blog/parent-portal-vs-whatsapp-updates": [crm, portal, inbox, pricing],
};

export function linksFor(path: string): ReadLink[] {
  return byPath[path] ?? [crm, features, pricing];
}
