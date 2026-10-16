"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DualCta } from "@/components/DualCta";
import { BrandMark } from "@/components/BrandMark";
import { useSettings } from "@/components/SettingsProvider";
import { nav, site, whatsappHref } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solutions, setSolutions] = useState(false);
  const path = usePathname();
  const settings = useSettings();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.navOpen = "true";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.navOpen;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (path.startsWith("/admin")) return null;

  const solutionsItem = nav.find((item) => "children" in item && item.children);
  const primaryNav = nav.filter((item) => !("children" in item && item.children));

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-navy-900/10 bg-white">
      <div className="container-site flex h-16 items-center justify-between gap-3 lg:h-[4.75rem]">
        <Link
          href="/"
          className="inline-flex min-w-0 max-w-[42vw] shrink items-center overflow-hidden sm:max-w-none"
          aria-label={site.name}
          onClick={() => setOpen(false)}
        >
          <BrandMark key={settings.logoUrl || "default"} logoUrl={settings.logoUrl} size="nav" />
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium text-navy-900 lg:flex">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setSolutions(true)}
                onMouseLeave={() => setSolutions(false)}
              >
                <Link href={item.href} className="transition hover:text-[#128C9B]">
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
              <Link key={item.href} href={item.href} className="transition hover:text-[#128C9B]">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <DualCta />
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <Link
            href="/demo"
            className="inline-flex h-10 items-center rounded-full bg-navy-950 px-3.5 text-[15px] font-semibold text-white"
          >
            Book a demo
          </Link>
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl text-navy-950"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="flex h-3.5 w-[18px] flex-col justify-between">
            <span
              className={`block h-[1.5px] w-full rounded-full bg-navy-950 transition duration-200 ${
                open ? "translate-y-[6.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-navy-950 transition duration-200 ${
                open ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-navy-950 transition duration-200 ${
                open ? "-translate-y-[6.25px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        </div>
      </div>
    </header>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 z-[60] flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-navy-950 lg:hidden"
        >
          <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Product
            </p>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              {primaryNav.map((item) => {
                const active = path === item.href || path.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center justify-between border-b border-white/10 px-4 text-[15px] font-medium last:border-b-0 ${
                      active ? "bg-white text-navy-950" : "text-white"
                    }`}
                  >
                    {item.label}
                    <span className={active ? "text-navy-950/40" : "text-white/40"}>→</span>
                  </Link>
                );
              })}
            </div>

            {solutionsItem && "children" in solutionsItem && solutionsItem.children && (
              <div className="mt-6">
                <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Who it is for
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {solutionsItem.children.map((child) => {
                    const active = path === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-12 items-center justify-between rounded-2xl px-4 text-[15px] font-medium ring-1 ${
                          active ? "bg-white text-navy-950 ring-white" : "text-white ring-white/10"
                        }`}
                      >
                        {child.label}
                        <span className={active ? "text-navy-950/40" : "text-white/40"}>→</span>
                      </Link>
                    );
                  })}
                </div>
                {settings.locations.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {settings.locations.map((l) => (
                      <Link
                        key={l.slug}
                        href={`/locations/${l.slug}`}
                        onClick={() => setOpen(false)}
                        className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-white ring-1 ring-white/15"
                      >
                        {l.city}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Company
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                  { href: "/demo", label: "Book a demo" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-white ring-1 ring-white/15"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="shrink-0 border-t border-white/10 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <DualCta onDark />
          </div>
        </div>
      )}
    </>
  );
}

const productLinks = [
  { href: "/school-crm", label: "School CRM" },
  { href: "/institute-crm", label: "Institute CRM" },
  { href: "/cases", label: "Cases" },
  { href: "/certificates", label: "Certificates" },
  { href: "/institute-website", label: "Institute website" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
] as const;

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/demo", label: "Book a demo" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function Footer() {
  const path = usePathname();
  const settings = useSettings();
  if (path.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy-950 pb-[env(safe-area-inset-bottom)] text-white">
      <div className="container-site py-8 lg:py-12">
        <Link href="/" className="inline-flex items-center rounded-md bg-white px-2 py-1.5" aria-label={site.name}>
          <BrandMark key={settings.logoUrl || "default-footer"} logoUrl={settings.logoUrl} size="nav" />
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
          One campus. One install. Your students stay with you.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
          <nav aria-label="Product">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Product</p>
            <ul className="mt-1">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-sm font-medium text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Company</p>
            <ul className="mt-1">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-sm font-medium text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref(settings.whatsappMessage, settings.whatsappNumber)}
                  className="flex min-h-11 items-center text-sm font-medium text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>
          {settings.locations.length > 0 && (
            <nav aria-label="Cities" className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Cities</p>
              <ul className="mt-1">
                {settings.locations.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/locations/${l.slug}`} className="flex min-h-11 items-center text-sm font-medium text-white">
                      {l.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-4 text-xs text-white/45">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
