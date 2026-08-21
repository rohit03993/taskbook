"use client";

import { whatsappHref } from "@/content/site";
import { useSettings } from "@/components/SettingsProvider";

type Props = {
  className?: string;
  compact?: boolean;
  whatsappMessage?: string;
  /** Side-by-side full-width buttons — used by the mobile sticky bar. */
  bar?: boolean;
};

const waClass =
  "inline-flex h-12 items-center justify-center rounded-full bg-wa px-5 text-sm font-semibold text-white hover:bg-wa-dark sm:h-auto sm:py-2.5";
const demoSolid =
  "inline-flex h-12 items-center justify-center rounded-full bg-navy-900 px-5 text-sm font-semibold text-white hover:bg-navy-800 sm:h-auto sm:py-2.5";
const demoLight =
  "inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-navy-900 ring-1 ring-navy-900/10 hover:bg-navy-50 sm:h-auto sm:py-2.5";

export function DualCta({ className = "", compact, whatsappMessage, bar }: Props) {
  const settings = useSettings();
  const href = whatsappHref(whatsappMessage || settings.whatsappMessage, settings.whatsappNumber);

  return (
    <div
      className={
        bar
          ? `flex w-full items-center gap-2 ${className}`
          : `flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 ${className}`
      }
    >
      <a
        href={href}
        className={`${waClass} gap-1.5 ${bar ? "h-11 min-w-0 flex-1 px-3 text-[13px] sm:h-11" : "w-full gap-2 sm:w-auto"}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <WhatsAppIcon />
        {bar ? "WhatsApp" : "Talk on WhatsApp"}
      </a>
      <a
        href="/demo"
        className={`${compact ? demoLight : demoSolid} ${bar ? "h-11 min-w-0 flex-1 px-3 text-[13px] sm:h-11" : "w-full sm:w-auto"}`}
      >
        Book a demo
      </a>
    </div>
  );
}

export function CtaBanner({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-navy-900">
      <div className="container-site flex flex-col gap-5 py-12 pb-24 sm:flex-row sm:items-end sm:justify-between sm:py-16 sm:pb-16">
        <div className="max-w-xl">
          <p className="font-display text-[1.75rem] leading-snug text-white sm:text-4xl">{title}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="hidden sm:block">
          <DualCta compact />
        </div>
      </div>
    </section>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.8-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.7-1.3l-.3-.2-3.5.7.7-3.4-.2-.3a9.1 9.1 0 1 1 8 4.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.3-.4a.5.5 0 0 0 0-.5l-.9-2.1c-.2-.6-.5-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4.1 5.5 5.5 0 0 0 3.4.9 2.9 2.9 0 0 0 1.9-1.3 2.4 2.4 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
