import { AdminNav } from "@/app/admin/AdminNav";
import { getStaff } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export async function AdminShell({ children }: { children: ReactNode }) {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");

  return (
    <div className="min-h-screen lg:flex">
      <AdminNav staff={staff} />
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
