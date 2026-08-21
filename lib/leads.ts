import type { LeadStatus } from "@prisma/client";
import { prisma, withDb } from "@/lib/prisma";

export type { LeadStatus };

export type Lead = {
  id: string;
  name: string;
  mobile: string;
  institute: string;
  type?: string;
  city?: string;
  students?: string;
  headache?: string;
  status: LeadStatus;
  note: string;
  at: string;
};

function mapLead(row: {
  id: string;
  name: string;
  mobile: string;
  institute: string;
  type: string;
  city: string;
  students: string;
  headache: string;
  status: LeadStatus;
  note: string;
  createdAt: Date;
}): Lead {
  return {
    id: row.id,
    name: row.name,
    mobile: row.mobile,
    institute: row.institute,
    type: row.type,
    city: row.city,
    students: row.students,
    headache: row.headache,
    status: row.status,
    note: row.note,
    at: row.createdAt.toISOString(),
  };
}

export async function listLeads(): Promise<Lead[]> {
  return withDb(async (db) => {
    const rows = await db.lead.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(mapLead);
  }, []);
}

export async function addLead(
  input: Omit<Lead, "id" | "status" | "note" | "at"> & { at?: string },
) {
  const created = await prisma.lead.create({
    data: {
      name: input.name,
      mobile: input.mobile,
      institute: input.institute,
      type: input.type ?? "",
      city: input.city ?? "",
      students: input.students ?? "",
      headache: input.headache ?? "",
      createdAt: input.at ? new Date(input.at) : undefined,
    },
  });
  return mapLead(created);
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, "status" | "note">>) {
  try {
    const row = await prisma.lead.update({
      where: { id },
      data: {
        ...(patch.status ? { status: patch.status } : {}),
        ...(typeof patch.note === "string" ? { note: patch.note } : {}),
      },
    });
    return mapLead(row);
  } catch {
    return null;
  }
}

export async function deleteLead(id: string) {
  try {
    await prisma.lead.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function leadCounts() {
  return withDb(async (db) => {
    const [total, fresh] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { status: "new" } }),
    ]);
    return { total, fresh };
  }, { total: 0, fresh: 0 });
}
