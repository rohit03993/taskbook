"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Chat = {
  id: string;
  name: string;
  phone: string;
  preview: string;
  flag?: "Reply" | "Failed";
  messages: { side: "out" | "in"; who: string; text: string; status: string }[];
};

const chats: Chat[] = [
  {
    id: "aarav",
    name: "Aarav Kapoor",
    phone: "9822000101",
    preview: "Ok, thank you.",
    flag: "Reply",
    messages: [
      { side: "out", who: "Automatic", text: "Aarav Kapoor was marked Present at 8:02.", status: "Read" },
      { side: "in", who: "Parent", text: "Ok, thank you.", status: "Received" },
    ],
  },
  {
    id: "isha",
    name: "Isha Bansal",
    phone: "9822000102",
    preview: "Received.",
    flag: "Reply",
    messages: [
      { side: "out", who: "Staff", text: "Homework for today: Maths page 42, Science diagram 3.", status: "Read" },
      { side: "in", who: "Parent", text: "Received.", status: "Received" },
    ],
  },
  {
    id: "reyansh",
    name: "Reyansh Mehta",
    phone: "9822000103",
    preview: "Demo Mid-Term: Maths 18/20, Science 16/20.",
    messages: [{ side: "out", who: "Staff", text: "Demo Mid-Term: Maths 18/20, Science 16/20.", status: "Delivered" }],
  },
  {
    id: "myra",
    name: "Myra Chawla",
    phone: "9822000104",
    preview: "When is the last date to pay?",
    flag: "Reply",
    messages: [
      { side: "out", who: "Automatic", text: "Pending fee is ₹4,200. Due 31 Oct 2026.", status: "Read" },
      { side: "in", who: "Parent", text: "When is the last date to pay?", status: "Received" },
    ],
  },
  {
    id: "advait",
    name: "Advait Saxena",
    phone: "9822000105",
    preview: "English homework could not be delivered.",
    flag: "Failed",
    messages: [{ side: "out", who: "Staff", text: "English homework could not be delivered.", status: "Failed" }],
  },
];

type FileTab = "Overview" | "Visits" | "Calls" | "Parent updates" | "Messages" | "Documents" | "Fees";

type Dossier = {
  id: string;
  name: string;
  roll: string;
  mobile: string;
  klass: string;
  batch: string;
  teacher: string;
  father: string;
  dob: string;
  gender: string;
  attendance: string;
  attendanceTone: string;
  fees: string;
  feeNote: string;
  homework: string;
  marks: string;
  call: string;
  note: string;
};

const dossiers: Dossier[] = [
  {
    id: "aarav",
    name: "Aarav Kapoor",
    roll: "501",
    mobile: "9822000101",
    klass: "Class 5 · 1 Year",
    batch: "Class 5-A",
    teacher: "Komal Reddy",
    father: "Mr Kapoor",
    dob: "03 Jan 2013",
    gender: "Male",
    attendance: "71.4%",
    attendanceTone: "text-rose-600",
    fees: "Paid",
    feeNote: "No pending fee on this file.",
    homework: "0",
    marks: "0",
    call: "16 Oct 2026, 04:12 PM · by Riya Counsellor · Connected",
    note: "[demo-ops] Discussed pending fees / attendance with parent for this week.",
  },
  {
    id: "myra",
    name: "Myra Chawla",
    roll: "504",
    mobile: "9822000104",
    klass: "Class 5 · 1 Year",
    batch: "Class 5-A",
    teacher: "Komal Reddy",
    father: "Mr Chawla",
    dob: "09 Apr 2013",
    gender: "Female",
    attendance: "On roll",
    attendanceTone: "text-gray-950",
    fees: "Reminder",
    feeNote: "Pending fee is ₹4,200. Due 31 Oct 2026. The parent asked for the last date.",
    homework: "0",
    marks: "0",
    call: "Parent reply is on the Messages tab.",
    note: "Fee reminder was sent on the institute number.",
  },
];

const fileTabs: FileTab[] = ["Overview", "Visits", "Calls", "Parent updates", "Messages", "Documents", "Fees"];


function useSeen() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, seen };
}

