import { modules, type ModulePage } from "../content/modules";
import { plans } from "../content/plans";
import { hero, howItWorks, pains } from "../content/site";
import { prisma, withDb } from "./prisma";

export async function getBlocks(): Promise<Record<string, string>> {
  return withDb(async (db) => {
    const rows = await db.contentBlock.findMany();
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  }, {});
}

export function block(blocks: Record<string, string>, key: string, fallback: string) {
  const value = blocks[key];
  return value && value.trim() ? value : fallback;
}

export async function upsertBlocks(entries: { key: string; value: string }[]) {
  await prisma.$transaction(
    entries.map((entry) =>
      prisma.contentBlock.upsert({
        where: { key: entry.key },
        create: entry,
        update: { value: entry.value },
      }),
    ),
  );
}

function parseList(raw: string | undefined, fallback: readonly string[]) {
  if (!raw?.trim()) return [...fallback];
  const trimmed = raw.trim();
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) return parsed;
    } catch {
      /* fall through */
    }
  }
  return trimmed
    .split("\n")
    .map((l) => l.replace(/^\s*[-•]\s*/, "").trim())
    .filter(Boolean);
}

export async function getHomeContent() {
  const blocks = await getBlocks();
  return {
    hero: {
      headline: block(blocks, "hero.headline", hero.headline),
      subhead: block(blocks, "hero.subhead", hero.subhead),
    },
    pains: pains.map((p) => ({
      n: p.n,
      title: block(blocks, `pains.${p.n}.title`, p.title),
      body: block(blocks, `pains.${p.n}.body`, p.body),
    })),
    howItWorks: howItWorks.map((s) => ({
      step: s.step,
      title: block(blocks, `how.${s.step}.title`, s.title),
      body: block(blocks, `how.${s.step}.body`, s.body),
    })),
  };
}

function freshCopy(stored: string | undefined, fallback: string, staleBits: string[]) {
  if (!stored?.trim()) return fallback;
  if (staleBits.some((bit) => stored.includes(bit))) return fallback;
  return stored;
}

/** Old public copy that no longer matches the CRM licence packs. */
const STALE_PLAN_COPY = [
  "Starter + Fees",
  "Official WhatsApp inbox in the CRM",
  "Attendance WhatsApp to parents (when you switch it on)",
  "Homework, exams, results, PDF marksheets",
  "Punch attendance. Chat from the CRM",
  "plus collect fees and send the PDF receipt",
  "The full desk:",
  "all features",
  "Starter is attendance plus the WhatsApp inbox",
  "the whole desk",
  "Official WhatsApp conversation charges",
];

function freshIncludes(raw: string | undefined, fallback: readonly string[]) {
  const items = parseList(raw, fallback);
  const blob = items.join("\n");
  if (STALE_PLAN_COPY.some((bit) => blob.includes(bit))) return [...fallback];
  return items;
}

const PRICING_TITLE = "Four licences. Starter from ₹3,000 a month.";
const PRICING_BODY =
  "Starter is attendance and marks. Academic Plus adds fees, homework, and teacher tracking. Full CRM adds leads, calling, admission, WhatsApp, the parent login, reports, and the institute website. Full results adds published results, marksheets, and certificates. GST extra. Meta WhatsApp usage is billed by Meta. One campus, one install.";
const PRICING_FOOTNOTE =
  "Each institute is its own install. The licence turns a module on or off. Turning one off hides it and keeps the data. GST extra. Official WhatsApp charges are from Meta, on top of the pack. Setup is quoted once.";

function isStale(value: string | null | undefined) {
  return Boolean(value && STALE_PLAN_COPY.some((bit) => value.includes(bit)));
}

/** Rewrite old pack copy in MySQL so Admin and the public page match the CRM licences. */
export async function repairStalePlanBlocks() {
  await withDb(async (db) => {
    await db.contentBlock.deleteMany({ where: { key: { startsWith: "plan.fees." } } });

    const pageBits: { key: string; value: string }[] = [
      { key: "pricing.title", value: PRICING_TITLE },
      { key: "pricing.body", value: PRICING_BODY },
      { key: "pricing.footnote", value: PRICING_FOOTNOTE },
    ];
    for (const bit of pageBits) {
      const row = await db.contentBlock.findUnique({ where: { key: bit.key } });
      if (row && isStale(row.value)) {
        await db.contentBlock.update({ where: { key: bit.key }, data: { value: bit.value } });
      }
    }

    for (const p of plans) {
      const fields: { suffix: string; value: string }[] = [
        { suffix: "name", value: p.name },
        { suffix: "blurb", value: p.blurb },
        { suffix: "price", value: p.price },
        { suffix: "priceSuffix", value: p.priceSuffix },
        { suffix: "priceCaption", value: p.priceCaption },
        { suffix: "includes", value: JSON.stringify(p.includes) },
      ];
      for (const field of fields) {
        const key = `plan.${p.id}.${field.suffix}`;
        const row = await db.contentBlock.findUnique({ where: { key } });
        if (row && isStale(row.value)) {
          await db.contentBlock.update({ where: { key }, data: { value: field.value } });
        }
      }
    }
    return true;
  }, false);
}

