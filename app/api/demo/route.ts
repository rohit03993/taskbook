import { NextResponse } from "next/server";
import { addLead } from "@/lib/leads";
import { getSettings } from "@/lib/settings";

function isLead(body: unknown): body is {
  name: string;
  mobile: string;
  institute: string;
  type?: string;
  city?: string;
  students?: string;
  headache?: string;
} {
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

  let lead = null;
  try {
    lead = await addLead(json);
  } catch {
    lead = { ...json, at: new Date().toISOString() };
  }

  const settings = await getSettings();
  const webhook = settings.webhookUrl || process.env.LEADS_WEBHOOK_URL;
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
