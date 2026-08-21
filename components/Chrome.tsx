"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DualCta, WhatsAppIcon } from "@/components/DualCta";
import { useSettings } from "@/components/SettingsProvider";
import { nav, site, whatsappHref } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solutions, setSolutions] = useState(false);
  const path = usePathname();
  const settings = useSettings();
  if (path.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/[0.06] bg-white/80 backdrop-blur-md">
      <div className="container-site flex h-[4.75rem] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={site.name} onClick={() => setOpen(false)}>
          <span className="relative h-11 w-11 shrink-0">
            <Image
              src="/logos/taskbook-icon.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block text-[1.35rem] font-bold tracking-tight">
              <span className="text-navy-900">Task</span>
              <span className="text-[#17B6C4]">Book</span>
            </span>
            <span className="hidden text-[10px] font-medium tracking-wide sm:block">
              <span className="text-navy-900">Manage.</span>{" "}
              <span className="text-[#17B6C4]">Automate.</span>{" "}
              <span className="text-[#2ECC71]">Connect.</span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] font-medium text-navy-900/70 lg:flex">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setSolutions(true)}
                onMouseLeave={() => setSolutions(false)}
              >
                <Link href={item.href} className="transition hover:text-navy-900">
                  {item.label}
                </Link>
                {solutions && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="min-w-40 rounded-xl border border-navy-900/10 bg-white py-2 shadow-card">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-navy-800 hover:bg-navy-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                      {settings.locations.map((l) => (
                        <Link
                          key={l.slug}
                          href={`/locations/${l.slug}`}
                          className="block px-4 py-2 text-navy-800 hover:bg-navy-50"
                        >
                          {l.city}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="transition hover:text-navy-900">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <DualCta compact />
        </div>

        <button
          type="button"
          className="rounded-md px-2 py-1 text-sm font-semibold text-navy-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-900/10 bg-white px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            {nav.map((item) => (
              <div key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <div className="mt-2 ml-3 flex flex-col gap-2 text-navy-700">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                    {settings.locations.map((l) => (
                      <Link key={l.slug} href={`/locations/${l.slug}`} onClick={() => setOpen(false)}>
                        {l.city}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href={whatsappHref(settings.whatsappMessage, settings.whatsappNumber)} className="inline-flex items-center gap-2 text-wa" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Talk on WhatsApp
            </a>
            <Link href="/demo" onClick={() => setOpen(false)}>
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function StickyMobileCta() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-white p-3 lg:hidden">
      <DualCta className="[&>a]:flex-1" />
    </div>
  );
}

export function Footer() {
  const path = usePathname();
  const settings = useSettings();
  if (path.startsWith("/admin")) return null;
  return (
    <footer className="border-t border-navy-900/10 bg-white pb-24 lg:pb-0">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
            <span className="relative h-14 w-14 shrink-0">
              <Image src="/logos/taskbook-icon.png" alt="" fill sizes="56px" className="object-contain" />
            </span>
            <span className="leading-tight">
              <span className="block text-2xl font-bold tracking-tight">
                <span className="text-navy-900">Task</span>
                <span className="text-[#17B6C4]">Book</span>
              </span>
              <span className="mt-0.5 block text-xs font-medium">
                <span className="text-navy-900">Manage.</span>{" "}
                <span className="text-[#17B6C4]">Automate.</span>{" "}
                <span className="text-[#2ECC71]">Connect.</span>
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-700">{site.pitch}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">Product</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-navy-800">
            <Link href="/features" className="hover:text-navy-600">Features</Link>
            <Link href="/pricing" className="hover:text-navy-600">Pricing</Link>
            <Link href="/demo" className="hover:text-navy-600">Book a demo</Link>
            <Link href="/blog" className="hover:text-navy-600">Blog</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">Solutions</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-navy-800">
            <Link href="/schools" className="hover:text-navy-600">Schools</Link>
            <Link href="/colleges" className="hover:text-navy-600">Colleges</Link>
            <Link href="/institutes" className="hover:text-navy-600">Institutes</Link>
            {settings.locations.map((l) => (
              <Link key={l.slug} href={`/locations/${l.slug}`} className="hover:text-navy-600">
                {l.city}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">Company</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-navy-800">
            <Link href="/about" className="hover:text-navy-600">About</Link>
            <Link href="/contact" className="hover:text-navy-600">Contact</Link>
            <Link href="/privacy" className="hover:text-navy-600">Privacy</Link>
            <Link href="/terms" className="hover:text-navy-600">Terms</Link>
            <a href={whatsappHref(settings.whatsappMessage, settings.whatsappNumber)} className="hover:text-navy-600" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-900/10 py-5">
        <p className="container-site text-xs text-navy-700">
          © {new Date().getFullYear()} {site.name}. Set up for your institute — one school, one install.
        </p>
      </div>
    </footer>
  );
}
