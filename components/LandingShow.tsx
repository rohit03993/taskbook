"use client";

import { useEffect, useState, type ReactNode } from "react";

type Status = "Present" | "Absent" | "On leave";

type Student = {
  id: string;
  name: string;
  roll: string;
  mobile: string;
  klass: string;
  attendance: Status;
  homework: string;
  homeworkState: string;
  marks: string;
  fees: string;
  call: string;
};

const students: Student[] = [
  {
    id: "aarav",
    name: "Aarav Sharma",
    roll: "101",
    mobile: "9811000005",
    klass: "Class 8",
    attendance: "Present",
    homework: "Maths · Page 42",
    homeworkState: "Opened",
    marks: "Unit test · Maths 18/20",
    fees: "Pending ₹4,200",
    call: "Fee follow-up",
  },
  {
    id: "meera",
    name: "Meera Joshi",
    roll: "102",
    mobile: "9811000006",
    klass: "Class 8",
    attendance: "On leave",
    homework: "Science · Worksheet",
    homeworkState: "Sent",
    marks: "Half-yearly · 74%",
    fees: "Clear",
    call: "Attendance concern",
  },
];

const orbit = [
  "Attendance",
  "WhatsApp",
  "Homework",
  "Exam results",
  "Pending fees",
  "Calling history",
];

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

function useCycle(length: number, ms = 2600) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [reduced, paused, length, ms]);
  return { index, setIndex, paused, setPaused };
}

