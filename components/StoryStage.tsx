"use client";

import { useEffect, useState, type ReactNode } from "react";

const STORY_MS = 5200;

type AudienceId = "schools" | "colleges" | "institutes";

type Beat = {
  id: string;
  title: string;
  body: string;
  scene: "gate" | "office" | "admission" | "accounts";
  place: string;
  line: string;
  handoff: string;
  enrolled: string;
};

const audiences: { id: AudienceId; label: string }[] = [
  { id: "schools", label: "School" },
  { id: "colleges", label: "College" },
  { id: "institutes", label: "Institute" },
];

const days: Record<AudienceId, Beat[]> = {
  schools: [
    {
      id: "gate",
      title: "The child is in. The parent already knows.",
      body: "The gate punch sends WhatsApp on your number. The office does not take this call.",
      scene: "gate",
      place: "Gate",
      line: "Aarav reached at 8:02.",
      handoff: "",
      enrolled: "",
    },
    {
      id: "office",
      title: "Priya is away. The front desk continues the chat.",
      body: "The parent writes to the school number. Any login opens the same thread.",
      scene: "office",
      place: "Front desk",
      line: "",
      handoff: "Priya is away. The front desk replied on the same chat.",
      enrolled: "",
    },
    {
      id: "admission",
      title: "Type the number. The visits are there. The class is assigned.",
      body: "A visitor becomes a student on the same mobile number. The old calls stay.",
      scene: "admission",
      place: "Admission",
      line: "",
      handoff: "",
      enrolled: "Class 8 · Roll 101",
    },
    {
      id: "accounts",
      title: "The fee is in. The PDF is ready. You can see who is pending.",
      body: "The receipt carries the school name, the receipt number, and the amount in words.",
      scene: "accounts",
      place: "Accounts",
      line: "",
      handoff: "",
      enrolled: "",
    },
  ],
  colleges: [
    {
      id: "gate",
      title: "The student is in class. The parent already knows.",
      body: "Attendance is marked. The message goes from the college number.",
      scene: "gate",
      place: "Class",
      line: "Aarav is in class at 8:02.",
      handoff: "",
      enrolled: "",
    },
    {
      id: "office",
      title: "The counsellor is away. The admission desk continues the chat.",
      body: "The next login replies on the same thread. The history does not sit on one phone.",
      scene: "office",
      place: "Admission desk",
      line: "",
      handoff: "The counsellor is away. The admission desk continued this chat.",
      enrolled: "",
    },
    {
      id: "admission",
      title: "Type the number. The visits are there. The roll is assigned.",
      body: "Calls and visits stay on the person. Admission gives a roll and a batch.",
      scene: "admission",
      place: "Admission",
      line: "",
      handoff: "",
      enrolled: "Roll 101 · Batch A",
    },
    {
      id: "accounts",
      title: "The fee is in. The PDF is ready. You can see who is pending.",
      body: "The receipt carries the college name, the receipt number, and the amount in words.",
      scene: "accounts",
      place: "Accounts",
      line: "",
      handoff: "",
      enrolled: "",
    },
  ],
  institutes: [
    {
      id: "gate",
      title: "The batch has started. The parent already knows.",
      body: "Batch attendance goes on WhatsApp. The front desk is free for the next walk-in.",
      scene: "gate",
      place: "Batch",
      line: "Aarav is in the 8:00 batch.",
      handoff: "",
      enrolled: "",
    },
    {
      id: "office",
      title: "The counsellor is away. The next person continues the chat.",
      body: "Demo-class follow-up stays on the institute number, not on one phone.",
      scene: "office",
      place: "Front desk",
      line: "",
      handoff: "The counsellor is away. The next person continued this chat.",
      enrolled: "",
    },
    {
      id: "admission",
      title: "Type the number. The demo class is there. The batch is assigned.",
      body: "The walk-in, the calls, then the batch, on one mobile number.",
      scene: "admission",
      place: "Admission",
      line: "",
      handoff: "",
      enrolled: "Batch assigned · Roll 101",
    },
    {
      id: "accounts",
      title: "The fee is in. The PDF is ready. You can see who is pending.",
      body: "The receipt carries the institute name, the receipt number, and the amount in words.",
      scene: "accounts",
      place: "Accounts",
      line: "",
      handoff: "",
      enrolled: "",
    },
  ],
};

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

function Gate({ beat }: { beat: Beat }) {
  return (
    <Frame kicker={beat.place}>
      <Rise className="rounded-xl bg-white p-4 text-navy-950">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">Task Book</p>
        <p className="mt-1 text-sm">{beat.line}</p>
      </Rise>
      <Rise delay={420}>
        <p className="mt-4 text-sm text-white/55">Sent from the institute number. Nobody at the desk typed this.</p>
      </Rise>
    </Frame>
  );
}

