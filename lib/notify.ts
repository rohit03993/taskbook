type LeadNotice = {
  name?: string;
  mobile?: string;
  institute?: string;
  type?: string;
  city?: string;
  students?: string;
  headache?: string;
  at?: string;
};

function leadText(lead: LeadNotice) {
  return [
    "New Task Book demo request",
    "",
    `Name: ${lead.name || "—"}`,
    `Mobile: ${lead.mobile || "—"}`,
    `Institute: ${lead.institute || "—"}`,
    `Type: ${lead.type || "—"}`,
    `City: ${lead.city || "—"}`,
    `Students: ${lead.students || "—"}`,
    `Headache: ${lead.headache || "—"}`,
    `At: ${lead.at || new Date().toISOString()}`,
  ].join("\n");
}

async function postWebhook(url: string, lead: LeadNotice) {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
}

async function sendEmail(to: string, lead: LeadNotice) {
  const host = process.env.SMTP_HOST?.trim();
  if (!host || !to.trim()) return;

  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS ?? "";
  const from = process.env.SMTP_FROM?.trim() || user;
  if (!from) return;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user ? { user, pass } : undefined,
  });

  await transport.sendMail({
    from,
    to,
    subject: `Task Book demo — ${lead.institute || lead.name || "new lead"}`,
    text: leadText(lead),
  });
}

/** Tell the sales inbox. A failed ping does not undo the saved lead. */
export async function notifyLead(lead: LeadNotice, opts: { webhook?: string; email?: string }) {
  const webhook = opts.webhook?.trim();
  const email = (process.env.LEADS_NOTIFY_EMAIL || opts.email || "").trim();
  const jobs: Promise<unknown>[] = [];
  if (webhook) jobs.push(postWebhook(webhook, lead));
  if (email) jobs.push(sendEmail(email, lead));
  if (!jobs.length) return;

  const results = await Promise.allSettled(jobs);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Lead notify failed", result.reason);
    }
  }
}
