import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Terms",
  "Terms for using the Task Book marketing website and requesting a demo.",
  "/terms",
);

export default function TermsPage() {
  return (
    <article className="container-site max-w-3xl py-14">
      <PageHero
        kicker="Legal"
        title="Terms"
        body="Using taskbook.co.in and sending a demo request means you agree to the notes below."
      />
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-navy-800">
        <p>
          This website describes {site.name} software for schools, colleges, and institutes. A demo or quote is not a
          licence. A licence starts when we set up your institute and you accept that agreement.
        </p>
        <p>
          Feature lists match the current product. We do not promise bus GPS, library, payroll, or live classes. WhatsApp
          is official Meta API; template approval is Meta’s process, not ours.
        </p>
        <p>
          Each customer is one install per institute unless a later written agreement says otherwise. Public prices are
          not listed; quotes depend on size and WhatsApp volume.
        </p>
        <p>Contact {site.email} for licence wording.</p>
      </div>
    </article>
  );
}
