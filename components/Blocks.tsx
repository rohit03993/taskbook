import { faqs } from "@/content/faqs";
import { modules } from "@/content/modules";
import { FeatureIcon } from "@/components/FeatureIcons";
import Link from "next/link";

export function FaqList() {
  return (
    <div className="divide-y divide-navy-900/10">
      {faqs.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="cursor-pointer list-none font-medium text-navy-900 marker:content-none">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span className="text-navy-600 group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy-700">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ModuleGrid() {
  const iconBySlug: Record<string, string> = {
    "whatsapp-inbox": "inbox",
    "whatsapp-attendance": "punch",
    "student-360": "search",
    leads: "visits",
    admissions: "roll",
    fees: "pdf",
    portal: "portal",
    exams: "exam",
    homework: "homework",
    reports: "reports",
    staff: "staff",
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {modules.map((m) => (
        <Link
          key={m.slug}
          href={`/features/${m.slug}`}
          className="group flex items-start gap-4 rounded-2xl px-1 py-4 hover:bg-navy-50"
        >
          <FeatureIcon name={iconBySlug[m.slug] ?? "search"} />
          <span>
            <span className="block font-medium text-navy-900 group-hover:text-navy-600">{m.nav}</span>
            <span className="mt-1 block text-sm text-navy-700">{m.title}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  body,
}: {
  kicker?: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-navy-700 sm:text-lg">{body}</p>
    </div>
  );
}
