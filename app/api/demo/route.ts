import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

type Lead = {
  name?: string;
  mobile?: string;
  institute?: string;
  type?: string;
  city?: string;
  students?: string;
  headache?: string;
  at: string;
};

function isLead(body: unknown): body is Omit<Lead, "at"> {
  if (!body || typeof body !== "object") return false;
  const row = body as Record<string, unknown>;
  return typeof row.name === "string" && typeof row.mobile === "string" && typeof row.institute === "string";
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isLead(json)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lead: Lead = { ...json, at: new Date().toISOString() };

  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "leads.json");
  try {
    await mkdir(dir, { recursive: true });
    let existing: Lead[] = [];
    try {
      existing = JSON.parse(await readFile(file, "utf8")) as Lead[];
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }
    existing.push(lead);
    await writeFile(file, JSON.stringify(existing, null, 2), "utf8");
  } catch {
    // Vercel-style hosts may be read-only; still accept the lead.
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      // ignore webhook failure — form already captured
    }
  }

  return NextResponse.json({ ok: true });
}
