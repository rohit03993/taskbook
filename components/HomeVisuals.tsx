import Image from "next/image";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PainIcon({ name }: { name: "phone" | "parents" | "visitor" }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-800">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        {name === "phone" && (
          <>
            <rect x="7" y="3" width="10" height="18" rx="2.2" {...stroke} />
            <path {...stroke} d="M10 6.5h4" />
            <circle cx="12" cy="17.5" r="0.9" fill="currentColor" stroke="none" />
          </>
        )}
        {name === "parents" && (
          <>
            <path {...stroke} d="M4.5 19v-2a3.5 3.5 0 0 1 3.5-3.5h.5" />
            <circle cx="8.2" cy="8" r="2.1" {...stroke} />
            <path {...stroke} d="M19.5 19v-2a3.5 3.5 0 0 0-3.5-3.5H15" />
            <circle cx="15.8" cy="8" r="2.1" {...stroke} />
            <path {...stroke} d="M12 13.5v3.5M10.5 15.5h3" />
          </>
        )}
        {name === "visitor" && (
          <>
            <circle cx="10" cy="8.2" r="2.3" {...stroke} />
            <path {...stroke} d="M5 19c.7-3 2.6-4.6 5-4.6 1.6 0 3 .7 4 1.9" />
            <circle cx="17.5" cy="8" r="3.2" {...stroke} />
            <path {...stroke} d="M16.3 7.2c.2-.7.8-1.1 1.4-1.1.8 0 1.4.5 1.4 1.3 0 .7-.5 1-1 1.3-.4.2-.6.5-.6.9" />
            <circle cx="17.5" cy="11.3" r="0.5" fill="currentColor" stroke="none" />
          </>
        )}
      </svg>
    </span>
  );
}

export function HeroVisual() {
  return (
    <>
      <div className="relative mx-auto aspect-[5/4] w-full overflow-hidden rounded-[1.35rem] bg-[#e8eee8] ring-1 ring-navy-900/10 lg:hidden">
        <Image
          src="/inside/hero-inbox.png"
          alt="WhatsApp inbox in the CRM — staff chat on the same Meta number"
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent px-4 pb-3.5 pt-10 text-sm font-medium text-white">
          Staff chat from the CRM. Same Meta number.
        </p>
      </div>
      <div className="relative mx-auto hidden h-[540px] w-full max-w-none lg:block">
        <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-navy-50 via-white to-[#E8F8EE]" />
        <div className="absolute left-2 right-10 top-5 overflow-hidden rounded-[1.5rem] bg-white shadow-device ring-1 ring-navy-900/5">
          <div className="relative h-52 bg-[#e8eee8]">
            <Image
              src="/inside/hero-inbox.png"
              alt="WhatsApp inbox in the CRM"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-wa">In the CRM</p>
            <p className="mt-0.5 text-sm font-medium text-navy-900">Staff chat. Same Meta number.</p>
          </div>
        </div>
        <div className="absolute bottom-[8.25rem] right-0 w-[74%] overflow-hidden rounded-[1.4rem] bg-white shadow-device ring-1 ring-navy-900/5">
          <div className="relative h-32 bg-[#e8eaf4]">
            <Image
              src="/inside/hero-search.png"
              alt="Search by mobile number"
              fill
              sizes="(min-width: 1024px) 30vw, 70vw"
              className="object-cover object-center"
            />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-sm font-medium text-navy-900">Type the number. File opens.</p>
          </div>
        </div>
        <div className="absolute bottom-2 left-0 w-[60%] overflow-hidden rounded-[1.4rem] bg-white shadow-device ring-1 ring-navy-900/5">
          <div className="relative h-32 bg-[#e8eee8]">
            <Image
              src="/inside/hero-punch.png"
              alt="Parent gets WhatsApp when the child punches in"
              fill
              sizes="(min-width: 1024px) 28vw, 60vw"
              className="object-cover object-center"
            />
          </div>
          <div className="px-4 py-2.5">
            <p className="text-sm font-medium text-navy-900">Parent gets WhatsApp.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function AudienceMark({ name }: { name: "schools" | "colleges" | "institutes" }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-50 text-navy-800">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        {name === "schools" && (
          <>
            <path {...stroke} d="M4 19h16M6 19V10l6-4 6 4v9" />
            <path {...stroke} d="M10 19v-5h4v5" />
          </>
        )}
        {name === "colleges" && (
          <>
            <path {...stroke} d="M3 10 12 5l9 5-9 5-9-5Z" />
            <path {...stroke} d="M7 12.2V17c1.8 1.2 3.5 1.8 5 1.8s3.2-.6 5-1.8v-4.8" />
          </>
        )}
        {name === "institutes" && (
          <>
            <rect x="4" y="8" width="16" height="11" rx="1.5" {...stroke} />
            <path {...stroke} d="M8 8V6.5A4 4 0 0 1 12 4a4 4 0 0 1 4 2.5V8" />
          </>
        )}
      </svg>
    </span>
  );
}
