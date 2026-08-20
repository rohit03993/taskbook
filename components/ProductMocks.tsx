import type { ReactNode } from "react";

/** Filament-style chrome — matches school-crm admin (amber primary). */
export function CrmFrame({
  title,
  children,
  wide,
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-[#f3f4f6] shadow-device ${wide ? "w-full" : "mx-auto w-full max-w-xl"}`}>
      <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="text-[11px] font-semibold text-gray-800">{title}</span>
        <span className="ml-auto rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800">
          Admin
        </span>
      </div>
      <div className="p-2 sm:p-3">{children}</div>
    </div>
  );
}

/** Exact layout of resources/views/pdf/payment-receipt.blade.php — DomPDF, not handwriting. */
export function PdfReceipt() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-device">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-2">
        <p className="font-mono text-[11px] font-semibold text-amber-700">SCH-REC-2026-000184.pdf</p>
        <div className="flex gap-2">
          <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">
            View PDF
          </span>
          <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">
            Download PDF
          </span>
        </div>
      </div>
      <div className="bg-white p-5 text-[11px] text-gray-800 sm:p-6" style={{ fontFamily: "ui-sans-serif, system-ui" }}>
        <div className="mb-4 border-b-2 border-amber-600 pb-3">
          <p className="text-xl font-bold text-amber-800">Springfield School</p>
          <p className="text-[10px] text-gray-500">School & Coaching Management</p>
          <p className="mt-1 text-[10px] text-gray-600">City Campus · 98765 00000 · office@springfield.edu</p>
        </div>
        <p className="text-center text-sm font-bold uppercase tracking-widest">Fee Receipt</p>
        <p className="mb-4 text-center text-xs font-bold text-amber-800">SCH-REC-2026-000184</p>
        <table className="mb-4 w-full border-collapse text-[11px]">
          {[
            ["Student Name", "Rahul Sharma"],
            ["Roll number", "24"],
            ["Course", "Class 8"],
            ["Payment Date", "19 Aug 2026"],
            ["Payment Mode", "Cash"],
            ["Received By", "Ananya · Accountant"],
          ].map(([label, value]) => (
            <tr key={label}>
              <td className="w-[34%] border border-gray-200 bg-amber-50 px-2 py-1.5 font-bold text-amber-900">{label}</td>
              <td className="border border-gray-200 px-2 py-1.5">{value}</td>
            </tr>
          ))}
        </table>
        <div className="border-2 border-amber-600 bg-amber-50 py-3 text-center">
          <p>Amount Received</p>
          <p className="text-2xl font-bold text-amber-800">₹8,000.00</p>
          <p className="mt-1 text-[10px] italic text-gray-700">Eight thousand rupees only</p>
        </div>
        <p className="mt-8 ml-auto w-44 border-t border-gray-400 pt-1 text-right text-[10px] text-gray-600">
          Authorised Signatory
          <br />
          Springfield School
        </p>
        <p className="mt-4 border-t border-dashed border-gray-300 pt-2 text-[9px] text-gray-500">
          Computer generated receipt · Task Book
        </p>
      </div>
    </div>
  );
}

