# Task Book marketing website

Public site for school, college, and institute owners. This is not the CRM. The product lives in `Full school soft/school-crm`.

A demo request is saved in this site’s MySQL database and shown under `/admin/leads`. The walkthrough itself is a separate install of the school CRM.

## Run locally

```bash
cd website
copy .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Fill these in `.env.local` before the buttons and the admin work:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — country code + number, digits only
- `ADMIN_PHONE` and `ADMIN_PASSWORD` — owner login for `/admin`
- `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` — MySQL database for leads, blog, and settings

Optional:

- `LEADS_WEBHOOK_URL` — POST each new demo lead as JSON
- `LEADS_NOTIFY_EMAIL` plus `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — email the same lead

## Build

```bash
npm run build
npm start
```

Point `taskbook.co.in` at this app. Keep `*.taskbook.co.in` for institute logins.
