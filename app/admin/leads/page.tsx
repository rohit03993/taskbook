import { AdminShell } from "@/app/admin/AdminShell";
import { deleteLeadAction, updateLeadAction } from "@/app/admin/actions";
import { listLeads } from "@/lib/leads";
import { waLink } from "@/lib/settings";

export const metadata = { title: "Leads", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await listLeads();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">Leads</h1>
      <p className="mt-2 text-sm text-navy-700">From Book a demo. Mark contacted, add a note, or remove.</p>
      {leads.length === 0 ? (
        <p className="mt-10 text-sm text-navy-700">No leads yet. Submit the demo form on the site to test.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-[1.4rem] bg-white p-5 ring-1 ring-navy-900/[0.06] sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-navy-900">{lead.name}</p>
                  <p className="mt-1 text-sm text-navy-700">
                    {lead.institute}
                    {lead.city ? ` · ${lead.city}` : ""}
                    {lead.type ? ` · ${lead.type}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-navy-800">
                    {lead.mobile}
                    {lead.students ? ` · ~${lead.students} students` : ""}
                  </p>
                  {lead.headache && <p className="mt-1 text-sm text-navy-700">Headache: {lead.headache}</p>}
                  <p className="mt-2 text-xs text-navy-600">{new Date(lead.at).toLocaleString("en-IN")}</p>
                </div>
                <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-800">
                  {lead.status}
                </span>
              </div>
              <form action={updateLeadAction} className="mt-4 grid gap-3 sm:grid-cols-[8rem_1fr_auto]">
                <input type="hidden" name="id" value={lead.id} />
                <select name="status" defaultValue={lead.status} className="rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2 text-sm">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="done">Done</option>
                </select>
                <input
                  name="note"
                  defaultValue={lead.note}
                  placeholder="Note"
                  className="rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2 text-sm"
                />
                <button type="submit" className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">
                  Update
                </button>
              </form>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <a
                  href={waLink(lead.mobile.replace(/\D/g, "").replace(/^0/, "91"), `Hi ${lead.name}, this is Task Book.`)}
                  className="font-semibold text-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp this lead
                </a>
                <form action={deleteLeadAction}>
                  <input type="hidden" name="id" value={lead.id} />
                  <button type="submit" className="text-red-700 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
