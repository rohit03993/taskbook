# Task Book marketing website

Public SaaS site for school, college, and institute owners. This is **not** the CRM. The product lives in `Full school soft/school-crm`.

## Run locally

```bash
cd website
copy .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (country code + number, digits only) in `.env.local`. Optional: `LEADS_WEBHOOK_URL` to forward demo form posts.

Demo leads are stored in `data/leads.json` when the filesystem is writable.

## Build

```bash
npm run build
npm start
```

Point `taskbook.co.in` at this app. Keep `*.taskbook.co.in` for institute logins.
