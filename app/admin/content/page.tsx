import { AdminShell } from "@/app/admin/AdminShell";
import { ContentForm } from "@/app/admin/content/ContentForm";
import { getHomeContent } from "@/lib/content";
import Link from "next/link";

export const metadata = { title: "Homepage copy", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminHomeContentPage() {
  const home = await getHomeContent();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">Homepage copy</h1>
      <p className="mt-2 max-w-xl text-sm text-navy-700">
        Hero, problem cards, and How it works. Images stay in /public/inside. Also see{" "}
        <Link href="/admin/content/features" className="font-semibold text-navy-600">
          features
        </Link>{" "}
        and{" "}
        <Link href="/admin/content/pricing" className="font-semibold text-navy-600">
          pricing
        </Link>
        .
      </p>
      <ContentForm
        fields={[
          { key: "hero.headline", label: "Hero headline", rows: 2, value: home.hero.headline },
          { key: "hero.subhead", label: "Hero subhead", rows: 4, value: home.hero.subhead },
          ...home.pains.flatMap((p) => [
            { key: `pains.${p.n}.title`, label: `Problem ${p.n} title`, value: p.title },
            { key: `pains.${p.n}.body`, label: `Problem ${p.n} body`, rows: 3, value: p.body },
          ]),
          ...home.howItWorks.flatMap((s) => [
            { key: `how.${s.step}.title`, label: `How it works ${s.step} title`, value: s.title },
            { key: `how.${s.step}.body`, label: `How it works ${s.step} body`, rows: 3, value: s.body },
          ]),
        ]}
      />
    </AdminShell>
  );
}
