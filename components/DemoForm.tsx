"use client";

import { FormEvent, useState } from "react";
import { DualCta } from "@/components/DualCta";

const headaches = [
  "Attendance to parents",
  "Fee collection",
  "Admissions WhatsApp",
  "Student records in one place",
] as const;

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      setMessage("We have the details. Talk on WhatsApp if you want the same-day slot.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not send. Please use WhatsApp — we reply there the same day.");
    }
  }

  return (
    <div className="rounded-[1.6rem] bg-white p-6 shadow-card ring-1 ring-navy-900/[0.06] sm:p-8">
      <p className="font-display text-2xl text-navy-900">Book a demo</p>
      <p className="mt-2 text-sm text-navy-700">
        Your name, institute, city. We WhatsApp or call the same day.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">Your name</span>
          <input required name="name" className="mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-navy-600/25" />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Mobile</span>
          <input required name="mobile" type="tel" className="mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-navy-600/25" />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium">Institute name</span>
          <input required name="institute" className="mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-navy-600/25" />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Type</span>
          <select name="type" className="mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-navy-600/25">
            <option>School</option>
            <option>College</option>
            <option>Coaching</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium">City</span>
          <input required name="city" className="mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-navy-600/25" />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Approx. students</span>
          <input name="students" inputMode="numeric" className="mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-navy-600/25" />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Biggest headache</span>
          <select name="headache" className="mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-navy-600/25">
            {headaches.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-navy-900 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Request a demo"}
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${status === "error" ? "text-red-700" : "text-navy-800"}`}>{message}</p>
      )}
      <div className="mt-6 border-t border-navy-900/10 pt-5">
        <DualCta className="[&>a:last-child]:hidden" />
      </div>
    </div>
  );
}
