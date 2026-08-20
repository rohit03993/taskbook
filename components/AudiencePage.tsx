import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { ModuleGrid } from "@/components/Blocks";
import { MockFindStudent, MockInbox, MockWhatsAppAttendance } from "@/components/ProductMocks";
import { audiences } from "@/content/audiences";
import { pageMeta } from "@/lib/seo";

function AudienceView({
  keyName,
  mock,
}: {
  keyName: keyof typeof audiences;
  mock: ReactNode;
}) {
  const a = audiences[keyName];
  return (
    <>
      <section className="container-site grid items-start gap-12 py-14 lg:grid-cols-2">
        <div>
          <p className="kicker">{a.label}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">{a.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">{a.intro}</p>
          <ul className="mt-6 space-y-2 text-sm text-navy-800">
            {a.points.map((p) => (
              <li key={p} className="border-l-2 border-navy-600 pl-3">
                {p}
              </li>
            ))}
          </ul>
          <DualCta className="mt-8" />
        </div>
        <div className="rounded-[1.6rem] bg-navy-50 p-4 sm:p-6">{mock}</div>
      </section>
      <section className="container-site pb-16">
        <h2 className="font-display text-2xl">Modules that matter on this campus</h2>
        <div className="mt-8">
          <ModuleGrid />
        </div>
      </section>
      <CtaBanner title={`See Task Book as a ${a.label.toLowerCase()} owner.`} body="WhatsApp or book a demo — same day." />
    </>
  );
}

export const schoolMeta: Metadata = pageMeta(
  "Task Book for schools",
  audiences.schools.intro,
  "/schools",
);

export function SchoolsPage() {
  return <AudienceView keyName="schools" mock={<MockWhatsAppAttendance />} />;
}

export const collegeMeta: Metadata = pageMeta(
  "Task Book for colleges",
  audiences.colleges.intro,
  "/colleges",
);

export function CollegesPage() {
  return <AudienceView keyName="colleges" mock={<MockInbox />} />;
}

export const instituteMeta: Metadata = pageMeta(
  "Task Book for institutes",
  audiences.institutes.intro,
  "/institutes",
);

export function InstitutesPage() {
  return <AudienceView keyName="institutes" mock={<MockFindStudent />} />;
}