function Pause({ paused, onClick }: { paused: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-4 inline-flex h-11 items-center text-sm font-semibold text-white/70 hover:text-white">
      {paused ? "Play" : "Pause"}
    </button>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-2xl bg-[#071428] ring-1 ring-white/10">{children}</div>;
}

export function HeroStage() {
  return (
    <div className="grid items-center gap-3 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,0.8fr)]">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {orbit.slice(0, 3).map((label, index) => (
          <div
            key={label}
            className="animate-rise rounded-2xl bg-white/5 px-4 py-4 text-sm font-semibold text-white ring-1 ring-white/10"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {label}
          </div>
        ))}
      </div>
      <Panel>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Demonstration record</p>
          <p className="mt-2 font-display text-3xl text-white">Aarav Sharma</p>
          <p className="text-sm text-white/55">Class 8 · Roll 101</p>
          <dl className="mt-5 space-y-2 text-sm">
            {[
              ["Attendance", "Present · 8:02"],
              ["Homework", "Maths opened"],
              ["Marks", "18/20"],
              ["Fees", "Pending ₹4,200"],
              ["Calls", "Fee follow-up"],
              ["WhatsApp", "Parent's number"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-t border-white/10 pt-2">
                <dt className="text-white/45">{label}</dt>
                <dd className="font-medium text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Panel>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {orbit.slice(3).map((label, index) => (
          <div
            key={label}
            className="animate-rise rounded-2xl bg-white/5 px-4 py-4 text-sm font-semibold text-white ring-1 ring-white/10"
            style={{ animationDelay: `${(index + 3) * 120}ms` }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

const logins = [
  { role: "Teacher", line: "Prepares the homework in their own login." },
  { role: "Coordinator", line: "Sends it on the institute number." },
  { role: "Admin", line: "Sees the thread, the student, and the history." },
];

export function WhatsAppCrm() {
  const play = useCycle(logins.length);
  const active = logins[play.index];
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <div className="grid gap-2">
            {logins.map((login, index) => (
              <button
                key={login.role}
                type="button"
                aria-pressed={index === play.index}
                onClick={() => play.setIndex(index)}
                className={`min-h-11 rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                  index === play.index ? "bg-white text-navy-950" : "bg-white/10 text-white"
                }`}
              >
                {login.role} login
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{active.line}</p>
          <Pause paused={play.paused} onClick={() => play.setPaused((value) => !value)} />
        </div>
        <Panel>
          <div className="border-b border-white/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2EC4D6]">
            One institute number
          </div>
          <div className="space-y-3 p-4">
            <p className="max-w-[18rem] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-navy-950">
              Homework · Maths · Page 42. Sent to the parent's registered number.
            </p>
            <p className="ml-auto max-w-[18rem] rounded-2xl rounded-br-md bg-white/10 px-3 py-2 text-sm text-white">
              Parent: Received.
            </p>
            <p className="text-xs text-white/50">
              {active.role} is in this thread. The parent still sees one school number.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}

const dossierTabs = ["Overview", "Attendance", "Homework", "Marks", "WhatsApp", "Fees", "Calls"] as const;

export function DossierSearch() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Student | null>(null);
  const [tab, setTab] = useState<(typeof dossierTabs)[number]>("Overview");
  const needle = query.toLowerCase().replace(/\s/g, "");
  const matches = students.filter((student) => {
    if (!needle) return true;
    return [student.name, student.roll, student.mobile].some((value) => value.toLowerCase().replace(/\s/g, "").includes(needle));
  });

  return (
    <Panel>
      <div className="border-b border-white/10 p-4">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45" htmlFor="student-search">
          Demonstration search
        </label>
        <input
          id="student-search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPicked(null);
          }}
          placeholder="Name, roll, or mobile"
          className="mt-2 h-12 w-full rounded-xl bg-white/5 px-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {matches.map((student) => (
            <button
              key={student.id}
              type="button"
              onClick={() => {
                setPicked(student);
                setTab("Overview");
              }}
              className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white"
            >
              {student.name} · {student.roll}
            </button>
          ))}
          {matches.length === 0 && <p className="text-sm text-white/55">No demonstration record matches.</p>}
        </div>
      </div>
      {picked && (
        <div className="p-4">
          <p className="font-display text-2xl text-white">{picked.name}</p>
          <p className="text-sm text-white/55">
            {picked.klass} · Roll {picked.roll} · {picked.mobile}
          </p>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {dossierTabs.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={tab === item}
                onClick={() => setTab(item)}
                className={`inline-flex h-11 shrink-0 items-center rounded-full px-3 text-sm font-semibold ${
                  tab === item ? "bg-[#2EC4D6] text-navy-950" : "bg-white/10 text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-white p-4 text-sm text-navy-950">
            <DossierPane student={picked} tab={tab} />
          </div>
        </div>
      )}
    </Panel>
  );
}

function DossierPane({ student, tab }: { student: Student; tab: (typeof dossierTabs)[number] }) {
  if (tab === "Attendance") return <p>Today: {student.attendance}. History stays on this file, including leave.</p>;
  if (tab === "Homework") return <p>{student.homework}. Link status: {student.homeworkState}. Done is marked by staff, separate from the link being opened.</p>;
  if (tab === "Marks") return <p>{student.marks}. Half-yearly and unit tests sit on the same record.</p>;
  if (tab === "WhatsApp") return <p>Messages already sent on the institute number, tied to this student.</p>;
  if (tab === "Fees") return <p>{student.fees}.</p>;
  if (tab === "Calls") return <p>Latest logged reason: {student.call}.</p>;
  return (
    <ul className="space-y-1">
      <li>Attendance: {student.attendance}</li>
      <li>Homework: {student.homeworkState}</li>
      <li>Marks: {student.marks}</li>
      <li>Fees: {student.fees}</li>
      <li>Last call: {student.call}</li>
    </ul>
  );
}

export function AttendanceBoard() {
  const [rows, setRows] = useState<Record<string, Status>>({
    aarav: "Present",
    meera: "On leave",
  });
  const [focus, setFocus] = useState("aarav");
  const student = students.find((item) => item.id === focus) ?? students[0];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel>
        <ul className="divide-y divide-white/10">
          {students.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <button type="button" onClick={() => setFocus(item.id)} className="text-left text-sm font-semibold text-white">
                {item.name}
              </button>
              <div className="flex gap-2">
                {(["Present", "Absent", "On leave"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    aria-pressed={rows[item.id] === status}
                    onClick={() => {
                      setFocus(item.id);
                      setRows((current) => ({ ...current, [item.id]: status }));
                    }}
                    className={`inline-flex h-11 items-center rounded-full px-3 text-xs font-semibold ${
                      rows[item.id] === status ? "bg-[#2EC4D6] text-navy-950" : "bg-white/10 text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Student file</p>
          <p className="mt-2 font-display text-2xl text-white">{student.name}</p>
          <p className="mt-3 text-sm text-white">Today: {rows[student.id]}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            The parent WhatsApp goes out only when the school turns that message on. The file records the day either way.
          </p>
        </div>
      </Panel>
    </div>
  );
}

const homeworkSteps = [
  { title: "Teacher creates it", body: "Maths · Page 42 is saved on the class." },
  { title: "It waits for the coordinator", body: "The academic coordinator or the admin reviews the send." },
  { title: "Staff send it", body: "It leaves on the institute number, to the parent's registered WhatsApp." },
  { title: "The link is opened", body: "Opened means the homework link was opened. It is not a WhatsApp read receipt." },
  { title: "Staff mark it done", body: "Completed is a separate mark the office records. It is not inferred from the chat." },
];

export function HomeworkFlow() {
  const play = useCycle(homeworkSteps.length, 2800);
  const step = homeworkSteps[play.index];
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
      <div>
        <ol className="space-y-2">
          {homeworkSteps.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                aria-pressed={index === play.index}
                onClick={() => play.setIndex(index)}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm ${
                  index === play.index ? "bg-white text-navy-950" : "text-white/70"
                }`}
              >
                <span className="font-display">0{index + 1}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ol>
        <Pause paused={play.paused} onClick={() => play.setPaused((value) => !value)} />
      </div>
      <Panel>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2EC4D6]">0{play.index + 1}</p>
          <p className="mt-2 font-display text-2xl text-white">{step.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{step.body}</p>
        </div>
      </Panel>
    </div>
  );
}

export function MarksBoard() {
  const play = useCycle(2, 3200);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Demonstration marks · Aarav</p>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Maths unit test", "18/20"],
              ["Science unit test", "16/20"],
              ["Half-yearly", "74%"],
            ].map(([label, value], index) => (
              <div key={label} className="flex items-center justify-between border-t border-white/10 pt-3">
                <dt className="text-white/55">{label}</dt>
                <dd className={`font-semibold text-white ${play.index === 0 && index === 2 ? "opacity-40" : ""}`}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Panel>
      <Panel>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2EC4D6]">Institute WhatsApp</p>
          <p className="mt-4 max-w-[16rem] rounded-2xl bg-white px-3 py-2 text-sm text-navy-950">
            {play.index === 0 ? "Marks are on the file." : "Unit test · Maths 18/20. Sent to the parent's number."}
          </p>
          <Pause paused={play.paused} onClick={() => play.setPaused((value) => !value)} />
        </div>
      </Panel>
    </div>
  );
}

const reasons = ["Attendance concern", "Fee follow-up", "Academic performance", "Homework follow-up", "General enquiry"] as const;

export function CallDesk() {
  const [studentId, setStudentId] = useState(students[0].id);
  const [reason, setReason] = useState<(typeof reasons)[number]>("Fee follow-up");
  const [logged, setLogged] = useState<{ name: string; reason: string }[]>([
    { name: "Aarav Sharma", reason: "Fee follow-up" },
    { name: "Meera Joshi", reason: "Attendance concern" },
  ]);
  const [filter, setFilter] = useState<string>("All");
  const visible = logged.filter((row) => filter === "All" || row.reason === filter);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel>
        <div className="space-y-3 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Log a call</p>
          <div className="flex flex-wrap gap-2">
            {students.map((student) => (
              <button
                key={student.id}
                type="button"
                aria-pressed={studentId === student.id}
                onClick={() => setStudentId(student.id)}
                className={`inline-flex h-11 items-center rounded-full px-3 text-sm font-semibold ${
                  studentId === student.id ? "bg-white text-navy-950" : "bg-white/10 text-white"
                }`}
              >
                {student.name}
              </button>
            ))}
          </div>
          <label className="block text-sm text-white/70">
            Reason
            <select
              value={reason}
              onChange={(event) => setReason(event.target.value as (typeof reasons)[number])}
              className="mt-1 h-12 w-full rounded-xl bg-white/5 px-3 text-white ring-1 ring-white/10"
            >
              {reasons.map((item) => (
                <option key={item} className="text-navy-950">
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              const student = students.find((item) => item.id === studentId);
              if (!student) return;
              setLogged((rows) => [{ name: student.name, reason }, ...rows]);
              setFilter(reason);
            }}
            className="inline-flex h-11 items-center rounded-full bg-[#2EC4D6] px-4 text-sm font-semibold text-navy-950"
          >
            Save the call
          </button>
        </div>
      </Panel>
      <Panel>
        <div className="flex gap-2 overflow-x-auto border-b border-white/10 p-3">
          {["All", ...reasons].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`inline-flex h-11 shrink-0 items-center rounded-full px-3 text-xs font-semibold ${
                filter === item ? "bg-[#2EC4D6] text-navy-950" : "bg-white/10 text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <ul className="divide-y divide-white/10">
          {visible.map((row, index) => (
            <li key={`${row.name}-${row.reason}-${index}`} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="font-medium text-white">{row.name}</span>
              <span className="text-white/55">{row.reason}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

const roles = ["Directors", "Teachers", "Parents"] as const;

export function RolePanels() {
  const [role, setRole] = useState<(typeof roles)[number]>("Directors");
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {roles.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={role === item}
            onClick={() => setRole(item)}
            className={`inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold ${
              role === item ? "bg-white text-navy-950" : "bg-white/10 text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <Panel>
        <div className="p-5 text-sm leading-relaxed text-white/80">
          {role === "Directors" && (
            <ul className="space-y-2">
              <li>Attendance for the campus.</li>
              <li>Marks on the student file.</li>
              <li>Calls, filtered by reason.</li>
              <li>The full WhatsApp history.</li>
              <li>Pending fees.</li>
            </ul>
          )}
          {role === "Teachers" && (
            <ul className="space-y-2">
              <li>Find a student by name, roll, or mobile.</li>
              <li>Give homework.</li>
              <li>Mark attendance.</li>
              <li>Open the same institute WhatsApp thread.</li>
              <li>Log a call with a reason.</li>
            </ul>
          )}
          {role === "Parents" && (
            <div>
              <p>The parent does not get an admin login here. They receive the school's WhatsApp:</p>
              <ul className="mt-3 space-y-2">
                <li>Homework on their registered number.</li>
                <li>Attendance, when the school has switched that message on.</li>
                <li>Exam marks, when staff send them.</li>
              </ul>
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
}

const walkTabs = ["WhatsApp", "Dossier", "Attendance", "Homework", "Marks", "Calls"] as const;

export function Walkthrough() {
  const [tab, setTab] = useState<(typeof walkTabs)[number]>("WhatsApp");
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-4">
        {walkTabs.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={tab === item}
            onClick={() => setTab(item)}
            className={`inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm font-semibold ${
              tab === item ? "bg-navy-900 text-white" : "bg-white text-navy-900 ring-1 ring-navy-900/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-navy-950 p-4 text-white sm:p-6">
        <p className="mb-4 text-xs text-white/50">Demonstration. Same workflows as the sections above.</p>
        {tab === "WhatsApp" && <WhatsAppCrm />}
        {tab === "Dossier" && <DossierSearch />}
        {tab === "Attendance" && <AttendanceBoard />}
        {tab === "Homework" && <HomeworkFlow />}
        {tab === "Marks" && <MarksBoard />}
        {tab === "Calls" && <CallDesk />}
      </div>
    </div>
  );
}
