import { AdminNav } from "@/app/admin/AdminNav";
import { getStaff } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export async function AdminShell({ children }: { children: ReactNode }) {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#F4F6F8] lg:flex-row">
      <AdminNav staff={staff} />
      <main className="admin-main min-h-0 min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-5 py-7 sm:px-8 sm:py-8">{children}</div>
      </main>
    </div>
  );
}
