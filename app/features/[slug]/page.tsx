import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DualCta, CtaBanner } from "@/components/DualCta";
import { MockForSlug } from "@/components/ProductMocks";
import { getResolvedModule } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const mod = await getResolvedModule(slug);
  if (!mod) return {};
  return pageMeta(mod.nav, mod.pain, `/features/${slug}`);
}

export default async function FeaturePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const mod = await getResolvedModule(slug);
  if (!mod) notFound();

  return (
    <>
      <article className="container-site grid items-start gap-12 py-14 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-600">{mod.nav}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">{mod.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-navy-700">{mod.pain}</p>
          <p className="mt-4 text-base leading-relaxed text-navy-800">{mod.does}</p>
          <ul className="mt-6 space-y-2 text-sm text-navy-800">
            {mod.bullets.map((b) => (
              <li key={b} className="border-l-2 border-navy-600 pl-3">
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-navy-50 px-4 py-3 text-sm text-navy-800">{mod.whatsappWhen}</p>
          <DualCta className="mt-8" />
        </div>
        <MockForSlug slug={mod.slug} />
      </article>
      <CtaBanner title="Want this on your campus?" body="We set up your institute. You keep the data." />
    </>
  );
}
