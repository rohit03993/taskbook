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

export async function getPricingContent() {
  const blocks = await getBlocks();
  return {
    kicker: block(blocks, "pricing.kicker", "Pricing"),
    title: block(
      blocks,
      "pricing.title",
      "Choose a pack. Ask for a quote. We set it up for your institute.",
    ),
    body: block(
      blocks,
      "pricing.body",
      "These are the real packs in the product. We do not print a made-up rupee number. Full CRM is what most owners take — WhatsApp in the CRM, leads, calling, and parent login.",
    ),
    plans: plans.map((p) => ({
      ...p,
      name: block(blocks, `plan.${p.id}.name`, p.name),
      blurb: block(blocks, `plan.${p.id}.blurb`, p.blurb),
      includes: parseList(blocks[`plan.${p.id}.includes`], p.includes),
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
    {
      key: "pricing.title",
      value: "Choose a pack. Ask for a quote. We set it up for your institute.",
    },
    {
      key: "pricing.body",
      value:
        "These are the real packs in the product. We do not print a made-up rupee number. Full CRM is what most owners take — WhatsApp in the CRM, leads, calling, and parent login.",
    },
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
