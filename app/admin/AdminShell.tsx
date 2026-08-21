import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { getStaff } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/locations", label: "Cities" },
  { href: "/admin/content", label: "Homepage" },
  { href: "/admin/content/features", label: "Features" },
  { href: "/admin/content/pricing", label: "Pricing" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/staff", label: "Staff" },
];

export async function AdminShell({ children }: { children: ReactNode }) {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");

  return (
    <div>
      <header className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-display text-lg text-navy-900">Task Book admin</p>
            <p className="text-xs text-navy-700">
              {staff.name} · {staff.role}
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-navy-800">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-navy-600">
                {l.label}
              </Link>
            ))}
            <Link href="/" className="hover:text-navy-600">
              View site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-navy-600 hover:text-navy-900">
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </div>
  );
}
