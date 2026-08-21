import type { ReactNode } from "react";

export const fieldClass =
  "mt-1 w-full rounded-xl border border-navy-900/15 bg-navy-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-600/25";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-navy-900">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-navy-700">{hint}</span> : null}
      {children}
    </label>
  );
}

export function SaveButton({ children = "Save" }: { children?: ReactNode }) {
  return (
    <button type="submit" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
      {children}
    </button>
  );
}

export function ScoreBadge({ score, label }: { score: number; label: string }) {
  const tone =
    label === "Ready" ? "bg-emerald-50 text-emerald-800" : label === "Weak" ? "bg-amber-50 text-amber-800" : "bg-red-50 text-red-800";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>
      {label} · {score}/100
    </span>
  );
}
