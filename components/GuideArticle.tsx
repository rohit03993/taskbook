import type { ReactNode } from "react";
import Link from "next/link";
import { CtaBanner } from "@/components/DualCta";
import { JsonLd } from "@/components/MarkdownBody";
import { RelatedLinks } from "@/components/RelatedLinks";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/schema";

export function GuideArticle({
  path,
  kicker,
  title,
  description,
  faqs,
  children,
}: {
  path: string;
  kicker: string;
  title: string;
  description: string;
  faqs: readonly { q: string; a: string }[];
  children: ReactNode;
}) {
  const url = absoluteUrl(path);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: title, item: url },
              ],
            },
            {
              "@type": "WebPage",
              name: title,
              url,
              description,
              isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }}
      />
      <article className="container-site max-w-3xl py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-navy-700">
          <Link href="/" className="font-semibold text-navy-900">Home</Link>
          <span aria-hidden> / </span>
          <span>{kicker}</span>
        </nav>
        <h1 className="mt-6 font-display text-4xl leading-tight text-navy-950 sm:text-[2.6rem]">{title}</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-800">{children}</div>
        <h2 className="mt-12 font-display text-2xl text-navy-950">Questions people ask</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((item) => (
            <div key={item.q}>
              <h3 className="font-semibold text-navy-950">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-800">{item.a}</p>
            </div>
          ))}
        </div>
      </article>
      <RelatedLinks path={path} title="Related pages" />
      <CtaBanner title="Book a demo on your own campus." body="We sit with your staff. Your students stay with you." />
    </>
  );
}
