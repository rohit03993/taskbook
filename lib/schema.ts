import { plans } from "@/content/plans";
import { site } from "@/content/site";

/** Real content date. Do not replace this with `new Date()` on each request. */
export const contentUpdated = new Date("2026-10-16T00:00:00.000Z");

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationLd(logoPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl(logoPath),
    email: site.email,
    description: site.pitch,
    areaServed: "IN",
  };
}

/** Prices must match the numbers printed on /pricing. Full results is quoted, so it is omitted. */
export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${site.url}/pricing`,
    description:
      "School, college, and institute software. Starter is attendance and marks. Academic Plus adds fees, homework, and teacher tracking. Full CRM adds leads, calling, admission, WhatsApp, the parent login, reports, and the institute website. One campus is one install.",
    offers: plans
      .filter((plan) => plan.price)
      .map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price.replace(/[^\d]/g, ""),
        priceCurrency: "INR",
        description: plan.blurb,
        url: `${site.url}/pricing`,
      })),
  };
}
