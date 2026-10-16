"use client";

import { useEffect, useState, type ReactNode } from "react";

const STORY_MS = 5200;

type Step = { step: string; title: string; body: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function useTyped(text: string) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [reduced, text]);

  return out;
}

function Frame({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[22rem] flex-col overflow-hidden rounded-2xl bg-[#071428] ring-1 ring-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{kicker}</span>
        <span className="flex gap-1" aria-hidden>
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#2EC4D6]" />
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Rise({ delay = 0, className = "", children }: { delay?: number; className?: string; children: ReactNode }) {
  return (
    <div className={`animate-rise ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function WalkIn() {
  const typed = useTyped("9811000005");
  const done = typed.length >= 10;
  return (
    <Frame kicker="Front desk">
      <p className="text-sm text-white/55">Registered mobile</p>
      <p className="mt-2 font-display text-3xl tracking-wide text-white">
        {typed}
        <span className="ml-0.5 inline-block h-7 w-px bg-[#2EC4D6] motion-safe:animate-pulse" />
      </p>
      {done && (
        <Rise className="mt-6 rounded-xl bg-white p-4 text-navy-950">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">Visitor</p>
          <p className="mt-1 font-display text-xl">Rohit Kumar</p>
          <p className="mt-1 text-sm text-navy-700">2 visits · last call yesterday</p>
        </Rise>
      )}
    </Frame>
  );
}

function Visits() {
  const rows = [
    ["Came", "2 times"],
    ["Met", "Counsellor, front desk"],
    ["Called", "3 times, logged"],
  ];
  return (
    <Frame kicker="Same person">
      <p className="font-display text-2xl text-white">Rohit Kumar</p>
      <p className="mt-1 text-sm text-white/55">The file opens from the mobile number.</p>
      <ul className="mt-5 divide-y divide-white/10">
        {rows.map(([label, value], i) => (
          <Rise key={label} delay={i * 180} className="flex items-center justify-between py-3 text-sm">
            <span className="text-white/50">{label}</span>
            <span className="font-medium text-white">{value}</span>
          </Rise>
        ))}
      </ul>
    </Frame>
  );
}

function Chat() {
  return (
    <Frame kicker="Institute WhatsApp">
      <div className="space-y-3">
        <Rise>
          <p className="max-w-[16rem] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-sm text-white">
            Did Aarav reach school?
          </p>
        </Rise>
        <Rise delay={500} className="flex justify-end">
          <p className="max-w-[16rem] rounded-2xl rounded-br-md bg-[#2EC4D6] px-3 py-2 text-sm font-medium text-navy-950">
            Yes. He punched in at 8:02.
          </p>
        </Rise>
        <Rise delay={1000}>
          <p className="text-xs text-white/50">Priya is away. Amit continued this chat. History stayed.</p>
        </Rise>
      </div>
    </Frame>
  );
}

function Admission() {
  return (
    <Frame kicker="Admission">
      <p className="text-sm text-white/45 line-through">Visitor</p>
      <Rise delay={200}>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[#2EC4D6]">Student</p>
        <p className="mt-3 font-display text-6xl leading-none text-white">101</p>
        <p className="mt-2 text-sm text-white/70">Roll number · Class 8-A</p>
        <p className="mt-3 text-sm text-white/50">The visits and calls stay on the same person.</p>
      </Rise>
    </Frame>
  );
}

function ParentPing() {
  return (
    <Frame kicker="Parent’s phone">
      <div className="space-y-3">
        <Rise className="rounded-xl bg-white p-4 text-navy-950">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">Task Book</p>
          <p className="mt-1 text-sm">Aarav reached at 8:02.</p>
        </Rise>
        <Rise delay={450} className="rounded-xl bg-white p-4 text-navy-950">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">Fee reminder</p>
          <p className="mt-1 text-sm">₹4,200 is pending. Same institute number.</p>
        </Rise>
      </div>
    </Frame>
  );
}

function Receipt() {
  return (
    <Frame kicker="Fee receipt">
      <div className="rounded-xl bg-white p-4 text-navy-950">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">Receipt 1842</p>
        <p className="mt-2 font-display text-xl">Horizon Institute</p>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-navy-600">Student</dt>
            <dd>Aarav Sharma · 101</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy-600">Amount</dt>
            <dd className="font-semibold">₹12,500</dd>
          </div>
        </dl>
        <Rise delay={400}>
          <p className="mt-3 text-xs text-navy-700">Rupees twelve thousand five hundred only.</p>
          <p className="mt-3 inline-flex h-9 items-center rounded-full bg-navy-950 px-3 text-xs font-semibold text-white">
            View PDF
          </p>
        </Rise>
      </div>
    </Frame>
  );
}

function Scene({ step }: { step: string }) {
  if (step === "1") return <WalkIn />;
  if (step === "2") return <Visits />;
  if (step === "3") return <Chat />;
  if (step === "4") return <Admission />;
  if (step === "5") return <ParentPing />;
  return <Receipt />;
}

const heroLines = [
  { side: "in" as const, text: "Did Aarav reach school?" },
  { side: "out" as const, text: "Yes. Punched in at 8:02." },
  { side: "note" as const, text: "Priya is away. This chat stayed in the CRM." },
];

export function HeroChat() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? heroLines.length : 1);

  useEffect(() => {
    if (reduced) {
      setCount(heroLines.length);
      return;
    }
    let timer = 0;
    let cancelled = false;
    const run = (next: number) => {
      if (cancelled) return;
      setCount(next);
      const wait = next >= heroLines.length ? 2400 : 1200;
      timer = window.setTimeout(() => run(next >= heroLines.length ? 1 : next + 1), wait);
    };
    run(1);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced]);

  const shown = heroLines.slice(0, count);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#071428] shadow-device ring-1 ring-white/10">
      <div className="grid sm:grid-cols-2">
        <div className="flex min-h-[16rem] flex-col justify-start gap-3 p-4 sm:min-h-[18rem] sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Institute WhatsApp</p>
          {shown.map((line) =>
            line.side === "note" ? (
              <p key={line.text} className="animate-rise text-xs leading-relaxed text-white/55">
                {line.text}
              </p>
            ) : (
              <p
                key={line.text}
                className={`animate-rise max-w-[16rem] rounded-2xl px-3 py-2 text-sm ${
                  line.side === "out"
                    ? "self-end rounded-br-md bg-[#2EC4D6] font-medium text-navy-950"
                    : "rounded-bl-md bg-white/10 text-white"
                }`}
              >
                {line.text}
              </p>
            ),
          )}
        </div>
        <div className="flex flex-col justify-between border-t border-white/10 bg-white/[0.03] p-4 sm:border-l sm:border-t-0 sm:p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Student file</p>
            <p className="mt-2 font-display text-2xl text-white">Aarav Sharma</p>
            <p className="text-sm text-white/60">Class 8 · Roll 101</p>
          </div>
          <dl className="mt-6 space-y-2 text-sm">
            {[
              ["Attendance", "In at 8:02"],
              ["Fee", "Clear"],
              ["WhatsApp", "Institute number"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-t border-white/10 pt-2">
                <dt className="text-white/45">{label}</dt>
                <dd className="font-medium text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function StoryStage({ steps }: { steps: Step[] }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const active = steps[index];

  useEffect(() => {
    if (reduced) setPaused(true);
  }, [reduced]);

  if (!active) return null;

  function choose(next: number) {
    setIndex(next);
    setTick((n) => n + 1);
  }

  function onDone() {
    if (paused || reduced) return;
    setIndex((i) => (i + 1) % steps.length);
    setTick((n) => n + 1);
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
      <div className="order-2 lg:order-1">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <div className="flex flex-wrap gap-2">
            {steps.map((step, i) => (
              <button
                key={step.step}
                type="button"
                aria-pressed={i === index}
                onClick={() => choose(i)}
                className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold ${
                  i === index ? "bg-white text-navy-950" : "bg-white/10 text-white"
                }`}
              >
                {step.step}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <h3 className="font-display text-2xl text-white">{active.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{active.body}</p>
        </div>
        <ol className="hidden lg:block">
          {steps.map((step, i) => (
            <li key={step.step} className="border-b border-white/10">
              <button
                type="button"
                aria-pressed={i === index}
                onClick={() => choose(i)}
                className={`flex w-full gap-4 py-4 text-left ${i === index ? "text-white" : "text-white/50 hover:text-white/80"}`}
              >
                <span className="w-8 shrink-0 font-display text-lg">{step.step.padStart(2, "0")}</span>
                <span>
                  <span className="block text-[15px] font-medium">{step.title}</span>
                  {i === index && <span className="mt-1.5 block text-sm leading-relaxed text-white/70">{step.body}</span>}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          className="mt-4 inline-flex h-11 items-center text-sm font-semibold text-white/70 hover:text-white"
        >
          {paused ? "Play" : "Pause"}
        </button>
        <p className="sr-only" aria-live="polite">
          {active.title}. {active.body}
        </p>
      </div>

      <div className="order-1 lg:order-2">
        <div className="mb-3 h-0.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
          {!paused && (
            <div
              key={`${index}-${tick}`}
              className="animate-story h-full w-full bg-[#2EC4D6]"
              style={{ ["--story-ms" as string]: `${STORY_MS}ms` }}
              onAnimationEnd={onDone}
            />
          )}
        </div>
        <div aria-hidden>
          <Scene key={`${active.step}-${tick}`} step={active.step} />
        </div>
      </div>
    </div>
  );
}
