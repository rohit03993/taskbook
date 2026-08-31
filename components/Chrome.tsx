"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DualCta } from "@/components/DualCta";
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
    <header className="sticky top-0 z-50 border-b border-navy-900/[0.06] bg-white/95 backdrop-blur-md">
      <div className="container-site flex h-14 items-center justify-between gap-3 lg:h-[4.75rem]">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2"
          aria-label={site.name}
          onClick={() => setOpen(false)}
        >
          <span className="relative h-9 w-9 shrink-0 lg:h-12 lg:w-12">
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
            <span className="block text-[1.05rem] font-bold tracking-tight lg:text-[1.35rem]">
              <span className="text-navy-900">TASK</span>
              <span className="text-[#007BFF]">BOOK</span>
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
          className="relative -mr-1 flex h-11 w-11 items-center justify-center rounded-xl text-navy-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="flex h-3.5 w-[18px] flex-col justify-between">
            <span
              className={`block h-[1.5px] w-full rounded-full bg-navy-900 transition duration-200 ${
                open ? "translate-y-[6.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-navy-900 transition duration-200 ${
                open ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-navy-900 transition duration-200 ${
                open ? "-translate-y-[6.25px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </header>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-14 z-[60] flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden bg-white lg:hidden"
        >
          <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-600">
              Product
            </p>
            <div className="overflow-hidden rounded-2xl bg-[#F6F7FA] ring-1 ring-navy-900/[0.06]">
              {primaryNav.map((item) => {
                const active = path === item.href || path.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center justify-between border-b border-navy-900/[0.06] px-4 text-[15px] font-medium last:border-b-0 ${
                      active ? "bg-white text-navy-900" : "text-navy-800"
                    }`}
                  >
                    {item.label}
                    <span className="text-navy-400">→</span>
                  </Link>
                );
              })}
            </div>

            {solutionsItem && "children" in solutionsItem && solutionsItem.children && (
              <div className="mt-6">
                <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-600">
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
                          active
                            ? "bg-navy-900 text-white ring-navy-900"
                            : "bg-[#F6F7FA] text-navy-800 ring-navy-900/[0.06]"
                        }`}
                      >
                        {child.label}
                        <span className={active ? "text-white/60" : "text-navy-400"}>→</span>
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
                        className="rounded-full bg-[#F6F7FA] px-3 py-1.5 text-sm font-medium text-navy-800 ring-1 ring-navy-900/10"
                      >
                        {l.city}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-600">
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
                    className="rounded-full bg-[#F6F7FA] px-4 py-2 text-sm font-medium text-navy-800 ring-1 ring-navy-900/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="shrink-0 border-t border-navy-900/10 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <DualCta />
          </div>
        </div>
      )}
    </>
  );
}

export function StickyMobileCta() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <div className="mobile-sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-white/95 px-3 pt-2.5 backdrop-blur-md pb-[max(0.65rem,env(safe-area-inset-bottom))] lg:hidden">
      <DualCta bar />
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
                <span className="text-navy-900">TASK</span>
                <span className="text-[#007BFF]">BOOK</span>
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
            <a
              href={whatsappHref(settings.whatsappMessage, settings.whatsappNumber)}
              className="hover:text-navy-600"
              target="_blank"
              rel="noopener noreferrer"
            >
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
