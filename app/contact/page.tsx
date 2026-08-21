import type { Metadata } from "next";
import { DemoForm } from "@/components/DemoForm";
import { DualCta } from "@/components/DualCta";
import { PageHero } from "@/components/Blocks";
import { whatsappHref } from "@/content/site";
import { getSettings } from "@/lib/settings";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Contact",
  "Talk to Task Book on WhatsApp or send a demo request.",
  "/contact",
);

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="container-site grid gap-12 py-14 lg:grid-cols-2">
      <div>
        <PageHero
          kicker="Contact"
          title="WhatsApp us, or send the form."
          body="Tell us city and institute size. We reply the same day."
        />
        <DualCta className="mt-8" />
        <p className="mt-8 text-sm text-navy-700">
          Email{" "}
          <a className="font-medium text-navy-900" href={`mailto:${settings.email}`}>
            {settings.email}
          </a>
        </p>
        <a
          className="mt-2 inline-block text-sm text-wa"
          href={whatsappHref(settings.whatsappMessage, settings.whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open WhatsApp chat
        </a>
      </div>
      <DemoForm />
    </div>
  );
}
