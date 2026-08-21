import { AdminShell } from "@/app/admin/AdminShell";
import { ContentForm } from "@/app/admin/content/ContentForm";
import { getResolvedModule } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit module", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminModuleContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = await getResolvedModule(slug);
  if (!mod) notFound();
  const p = `module.${mod.slug}`;

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">{mod.nav}</h1>
      <p className="mt-2 text-sm text-navy-700">Public page: /features/{mod.slug}</p>
      <ContentForm
        fields={[
          { key: `${p}.nav`, label: "Short nav label", value: mod.nav },
          { key: `${p}.title`, label: "Title", rows: 2, value: mod.title },
          { key: `${p}.pain`, label: "Pain", rows: 4, value: mod.pain },
          { key: `${p}.does`, label: "What it does", rows: 4, value: mod.does },
          {
            key: `${p}.bullets`,
            label: "Bullets",
            hint: "One bullet per line",
            rows: 5,
            value: mod.bullets.join("\n"),
          },
          { key: `${p}.whatsappWhen`, label: "WhatsApp note", rows: 3, value: mod.whatsappWhen },
        ]}
      />
    </AdminShell>
  );
}
