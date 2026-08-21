import { AdminShell } from "@/app/admin/AdminShell";
import { deleteLocationAction } from "@/app/admin/actions";
import { LocationForm } from "@/app/admin/locations/LocationForm";
import { getLocationById, parseFaqs } from "@/lib/locations";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit city", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getLocationById(id);
  if (!row) notFound();

  return (
    <AdminShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-3xl text-navy-900">Edit {row.city}</h1>
        <form action={deleteLocationAction}>
          <input type="hidden" name="id" value={row.id} />
          <button type="submit" className="text-sm text-red-700 hover:underline">
            Delete
          </button>
        </form>
      </div>
      <LocationForm
        initial={{
          id: row.id,
          slug: row.slug,
          city: row.city,
          headline: row.headline,
          intro: row.intro,
          body: row.body,
          metaTitle: row.metaTitle,
          metaDescription: row.metaDescription,
          focusKeyword: row.focusKeyword,
          faqs: parseFaqs(row.faqsJson),
          published: row.published,
        }}
      />
    </AdminShell>
  );
}
