import type { ReactNode } from "react";

export type SceneName =
  | "punch"
  | "reminder"
  | "portal"
  | "inbox"
  | "search"
  | "visits"
  | "roll"
  | "pdf"
  | "reports"
  | "exam"
  | "homework"
  | "staff";

function Phone({ x = 108, y = 18 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="104" height="148" rx="18" fill="#111827" />
      <rect x="6" y="6" width="92" height="136" rx="14" fill="#F8FAFC" />
      <rect x="40" y="11" width="24" height="5" rx="2.5" fill="#D1D5DB" />
    </g>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function FeatureScene({ name }: { name: SceneName }) {
  const art = {
    punch: (
      <Scene>
        <circle cx="42" cy="38" r="28" fill="#BBF7D0" />
        <circle cx="292" cy="150" r="36" fill="#DCFCE7" />
        <g transform="translate(28 48)">
          <rect width="56" height="78" rx="10" fill="#0F172A" />
          <rect x="8" y="12" width="40" height="40" rx="6" fill="#1FA855" />
          <circle cx="28" cy="32" r="10" fill="#ECFDF5" />
          <path d="M28 26v12M22 32h12" stroke="#1FA855" strokeWidth="2.2" strokeLinecap="round" />
          <text x="28" y="68" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="inherit">
            IN
          </text>
        </g>
        <Phone x="118" y="16" />
        <g transform="translate(132 42)">
          <rect width="76" height="52" rx="12" fill="#DCFCE7" />
          <text x="10" y="18" fontSize="8" fill="#166534" fontFamily="inherit" fontWeight="600">
            Springfield
          </text>
          <text x="10" y="34" fontSize="10" fill="#14532D" fontFamily="inherit" fontWeight="700">
            Punched in
          </text>
          <text x="10" y="46" fontSize="8" fill="#166534" fontFamily="inherit">
            8:42 AM
          </text>
        </g>
        <g transform="translate(248 58)">
          <circle r="22" fill="#1FA855" />
          <path d="M-7 1l5 5 12-12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </Scene>
    ),
    reminder: (
      <Scene>
        <rect x="24" y="28" width="200" height="124" rx="22" fill="#fff" />
        <circle cx="48" cy="52" r="14" fill="#1FA855" />
        <text x="48" y="56" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="inherit" fontWeight="700">
          ₹
        </text>
        <text x="72" y="48" fontSize="11" fill="#0F172A" fontFamily="inherit" fontWeight="700">
          Fee pending
        </text>
        <text x="72" y="64" fontSize="9" fill="#64748B" fontFamily="inherit">
          WhatsApp to parent
        </text>
        <rect x="40" y="84" width="168" height="48" rx="14" fill="#ECFDF5" />
        <text x="54" y="104" fontSize="10" fill="#14532D" fontFamily="inherit">
          Balance due
        </text>
        <text x="54" y="120" fontSize="16" fill="#166534" fontFamily="inherit" fontWeight="700">
          ₹ 4,800
        </text>
        <g transform="translate(248 90)">
          <circle r="28" fill="#1FA855" />
          <path
            d="M-10 2c6 8 10 12 10 12s10-14 22-28"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </Scene>
    ),
    portal: (
      <Scene>
        <rect x="22" y="38" width="86" height="108" rx="14" fill="#0A3D86" />
        <rect x="30" y="48" width="70" height="78" rx="6" fill="#F8FAFC" />
        <circle cx="48" cy="72" r="10" fill="#C5D7F7" />
        <circle cx="48" cy="68" r="4" fill="#002E6E" />
        <rect x="62" y="64" width="30" height="5" rx="2.5" fill="#E2E8F0" />
        <rect x="62" y="74" width="22" height="5" rx="2.5" fill="#E8F0FF" />
        <rect x="46" y="148" width="38" height="6" rx="2" fill="#0A3D86" />
        {[
          { x: 124, t: "Fees", c: "#FFFBEB", d: "#B45309" },
          { x: 186, t: "Attendance", c: "#ECFDF5", d: "#166534" },
          { x: 248, t: "Homework", c: "#EEF2FF", d: "#3730A3" },
        ].map((tile) => (
          <g key={tile.t} transform={`translate(${tile.x} 52)`}>
            <rect width="54" height="80" rx="14" fill="#fff" />
            <rect x="10" y="14" width="34" height="34" rx="10" fill={tile.c} />
            <text x="27" y="68" textAnchor="middle" fontSize="7" fill={tile.d} fontFamily="inherit" fontWeight="700">
              {tile.t}
            </text>
          </g>
        ))}
      </Scene>
    ),
    inbox: (
      <Scene>
        <rect x="22" y="22" width="108" height="136" rx="16" fill="#fff" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(36 ${40 + i * 36})`}>
            <circle r="10" cx="10" cy="10" fill={i === 0 ? "#1FA855" : "#C5D7F7"} />
            <rect x="28" y="6" width="52" height="7" rx="3.5" fill="#E2E8F0" />
            <rect x="28" y="18" width="38" height="5" rx="2.5" fill="#F1F5F9" />
          </g>
        ))}
        <rect x="142" y="36" width="156" height="108" rx="18" fill="#fff" />
        <rect x="158" y="54" width="92" height="28" rx="14" fill="#ECFDF5" />
        <rect x="190" y="92" width="88" height="28" rx="14" fill="#E8F0FF" />
        <circle cx="276" cy="148" r="18" fill="#1FA855" />
        <path d="M268 148h16M276 140v16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </Scene>
    ),
    search: (
      <Scene>
        <rect x="36" y="48" width="248" height="48" rx="24" fill="#fff" />
        <circle cx="64" cy="72" r="10" fill="none" stroke="#3974FC" strokeWidth="2.4" />
        <path d="M71 79l8 8" stroke="#3974FC" strokeWidth="2.4" strokeLinecap="round" />
        <text x="88" y="78" fontSize="14" fill="#002E6E" fontFamily="inherit" fontWeight="600">
          98765 43210
        </text>
        <rect x="70" y="112" width="180" height="40" rx="14" fill="#fff" />
        <circle cx="92" cy="132" r="10" fill="#C5D7F7" />
        <text x="112" y="128" fontSize="11" fill="#0F172A" fontFamily="inherit" fontWeight="700">
          Rahul Sharma
        </text>
        <text x="112" y="142" fontSize="8" fill="#64748B" fontFamily="inherit">
          Class 8 · Enrolled
        </text>
      </Scene>
    ),
    visits: (
      <Scene>
        <line x1="72" y1="28" x2="72" y2="152" stroke="#C5D7F7" strokeWidth="3" />
        {[
          { y: 40, t: "First visit", d: "12 Jan", c: "#3974FC" },
          { y: 88, t: "Call logged", d: "18 Jan", c: "#1FA855" },
          { y: 136, t: "Meeting", d: "05 Feb", c: "#B45309" },
        ].map((row) => (
          <g key={row.t}>
            <circle cx="72" cy={row.y} r="8" fill={row.c} />
            <rect x="100" y={row.y - 18} width="168" height="36" rx="12" fill="#fff" />
            <text x="114" y={row.y - 2} fontSize="11" fill="#0F172A" fontFamily="inherit" fontWeight="700">
              {row.t}
            </text>
            <text x="114" y={row.y + 12} fontSize="8" fill="#64748B" fontFamily="inherit">
              {row.d}
            </text>
          </g>
        ))}
      </Scene>
    ),
    roll: (
      <Scene>
        <rect x="58" y="28" width="204" height="124" rx="18" fill="#fff" transform="rotate(-4 160 90)" />
        <rect x="70" y="36" width="180" height="108" rx="14" fill="#002E6E" />
        <text x="160" y="62" textAnchor="middle" fontSize="9" fill="#C5D7F7" fontFamily="inherit">
          STUDENT ID
        </text>
        <text x="160" y="88" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="inherit" fontWeight="700">
          Rahul Sharma
        </text>
        <rect x="108" y="100" width="104" height="24" rx="12" fill="#FBBF24" />
        <text x="160" y="116" textAnchor="middle" fontSize="10" fill="#78350F" fontFamily="inherit" fontWeight="700">
          Roll 24 · Batch A
        </text>
      </Scene>
    ),
    pdf: (
      <Scene>
        <rect x="86" y="18" width="148" height="148" rx="8" fill="#fff" transform="rotate(6 160 92)" />
        <rect x="78" y="16" width="148" height="148" rx="8" fill="#fff" />
        <rect x="78" y="16" width="148" height="28" fill="#F59E0B" />
        <text x="152" y="35" textAnchor="middle" fontSize="10" fill="#78350F" fontFamily="inherit" fontWeight="700">
          FEE RECEIPT
        </text>
        <rect x="96" y="58" width="112" height="8" rx="4" fill="#FDE68A" />
        <rect x="96" y="74" width="88" height="8" rx="4" fill="#FEF3C7" />
        <rect x="96" y="90" width="104" height="8" rx="4" fill="#FEF3C7" />
        <text x="96" y="122" fontSize="13" fill="#92400E" fontFamily="inherit" fontWeight="700">
          ₹ 12,000
        </text>
        <rect x="96" y="132" width="72" height="18" rx="9" fill="#002E6E" />
        <text x="132" y="145" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="inherit">
          Download PDF
        </text>
      </Scene>
    ),
    reports: (
      <Scene>
        <rect x="40" y="108" width="28" height="44" rx="6" fill="#C5D7F7" />
        <rect x="84" y="78" width="28" height="74" rx="6" fill="#3974FC" />
        <rect x="128" y="54" width="28" height="98" rx="6" fill="#002E6E" />
        <rect x="172" y="90" width="28" height="62" rx="6" fill="#93C5FD" />
        <g transform="translate(228 40)">
          <rect width="64" height="64" rx="16" fill="#fff" />
          <line x1="12" y1="20" x2="52" y2="44" stroke="#EF4444" strokeWidth="3" />
          <text x="32" y="58" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="inherit">
            No Excel
          </text>
        </g>
      </Scene>
    ),
    exam: (
      <Scene>
        <rect x="70" y="24" width="180" height="132" rx="16" fill="#fff" />
        <rect x="88" y="42" width="90" height="10" rx="5" fill="#E2E8F0" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="88" y={68 + i * 24} width="70" height="8" rx="4" fill="#E8F0FF" />
            <rect x="198" y={64 + i * 24} width="28" height="16" rx="8" fill="#DCFCE7" />
          </g>
        ))}
        <circle cx="246" cy="40" r="22" fill="#FBBF24" />
        <text x="246" y="46" textAnchor="middle" fontSize="12" fill="#78350F" fontFamily="inherit" fontWeight="700">
          A+
        </text>
      </Scene>
    ),
    homework: (
      <Scene>
        <rect x="78" y="22" width="164" height="136" rx="8" fill="#fff" />
        <rect x="78" y="22" width="18" height="136" fill="#FCA5A5" />
        <rect x="112" y="44" width="110" height="8" rx="4" fill="#E2E8F0" />
        <rect x="112" y="64" width="96" height="8" rx="4" fill="#E2E8F0" />
        <g transform="translate(112 92)">
          <rect width="18" height="18" rx="4" fill="#1FA855" />
          <path d="M4 9l4 4 8-8" fill="none" stroke="#fff" strokeWidth="2" />
          <text x="28" y="14" fontSize="11" fill="#0F172A" fontFamily="inherit">
            Done
          </text>
        </g>
        <g transform="translate(112 122)">
          <rect width="18" height="18" rx="4" fill="#FEE2E2" />
          <text x="28" y="14" fontSize="11" fill="#64748B" fontFamily="inherit">
            Not done
          </text>
        </g>
      </Scene>
    ),
    staff: (
      <Scene>
        {[
          { x: 70, name: "Karan", c: "#C5D7F7" },
          { x: 160, name: "Sana", c: "#BBF7D0" },
          { x: 250, name: "Amit", c: "#FDE68A" },
        ].map((p) => (
          <g key={p.name} transform={`translate(${p.x} 58)`}>
            <circle r="28" fill="#fff" />
            <circle r="22" fill={p.c} />
            <circle cy="-4" r="8" fill="#002E6E" />
            <path d="M-14 16c2-8 8-12 14-12s12 4 14 12" fill="#002E6E" />
            <text y="52" textAnchor="middle" fontSize="10" fill="#0F172A" fontFamily="inherit" fontWeight="600">
              {p.name}
            </text>
          </g>
        ))}
        <rect x="96" y="148" width="128" height="20" rx="10" fill="#1FA855" />
        <text x="160" y="162" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="inherit" fontWeight="600">
          One WhatsApp number
        </text>
      </Scene>
    ),
  }[name];

  return <div className="h-full w-full">{art}</div>;
}