export async function getPricingContent() {
  await repairStalePlanBlocks();
  const blocks = await getBlocks();
  return {
    kicker: block(blocks, "pricing.kicker", "Pricing"),
    title: freshCopy(blocks["pricing.title"], PRICING_TITLE, STALE_PLAN_COPY),
    body: freshCopy(blocks["pricing.body"], PRICING_BODY, STALE_PLAN_COPY),
    footnote: freshCopy(blocks["pricing.footnote"], PRICING_FOOTNOTE, STALE_PLAN_COPY),
    plans: plans.map((p) => ({
      ...p,
      name: freshCopy(blocks[`plan.${p.id}.name`], p.name, STALE_PLAN_COPY),
      blurb: freshCopy(blocks[`plan.${p.id}.blurb`], p.blurb, STALE_PLAN_COPY),
      price: block(blocks, `plan.${p.id}.price`, p.price),
      priceSuffix: block(blocks, `plan.${p.id}.priceSuffix`, p.priceSuffix),
      priceCaption: freshCopy(blocks[`plan.${p.id}.priceCaption`], p.priceCaption, STALE_PLAN_COPY),
      includes: freshIncludes(blocks[`plan.${p.id}.includes`], p.includes),
    })),
  };
}

export async function getFeatureHubContent() {
  const blocks = await getBlocks();
  return {
    kicker: block(blocks, "features.kicker", "Features"),
    title: block(
      blocks,
      "features.title",
      "WhatsApp in the CRM. Visitor file. Student file. Fee slip. Report.",
    ),
    body: block(
      blocks,
      "features.body",
      "Start with the problem: chat should not live on one phone, and a mobile number should open the full person. Rest of the modules support that.",
    ),
  };
}

export async function getResolvedModule(slug: string): Promise<ModulePage | null> {
  const base = modules.find((m) => m.slug === slug);
  if (!base) return null;
  const blocks = await getBlocks();
  const p = `module.${slug}`;
  return {
    ...base,
    nav: block(blocks, `${p}.nav`, base.nav),
    title: block(blocks, `${p}.title`, base.title),
    pain: block(blocks, `${p}.pain`, base.pain),
    does: block(blocks, `${p}.does`, base.does),
    whatsappWhen: block(blocks, `${p}.whatsappWhen`, base.whatsappWhen),
    bullets: parseList(blocks[`${p}.bullets`], base.bullets),
  };
}

export async function getResolvedModules(): Promise<ModulePage[]> {
  const blocks = await getBlocks();
  return modules.map((base) => {
    const p = `module.${base.slug}`;
    return {
      ...base,
      nav: block(blocks, `${p}.nav`, base.nav),
      title: block(blocks, `${p}.title`, base.title),
      pain: block(blocks, `${p}.pain`, base.pain),
      does: block(blocks, `${p}.does`, base.does),
      whatsappWhen: block(blocks, `${p}.whatsappWhen`, base.whatsappWhen),
      bullets: parseList(blocks[`${p}.bullets`], base.bullets),
    };
  });
}

export function seedContentEntries() {
  const entries: { key: string; value: string }[] = [
    { key: "hero.headline", value: hero.headline },
    { key: "hero.subhead", value: hero.subhead },
    { key: "pricing.kicker", value: "Pricing" },
    { key: "pricing.title", value: PRICING_TITLE },
    { key: "pricing.body", value: PRICING_BODY },
    { key: "pricing.footnote", value: PRICING_FOOTNOTE },
    { key: "features.kicker", value: "Features" },
    {
      key: "features.title",
      value: "WhatsApp in the CRM. Visitor file. Student file. Fee slip. Report.",
    },
    {
      key: "features.body",
      value:
        "Start with the problem: chat should not live on one phone, and a mobile number should open the full person. Rest of the modules support that.",
    },
  ];
  for (const p of pains) {
    entries.push({ key: `pains.${p.n}.title`, value: p.title });
    entries.push({ key: `pains.${p.n}.body`, value: p.body });
  }
  for (const s of howItWorks) {
    entries.push({ key: `how.${s.step}.title`, value: s.title });
    entries.push({ key: `how.${s.step}.body`, value: s.body });
  }
  for (const p of plans) {
    entries.push({ key: `plan.${p.id}.name`, value: p.name });
    entries.push({ key: `plan.${p.id}.blurb`, value: p.blurb });
    entries.push({ key: `plan.${p.id}.price`, value: p.price });
    entries.push({ key: `plan.${p.id}.priceSuffix`, value: p.priceSuffix });
    entries.push({ key: `plan.${p.id}.priceCaption`, value: p.priceCaption });
    entries.push({ key: `plan.${p.id}.includes`, value: JSON.stringify(p.includes) });
  }
  for (const m of modules) {
    entries.push({ key: `module.${m.slug}.nav`, value: m.nav });
    entries.push({ key: `module.${m.slug}.title`, value: m.title });
    entries.push({ key: `module.${m.slug}.pain`, value: m.pain });
    entries.push({ key: `module.${m.slug}.does`, value: m.does });
    entries.push({ key: `module.${m.slug}.whatsappWhen`, value: m.whatsappWhen });
    entries.push({ key: `module.${m.slug}.bullets`, value: JSON.stringify(m.bullets) });
  }
  return entries;
}
