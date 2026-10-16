import Link from "next/link";

const groups = [
  {
    heading: "Keep parents in the loop",
    note: "They already have WhatsApp. Use it.",
    items: [
      { slug: "whatsapp-attendance", label: "Attendance WhatsApp", line: "Child punches in. Parent sees it." },
      { slug: "whatsapp-attendance", label: "Fee reminder", line: "Pending amount goes on the same number." },
      { slug: "portal", label: "Parent login", line: "Receipt, attendance, homework — when they want a copy." },
    ],
  },
  {
    heading: "Don’t lose the person",
    note: "Visitor, lead or student — one mobile number.",
    items: [
      { slug: "whatsapp-inbox", label: "WhatsApp in the CRM", line: "Many staff logins. One Meta number. Chat stays." },
      { slug: "student-360", label: "Type the number", line: "Student file or visitor file opens." },
      { slug: "leads", label: "Visits and calling", line: "Who they met, how many times, every call logged." },
      { slug: "admissions", label: "Admission to roll", line: "Unique roll number. Batch assigned. History stays." },
    ],
  },
  {
    heading: "Let the office stop making Excel",
    note: "The software already has the number.",
    items: [
      { slug: "fees", label: "Fee PDF", line: "Collect, then View PDF or Download PDF." },
      { slug: "reports", label: "Reports", line: "Download the list. Saturday is free." },
      { slug: "exams", label: "Exams and marksheets", line: "Upload marks. Publish. PDF marksheet." },
      { slug: "homework", label: "Homework", line: "Done or not done. Send on WhatsApp if you want." },
      { slug: "staff", label: "Staff logins", line: "Each person logs in. Same WhatsApp number." },
    ],
  },
] as const;

export function InsideSection() {
  return (
    <div className="mt-8 divide-y divide-navy-900/10 border-y border-navy-900/10">
      {groups.map((group) => (
        <section key={group.heading} className="py-8 first:pt-0 last:pb-0">
          <h3 className="font-display text-xl text-navy-900">{group.heading}</h3>
          <p className="mt-1 text-sm text-navy-700">{group.note}</p>
          <ul className="mt-4 divide-y divide-navy-900/[0.06]">
            {group.items.map((item) => (
              <li key={item.label}>
                <Link
                  href={`/features/${item.slug}`}
                  className="flex min-h-14 items-center justify-between gap-4 py-3"
                >
                  <span>
                    <span className="block text-[15px] font-medium text-navy-900">{item.label}</span>
                    <span className="mt-0.5 block text-sm text-navy-700">{item.line}</span>
                  </span>
                  <span className="shrink-0 text-navy-400" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