function ClickCue({ point = "down" }: { point?: "down" | "right" }) {
  return (
    <span className={`pointer-events-none z-10 inline-flex ${point === "down" ? "mb-2" : ""}`} aria-hidden>
      <span className="animate-nudge inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-navy-950 shadow ring-1 ring-[#2EC4D6]">
        Click here and check
        {point === "right" ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#128C9B]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M4 12h14" strokeLinecap="round" />
            <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#128C9B]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M12 4v14" strokeLinecap="round" />
            <path d="M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </span>
  );
}

function Shell({ kicker, children, seen = true }: { kicker: string; children: ReactNode; seen?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-[#f4f5f7] text-gray-950 shadow-xl ring-1 ring-black/10 ${seen ? "animate-lift" : ""}`}>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
        <p className="text-sm font-semibold">Task Book</p>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{kicker}</p>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

function Inbox() {
  const { ref, seen } = useSeen();
  const [id, setId] = useState(chats[0].id);
  const [tried, setTried] = useState(false);
  const [filter, setFilter] = useState<"All" | "Reply" | "Failed">("All");
  const [template, setTemplate] = useState("");
  const templateId = useId();
  const list = chats.filter((item) => filter === "All" || item.flag === filter);
  const chat = list.find((item) => item.id === id) ?? list[0] ?? chats[0];
  return (
    <div ref={ref}>
    <Shell kicker="WhatsApp inbox" seen={seen}>
      <div className="grid gap-3 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="rounded-xl bg-white ring-1 ring-gray-950/5">
          <div className="flex gap-1 border-b border-gray-100 p-2 text-xs font-semibold">
            {(["All", "Reply", "Failed"] as const).map((item) => (
              <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); const next = chats.filter((row) => item === "All" || row.flag === item); if (!next.some((row) => row.id === id)) setId(next[0]?.id ?? chats[0].id); }} className={`rounded-full px-2.5 py-1 ${filter === item ? "bg-gray-950 text-white" : "text-gray-500"}`}>
                {item === "Reply" ? "Reply pending" : item}
              </button>
            ))}
          </div>
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => { setId(item.id); setTried(true); }} className={`flex w-full flex-col items-start gap-1 px-3 py-2.5 text-left ${item.id === chat.id ? "bg-amber-50" : "hover:bg-gray-50"}`}>
                  {seen && !tried && item.id === "isha" && <ClickCue point="right" />}
                  <span className="flex w-full items-start gap-2">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">{item.name.slice(0, 1)}</span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold">{item.name}</span>
                        {item.flag && <span className={`rounded-full px-1.5 text-[10px] font-bold ${item.flag === "Failed" ? "bg-red-100 text-red-700" : "text-emerald-700"}`}>{item.flag}</span>}
                      </span>
                      <span className="block truncate text-xs text-gray-500">{item.preview}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col rounded-xl bg-[#efeae2] ring-1 ring-gray-950/5">
          <div className="flex items-center gap-3 border-b border-black/5 bg-white px-3 py-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">{chat.name.slice(0, 1)}</span>
            <span>
              <span className="block text-sm font-bold">{chat.name} <span className="ml-1 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-sky-800">Student</span></span>
              <span className="block text-xs text-gray-500">{chat.phone}</span>
              <span className="block text-[11px] text-gray-400">Seen by Super Admin · 16 Oct, 4:25 PM</span>
            </span>
            <span className="ml-auto rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">Profile</span>
          </div>
          <div className="flex flex-col gap-2 p-3">
            {chat.messages.map((message) => (
              <p key={message.text} className={`animate-pop max-w-[18rem] rounded-lg px-3 py-2 text-sm shadow-sm ${message.side === "out" ? "ml-auto bg-[#d9fdd3]" : "bg-white"}`}>
                <span className="flex justify-between gap-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  <span>{message.who}</span>
                  <span className="font-medium normal-case">16 Oct</span>
                </span>
                {message.text}
                <span className={`mt-1 block text-right text-[10px] font-semibold ${message.status === "Failed" ? "text-red-600" : "text-emerald-700"}`}>{message.status}</span>
              </p>
            ))}
          </div>
          <div className="border-t border-black/5 bg-white p-3">
            <p className="text-[11px] font-semibold text-gray-700">Send template <span className="float-right font-medium text-gray-400">Required outside 24h window</span></p>
            <label className="sr-only" htmlFor={templateId}>Choose template</label>
            <select id={templateId} value={template} onChange={(event) => setTemplate(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700">
              <option value="">Choose template...</option>
              <option>student_attendance_in</option>
              <option>homework_combined</option>
              <option>homework_share</option>
              <option>homework_not_done</option>
              <option>test_marks</option>
              <option>fee_reminder</option>
            </select>
            {template && <p className="mt-2 text-xs text-gray-500">Template {template} is ready. This demo does not send it.</p>}
          </div>
        </div>
      </div>
    </Shell>
    </div>
  );
}

function StudentFile({ student }: { student: Dossier }) {
  const [tab, setTab] = useState<FileTab>("Overview");
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-gray-950 shadow-sm ring-1 ring-gray-950/5">
      <div className="bg-gradient-to-br from-amber-50 to-white p-4 sm:p-5">
        <div className="flex gap-4">
          <div className="flex h-24 w-20 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-amber-300 bg-white text-center text-[10px] font-semibold text-amber-700">
            <svg viewBox="0 0 24 24" className="mb-1 h-7 w-7" aria-hidden="true">
              <circle cx="12" cy="8" r="3" fill="currentColor" />
              <path d="M5.5 19.2c1.4-3 3.6-4.4 6.5-4.4s5.1 1.4 6.5 4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            No photo
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold uppercase text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Enrolled</span>
              <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-gray-700">{student.roll}</span>
            </div>
            <p className="mt-2 text-2xl font-bold">{student.name}</p>
            <p className="text-sm text-gray-600">{student.klass}</p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
          <div className="rounded-xl border border-gray-100 bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Batch</p>
            <p className="text-lg font-bold">{student.batch}</p>
            <p className="text-xs text-gray-500">{student.teacher}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Contact</p>
            <p className="text-lg font-bold">{student.mobile}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-gray-600">
          {[`DOB ${student.dob}`, `Father ${student.father}`, student.gender, "General"].map((chip) => (
            <span key={chip} className="rounded-full bg-gray-100 px-2.5 py-1">{chip}</span>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-600">Last call {student.call}</p>
        <p className="text-xs text-gray-500">{student.note}</p>
      </div>
      <div className="grid gap-2 bg-gray-50 p-3 sm:grid-cols-2">
        {[
          ["Attendance", student.attendance, student.attendanceTone],
          ["Fees due", student.fees, "text-gray-950"],
          ["HW not done (week)", student.homework, "text-gray-950"],
          ["Exam", student.marks, "text-gray-950"],
        ].map(([label, value, tone]) => (
          <div key={label} className="rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200/80">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
            <p className={`mt-0.5 text-lg font-bold ${tone}`}>{value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 border-y border-gray-100 px-2 py-2">
        {fileTabs.map((item) => (
          <button key={item} type="button" aria-pressed={tab === item} onClick={() => setTab(item)} className={`h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${tab === item ? "bg-white text-gray-950 shadow-sm ring-1 ring-amber-400" : "text-gray-500"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm">
        {tab === "Overview" && (
          <div>
            <p className="font-bold">Activity timeline</p>
            <p className="mt-1 text-xs text-gray-500">Student journey — newest first.</p>
            <p className="mt-3 text-[11px] font-semibold uppercase text-gray-400">16 Oct 2026</p>
            <p className="mt-1">04:12 PM · Call · Fee query</p>
          </div>
        )}
        {tab === "Visits" && <p className="text-gray-600">No open visit on this file. Joined students stay out of the active lead list.</p>}
        {tab === "Calls" && <p className="text-gray-700">{student.call}. Purpose stays on the call so the office can filter it later.</p>}
        {tab === "Parent updates" && <p className="text-gray-700">Updates go out on the institute WhatsApp and stay linked to this student.</p>}
        {tab === "Messages" && <p className="max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2">The thread for {student.mobile} is on Messages. Same institute number for every parent.</p>}
        {tab === "Documents" && <p className="text-gray-600">Documents for this student sit on this tab.</p>}
        {tab === "Fees" && <p className="text-gray-700">{student.feeNote}</p>}
      </div>
    </div>
  );
}

const daySteps = [
  {
    key: "Call",
    problem: "Parent called. Nobody wrote it down.",
    line: "Fee query stays on the student.",
    bubble: "",
    answer: "Fee query",
    note: "Connected",
  },
  {
    key: "Attendance",
    problem: "Class marked. The office asks again.",
    line: "Present is on the file.",
    bubble: "Aarav Kapoor was marked Present at 8:02.",
    answer: "71.4%",
    note: "On the file",
  },
  {
    key: "Homework",
    problem: "Homework sent. Nobody checked it.",
    line: "Opened is the link. Done is a staff mark.",
    bubble: "Homework for today: Maths page 42, Science diagram 3.",
    answer: "Today",
    note: "Ready to send",
  },
  {
    key: "Fees",
    problem: "Fee collected. The file does not show it.",
    line: "The fee stays on the same file.",
    bubble: "",
    answer: "Paid",
    note: "Nothing pending",
  },
] as const;

function useDayStep() {
  const total = daySteps.length + 1;
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(daySteps.length);
      return;
    }
    if (paused) return;
    const delay = step === daySteps.length ? 3400 : 2400;
    const id = window.setTimeout(() => setStep((current) => (current + 1) % total), delay);
    return () => window.clearTimeout(id);
  }, [paused, step, total]);
  return { step, setStep, setPaused };
}

function StudentPortrait() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 rounded-full ring-2 ring-white shadow-sm" role="img" aria-label="Aarav Kapoor">
      <circle cx="40" cy="40" r="40" fill="#2EC4D6" />
      <circle cx="40" cy="40" r="40" fill="#123A66" opacity="0.18" />
      <path d="M14 78c6-20 16-28 26-28s20 8 26 28" fill="#001A3D" />
      <circle cx="40" cy="34" r="14" fill="#F0C7A4" />
      <path d="M24 34c1-14 8-20 16-20s15 6 16 20c-3-7-9-10-16-10s-13 3-16 10z" fill="#2C2118" />
      <path d="M27 31c3-2 6-2 8 0" fill="none" stroke="#2C2118" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M45 31c3-2 6-2 8 0" fill="none" stroke="#2C2118" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="35" cy="35" r="1.4" fill="#1C140F" />
      <circle cx="46" cy="35" r="1.4" fill="#1C140F" />
      <path d="M35 41c2.2 2.4 7.6 2.4 10 0" fill="none" stroke="#C4785A" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function HeroOpening() {
  const { step, setStep, setPaused } = useDayStep();
  const [chosen, setChosen] = useState(false);
  const solution = step >= daySteps.length;
  const current = daySteps[solution ? 0 : step];
  const headline = solution ? "Task Book." : current.problem;
  return (
    <>
      <h1 className="mt-4 max-w-3xl font-display text-[2.1rem] leading-[1.08] sm:text-6xl">
        <span className="sr-only">School owners and teachers lose the call, the class, the homework, and the fee. Task Book keeps that day on one student.</span>
        <span aria-hidden className="block min-h-[2.2em]">
          <span key={headline} className={`animate-pop block ${solution ? "text-[#2EC4D6]" : ""}`}>{headline}</span>
        </span>
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-lg">
        One problem comes, then the next. School owners and teachers live this every day. <span className="font-semibold text-white">Task Book</span> keeps the call, the attendance, the homework, and the fee on one student.
      </p>
      <div className="mt-5 flex gap-1.5" aria-hidden>
        {Array.from({ length: daySteps.length + 1 }, (_, index) => (
          <span key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === step ? "w-7 bg-[#2EC4D6]" : "w-1.5 bg-white/30"}`} />
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Link href="/demo" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-navy-950">
          Book a live demo
        </Link>
        <Link href="/features" className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/30">
          Explore Task Book
        </Link>
      </div>
      <div
        className="mt-10 grid items-stretch overflow-hidden rounded-2xl ring-1 ring-white/15 lg:grid-cols-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { if (!chosen) setPaused(false); }}
      >
      <div className="flex h-full flex-col bg-white/10 p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">The day a school actually has</p>
        {!chosen && (
          <div className="mt-3">
            <ClickCue />
          </div>
        )}
        <ol className="mt-3 flex flex-1 flex-col gap-2">
          {daySteps.map((item, index) => {
            const on = step === index;
            return (
              <li key={item.key}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => { setChosen(true); setStep(index); setPaused(true); }}
                  className={`flex w-full gap-3 rounded-2xl px-3 py-3 text-left transition ${on ? "bg-white text-gray-950" : "bg-white/5 text-white hover:bg-white/10"}`}
                >
                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${on ? "animate-step bg-[#2EC4D6] text-navy-950" : "bg-white/15 text-white"}`}>
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[10px] font-semibold uppercase tracking-wide ${on ? "text-gray-500" : "text-white/45"}`}>{item.key}</span>
                    <span className="block text-sm font-bold">{item.problem}</span>
                    {on && <span className="mt-1 block text-xs text-emerald-700">{item.line}</span>}
                    {on && item.bubble && (
                      <span className="animate-pop mt-2 block max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2 text-sm text-gray-950">
                        {item.bubble}
                        <span className="mt-1 block text-right text-[10px] font-semibold text-emerald-700">{item.key === "Attendance" ? "Only if the school turns this message on" : "On the institute number"}</span>
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="flex h-full flex-col bg-white p-4 text-gray-950 sm:p-5">
        <div className="flex items-center gap-3">
          <StudentPortrait />
          <div className="min-w-0 flex-1">
            <p className="text-xl font-bold">Aarav Kapoor</p>
            <p className="text-sm text-gray-600">Class 5-A · Roll 501</p>
          </div>
          <p className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">On the file</p>
        </div>
        <p key={solution ? "solution" : current.key} className="animate-pop mt-4 rounded-xl bg-navy-950 px-3 py-3 text-sm font-semibold text-white">{solution ? "Task Book keeps this day on one student." : current.line}</p>
        <div className="mt-3 grid flex-1 grid-cols-2 gap-2">
          {daySteps.map((item) => {
            const on = !solution && current.key === item.key;
            return (
              <div key={item.key} className={`flex flex-col justify-center rounded-2xl px-3 py-3 ${on ? "animate-pop bg-amber-50 ring-2 ring-amber-400" : solution ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-gray-50 ring-1 ring-gray-200"}`}>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{item.key}</p>
                <p className={`mt-1 text-lg font-bold ${on || solution ? "text-gray-950" : "text-gray-800"}`}>{item.answer}</p>
                <p className="text-xs text-gray-500">{item.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}

export function WhatsAppCrm() {
  return <Inbox />;
}

export function DossierSearch() {
  const { ref, seen } = useSeen();
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Dossier | null>(dossiers[0]);
  const needle = query.toLowerCase().replace(/\s/g, "");
  const matches = dossiers.filter((student) => {
    if (!needle) return true;
    return [student.name, student.roll, student.mobile].some((value) => value.toLowerCase().replace(/\s/g, "").includes(needle));
  });
  return (
    <div ref={ref}>
    <Shell kicker="Find student" seen={seen}>
      <label className="text-xs font-semibold text-gray-600" htmlFor={searchId}>Mobile, name, or roll</label>
      <input id={searchId} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="9822000101" className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none" />
      <div className="mt-2 flex flex-wrap gap-2">
        {matches.map((student) => (
          <span key={student.id} className="inline-flex flex-col items-start">
            {seen && picked?.id !== "myra" && student.id === "myra" && <ClickCue />}
            <button type="button" onClick={() => setPicked(student)} className="inline-flex h-10 items-center rounded-full bg-white px-3 text-sm font-semibold ring-1 ring-gray-200">
              {student.name} · {student.roll}
            </button>
          </span>
        ))}
        {matches.length === 0 && <p className="text-sm text-gray-500">No demonstration record matches.</p>}
      </div>
      {picked && <div className="mt-3"><StudentFile key={picked.id} student={picked} /></div>}
    </Shell>
    </div>
  );
}

export function AttendanceBoard() {
  const { ref, seen } = useSeen();
  const [marked, setMarked] = useState(false);
  const present = marked ? 20 : 19;
  const absent = marked ? 2 : 3;
  return (
    <div ref={ref}>
    <Shell kicker="Attendance" seen={seen}>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
        <p className="text-lg font-bold">Class 8-A · today</p>
        <p className="mt-1 text-sm text-gray-500">One click marks the student present. The class count moves with it.</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Enrolled", "23", "text-gray-950"],
            ["Present", String(present), "text-emerald-700"],
            ["Absent", String(absent), "text-red-600"],
          ].map(([label, value, tone]) => (
            <div key={label} className="rounded-xl px-3 py-2 ring-1 ring-gray-200">
              <p className="text-[10px] font-semibold uppercase text-gray-500">{label}</p>
              <p className={`text-2xl font-bold ${tone}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="font-bold">Aarav Chawla</p>
          <p className="text-sm text-gray-500">Roll 639 · {marked ? "Present" : "Not marked yet"}</p>
        </div>
        <span className="inline-flex flex-col items-start">
          {seen && !marked && <ClickCue />}
          <button type="button" onClick={() => setMarked(true)} className="h-11 rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white">
            {marked ? "Present" : "Mark present"}
          </button>
        </span>
      </div>
      {marked && (
        <p className="animate-pop mt-3 max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2 text-sm">
          Aarav Chawla was marked Present.
          <span className="mt-1 block text-xs text-emerald-800">A parent WhatsApp goes out only when the school turns that message on.</span>
        </p>
      )}
    </Shell>
    </div>
  );
}

export function HomeworkFlow() {
  const { ref, seen } = useSeen();
  const [sent, setSent] = useState(false);
  return (
    <div ref={ref}>
    <Shell kicker="Homework" seen={seen}>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
        <p className="text-lg font-bold">Class 5-A · today</p>
        <p className="mt-1 text-sm text-gray-500">The work is ready. One click sends it to parents.</p>
        <ul className="mt-3 divide-y divide-gray-100 text-sm">
          <li className="flex justify-between py-2"><span>Maths</span><span className="font-semibold">Page 42</span></li>
          <li className="flex justify-between py-2"><span>Science</span><span className="font-semibold">Diagram 3</span></li>
        </ul>
        <span className="mt-3 inline-flex flex-col items-start">
          {seen && !sent && <ClickCue />}
          <button type="button" onClick={() => setSent(true)} className="h-11 rounded-lg bg-amber-500 px-4 text-sm font-bold text-white">
            {sent ? "Sent" : "Send to parents"}
          </button>
        </span>
      </div>
      {sent && (
        <p className="animate-pop mt-3 max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2 text-sm">
          Homework for today: Maths page 42, Science diagram 3.
          <span className="mt-1 block text-xs text-emerald-800">Opened is the link. Done is a separate mark by staff.</span>
        </p>
      )}
    </Shell>
    </div>
  );
}

export function MarksBoard() {
  const { ref, seen } = useSeen();
  const [sent, setSent] = useState(false);
  return (
    <div ref={ref}>
    <Shell kicker="Exams" seen={seen}>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
        <p className="text-lg font-bold">Demo Mid-Term · Class 10-A</p>
        <p className="mt-1 text-sm text-gray-500">Marks are in for every subject. One click sends them.</p>
        <p className="mt-3 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase text-emerald-800">Ready to publish · 5/5</p>
        <span className="mt-4 inline-flex flex-col items-start">
          {seen && !sent && <ClickCue />}
          <button type="button" onClick={() => setSent(true)} className="h-11 rounded-lg bg-amber-500 px-4 text-sm font-bold text-white">
            {sent ? "Sent" : "Send marks"}
          </button>
        </span>
      </div>
      {sent && <p className="animate-pop mt-3 max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2 text-sm">Demo Mid-Term marks are on the way to parents.</p>}
    </Shell>
    </div>
  );
}

export function CallDesk() {
  const { ref, seen } = useSeen();
  const [saved, setSaved] = useState(false);
  return (
    <div ref={ref}>
    <Shell kicker="Calls" seen={seen}>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">On the student</p>
          <p className="mt-1 text-lg font-bold text-gray-950">Aarav Kapoor</p>
          <p className="text-sm text-gray-500">9822000101 · Calls</p>
          <span className="mt-4 inline-flex flex-col items-start">
            {seen && !saved && <ClickCue />}
            <button type="button" onClick={() => setSaved(true)} className="h-11 rounded-xl bg-amber-500 px-5 text-sm font-bold text-white">
              {saved ? "Call saved" : "Save call"}
            </button>
          </span>
          {saved ? (
            <div className="animate-pop mt-4 rounded-xl border border-gray-100 px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-gray-950">Connected</p>
                  <p className="text-xs text-gray-500">16 Oct 2026, 05:31 PM · Outgoing · Riya Counsellor</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Fee query</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Answered by: Father</p>
              <p className="mt-2 text-sm text-gray-700">Discussed pending fees with the parent for this week.</p>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500">Not on the student yet.</p>
          )}
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Call report</p>
          <p className="mt-1 text-lg font-bold text-gray-950">Same call, for the office</p>
          <p className="text-sm text-gray-500">Filter later by Fee query.</p>
          {saved ? (
            <div className="animate-pop mt-4 overflow-hidden rounded-xl border border-gray-100">
              <div className="grid grid-cols-2 gap-2 bg-gray-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:grid-cols-4">
                <span>When</span><span>Student</span><span className="hidden sm:block">Caller</span><span>Status</span>
              </div>
              <div className="grid grid-cols-2 gap-2 px-3 py-3 text-sm sm:grid-cols-4">
                <span><span className="block font-medium">16 Oct, 05:31 PM</span><span className="text-xs text-gray-500">Outgoing</span></span>
                <span><span className="block font-medium">Aarav Kapoor</span><span className="text-xs text-gray-500">9822000101</span></span>
                <span className="hidden text-gray-700 sm:block">Riya Counsellor</span>
                <span>
                  <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">Connected</span>
                  <span className="mt-1 block text-xs font-semibold text-gray-700">Fee query · New</span>
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500">Not in the report yet.</p>
          )}
        </div>
      </div>
    </Shell>
    </div>
  );
}

type JourneyStep = "call" | "attendance" | "fees" | "marks" | "homework" | "done";
type PayMode = "Cash" | "Online" | "UPI" | "Cheque";
type JourneyRecord = {
  call: null | { direction: string; connected: boolean; who: string; purpose: string; notes: string };
  attendance: null | { status: "Present" | "Absent"; date: string };
  fees: null | { mode: PayMode; reference: string; date: string };
  marks: null | { mathematics: string; science: string; english: string };
  homework: null | { maths: string; science: string };
};

const journeyStorageKey = "tb-aarav-demo";
const journeySteps: JourneyStep[] = ["call", "attendance", "fees", "marks", "homework", "done"];
const emptyJourney: JourneyRecord = { call: null, attendance: null, fees: null, marks: null, homework: null };
const callPurposes = ["Fee query", "Attendance", "Documents", "Academic", "Complaint", "General", "Callback needed", "Resolved"];
const payModes: PayMode[] = ["Cash", "Online", "UPI", "Cheque"];

function todayLabel() {
  return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function rupee(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function feeProof(mode: PayMode) {
  if (mode === "Cash") return { label: "Receipt number", error: "Add the receipt number." };
  if (mode === "Cheque") return { label: "Cheque number", error: "Add the cheque number." };
  return { label: "Transaction number", error: "Add the transaction number." };
}

function feeMessage(fees: NonNullable<JourneyRecord["fees"]>) {
  return `${rupee(5000)} received on ${fees.date} by ${fees.mode}. ${feeProof(fees.mode).label} ${fees.reference}. Pending ${rupee(25000)}.`;
}

function marksMessage(marks: NonNullable<JourneyRecord["marks"]>) {
  return `Unit test: Mathematics ${marks.mathematics}/100, Science ${marks.science}/100, English ${marks.english}/100.`;
}

function homeworkMessage(work: NonNullable<JourneyRecord["homework"]>) {
  return `Homework for today: Maths ${work.maths}, Science ${work.science}.`;
}

function JourneyDossier({ record }: { record: JourneyRecord }) {
  const [tab, setTab] = useState<"Overview" | "Calls" | "Attendance" | "Fees" | "Marks" | "Homework" | "Messages">("Overview");
  const tabs = ["Overview", "Calls", "Attendance", "Fees", "Marks", "Homework", "Messages"] as const;
  const trailDate = record.fees?.date || record.attendance?.date || "Today";
  const trail: { tab: "Calls" | "Attendance" | "Fees" | "Marks" | "Homework"; category: string; title: string; summary: string; dot: string }[] = [];
  if (record.homework) trail.push({ tab: "Homework", category: "Homework", title: "Homework sent", summary: homeworkMessage(record.homework), dot: "border-orange-500 bg-orange-500" });
  if (record.marks) trail.push({ tab: "Marks", category: "Exam", title: "Marks sent", summary: marksMessage(record.marks), dot: "border-fuchsia-500 bg-fuchsia-500" });
  if (record.fees) trail.push({ tab: "Fees", category: "Fee", title: `${rupee(5000)} received`, summary: `${record.fees.mode}${record.fees.reference ? ` · ${feeProof(record.fees.mode).label} ${record.fees.reference}` : ""} · Pending ${rupee(25000)} of ${rupee(30000)}`, dot: "border-emerald-500 bg-emerald-500" });
  if (record.attendance) trail.push({ tab: "Attendance", category: "Attendance", title: record.attendance.status, summary: record.attendance.date, dot: "border-indigo-500 bg-indigo-500" });
  if (record.call) trail.push({ tab: "Calls", category: "Call", title: record.call.purpose, summary: `${record.call.connected ? "Connected" : "Not connected"} · ${record.call.who} · ${record.call.notes}`, dot: "border-sky-500 bg-sky-500" });
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-gray-950 shadow-sm ring-1 ring-gray-950/5">
      <div className="bg-gradient-to-br from-amber-50 to-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold uppercase text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Enrolled</span>
          <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-gray-700">501</span>
        </div>
        <p className="mt-2 text-2xl font-bold">Aarav Kapoor</p>
        <p className="text-sm text-gray-600">Class 5-A · 9822000101 · Komal Reddy</p>
        <p className="mt-2 text-xs text-gray-500">This file keeps what you save in this session.</p>
      </div>
      <div className="grid gap-2 bg-gray-50 p-3 sm:grid-cols-2">
        {[
          ["Call", record.call ? record.call.purpose : "Not saved"],
          ["Attendance", record.attendance ? record.attendance.status : "Not saved"],
          ["Fees", record.fees ? `${rupee(5000)} received` : "Not saved"],
          ["Marks", record.marks ? "Sent" : "Not saved"],
          ["Homework", record.homework ? "Sent" : "Not saved"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200/80">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
            <p className="mt-0.5 text-lg font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 border-y border-gray-100 px-2 py-2">
        {tabs.map((item) => (
          <button key={item} type="button" aria-pressed={tab === item} onClick={() => setTab(item)} className={`h-9 rounded-full px-3 text-xs font-semibold ${tab === item ? "bg-white text-gray-950 shadow-sm ring-1 ring-amber-400" : "text-gray-500"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-2 p-4 text-sm">
        {tab === "Overview" && (
          <div>
            <p className="text-sm font-bold">Activity timeline</p>
            <p className="mt-0.5 text-xs text-gray-500">Student journey — newest first. Tap a stop to open that section.</p>
            {trail.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">No activity recorded yet for this student.</p>
            ) : (
              <div className="mt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{trailDate}</p>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute bottom-3 top-3 left-[5.15rem] w-0.5 bg-gray-200" aria-hidden />
                  <ul>
                    {trail.map((stop) => (
                      <li key={stop.tab}>
                        <button type="button" onClick={() => setTab(stop.tab)} className="grid w-full grid-cols-[4.25rem_1.25rem_minmax(0,1fr)] gap-x-2 py-3 text-left">
                          <span className="pt-0.5 text-right text-[10px] font-bold uppercase tracking-wide text-gray-400">{stop.category}</span>
                          <span className="relative flex justify-center pt-1">
                            <span className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 ring-4 ring-white ${stop.dot}`} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-gray-950">{stop.title}</span>
                            <span className="mt-1 block text-sm text-gray-600">{stop.summary}</span>
                            <span className="mt-1 block text-[11px] font-medium text-sky-700">View in {stop.tab} →</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
        {tab === "Calls" && (
          record.call ? (
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold">{record.call.connected ? "Connected" : "Not connected"}</p>
                  <p className="text-xs text-gray-500">{trailDate} · {record.call.direction} · Riya Counsellor</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{record.call.purpose}</span>
              </div>
              <p className="mt-3 text-sm text-gray-600">Answered by: {record.call.who}</p>
              <p className="mt-2 text-sm text-gray-700">{record.call.notes}</p>
            </div>
          ) : <p className="py-8 text-center text-sm text-gray-500">No calls logged yet.</p>
        )}
        {tab === "Attendance" && (
          record.attendance ? (
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold">Aarav Kapoor</p>
                  <p className="text-xs text-gray-500">Class 5-A · Roll 501 · {record.attendance.date}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${record.attendance.status === "Present" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>{record.attendance.status}</span>
              </div>
              <p className="mt-3 text-sm text-gray-600">A parent WhatsApp goes out only when the school turns that message on.</p>
            </div>
          ) : <p className="py-8 text-center text-sm text-gray-500">Not marked yet.</p>
        )}
        {tab === "Fees" && (
          record.fees ? (
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Total", rupee(30000)],
                  ["Received", rupee(5000)],
                  ["Pending", rupee(25000)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-gray-50 px-2 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
                    <p className="mt-0.5 text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-700">{record.fees.date} · {record.fees.mode}</p>
              {record.fees.reference && <p className="mt-1 text-sm text-gray-600">{feeProof(record.fees.mode).label} {record.fees.reference}</p>}
            </div>
          ) : <p className="py-8 text-center text-sm text-gray-500">No fee submitted yet.</p>
        )}
        {tab === "Marks" && (
          record.marks ? (
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold">Unit test</p>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Sent on WhatsApp</span>
              </div>
              <ul className="mt-3 divide-y divide-gray-100 text-sm">
                {[
                  ["Mathematics", record.marks.mathematics],
                  ["Science", record.marks.science],
                  ["English", record.marks.english],
                ].map(([name, score]) => (
                  <li key={name} className="flex items-center justify-between py-2">
                    <span>{name}</span>
                    <span className="font-semibold">{score}<span className="font-normal text-gray-400">/100</span></span>
                  </li>
                ))}
              </ul>
            </div>
          ) : <p className="py-8 text-center text-sm text-gray-500">No marks saved yet.</p>
        )}
        {tab === "Homework" && (
          record.homework ? (
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold">Class 5-A · today</p>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Sent</span>
              </div>
              <ul className="mt-3 divide-y divide-gray-100 text-sm">
                <li className="flex justify-between py-2"><span>Maths</span><span className="font-semibold">{record.homework.maths}</span></li>
                <li className="flex justify-between py-2"><span>Science</span><span className="font-semibold">{record.homework.science}</span></li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">Opened is the link. Done is a separate mark by staff.</p>
            </div>
          ) : <p className="py-8 text-center text-sm text-gray-500">No homework sent yet.</p>
        )}
        {tab === "Messages" && (
          <div className="overflow-hidden rounded-xl bg-[#efeae2] ring-1 ring-gray-950/5">
            <div className="flex items-center gap-3 border-b border-black/5 bg-white px-3 py-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">A</span>
              <span>
                <span className="block text-sm font-bold">Aarav Kapoor <span className="ml-1 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-sky-800">Student</span></span>
                <span className="block text-xs text-gray-500">9822000101 · institute number</span>
              </span>
            </div>
            <div className="flex min-h-28 flex-col gap-2 p-3">
              {record.fees?.reference && <p className="ml-auto max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2 shadow-sm">{feeMessage(record.fees)}<span className="mt-1 block text-right text-[10px] font-semibold text-emerald-700">Sent</span></p>}
              {record.marks && <p className="ml-auto max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2 shadow-sm">{marksMessage(record.marks)}<span className="mt-1 block text-right text-[10px] font-semibold text-emerald-700">Sent</span></p>}
              {record.homework && <p className="ml-auto max-w-sm rounded-lg bg-[#d9fdd3] px-3 py-2 shadow-sm">{homeworkMessage(record.homework)}<span className="mt-1 block text-right text-[10px] font-semibold text-emerald-700">Sent</span></p>}
              {!record.fees?.reference && !record.marks && !record.homework && <p className="py-6 text-center text-sm text-gray-600">No parent message in this session yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function StudentJourney() {
  const { ref, seen } = useSeen();
  const stageRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const timer = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<JourneyStep>("call");
  const [progress, setProgress] = useState<JourneyStep>("call");
  const [record, setRecord] = useState<JourneyRecord>(emptyJourney);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [direction, setDirection] = useState("Outgoing");
  const [who, setWho] = useState("Father");
  const [purpose, setPurpose] = useState("Fee query");
  const [notes, setNotes] = useState("Discussed pending fees with the parent for this week.");
  const [mode, setMode] = useState<PayMode | "">("");
  const [reference, setReference] = useState("");
  const [mathematics, setMathematics] = useState("");
  const [scienceMark, setScienceMark] = useState("");
  const [english, setEnglish] = useState("");
  const [mathsWork, setMathsWork] = useState("");
  const [scienceWork, setScienceWork] = useState("");
  const [holdHint, setHoldHint] = useState(false);
  const field = "mt-1 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-normal text-gray-950 sm:mt-1.5 sm:h-11";

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(journeyStorageKey);
      if (raw) {
        const saved = JSON.parse(raw) as { step?: JourneyStep; progress?: JourneyStep; record?: JourneyRecord };
        const savedRecord = { ...emptyJourney, ...saved.record };
        if (saved.record) setRecord(savedRecord);
        const furthest = saved.progress && journeySteps.includes(saved.progress) ? saved.progress : saved.step;
        if (furthest && journeySteps.includes(furthest)) setProgress(furthest);
        if (saved.step && journeySteps.includes(saved.step)) setStep(saved.step);
        fillStep(saved.step ?? "call", savedRecord);
      }
    } catch {
      sessionStorage.removeItem(journeyStorageKey);
    }
    setReady(true);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(journeyStorageKey, JSON.stringify({ step, progress, record }));
  }, [ready, step, progress, record]);

  const holdPage = ready && progress !== "done";
  useEffect(() => {
    if (!holdPage) return;
    const section = ref.current?.closest("section");
    if (!section) return;
    const held: HTMLElement[] = [];
    let sibling = section.nextElementSibling;
    while (sibling) {
      if (sibling instanceof HTMLElement) held.push(sibling);
      sibling = sibling.nextElementSibling;
    }
    const footer = section.parentElement?.parentElement?.querySelector("footer");
    if (footer instanceof HTMLElement) held.push(footer);
    held.forEach((node) => { node.inert = true; });

    const limit = () => {
      const stage = stageRef.current;
      const stageBottom = stage
        ? window.scrollY + stage.getBoundingClientRect().bottom
        : window.scrollY + section.getBoundingClientRect().bottom;
      return Math.max(0, stageBottom - window.innerHeight + 16);
    };
    let hintOn = false;
    const showHint = (on: boolean) => {
      if (hintOn === on) return;
      hintOn = on;
      setHoldHint(on);
    };
    const clamp = () => {
      const max = limit();
      if (window.scrollY > max + 1) window.scrollTo(0, max);
      else if (window.scrollY < max - 48) showHint(false);
    };
    const atEnd = () => window.scrollY >= limit() - 2;
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0 && atEnd()) {
        event.preventDefault();
        showHint(true);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "End") {
        event.preventDefault();
        showHint(true);
        return;
      }
      if (!["ArrowDown", "PageDown", " "].includes(event.key) || !atEnd()) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest("input, textarea, select") || target.isContentEditable)) return;
      event.preventDefault();
      showHint(true);
    };
    let touchY = 0;
    const onTouchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? 0; };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? touchY;
      const fingerUp = y < touchY;
      touchY = y;
      if (fingerUp && atEnd()) {
        event.preventDefault();
        showHint(true);
      }
    };

    window.addEventListener("scroll", clamp, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    clamp();
    return () => {
      setHoldHint(false);
      held.forEach((node) => { node.inert = false; });
      window.removeEventListener("scroll", clamp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [holdPage, ref]);

  useEffect(() => {
    if (!ready) return;
    if (!booted.current) {
      booted.current = true;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = ref.current?.closest("section");
    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }, [ready, step, ref]);

  function fillStep(next: JourneyStep, saved: JourneyRecord) {
    if (next === "call" && saved.call) {
      setDirection(saved.call.direction);
      setWho(saved.call.who === "No answer" ? "Father" : saved.call.who);
      setPurpose(saved.call.purpose);
      setNotes(saved.call.notes);
    }
    if (next === "fees" && saved.fees) {
      setMode(saved.fees.mode);
      setReference(saved.fees.reference);
    }
    if (next === "marks" && saved.marks) {
      setMathematics(saved.marks.mathematics);
      setScienceMark(saved.marks.science);
      setEnglish(saved.marks.english);
    }
    if (next === "homework" && saved.homework) {
      setMathsWork(saved.homework.maths);
      setScienceWork(saved.homework.science);
    }
  }

  function openStep(next: JourneyStep) {
    if (journeySteps.indexOf(next) > journeySteps.indexOf(progress)) return;
    if (timer.current) window.clearTimeout(timer.current);
    setNotice("");
    setError("");
    fillStep(next, record);
    setStep(next);
  }

  function advance(next: JourneyStep, patch: Partial<JourneyRecord>, note: string) {
    const revising = journeySteps.indexOf(step) < journeySteps.indexOf(progress);
    setError("");
    setRecord((current) => ({ ...current, ...patch }));
    setNotice(note);
    if (!revising) setProgress(next);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setNotice("");
      setStep(revising ? progress : next);
    }, 1700);
  }

  function saveCall() {
    if (notes.trim().length < 10) {
      setError("Add a short note about the call.");
      return;
    }
    advance("attendance", {
      call: { direction, connected: true, who, purpose, notes: notes.trim() },
    }, "Call saved on Aarav Kapoor.");
  }

  function saveFee() {
    if (!mode) {
      setError("Choose how the fee was paid.");
      return;
    }
    if (reference.trim().length < 3) {
      setError(feeProof(mode).error);
      return;
    }
    const fees = { mode, reference: reference.trim(), date: todayLabel() };
    advance("marks", { fees }, feeMessage(fees));
  }

  function saveMarks() {
    const scores = [mathematics, scienceMark, english];
    if (scores.some((score) => score === "" || Number(score) < 0 || Number(score) > 100)) {
      setError("Enter each subject from 0 to 100.");
      return;
    }
    const marks = { mathematics, science: scienceMark, english };
    advance("homework", { marks }, marksMessage(marks));
  }

  function saveHomework() {
    if (!mathsWork.trim() || !scienceWork.trim()) {
      setError("Add the Maths homework and the Science homework.");
      return;
    }
    const homework = { maths: mathsWork.trim(), science: scienceWork.trim() };
    advance("done", { homework }, homeworkMessage(homework));
  }

  const label = "block text-sm font-medium text-gray-700";
  const revising = journeySteps.indexOf(step) < journeySteps.indexOf(progress);
  const progressIndex = journeySteps.indexOf(progress);

  return (
    <div ref={ref}>
      <div className="mb-2 flex gap-1 sm:mb-4 sm:flex-wrap sm:gap-2">
        {journeySteps.filter((item) => item !== "done").map((item, index) => {
          const current = step === item;
          const open = index <= progressIndex;
          const done = index < progressIndex;
          const className = `inline-flex h-8 min-w-0 flex-1 items-center justify-center gap-0.5 whitespace-nowrap rounded-full px-0.5 text-[10px] font-semibold capitalize leading-none sm:h-11 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm ${current ? "bg-white text-navy-950" : open ? "bg-white/15 text-white" : "bg-white/5 text-white/40"}`;
          const mark = <span className="font-mono text-[9px] sm:text-xs">{done ? "✓" : index + 1}</span>;
          return open ? (
            <button key={item} type="button" aria-pressed={current} onClick={() => openStep(item)} className={className}>{mark}{item}</button>
          ) : (
            <span key={item} className={className}>{mark}{item}</span>
          );
        })}
      </div>
      <div ref={stageRef}>
      <Shell kicker={step === "done" ? "Student file" : step} seen={seen}>
        <div aria-live="polite">
          {notice && (
            <div className="animate-pop rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
              <p className="text-sm font-semibold text-emerald-800">Saved</p>
              <p className="mt-2 max-w-md rounded-lg bg-[#d9fdd3] px-3 py-2 text-sm">{notice}</p>
            </div>
          )}

          {!notice && step === "call" && (
            <div className="overflow-hidden rounded-2xl bg-navy-950/80 p-2 sm:p-6">
              <div className="mx-auto max-w-lg rounded-2xl bg-white p-3 shadow-xl sm:p-5">
                <p className="text-base font-bold sm:text-lg">Log student call</p>
                <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3">
                  <label className={label}>Direction
                    <select className={field} value={direction} onChange={(event) => setDirection(event.target.value)}>
                      <option>Outgoing</option>
                      <option>Incoming</option>
                    </select>
                  </label>
                  <label className={label}>Call purpose
                    <select className={field} value={purpose} onChange={(event) => setPurpose(event.target.value)}>
                      {callPurposes.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label className={`${label} sm:col-span-2`}>Who answered
                    <select className={field} value={who} onChange={(event) => setWho(event.target.value)}>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Student</option>
                      <option>Guardian</option>
                    </select>
                  </label>
                </div>
                <label className={label}>Call notes
                  <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-normal" />
                </label>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <button type="button" onClick={saveCall} className="mt-2 h-11 w-full rounded-xl bg-amber-500 px-5 text-sm font-bold text-white sm:mt-4 sm:h-12 sm:w-auto">{revising ? "Update call" : "Save call"}</button>
              </div>
            </div>
          )}

          {!notice && step === "attendance" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
              <p className="text-lg font-bold">Is Aarav present today?</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Press Present or Absent. Then we will move forward. {todayLabel()} · Class 5-A · Roll 501.</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button type="button" onClick={() => advance("fees", { attendance: { status: "Present", date: record.attendance?.date || todayLabel() } }, `Present on ${record.attendance?.date || todayLabel()}. A parent WhatsApp goes out only when the school turns that message on.`)} className={`h-12 w-full rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white sm:w-auto ${record.attendance?.status === "Present" ? "ring-2 ring-white" : ""}`}>Present</button>
                <button type="button" onClick={() => advance("fees", { attendance: { status: "Absent", date: record.attendance?.date || todayLabel() } }, `Absent on ${record.attendance?.date || todayLabel()}.`)} className={`h-12 w-full rounded-xl bg-red-600 px-5 text-sm font-bold text-white sm:w-auto ${record.attendance?.status === "Absent" ? "ring-2 ring-white" : ""}`}>Absent</button>
              </div>
            </div>
          )}

          {!notice && step === "fees" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
              <p className="text-lg font-bold">Fee due today</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Total {rupee(30000)}. Collect {rupee(5000)} today. Choose how it was paid, type the number, then press Submit.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className={label}>Payment
                  <select className={field} value={mode} onChange={(event) => { setMode(event.target.value as PayMode | ""); setReference(""); }}>
                    <option value="">Choose</option>
                    {payModes.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                {mode && (
                  <label className={label}>{feeProof(mode).label}
                    <input value={reference} onChange={(event) => setReference(event.target.value)} className={field} placeholder={feeProof(mode).label} />
                  </label>
                )}
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <button type="button" onClick={saveFee} className="mt-4 h-12 w-full rounded-xl bg-amber-500 px-5 text-sm font-bold text-white sm:w-auto">{revising ? "Update fee" : `Submit ${rupee(5000)}`}</button>
            </div>
          )}

          {!notice && step === "marks" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
              <p className="text-lg font-bold">Unit test marks</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Type Mathematics, Science, and English out of 100. Then press Save and send.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {([
                  ["Mathematics", mathematics, setMathematics],
                  ["Science", scienceMark, setScienceMark],
                  ["English", english, setEnglish],
                ] as const).map(([name, value, update]) => (
                  <label key={name} className={label}>{name}
                    <input inputMode="numeric" value={value} onChange={(event) => update(event.target.value.replace(/[^\d]/g, "").slice(0, 3))} className={field} placeholder="0–100" />
                  </label>
                ))}
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <button type="button" onClick={saveMarks} className="mt-4 h-12 w-full rounded-xl bg-amber-500 px-5 text-sm font-bold text-white sm:w-auto">{revising ? "Update and send" : "Save and send"}</button>
            </div>
          )}

          {!notice && step === "homework" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
              <p className="text-lg font-bold">Homework for today</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">Type Maths and Science, then press Send to parent. This opens the rest of the page.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className={label}>Maths
                  <input value={mathsWork} onChange={(event) => setMathsWork(event.target.value)} className={field} placeholder="Page 42" />
                </label>
                <label className={label}>Science
                  <input value={scienceWork} onChange={(event) => setScienceWork(event.target.value)} className={field} placeholder="Diagram 3" />
                </label>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <button type="button" onClick={saveHomework} className="mt-4 h-12 w-full rounded-xl bg-amber-500 px-5 text-sm font-bold text-white sm:w-auto">{revising ? "Update and send" : "Send to parent"}</button>
            </div>
          )}

          {!notice && step === "done" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5">
              <p className="text-lg font-bold">Aarav Kapoor</p>
              <p className="mt-1 text-sm text-gray-600">Class 5-A · Roll 501 · 9822000101</p>
              <p className="mt-3 text-sm text-emerald-800">This session is on his file. Open any section below.</p>
              <button type="button" onClick={() => { sessionStorage.removeItem(journeyStorageKey); setRecord(emptyJourney); setNotice(""); setError(""); setProgress("call"); setStep("call"); }} className="mt-4 h-11 rounded-xl px-4 text-sm font-semibold text-navy-950 ring-1 ring-navy-950/15">Run this student again</button>
            </div>
          )}
        </div>
      </Shell>
      </div>
      <div className="mt-6">
        <JourneyDossier record={record} />
      </div>
      {holdPage && holdHint && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4" role="status">
          <div className="animate-rise w-full max-w-sm rounded-2xl bg-white px-4 py-3 text-navy-950 shadow-2xl ring-1 ring-navy-950/10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#128C9B]">5-step demo</p>
            <p className="mt-1 text-sm font-semibold leading-snug">Complete these 5 steps. Then you can move forward.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const watchedTeachers = [
  { name: "Komal Reddy", role: "Class teacher", subject: "Class 5-A", score: 86 },
  { name: "Meena Gupta", role: "Subject teacher", subject: "English", score: 91 },
  { name: "Rajesh Singh", role: "Subject teacher", subject: "Hindi", score: 78 },
  { name: "Kavita Patel", role: "Subject teacher", subject: "Mathematics", score: 88 },
  { name: "Deepak Joshi", role: "Subject teacher", subject: "Science", score: 74 },
  { name: "Nisha Nair", role: "Subject teacher", subject: "Social Science", score: 82 },
] as const;

export function TeacherWatch() {
  const { ref, seen } = useSeen();
  const [live, setLive] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setLive((current) => (current + 1) % watchedTeachers.length), 2200);
    return () => window.clearInterval(id);
  }, []);
  const focus = watchedTeachers[live];
  return (
    <div ref={ref}>
      <Shell kicker="Performance" seen={seen}>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5 sm:p-5">
          <p className="text-lg font-bold">Class 5-A</p>
          <p className="mt-1 text-sm text-gray-500">Score from homework given, homework checked, and class performance.</p>
          <ul className="mt-4 divide-y divide-gray-100">
            {watchedTeachers.map((teacher, index) => {
              const active = index === live;
              return (
                <li key={teacher.name} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 ${active ? "animate-pop" : ""}`}>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{teacher.name}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{teacher.role} · {teacher.subject}</span>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <span className={`block h-1.5 rounded-full transition-all duration-700 ${teacher.score >= 85 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: seen ? `${teacher.score}%` : "8%" }} />
                    </span>
                  </span>
                  <span className={`text-right ${active ? "text-navy-950" : "text-gray-400"}`}>
                    <span className="block text-xl font-bold tabular-nums">{teacher.score}</span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wide">Score</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p key={focus.name} className="animate-pop mt-2 rounded-xl bg-gray-50 px-3 py-3 text-sm text-gray-700">
            {focus.name} · {focus.role} · {focus.subject} · score {focus.score}
          </p>
        </div>
      </Shell>
    </div>
  );
}

export function RolePanels() {
  const [role, setRole] = useState<"Teachers" | "Parents">("Teachers");
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["Teachers", "Parents"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={role === item} onClick={() => setRole(item)} className={`inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold ${role === item ? "bg-white text-navy-950" : "bg-white/10 text-white"}`}>
            {item}
          </button>
        ))}
      </div>
      {role === "Teachers" && <AttendanceBoard />}
      {role === "Parents" && (
        <Shell kicker="Parent WhatsApp">
          <p className="mb-3 text-sm text-gray-600">Parents see this on their own phone, from the institute number.</p>
          <div className="flex min-h-48 flex-col gap-2 rounded-xl bg-[#efeae2] p-3">
            <p className="ml-auto max-w-xs rounded-lg bg-[#d9fdd3] px-3 py-2 text-sm">Aarav Kapoor was marked Present at 8:02.<span className="mt-1 block text-right text-[10px] font-semibold text-emerald-700">Read</span></p>
            <p className="max-w-xs rounded-lg bg-white px-3 py-2 text-sm shadow-sm">Ok, thank you.</p>
          </div>
        </Shell>
      )}
    </div>
  );
}

const walkTabs = ["Student file", "Call", "Attendance", "Homework", "WhatsApp", "Marks"] as const;

export function Walkthrough() {
  const [tab, setTab] = useState<(typeof walkTabs)[number]>("Student file");
  return (
    <div>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {walkTabs.map((item) => (
          <button key={item} type="button" aria-pressed={tab === item} onClick={() => setTab(item)} className={`inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm font-semibold ${tab === item ? "bg-navy-900 text-white" : "bg-white text-navy-900 ring-1 ring-navy-900/10"}`}>
            {item}
          </button>
        ))}
      </div>
      {tab === "Student file" && <DossierSearch />}
      {tab === "Call" && <CallDesk />}
      {tab === "Attendance" && <AttendanceBoard />}
      {tab === "Homework" && <HomeworkFlow />}
      {tab === "WhatsApp" && <WhatsAppCrm />}
      {tab === "Marks" && <MarksBoard />}
    </div>
  );
}