function Office({ beat }: { beat: Beat }) {
  return (
    <Frame kicker={beat.place}>
      <div className="space-y-3">
        <Rise>
          <p className="max-w-[16rem] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-sm text-white">
            Did Aarav reach?
          </p>
        </Rise>
        <Rise delay={450} className="flex justify-end">
          <p className="max-w-[16rem] rounded-2xl rounded-br-md bg-[#2EC4D6] px-3 py-2 text-sm font-medium text-navy-950">
            Yes. In at 8:02.
          </p>
        </Rise>
        <Rise delay={900}>
          <p className="text-xs text-white/55">{beat.handoff}</p>
        </Rise>
      </div>
    </Frame>
  );
}

function Admission({ beat }: { beat: Beat }) {
  const typed = useTyped("9811000005");
  const done = typed.length >= 10;
  return (
    <Frame kicker={beat.place}>
      <p className="text-sm text-white/55">Registered mobile</p>
      <p className="mt-2 font-display text-3xl tracking-wide text-white">
        {typed}
        <span className="ml-0.5 inline-block h-7 w-px bg-[#2EC4D6] motion-safe:animate-pulse" />
      </p>
      {done && (
        <Rise className="mt-6 rounded-xl bg-white p-4 text-navy-950">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">2 visits · last call yesterday</p>
          <p className="mt-1 font-display text-xl">Rohit Kumar</p>
          <p className="mt-1 text-sm text-navy-700">{beat.enrolled}</p>
        </Rise>
      )}
    </Frame>
  );
}

function Accounts() {
  return (
    <Frame kicker="Accounts">
      <div className="rounded-xl bg-white p-4 text-navy-950">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-600">Receipt 1842</p>
        <p className="mt-2 font-display text-xl">Aarav Sharma · 101</p>
        <p className="mt-2 text-sm font-semibold">₹12,500</p>
        <p className="mt-1 text-xs text-navy-700">Rupees twelve thousand five hundred only.</p>
      </div>
      <Rise delay={420} className="mt-3 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm text-white">
        <span>Still pending</span>
        <span className="font-semibold">12 students</span>
      </Rise>
    </Frame>
  );
}

function Scene({ beat }: { beat: Beat }) {
  if (beat.scene === "gate") return <Gate beat={beat} />;
  if (beat.scene === "office") return <Office beat={beat} />;
  if (beat.scene === "admission") return <Admission beat={beat} />;
  return <Accounts />;
}

const heroLines = [
  { side: "in" as const, text: "Did Aarav reach school?" },
  { side: "out" as const, text: "Yes. Punched in at 8:02." },
  { side: "note" as const, text: "Sent on the institute number." },
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

export function DayStory() {
  const reduced = usePrefersReducedMotion();
  const [audience, setAudience] = useState<AudienceId>("schools");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const beats = days[audience];
  const active = beats[index];

  useEffect(() => {
    if (reduced) setPaused(true);
  }, [reduced]);

  function choose(next: number) {
    setIndex(next);
    setTick((n) => n + 1);
  }

  function pickAudience(next: AudienceId) {
    setAudience(next);
    setIndex(0);
    setTick((n) => n + 1);
  }

  function onDone() {
    if (paused || reduced) return;
    setIndex((i) => (i + 1) % beats.length);
    setTick((n) => n + 1);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Type of institute">
        {audiences.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={audience === item.id}
            onClick={() => pickAudience(item.id)}
            className={`inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold ${
              audience === item.id ? "bg-white text-navy-950" : "bg-white/10 text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="order-2 lg:order-1">
          <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
            {beats.map((beat, i) => (
              <button
                key={beat.id}
                type="button"
                aria-pressed={i === index}
                onClick={() => choose(i)}
                className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold ${
                  i === index ? "bg-white text-navy-950" : "bg-white/10 text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="lg:hidden">
            <h3 className="font-display text-2xl text-white">{active.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{active.body}</p>
          </div>
          <ol className="hidden lg:block">
            {beats.map((beat, i) => (
              <li key={beat.id} className="border-b border-white/10">
                <button
                  type="button"
                  aria-pressed={i === index}
                  onClick={() => choose(i)}
                  className={`flex w-full gap-4 py-4 text-left ${i === index ? "text-white" : "text-white/50 hover:text-white/80"}`}
                >
                  <span className="w-8 shrink-0 font-display text-lg">0{i + 1}</span>
                  <span>
                    <span className="block text-[15px] font-medium">{beat.title}</span>
                    {i === index && <span className="mt-1.5 block text-sm leading-relaxed text-white/70">{beat.body}</span>}
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
                key={`${audience}-${index}-${tick}`}
                className="animate-story h-full w-full bg-[#2EC4D6]"
                style={{ ["--story-ms" as string]: `${STORY_MS}ms` }}
                onAnimationEnd={onDone}
              />
            )}
          </div>
          <div aria-hidden>
            <Scene key={`${audience}-${active.id}-${tick}`} beat={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
