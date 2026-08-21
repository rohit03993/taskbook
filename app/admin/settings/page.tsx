import { AdminShell } from "@/app/admin/AdminShell";
import { saveSettingsAction } from "@/app/admin/actions";
import { fieldClass, Field, SaveButton } from "@/app/admin/ui";
import { getStaff } from "@/lib/admin-auth";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Settings", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, staff] = await Promise.all([getSettings(), getStaff()]);
  const owner = staff?.role === "owner";

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">Numbers and details</h1>
      <p className="mt-2 max-w-xl text-sm text-navy-700">
        These show on Talk on WhatsApp, the footer, and the demo form. {owner ? "Change here — no rebuild needed." : "Only the owner can change these."}
      </p>
      <form action={saveSettingsAction} className="mt-8 max-w-xl space-y-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-navy-900/[0.06] sm:p-8">
        <fieldset disabled={!owner} className="space-y-5">
          <Field label="WhatsApp number" hint="Country code, digits only. Example 9198xxxxxxxx">
            <input name="whatsappNumber" required defaultValue={settings.whatsappNumber} className={fieldClass} />
          </Field>
          <Field label="Default WhatsApp message">
            <textarea name="whatsappMessage" rows={3} defaultValue={settings.whatsappMessage} className={fieldClass} />
          </Field>
          <Field label="Contact email">
            <input name="email" type="email" defaultValue={settings.email} className={fieldClass} />
          </Field>
          <Field label="Leads webhook URL" hint="Optional. Each new demo form lead is POSTed here as JSON.">
            <input name="webhookUrl" defaultValue={settings.webhookUrl} placeholder="https://..." className={fieldClass} />
          </Field>
        </fieldset>
        {owner ? <SaveButton /> : null}
      </form>
    </AdminShell>
  );
}
