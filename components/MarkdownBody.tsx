import Link from "next/link";

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <span key={i}>{part}</span>;
        const href = m[2];
        if (href.startsWith("/")) {
          return (
            <Link key={i} href={href} className="font-semibold text-navy-600 hover:text-navy-900">
              {m[1]}
            </Link>
          );
        }
        return (
          <a key={i} href={href} className="font-semibold text-navy-600 hover:text-navy-900">
            {m[1]}
          </a>
        );
      })}
    </>
  );
}

export function MarkdownBody({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n\n+/).filter((b) => b.trim());

  return (
    <div className="space-y-5 text-base leading-relaxed text-navy-800">
      {blocks.map((raw, i) => {
        const block = raw.trim();
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="font-display text-xl text-navy-900">
              <RichText text={block.slice(4)} />
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="font-display text-2xl text-navy-900">
              <RichText text={block.slice(3)} />
            </h2>
          );
        }
        if (block.split("\n").every((line) => line.trim().startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {block.split("\n").map((line) => (
                <li key={line}>
                  <RichText text={line.replace(/^\s*-\s+/, "")} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <RichText text={block} />
          </p>
        );
      })}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
