import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { JsonLd, MarkdownBody } from "@/components/MarkdownBody";
import { site } from "@/content/site";
import { getLocationBySlug, parseFaqs } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const row = await getLocationBySlug(slug, true);
  if (!row) return {};
  return pageMeta(row.metaTitle || row.headline, row.metaDescription, `/locations/${slug}`);
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const row = await getLocationBySlug(slug, true);
  if (!row) notFound();
  const faqs = parseFaqs(row.faqsJson);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Task Book",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${site.url}/demo`,
    },
    description: row.metaDescription,
    areaServed: row.city,
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <JsonLd data={appLd} />
      <article className="container-site max-w-3xl py-14">
        <p className="kicker">{row.city}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">{row.headline}</h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-700">{row.intro}</p>
        <div className="mt-10">
          <MarkdownBody source={row.body} />
        </div>
        {faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-navy-900">Questions</h2>
            <div className="mt-4 divide-y divide-navy-900/10 rounded-[1.4rem] bg-white px-5 ring-1 ring-navy-900/[0.06] sm:px-8">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none font-medium text-navy-900">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-navy-700">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
        <p className="mt-8 text-sm text-navy-700">
          Also see{" "}
          <Link href="/features" className="font-semibold text-navy-600">
            features
          </Link>
          ,{" "}
          <Link href="/blog" className="font-semibold text-navy-600">
            blog
          </Link>
          , and{" "}
          <Link href="/locations" className="font-semibold text-navy-600">
            other cities
          </Link>
          .
        </p>
        <DualCta className="mt-10" />
      </article>
      <CtaBanner title={`See Task Book for a ${row.city} campus.`} body="WhatsApp or book a demo. One install. Your data." />
    </>
  );
}
