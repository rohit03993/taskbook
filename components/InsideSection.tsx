import Image from "next/image";
import Link from "next/link";
import { FeatureIcon } from "@/components/FeatureIcons";
import { FeatureScene, type SceneName } from "@/components/FeatureScenes";

const groups: {
  heading: string;
  note: string;
  tint: string;
  items: {
    slug: string;
    icon: SceneName;
    label: string;
    line: string;
    span: string;
    art: string;
    photo?: string;
    fit?: "cover" | "contain";
    tall?: boolean;
    focus?: "center" | "top";
  }[];
}[] = [
  {
    heading: "Keep parents in the loop",
    note: "They already have WhatsApp. Use it.",
    tint: "text-wa",
    items: [
      {
        slug: "whatsapp-attendance",
        icon: "punch",
        label: "Attendance WhatsApp",
        line: "Child punches in. Parent sees it.",
        span: "sm:col-span-2 lg:col-span-4",
        art: "bg-[#1a2a3a]",
        photo: "/inside/01-attendance.png",
        fit: "cover",
        tall: true,
      },
      {
        slug: "whatsapp-attendance",
        icon: "reminder",
        label: "Fee reminder",
        line: "Pending amount goes on the same number.",
        span: "sm:col-span-1 lg:col-span-2",
        art: "bg-[#d8efe8]",
        photo: "/inside/02-fee-reminder.png",
        fit: "contain",
        tall: true,
      },
      {
        slug: "portal",
        icon: "portal",
        label: "Parent login",
        line: "Receipt, attendance, homework — when they want a copy.",
        span: "sm:col-span-2 lg:col-span-6",
        art: "bg-[#d7e6f5]",
        photo: "/inside/03-parent-login.png",
        fit: "cover",
        tall: true,
      },
    ],
  },
  {
    heading: "Don’t lose the person",
    note: "Visitor, lead or student — one mobile number.",
    tint: "text-navy-600",
    items: [
      {
        slug: "whatsapp-inbox",
        icon: "inbox",
        label: "WhatsApp in the CRM",
        line: "Many staff logins. One Meta number. Chat stays.",
        span: "sm:col-span-2 lg:col-span-3",
        art: "bg-[#eef3ea]",
        photo: "/inside/04-inbox.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
      {
        slug: "student-360",
        icon: "search",
        label: "Type the number",
        line: "Student file or visitor file opens.",
        span: "sm:col-span-2 lg:col-span-3",
        art: "bg-[#e8eef6]",
        photo: "/inside/05-search.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
      {
        slug: "leads",
        icon: "visits",
        label: "Visits & calling",
        line: "Who they met, how many times, every call logged.",
        span: "sm:col-span-1 lg:col-span-3",
        art: "bg-[#eef2f7]",
        photo: "/inside/06-visits.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
      {
        slug: "admissions",
        icon: "roll",
        label: "Admission to roll",
        line: "Unique roll number. Batch assigned. History stays.",
        span: "sm:col-span-1 lg:col-span-3",
        art: "bg-[#f3eee6]",
        photo: "/inside/07-roll.png",
        fit: "cover",
        tall: true,
      },
    ],
  },
  {
    heading: "Let the office stop making Excel",
    note: "The software already has the number.",
    tint: "text-amber-700",
    items: [
      {
        slug: "fees",
        icon: "pdf",
        label: "Fee PDF",
        line: "Collect → View PDF / Download PDF.",
        span: "sm:col-span-2 lg:col-span-3",
        art: "bg-[#f4efe6]",
        photo: "/inside/08-fee-pdf.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
      {
        slug: "reports",
        icon: "reports",
        label: "Reports",
        line: "Download the list. Saturday is free.",
        span: "sm:col-span-2 lg:col-span-3",
        art: "bg-[#e8eef6]",
        photo: "/inside/09-reports.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
      {
        slug: "exams",
        icon: "exam",
        label: "Exams & marksheets",
        line: "Upload marks. Publish. PDF marksheet.",
        span: "lg:col-span-2",
        art: "bg-[#efeaf8]",
        photo: "/inside/10-exams.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
      {
        slug: "homework",
        icon: "homework",
        label: "Homework",
        line: "Done / not done. Send on WhatsApp if you want.",
        span: "lg:col-span-2",
        art: "bg-[#f8eef0]",
        photo: "/inside/11-homework.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
      {
        slug: "staff",
        icon: "staff",
        label: "Staff logins",
        line: "Each person logs in. Same WhatsApp number.",
        span: "lg:col-span-2",
        art: "bg-[#eef6f1]",
        photo: "/inside/12-staff.png",
        fit: "cover",
        tall: true,
        focus: "top",
      },
    ],
  },
];

export function InsideSection() {
  return (
    <div className="space-y-16">
      {groups.map((group, gi) => (
        <div key={group.heading}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${group.tint}`}>
                Job {String(gi + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-display text-2xl text-navy-900 sm:text-3xl">{group.heading}</h3>
            </div>
            <p className="max-w-xs text-sm text-navy-700">{group.note}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {group.items.map((item) => (
              <Link
                key={item.label}
                href={`/features/${item.slug}`}
                className={`group overflow-hidden rounded-[1.6rem] bg-white shadow-card ring-1 ring-navy-900/5 transition hover:-translate-y-0.5 hover:shadow-device ${item.span}`}
              >
                <div
                  className={`relative overflow-hidden ${item.art} ${
                    item.tall ? "h-52 sm:h-60 lg:h-64" : "h-40 sm:h-44"
                  }`}
                >
                  <div className="absolute inset-0 transition duration-500 group-hover:scale-[1.03]">
                    {item.photo ? (
                      <Image
                        src={item.photo}
                        alt={item.label}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={
                          item.fit === "contain"
                            ? "object-contain p-3"
                            : item.focus === "top"
                              ? "object-cover object-top"
                              : "object-cover object-center"
                        }
                      />
                    ) : (
                      <FeatureScene name={item.icon} />
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 px-5 py-4">
                  <FeatureIcon name={item.icon} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-navy-900">{item.label}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-navy-700">{item.line}</span>
                  </span>
                  <span className="mt-2 shrink-0 text-navy-400 transition group-hover:translate-x-0.5 group-hover:text-navy-600">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