export function MockInbox() {
  return (
    <CrmFrame title="WhatsApp → Inbox" wide>
      <div className="grid min-h-[280px] grid-cols-[38%_1fr] overflow-hidden rounded-xl bg-white ring-1 ring-gray-950/5">
        <aside className="border-r border-gray-100">
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="text-sm font-bold text-gray-950">Recent chats</p>
            <p className="text-[10px] text-gray-500">Students and unknown numbers</p>
          </div>
          <div className="border-b border-gray-100 px-2 py-2">
            <div className="rounded-lg bg-gray-50 px-2 py-1.5 text-[11px] text-gray-400">Search name, mobile…</div>
          </div>
          {[
            ["Priya Mehta", "New", "Can we visit Saturday?", "2m"],
            ["Rahul Sharma", "", "Fee reminder reply", "9:02"],
            ["Neha parent", "", "Them: Thank you", "8:44"],
          ].map(([name, tag, preview, time], i) => (
            <div key={name} className={`flex gap-2 px-2 py-2 ${i === 0 ? "bg-amber-50" : "border-t border-gray-50"}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-900">
                {String(name)[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between">
                  <p className="truncate text-[12px] font-semibold">
                    {name}{" "}
                    {tag ? (
                      <span className="rounded bg-amber-500/15 px-1 text-[9px] font-bold uppercase text-amber-800">{tag}</span>
                    ) : null}
                  </p>
                  <span className="text-[10px] text-gray-400">{time}</span>
                </div>
                <p className="truncate text-[10px] text-gray-500">{preview}</p>
              </div>
            </div>
          ))}
        </aside>
        <section className="flex flex-col bg-[#ECE5DD]">
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-2">
            <div>
              <p className="text-sm font-semibold">Priya Mehta</p>
              <p className="text-[10px] text-gray-500">+91 98XXX · 24h window open</p>
            </div>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">Open profile</span>
          </div>
          <div className="flex-1 space-y-2 p-3 text-[12px]">
            <div className="max-w-[85%] rounded-lg bg-white px-2 py-1.5 shadow-sm">Can we visit Saturday?</div>
            <div className="ml-auto max-w-[85%] rounded-lg bg-[#DCF8C6] px-2 py-1.5 shadow-sm">
              Yes, 11 AM.
              <p className="mt-0.5 text-[9px] text-gray-600">Reply by Rohit</p>
            </div>
            <div className="ml-auto max-w-[85%] rounded-lg bg-[#DCF8C6] px-2 py-1.5 shadow-sm">
              Seat held till Monday.
              <p className="mt-0.5 text-[9px] text-gray-600">Reply by Ananya</p>
            </div>
          </div>
          <div className="border-t border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-500">
            Same Meta number · any staff login · history stays here
          </div>
        </section>
      </div>
    </CrmFrame>
  );
}

export function MockFindStudent() {
  return (
    <CrmFrame title="Leads → Find student">
      <div className="space-y-3 rounded-xl bg-white p-4 ring-1 ring-gray-950/5">
        <p className="text-xs font-semibold text-gray-500">Fastest way when you know the mobile number</p>
        <div className="rounded-lg ring-2 ring-amber-500 px-3 py-2 text-sm">98765 43210</div>
        <div className="rounded-xl border border-gray-100 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Enrolled student</p>
          <p className="font-semibold">Rahul Sharma</p>
          <p className="font-mono text-sm font-bold text-amber-700">Roll 24 · Class 8-A</p>
          <p className="mt-1 text-[11px] text-gray-500">Parent visits 2 · Open case: fee query · Attendance 96%</p>
        </div>
        <div className="rounded-xl border border-dashed border-gray-200 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">If not enrolled — visitor / lead</p>
          <p className="font-semibold">Priya Mehta</p>
          <p className="text-[11px] text-gray-500">Came 3 times · Last met Rohit · 4 calls logged</p>
        </div>
      </div>
    </CrmFrame>
  );
}

export function MockVisits() {
  return (
    <CrmFrame title="Leads → Campus visits">
      <div className="space-y-3 rounded-xl bg-white p-3 ring-1 ring-gray-950/5">
        <div className="flex gap-1 text-[11px]">
          {["Today", "This week", "This month"].map((t, i) => (
            <span key={t} className={`rounded-lg px-2 py-1 ${i === 2 ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-1 text-[10px]">
          {["All visits", "Lead visits", "Student visits"].map((t, i) => (
            <span key={t} className={`rounded-full px-2 py-0.5 ${i === 1 ? "bg-amber-100 text-amber-900" : "bg-gray-50 text-gray-600"}`}>
              {t}
            </span>
          ))}
        </div>
        <p className="text-[11px] font-semibold">Priya Mehta · Lead</p>
        {[
          ["12 Jun", "Met Ananya", "Asked for 8th class fees"],
          ["28 Jun", "Met Rohit", "Demo class Saturday"],
          ["4 Aug", "Met Ananya", "Ready for admission"],
        ].map(([d, who, note]) => (
          <div key={d} className="rounded-xl border border-gray-100 px-3 py-2 text-[12px]">
            <p className="font-medium">
              {d} · {who}
            </p>
            <p className="text-[11px] text-gray-500">{note}</p>
          </div>
        ))}
        <p className="rounded-xl bg-gray-50 px-3 py-2 text-[11px] text-gray-600">Calls from CRM: 4 · WhatsApp in inbox</p>
      </div>
    </CrmFrame>
  );
}

export function MockStudent360() {
  const tabs = ["Overview", "Visits", "Cases", "Fees", "Receipts", "Attendance", "Messages"];
  return (
    <CrmFrame title="Student profile" wide>
      <div className="rounded-xl bg-white p-3 ring-1 ring-gray-950/5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">
            RS
          </div>
          <div>
            <p className="font-semibold">Rahul Sharma</p>
            <p className="font-mono text-xs font-bold text-amber-700">Roll 24 · Batch 8-A · Enrolled</p>
          </div>
        </div>
        <div className="mt-3 flex gap-1 overflow-x-auto text-[10px]">
          {tabs.map((t, i) => (
            <span key={t} className={`shrink-0 rounded-full px-2 py-1 ${i === 0 ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-gray-950/5">
          <p className="border-b border-gray-100 px-3 py-2 text-xs font-bold">Enrollment</p>
          {[
            ["Roll number", "24"],
            ["Course", "Class 8"],
            ["Enrolled on", "12 Apr 2026"],
            ["Batch", "8-A"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-gray-50 px-3 py-2 text-[12px]">
              <span className="text-gray-500">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </CrmFrame>
  );
}

export function MockReceiptsTab() {
  return (
    <CrmFrame title="Student → Receipts">
      <div className="rounded-xl bg-white ring-1 ring-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-mono text-sm font-bold text-amber-700">SCH-REC-2026-000184</p>
            <p className="text-sm text-gray-600">19 Aug 2026 · ₹8,000.00 · Cash</p>
            <p className="text-xs text-gray-400">Collected by Ananya · Accountant</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="rounded-lg bg-amber-50 px-2 py-1 text-center text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">
              View PDF
            </span>
            <span className="rounded-lg bg-amber-50 px-2 py-1 text-center text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">
              Download PDF
            </span>
          </div>
        </div>
      </div>
    </CrmFrame>
  );
}

export function MockDashboard() {
  return (
    <CrmFrame title="Dashboard · Today">
      <div className="grid grid-cols-2 gap-2">
        {[
          ["42", "Present punches"],
          ["₹1.2L", "Fees collected"],
          ["18", "Fee reminders"],
          ["9", "Leads to call"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-white px-3 py-3 ring-1 ring-gray-950/5">
            <p className="text-lg font-bold text-gray-950">{v}</p>
            <p className="text-[10px] text-gray-500">{l}</p>
          </div>
        ))}
      </div>
    </CrmFrame>
  );
}

export function MockWhatsAppAttendance() {
  return (
    <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[1.8rem] border-[8px] border-gray-900 bg-[#ECE5DD] shadow-device">
      <div className="bg-[#075E54] px-3 py-2 text-white">
        <p className="text-[10px] opacity-80">WhatsApp</p>
        <p className="text-sm font-semibold">Springfield School</p>
      </div>
      <div className="px-3 py-4">
        <p className="mb-2 text-center text-[10px] text-gray-500">Today 8:42 AM</p>
        <div className="ml-auto max-w-[90%] rounded-lg rounded-tr-sm bg-[#DCF8C6] px-2.5 py-2 text-[12px] leading-snug">
          <p className="text-[10px] font-semibold text-[#075E54]">Springfield School</p>
          <p className="mt-1">Rahul Sharma is Present.</p>
          <p className="text-gray-600">Class 8-A · 19 Aug 2026, 8:42 AM</p>
          <p className="mt-1 text-right text-[10px] text-gray-500">8:42 ✓✓</p>
        </div>
      </div>
    </div>
  );
}

export function MockFeeReminder() {
  return (
    <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[1.8rem] border-[8px] border-gray-900 bg-[#ECE5DD] shadow-device">
      <div className="bg-[#075E54] px-3 py-2 text-white">
        <p className="text-[10px] opacity-80">WhatsApp</p>
        <p className="text-sm font-semibold">Springfield School</p>
      </div>
      <div className="px-3 py-4">
        <p className="mb-2 text-center text-[10px] text-gray-500">Today 9:00 AM</p>
        <div className="ml-auto max-w-[90%] rounded-lg rounded-tr-sm bg-[#DCF8C6] px-2.5 py-2 text-[12px] leading-snug">
          <p className="text-[10px] font-semibold text-[#075E54]">Springfield School</p>
          <p className="mt-1">Fee reminder for Rahul Sharma.</p>
          <p className="text-gray-600">Pending ₹4,200 · Due 12 Aug</p>
          <p className="mt-1 text-gray-600">Please ignore if already paid.</p>
          <p className="mt-1 text-right text-[10px] text-gray-500">9:00 ✓✓</p>
        </div>
      </div>
    </div>
  );
}

export function MockCallQueue() {
  return (
    <CrmFrame title="Calls → Call queue">
      <div className="space-y-2">
        {[
          ["Aarav Mehta", "Enquiry · 2 visits", "Call now"],
          ["Sana Khan", "Came yesterday", "Callback"],
          ["Vikram", "Fee follow-up", "2nd call"],
        ].map(([n, s, tag]) => (
          <div key={n} className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 ring-1 ring-gray-950/5">
            <div>
              <p className="text-sm font-semibold">{n}</p>
              <p className="text-[11px] text-gray-500">{s}</p>
            </div>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-800">{tag}</span>
          </div>
        ))}
      </div>
    </CrmFrame>
  );
}

export function MockForSlug({ slug }: { slug: string }) {
  if (slug === "whatsapp-attendance") {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <MockWhatsAppAttendance />
        <MockFeeReminder />
      </div>
    );
  }
  if (slug === "student-360") {
    return (
      <div className="grid gap-6">
        <MockFindStudent />
        <MockStudent360 />
      </div>
    );
  }
  if (slug === "whatsapp-inbox") return <MockInbox />;
  if (slug === "leads") {
    return (
      <div className="grid gap-6">
        <MockVisits />
        <MockCallQueue />
      </div>
    );
  }
  if (slug === "fees") {
    return (
      <div className="grid gap-6">
        <PdfReceipt />
        <MockReceiptsTab />
      </div>
    );
  }
  if (slug === "admissions" || slug === "portal") return <MockStudent360 />;
  if (slug === "staff") return <MockCallQueue />;
  if (slug === "reports") return <MockDashboard />;
  if (slug === "exams" || slug === "homework") return <MockStudent360 />;
  return <MockDashboard />;
}

export function MockForStep({ step }: { step: string }) {
  if (step === "1") return <MockFindStudent />;
  if (step === "2") return <MockVisits />;
  if (step === "3") return <MockInbox />;
  if (step === "4") return <MockStudent360 />;
  if (step === "5") {
    return (
      <div className="flex justify-center gap-4">
        <MockWhatsAppAttendance />
        <MockFeeReminder />
      </div>
    );
  }
  return <PdfReceipt />;
}

export function ModulePreview({ slug }: { slug: string }) {
  return (
    <div className="pointer-events-none h-44 overflow-hidden bg-[#f3f4f6]">
      <div className="origin-top scale-[0.55]" style={{ width: "181%" }}>
        <MockForSlug slug={slug} />
      </div>
    </div>
  );
}
