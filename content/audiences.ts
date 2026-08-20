export const audiences = {
  schools: {
    slug: "schools",
    label: "Schools",
    title: "Morning gate, parent WhatsApp, and the child’s full file on one number.",
    intro:
      "School owners lose time on two things: parents calling for attendance and fee, and front office not knowing who a visitor is. Task Book fixes both.",
    points: [
      "Attendance WhatsApp when the child punches in.",
      "Fee reminder on WhatsApp. Fee slip from the system.",
      "Type the mobile — student file or visitor file.",
      "Staff punch, so you know who is on campus.",
      "TC and bonafide from the same student file.",
    ],
  },
  colleges: {
    slug: "colleges",
    label: "Colleges",
    title: "Admissions WhatsApp should not live on one counsellor’s phone.",
    intro:
      "College desks call, take visits, then lose the chat when one person is away. Task Book keeps calling, visits and WhatsApp on the same person.",
    points: [
      "Call list in the CRM. Log every call.",
      "Same Meta number — any staff login can chat.",
      "Visit history: who they met, how many times they came.",
      "After admission: roll number, batch, fees.",
      "Type the mobile later — full student file.",
    ],
  },
  institutes: {
    slug: "institutes",
    label: "Institutes",
    title: "Demo class, visit, fee — the lead should not die in a personal chat.",
    intro:
      "Coaching owners live on follow-up. Task Book stores the visit, the call, then the batch. WhatsApp is in the CRM so the next counsellor can continue.",
    points: [
      "Walk-in visitor logged: whom they met, what they asked.",
      "Convert to student: roll number and batch.",
      "Batch attendance on WhatsApp to parents.",
      "Fee due campaigns from the same number.",
      "Saturday report from the system, not from Excel.",
    ],
  },
} as const;
