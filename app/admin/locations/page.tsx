import { AdminShell } from "@/app/admin/AdminShell";
import { listLocations } from "@/lib/locations";
import Link from "next/link";

export const metadata = { title: "City pages", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLocationsPage() {
  const rows = await listLocations();

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-navy-900">City pages</h1>
          <p className="mt-2 text-sm text-navy-700">Unique pages like /locations/agra. Do not clone the same paragraph for every city.</p>
        </div>
        <Link href="/admin/locations/new" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
          New city
        </Link>
      </div>
      <div className="mt-8 space-y-3">
        {rows.map((row) => (
          <Link
            key={row.id}
            href={`/admin/locations/${row.id}`}
            className="block rounded-[1.3rem] bg-white p-5 ring-1 ring-navy-900/[0.06] hover:ring-navy-600"
          >
            <p className="font-medium text-navy-900">{row.city}</p>
            <p className="mt-1 text-sm text-navy-700">
              /locations/{row.slug}
              {row.published ? "" : " · draft"}
            </p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
