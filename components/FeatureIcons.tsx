import type { ReactNode } from "react";

function IconWrap({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "wa" | "amber" }) {
  const bg =
    tone === "wa" ? "bg-[#E8F8EE] text-wa" : tone === "amber" ? "bg-amber-50 text-amber-800" : "bg-navy-50 text-navy-800";
  return (
    <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bg}`}>{children}</span>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FeatureIcon({ name }: { name: string }) {
  const svg = (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      {name === "inbox" && (
        <>
          <path {...stroke} d="M4 6.5h16v11H4z" />
          <path {...stroke} d="M4 9.5h7.5M8 13h4" />
          <circle cx="16.5" cy="12.5" r="2.2" {...stroke} />
        </>
      )}
      {name === "reminder" && (
        <>
          <rect x="4" y="6" width="16" height="12" rx="3" {...stroke} />
          <path {...stroke} d="M8 10h5M8 13.5h8" />
          <text x="17" y="9" fontSize="7" fill="currentColor" fontWeight="700">
            ₹
          </text>
        </>
      )}
      {name === "punch" && (
        <>
          <rect x="6" y="3.5" width="12" height="17" rx="2" {...stroke} />
          <path {...stroke} d="M9 8h6M9 11.5h6M9 15h4" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="6" {...stroke} />
          <path {...stroke} d="m20 20-3.5-3.5" />
        </>
      )}
      {name === "visits" && (
        <>
          <circle cx="8" cy="8" r="2.2" {...stroke} />
          <circle cx="16" cy="8" r="2.2" {...stroke} />
          <path {...stroke} d="M4.5 18c.6-2.4 2.4-3.6 3.5-3.6S11 15.6 11.6 18M12.4 18c.6-2.4 2.4-3.6 3.5-3.6s2.9 1.2 3.5 3.6" />
        </>
      )}
      {name === "roll" && (
        <>
          <rect x="5" y="4" width="14" height="16" rx="1.5" {...stroke} />
          <path {...stroke} d="M9 9h6M9 12.5h6M9 16h4" />
        </>
      )}
      {name === "pdf" && (
        <>
          <path {...stroke} d="M7 3.5h7l5 5V20.5H7z" />
          <path {...stroke} d="M14 3.5V9h5M9 13h6M9 16.5h4" />
        </>
      )}
      {name === "portal" && (
        <>
          <rect x="5" y="8" width="14" height="11" rx="1.5" {...stroke} />
          <circle cx="12" cy="6" r="2.2" {...stroke} />
        </>
      )}
      {name === "exam" && (
        <>
          <path {...stroke} d="M5 5h14v14H5z" />
          <path {...stroke} d="m8 12 2.5 2.5L16 9" />
        </>
      )}
      {name === "homework" && (
        <>
          <path {...stroke} d="M5 19.5V5.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14l-3-1.5-3 1.5-3-1.5-3 1.5Z" />
          <path {...stroke} d="M9 8h6M9 11.5h6" />
        </>
      )}
      {name === "reports" && (
        <>
          <path {...stroke} d="M4 19h16" />
          <path {...stroke} d="M7 16V10M12 16V6M17 16v-4" />
        </>
      )}
      {name === "staff" && (
        <>
          <circle cx="12" cy="8" r="2.4" {...stroke} />
          <path {...stroke} d="M5.5 19c.8-3 3-4.5 6.5-4.5s5.7 1.5 6.5 4.5" />
        </>
      )}
    </svg>
  );

  const tone = name === "inbox" || name === "punch" || name === "reminder" ? "wa" : name === "pdf" ? "amber" : "navy";
  return <IconWrap tone={tone}>{svg}</IconWrap>;
}
