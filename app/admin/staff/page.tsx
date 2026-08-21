import { AdminShell } from "@/app/admin/AdminShell";
import { deleteStaffAction } from "@/app/admin/actions";
import { StaffForm } from "@/app/admin/staff/StaffForm";
import { getStaff } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = { title: "Staff", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const me = await getStaff();
  if (!me) redirect("/admin/login");
  if (me.role !== "owner") {
    return (
      <AdminShell>
        <h1 className="font-display text-3xl text-navy-900">Staff</h1>
        <p className="mt-2 text-sm text-navy-700">Only the owner can add or remove logins.</p>
      </AdminShell>
    );
  }

  const people = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">Staff</h1>
      <p className="mt-2 text-sm text-navy-700">Phone + password logins. Editors can write content. Owners can change numbers.</p>
      <ul className="mt-8 space-y-3">
        {people.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] bg-white px-5 py-4 ring-1 ring-navy-900/[0.06]">
            <div>
              <p className="font-medium text-navy-900">{p.name}</p>
              <p className="text-sm text-navy-700">
                {p.phone} · {p.role}
              </p>
            </div>
            {p.id !== me.id ? (
              <form action={deleteStaffAction}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="text-sm text-red-700 hover:underline">
                  Remove
                </button>
              </form>
            ) : (
              <span className="text-xs text-navy-600">You</span>
            )}
          </li>
        ))}
      </ul>
      <StaffForm />
    </AdminShell>
  );
}
