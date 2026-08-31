import { AdminShell } from "@/app/admin/AdminShell";
import { SettingsForm } from "@/app/admin/settings/SettingsForm";
import { PageHeader } from "@/app/admin/ui";
import { getStaff } from "@/lib/admin-auth";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Settings", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, staff] = await Promise.all([getSettings(), getStaff()]);
  const owner = staff?.role === "owner";

  return (
    <AdminShell>
      <PageHeader
        title="Site settings"
        hint="WhatsApp number visitors see, and the logo on the header, footer, and browser tab."
      />
      <SettingsForm settings={settings} owner={Boolean(owner)} />
    </AdminShell>
  );
}
