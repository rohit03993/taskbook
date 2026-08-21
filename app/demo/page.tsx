import type { Metadata } from "next";
import { DemoForm } from "@/components/DemoForm";
import { PageHero } from "@/components/Blocks";
import { MockFindStudent, MockInbox } from "@/components/ProductMocks";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Book a demo",
  "Name, institute, city. We call or chat on WhatsApp the same day.",
  "/demo",
);

export default function DemoPage() {
  return (
    <div className="container-site grid gap-8 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14">
      <div>
        <PageHero
          kicker="Demo"
          title="We will open the same screens your staff will use."
          body="Bring your real problem: WhatsApp on one phone, a visitor nobody remembers, or parents calling for attendance and fees. We type a number, open a chat, show a fee PDF."
        />
        <div className="mt-10 hidden gap-6 lg:grid">
          <MockInbox />
          <MockFindStudent />
        </div>
      </div>
      <DemoForm />
    </div>
  );
}
