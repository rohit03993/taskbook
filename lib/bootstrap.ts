import { posts } from "../content/blog";
import { site } from "../content/site";
import { seedContentEntries, repairStalePlanBlocks } from "./content";
import { scoreKeyword } from "./keyword-score";
import { dbConfigured, prisma } from "./prisma";

const agraFaqs = [
  {
    q: "Is Task Book school software available in Agra?",
    a: "Yes. We set up your Agra school, college, or institute on its own install. Your students and WhatsApp chats stay with you — not in a shared cloud with other campuses.",
  },
  {
    q: "Does the parent WhatsApp come from a counsellor’s personal phone?",
    a: "No. Attendance and fee reminders go on your official Meta-approved number. Staff log in to the CRM and talk from there. If one person is on leave, the next staff opens the same chat.",
  },
  {
    q: "Can I type a mobile number and see the full file?",
    a: "Yes. That is the front-desk habit. If they are a student you see visits, fees, attendance, and messages. If they are still a visitor, you see visits, whom they met, and how many times your team called.",
  },
  {
    q: "Do you lock chat to one agent?",
    a: "No. There is no chat lock. The inbox is shared. Replies show the staff name.",
  },
  {
    q: "Is the price printed on this page?",
    a: "Three packs: Starter ₹3,000 (attendance + WhatsApp inbox), Starter + Fees ₹6,000, Full CRM ₹10,000. GST extra. Meta WhatsApp usage is billed by Meta. One campus per install.",
  },
];

const indiaFaqs = [
  {
    q: "Is Task Book for schools across India?",
    a: "Yes. It is school, college, and institute software with official WhatsApp. Each campus is its own install — not one login for a hundred schools.",
  },
  {
    q: "What do parents get on WhatsApp?",
    a: "When you switch it on: punch-in attendance, fee reminders with pending amount, and replies from the shared CRM inbox. Same Meta-approved institute number.",
  },
  {
    q: "Is this a national Play Store app for every school?",
    a: "No. The parent login is your institute’s portal. Staff work in your CRM. We set up your campus.",
  },
  {
    q: "Where do I start if I am in a city like Agra?",
    a: "Open the city page for local wording, or book a demo. We show walk-in, chat, and the fee PDF on your kind of institute.",
  },
];

export async function bootstrapCms() {
  if (!dbConfigured()) return;

  if (!(await prisma.setting.findUnique({ where: { id: "site" } }))) {
    await prisma.setting.create({
      data: {
        id: "site",
        whatsappNumber: site.whatsappNumber,
        whatsappMessage: "Hi, I run a school/college/institute and want a Task Book demo.",
        email: site.email,
        webhookUrl: process.env.LEADS_WEBHOOK_URL ?? "",
      },
    });
  }

  if (!(await prisma.blogPost.count())) {
    for (const post of posts) {
      const body = post.body.join("\n\n");
      const focus = post.slug.includes("attendance")
        ? "school attendance WhatsApp"
        : post.slug.includes("fee")
          ? "late fee reminder WhatsApp"
          : post.slug.includes("crm")
            ? "school CRM WhatsApp"
            : post.slug.includes("college")
              ? "college enquiry WhatsApp"
              : post.slug.includes("coaching")
                ? "coaching institute software"
                : post.slug.includes("staff")
                  ? "staff attendance school"
                  : post.slug.includes("portal")
                    ? "parent portal WhatsApp"
                    : "school software WhatsApp";
      const report = scoreKeyword({
        focusKeyword: focus,
        title: post.title,
        slug: post.slug,
        metaDescription: post.description,
        body,
      });
      await prisma.blogPost.create({
        data: {
          slug: post.slug,
          title: post.title,
          description: post.description,
          body,
          metaTitle: post.title,
          metaDescription: post.description,
          ogTitle: "",
          ogDescription: "",
          focusKeyword: focus,
          published: true,
          publishedAt: new Date(post.date),
          readMinutes: post.readMinutes,
          keywordScore: report.score,
        },
      });
    }
  }

  if (!(await prisma.locationPage.count())) {
    await prisma.locationPage.create({
      data: {
        slug: "agra",
        city: "Agra",
        headline: "School software in Agra — WhatsApp to parents, file from a mobile number",
        intro:
          "If you run a school, college, or coaching in Agra, the morning is the same story: parents calling to ask if the child reached, fees chased on paper, and admissions WhatsApp stuck on one counsellor’s phone. Task Book is set up for your campus — one install, your data — so punch-in can go on official WhatsApp, the fee PDF is generated after collection, and any staff login can open the same chat.",
        body: `## What Agra owners actually lose

The office phone is busy with questions the school already knows. A visitor who came last month is treated as new. If the counsellor who held the institute WhatsApp is on leave, nobody can see what the parent already said.

## How Task Book is set up here

We sit with your staff. Classes, fee rules, logins, and Meta WhatsApp templates are configured for your institute — not copied from another city campus. This is not one database shared with a hundred schools.

## What parents and staff see

- Child punches in — parent can get WhatsApp from your institute number.
- Fee pending — reminder with amount and due date, on approved templates.
- Staff type the registered mobile. The full file opens: visits, calls, fees, attendance, messages.
- Collect in the office. The receipt PDF is already there — View PDF or Download PDF.

## Honest limits

There is no chat lock. We do not sell a public India-wide parent app for every school. Price depends on size and WhatsApp use — ask for a quote, do not look for a fake rupee figure on this site.

See [WhatsApp in the CRM](/features/whatsapp-inbox), [attendance WhatsApp](/features/whatsapp-attendance), and [fees](/features/fees). For a national overview, read [school software in India](/locations/india).`,
        metaTitle: "Best school software in Agra | Task Book WhatsApp CRM",
        metaDescription:
          "School software in Agra with official WhatsApp attendance, fee reminders, and a shared CRM inbox. One install per campus. Book a demo.",
        focusKeyword: "school software in Agra",
        faqsJson: JSON.stringify(agraFaqs),
        published: true,
      },
    });
    await prisma.locationPage.create({
      data: {
        slug: "india",
        city: "India",
        headline: "School software in India — WhatsApp CRM for one campus at a time",
        intro:
          "Task Book is for school, college, and institute owners in India who want attendance and fee reminders on official WhatsApp, and a student file that opens when you type a mobile number. We set up your institute. Your students and chats stay with you.",
        body: `## Built for how Indian campuses actually work

Front desk, counsellor, accountant, teacher. Different people. One Meta-approved number. Chat history does not sit on a personal phone.

## What you can run

WhatsApp inbox in the CRM, live attendance messages, fee PDF receipts, leads and calling, parent login for the copy they can download later. Packs: Starter ₹3,000, Starter + Fees ₹6,000, Full CRM ₹10,000.

## City pages

If you want local wording, start with [school software in Agra](/locations/agra). More cities can be added from the Task Book admin.

## What we do not claim

We do not promise rank 1 on Google. We do not put a made-up price. We do not run a hundred schools in one database.`,
        metaTitle: "School software in India | Task Book WhatsApp CRM",
        metaDescription:
          "School, college and institute CRM in India with Meta WhatsApp, punch-in messages, fee receipts, and a file from a mobile number. One campus per install.",
        focusKeyword: "school software in India",
        faqsJson: JSON.stringify(indiaFaqs),
        published: true,
      },
    });
  }

  if (!(await prisma.contentBlock.count())) {
    for (const entry of seedContentEntries()) {
      await prisma.contentBlock.create({ data: entry });
    }
  }

  await repairStalePlanBlocks();
}
