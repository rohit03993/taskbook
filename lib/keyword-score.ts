export type KeywordLabel = "Ready" | "Weak" | "Off-topic";

export type KeywordReport = {
  score: number;
  label: KeywordLabel;
  missing: string[];
  notes: string[];
};

const RELATED = ["school", "whatsapp", "crm", "fee", "fees", "attendance", "parent", "institute", "college"];

function flatten(text: string) {
  return text.toLowerCase().replace(/[_/]+/g, " ").replace(/\s+/g, " ").trim();
}

function hasPhrase(haystack: string, phrase: string) {
  if (!phrase) return false;
  return flatten(haystack).includes(flatten(phrase));
}

function wordCount(text: string) {
  return flatten(text).split(" ").filter(Boolean).length;
}

export function scoreKeyword(input: {
  focusKeyword: string;
  title: string;
  slug: string;
  metaDescription: string;
  body: string;
  extraKeywords?: string;
  cityTag?: string;
}): KeywordReport {
  const focus = input.focusKeyword.trim();
  const missing: string[] = [];
  const notes: string[] = [];
  let score = 0;

  if (!focus) {
    return { score: 0, label: "Off-topic", missing: ["Add a focus keyword."], notes: [] };
  }

  if (hasPhrase(input.title, focus)) score += 20;
  else missing.push("Put the focus phrase in the title.");

  if (hasPhrase(input.title, focus)) score += 15;
  else missing.push("The H1 (title) should contain the focus phrase.");

  const slugText = input.slug.replace(/-/g, " ");
  if (hasPhrase(slugText, focus) || focus.split(/\s+/).every((w) => slugText.toLowerCase().includes(w.toLowerCase()))) {
    score += 15;
  } else missing.push("Use the focus words in the URL slug.");

  if (hasPhrase(input.metaDescription, focus)) score += 15;
  else missing.push("Mention the focus phrase in the meta description.");

  const firstWords = flatten(input.body).split(" ").slice(0, 100).join(" ");
  if (hasPhrase(firstWords, focus)) score += 15;
  else missing.push("Use the focus phrase in the first ~100 words.");

  const words = wordCount(input.body);
  const occurrences = flatten(input.body).split(flatten(focus)).length - 1;
  const density = words ? (occurrences * focus.split(/\s+/).length) / words : 0;
  if (occurrences === 0) {
    missing.push("The body never uses the focus phrase.");
  } else if (density > 0.035) {
    notes.push("Keyword density looks high — ease off so it does not read as stuffing.");
    score += 4;
  } else {
    score += 10;
  }

  const relatedPool = `${input.body} ${input.extraKeywords ?? ""} ${input.cityTag ?? ""} ${input.title}`;
  const relatedHits = RELATED.filter((w) => flatten(relatedPool).includes(w));
  if (input.cityTag && hasPhrase(relatedPool, input.cityTag)) relatedHits.push("city");
  if (relatedHits.length >= 3) score += 10;
  else {
    score += Math.min(8, relatedHits.length * 3);
    missing.push("Add related words (school, WhatsApp, CRM, fees, attendance, or the city).");
  }

  score = Math.max(0, Math.min(100, score));
  const label: KeywordLabel = score >= 70 ? "Ready" : score >= 40 ? "Weak" : "Off-topic";
  return { score, label, missing, notes };
}
