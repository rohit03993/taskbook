"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { DualCta } from "@/components/DualCta";

const problems = [
  "WhatsApp is on one person's phone",
  "Parents keep calling for attendance and fees",
  "A visitor comes again and nobody remembers",
  "Fee receipts are still written by hand",
] as const;

const fieldClass =
  "mt-1.5 min-h-12 w-full rounded-xl border border-navy-900/15 bg-white px-3 text-base text-navy-950 outline-none placeholder:text-navy-700/45 focus:border-navy-700 focus:ring-2 focus:ring-navy-600/20";

export function DemoForm({ dense = false }: { dense?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const mobile = String(data.mobile ?? "").replace(/\D/g, "");

    if (mobile.length < 10) {
      setStatus("error");
      setMessage("Enter a mobile number with at least 10 digits.");
      return;
    }

    data.mobile = mobile;
    data.name = String(data.name ?? "").trim();
    data.institute = String(data.institute ?? "").trim();
    data.city = String(data.city ?? "").trim();

    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      setMessage("We have your details. We will call or WhatsApp you the same day.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("This did not go through. Use WhatsApp below, or try the form again.");
    }
  }

  return (
    <div className={`h-full rounded-[1.6rem] bg-white shadow-card ring-1 ring-navy-900/[0.06] ${dense ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}>
      <p className="font-display text-2xl text-navy-900">Book a demo</p>
      <p className="mt-2 text-sm leading-relaxed text-navy-700">
        Fill your name, mobile, institute and city. We call or WhatsApp you the same day.
      </p>
      <form onSubmit={onSubmit} className={`grid sm:grid-cols-2 ${dense ? "mt-4 gap-3" : "mt-6 gap-4"}`}>
        <label className="block text-sm">
          <span className="font-medium text-navy-950">Your name</span>
          <input required name="name" autoComplete="name" placeholder="The person we should call" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-navy-950">Mobile</span>
          <input
            required
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-navy-950">Institute name</span>
          <input required name="institute" autoComplete="organization" placeholder="School, college, or coaching name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-navy-950">Type</span>
          <select name="type" defaultValue="School" className={fieldClass}>
            <option>School</option>
            <option>College</option>
            <option>Coaching institute</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-navy-950">City</span>
          <input required name="city" autoComplete="address-level2" placeholder="Your city" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-navy-950">Approx. students</span>
          <input name="students" inputMode="numeric" placeholder="For example, 450" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-navy-950">Main problem</span>
          <select name="headache" className={fieldClass}>
            {problems.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-navy-950">Message, if you want</span>
          <textarea name="note" rows={dense ? 2 : 3} placeholder="What you want to see on the call" className={`${fieldClass} min-h-24 py-2.5`} />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-12 w-full rounded-full bg-navy-900 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Book the demo"}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-navy-700">
            We use this only to call or WhatsApp you.{" "}
            <Link href="/privacy" className="font-semibold text-navy-900">
              Privacy
            </Link>
          </p>
        </div>
      </form>
      {message && (
        <p className={`mt-4 rounded-xl px-3 py-2 text-sm ${status === "error" ? "bg-red-50 text-red-800" : "bg-navy-50 text-navy-900"}`} role="status">
          {message}
        </p>
      )}
      {!dense && (
        <div className="mt-6 border-t border-navy-900/10 pt-5">
          <DualCta className="[&>a:last-child]:hidden" />
        </div>
      )}
    </div>
  );
}
