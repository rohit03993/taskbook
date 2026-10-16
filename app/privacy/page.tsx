import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Privacy",
  "How Task Book handles demo enquiries and institute data.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <article className="container-site max-w-3xl py-14">
      <PageHero
        kicker="Legal"
        title="Privacy"
        body="This page covers the public Task Book website. Your live school install has its own data, on that institute."
      />
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-navy-800">
        <p>
          Demo forms collect name, mobile, institute, type, city, student count, and the headache you selected. We use
          that to call or WhatsApp you about Task Book. We do not sell those leads.
        </p>
        <p>
          Those leads are stored in this website’s database. If a webhook is set, the same fields are posted there. If
          mail is configured on the server, a copy is emailed to the sales inbox. We do not keep a separate leads file.
        </p>
        <p>
          School student data — attendance, fees, WhatsApp threads — lives on the institute install, not on this
          marketing site. We do not mix campuses in one shared production database.
        </p>
        <p>
          Questions: {site.email} or WhatsApp from this site.
        </p>
      </div>
    </article>
  );
}
