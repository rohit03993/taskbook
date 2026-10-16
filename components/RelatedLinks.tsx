import Link from "next/link";
import { linksFor } from "@/content/related";

export function RelatedLinks({ path, title = "Keep reading" }: { path: string; title?: string }) {
  const links = linksFor(path);
  if (!links.length) return null;
  return (
    <nav aria-label={title} className="border-t border-navy-900/10 bg-[#F6F7FA]">
      <div className="container-site py-12">
        <h2 className="font-display text-2xl text-navy-900">{title}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block h-full rounded-2xl bg-white p-4 ring-1 ring-navy-900/10 hover:ring-[#128C9B]">
                <span className="block font-semibold text-navy-950">{link.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-navy-700">{link.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
