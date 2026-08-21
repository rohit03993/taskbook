"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/admin/actions";

type Staff = { name: string; role: string; phone: string };

const groups = [
  {
    title: "Daily work",
    items: [
      { href: "/admin", label: "Home", hint: "What needs attention" },
      { href: "/admin/leads", label: "Leads", hint: "Demo form requests" },
    ],
  },
  {
    title: "Publish",
    items: [
      { href: "/admin/blog", label: "Blog", hint: "Write and SEO score" },
      { href: "/admin/locations", label: "City pages", hint: "Agra, India, more" },
    ],
  },
  {
    title: "Website text",
    items: [
      { href: "/admin/content", label: "Homepage", hint: "Hero and how it works" },
      { href: "/admin/content/features", label: "Features", hint: "Module pages" },
      { href: "/admin/content/pricing", label: "Pricing", hint: "Packs and blurbs" },
    ],
  },
  {
    title: "Setup",
    items: [
      { href: "/admin/settings", label: "WhatsApp & email", hint: "Numbers on the public site" },
      { href: "/admin/staff", label: "Staff logins", hint: "Who can open admin" },
    ],
  },
];

function isActive(path: string, href: string) {
  if (href === "/admin") return path === "/admin";
  if (href === "/admin/content") return path === "/admin/content";
  return path === href || path.startsWith(`${href}/`);
}

function NavBody({ path, onGo }: { path: string; onGo?: () => void }) {
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">{group.title}</p>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onGo}
                    className={`block rounded-xl px-3 py-2.5 ${
                      active ? "bg-white text-navy-900 shadow-sm" : "text-white/85 hover:bg-white/10"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className={`block text-[11px] ${active ? "text-navy-600" : "text-white/45"}`}>{item.hint}</span>
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

export function AdminNav({ staff }: { staff: Staff }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-navy-900/10 bg-white px-4 py-3 lg:hidden">
        <p className="font-display text-lg text-navy-900">Task Book</p>
        <button
          type="button"
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-navy-900 ring-1 ring-navy-900/10"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-navy-900/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-[min(20rem,86vw)] flex-col bg-navy-900">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="font-display text-lg text-white">Task Book</p>
              <button type="button" className="text-sm text-white/70" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <NavBody path={path} onGo={() => setOpen(false)} />
            <SidebarFoot staff={staff} />
          </aside>
        </div>
      )}

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-navy-900 lg:flex">
        <div className="px-5 py-5">
          <p className="font-display text-xl text-white">Task Book</p>
          <p className="mt-1 text-xs text-white/50">Website admin</p>
        </div>
        <NavBody path={path} />
        <SidebarFoot staff={staff} />
      </aside>
    </>
  );
}

function SidebarFoot({ staff }: { staff: Staff }) {
  return (
    <div className="mt-auto border-t border-white/10 px-4 py-4">
      <p className="truncate text-sm font-medium text-white">{staff.name}</p>
      <p className="truncate text-xs text-white/50">
        {staff.role} · {staff.phone}
      </p>
      <div className="mt-3 flex items-center gap-3 text-sm">
        <Link href="/" className="text-white/80 hover:text-white">
          View site
        </Link>
        <span className="text-white/25">·</span>
        <form action={logoutAction}>
          <button type="submit" className="text-white/80 hover:text-white">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
