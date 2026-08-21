import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/DualCta";
import { PageHero } from "@/components/Blocks";
import { listLocations } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta(
  "School software by city",
  "Task Book for schools, colleges and institutes — city pages with local wording. One campus per install.",
  "/locations",
);

export default async function LocationsIndexPage() {
  const rows = await listLocations({ publishedOnly: true });

  return (
    <>
      <section className="container-site py-14">
        <PageHero
          kicker="Cities"
          title="School software where you run the campus."
          body="Each city page is written for that place. We set up your institute. We do not run a hundred schools in one database."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {rows.map((row) => (
            <Link
              key={row.slug}
              href={`/locations/${row.slug}`}
              className="rounded-[1.4rem] bg-white p-6 ring-1 ring-navy-900/[0.06] hover:ring-navy-600"
            >
              <p className="font-display text-2xl text-navy-900">{row.city}</p>
              <p className="mt-2 text-sm text-navy-700">{row.focusKeyword}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner title="Not your city yet?" body="WhatsApp us. We still set up your campus." />
    </>
  );
}
