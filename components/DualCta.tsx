"use client";

import { whatsappHref } from "@/content/site";
import { useSettings } from "@/components/SettingsProvider";

type Props = {
  className?: string;
  compact?: boolean;
  whatsappMessage?: string;
};

const waClass =
  "inline-flex items-center justify-center rounded-full bg-wa px-5 py-2.5 text-sm font-semibold text-white hover:bg-wa-dark";
const demoSolid =
  "inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800";
const demoLight =
  "inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 ring-1 ring-navy-900/10 hover:bg-navy-50";

export function DualCta({ className = "", compact, whatsappMessage }: Props) {
  const settings = useSettings();
  const href = whatsappHref(whatsappMessage || settings.whatsappMessage, settings.whatsappNumber);

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={href} className={`${waClass} gap-2`} rel="noopener noreferrer" target="_blank">
        <WhatsAppIcon />
        Talk on WhatsApp
      </a>
      <a href="/demo" className={compact ? demoLight : demoSolid}>
        Book a demo
      </a>
    </div>
  );
}

export function CtaBanner({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-navy-900">
      <div className="container-site flex flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-3xl text-white sm:text-4xl">{title}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
        </div>
        <DualCta compact />
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
