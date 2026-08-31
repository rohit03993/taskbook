"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/admin/actions";

type Staff = { name: string; role: string; phone: string };

const groups = [
  {
    title: "Work",
    items: [
      { href: "/admin", label: "Home" },
      { href: "/admin/leads", label: "Leads" },
    ],
  },
  {
    title: "Publish",
    items: [
      { href: "/admin/blog", label: "Blog" },
      { href: "/admin/locations", label: "City pages" },
    ],
  },
  {
    title: "Site copy",
    items: [
      { href: "/admin/content", label: "Homepage" },
      { href: "/admin/content/features", label: "Features" },
      { href: "/admin/content/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Setup",
    items: [
      { href: "/admin/settings", label: "WhatsApp & logo" },
      { href: "/admin/staff", label: "Staff" },
    ],
  },
];

function isActive(path: string, href: string) {
  if (href === "/admin") return path === "/admin";
  if (href === "/admin/content") return path === "/admin/content";
  return path === href || path.startsWith(`${href}/`);
}

function NavLinks({ path, onGo }: { path: string; onGo?: () => void }) {
  return (
    <nav className="flex-1 px-3 py-2">
      {groups.map((group) => (
        <div key={group.title} className="mb-4">
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">{group.title}</p>
          <ul>
            {group.items.map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onGo}
                    className={`flex h-9 items-center rounded-lg px-2.5 text-[13px] font-medium ${
                      active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFoot({ staff }: { staff: Staff }) {
  return (
    <div className="shrink-0 border-t border-white/10 px-4 py-3">
      <p className="truncate text-[13px] font-medium text-white">{staff.name}</p>
      <p className="truncate text-[11px] text-white/40">{staff.phone}</p>
      <div className="mt-2 flex gap-3 text-[12px] text-white/60">
        <Link href="/" className="hover:text-white">
          View site
        </Link>
        <form action={logoutAction}>
          <button type="submit" className="hover:text-white">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminNav({ staff }: { staff: Staff }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-navy-900/10 bg-white px-4 lg:hidden">
        <p className="text-sm font-semibold text-navy-900">Task Book</p>
        <button type="button" className="text-sm font-medium text-navy-800" onClick={() => setOpen(true)}>
          Menu
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-navy-950/50" aria-label="Close" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-60 flex-col overflow-hidden bg-navy-950">
            <div className="flex h-12 shrink-0 items-center justify-between px-4">
              <p className="text-sm font-semibold text-white">Task Book</p>
              <button type="button" className="text-xs text-white/60" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <NavLinks path={path} onGo={() => setOpen(false)} />
            <SidebarFoot staff={staff} />
          </aside>
        </div>
      )}

      <aside className="hidden h-full w-[15.5rem] shrink-0 flex-col overflow-hidden bg-navy-950 lg:flex">
        <div className="flex h-14 shrink-0 items-center px-5">
          <p className="text-[15px] font-semibold tracking-tight text-white">Task Book</p>
        </div>
        <NavLinks path={path} />
        <SidebarFoot staff={staff} />
      </aside>
    </>
  );
}
