import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { CtaBanner } from "@/components/DualCta";
import { InsideSection } from "@/components/InsideSection";
import { featureHubExtras } from "@/content/modules";
import { getFeatureHubContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getFeatureHubContent();
  return pageMeta("Features", hub.body, "/features");
}

export default async function FeaturesPage() {
  const hub = await getFeatureHubContent();

  return (
    <>
      <section className="container-site py-14">
        <PageHero kicker={hub.kicker} title={hub.title} body={hub.body} />
        <div className="mt-14">
          <InsideSection />
        </div>
        <h2 className="mt-16 font-display text-2xl text-navy-900">Also in the product</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureHubExtras.map((x) => (
            <div key={x.title} className="rounded-[1.4rem] bg-white p-5 ring-1 ring-navy-900/[0.06]">
              <p className="font-medium text-navy-900">{x.title}</p>
              <p className="mt-2 text-sm text-navy-700">{x.body}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner title="Pick a module. We will open it on a demo." body="WhatsApp or the form — both reach us the same day." />
    </>
  );
}
