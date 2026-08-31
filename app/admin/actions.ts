"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminCookie, getStaff, hashPassword, loginWithPhone, requireOwner } from "@/lib/admin-auth";
import { deleteLead, updateLead, type LeadStatus } from "@/lib/leads";
import { saveBrandingUpload } from "@/lib/branding";
import { getSettings, saveSettings } from "@/lib/settings";
import { deletePost, savePost, type BlogInput } from "@/lib/blog";
import { deleteLocation, saveLocation, type LocationFaq, type LocationInput } from "@/lib/locations";
import { upsertBlocks } from "@/lib/content";
import { normalizePhone, phoneLooksValid } from "@/lib/phone";
import { prisma } from "@/lib/prisma";

async function guard() {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

export async function loginAction(formData: FormData) {
  const result = await loginWithPhone(String(formData.get("phone") ?? ""), String(formData.get("password") ?? ""));
  if ("error" in result && result.error) return { error: result.error };
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function saveSettingsAction(formData: FormData): Promise<{ error?: string } | void> {
  const staff = await guard();
  if (staff.role !== "owner") return;
  const current = await getSettings();
  let logoUrl = current.logoUrl;
  let faviconUrl = current.faviconUrl;
  try {
    const nextLogo = await saveBrandingUpload(formData.get("logo") as File | null, "logo");
    const nextFavicon = await saveBrandingUpload(formData.get("favicon") as File | null, "favicon");
    if (nextLogo) logoUrl = nextLogo;
    if (nextFavicon) faviconUrl = nextFavicon;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save the image." };
  }
  if (String(formData.get("clearLogo") ?? "") === "on") logoUrl = "";
  if (String(formData.get("clearFavicon") ?? "") === "on") faviconUrl = "";
  await saveSettings({
    whatsappNumber: String(formData.get("whatsappNumber") ?? ""),
    whatsappMessage: String(formData.get("whatsappMessage") ?? ""),
    email: String(formData.get("email") ?? ""),
    webhookUrl: String(formData.get("webhookUrl") ?? ""),
    logoUrl,
    faviconUrl,
  });
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/login");
}

export async function updateLeadAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "new") as LeadStatus;
  const note = String(formData.get("note") ?? "");
  if (!id) return;
  await updateLead(id, { status, note });
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteLead(id);
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}

function bool(formData: FormData, name: string) {
  return String(formData.get(name) ?? "") === "on" || String(formData.get(name) ?? "") === "true";
}

function blogFromForm(formData: FormData): BlogInput {
  return {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    body: String(formData.get("body") ?? ""),
    metaTitle: String(formData.get("metaTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    ogTitle: String(formData.get("ogTitle") ?? ""),
    ogDescription: String(formData.get("ogDescription") ?? ""),
    canonicalPath: String(formData.get("canonicalPath") ?? ""),
    focusKeyword: String(formData.get("focusKeyword") ?? ""),
    extraKeywords: String(formData.get("extraKeywords") ?? ""),
    cityTag: String(formData.get("cityTag") ?? ""),
    published: bool(formData, "published"),
    readMinutes: Number(formData.get("readMinutes") ?? 5) || 5,
  };
}

export async function savePostAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "") || null;
  const { row } = await savePost(id, blogFromForm(formData));
  revalidatePath("/blog");
  revalidatePath(`/blog/${row.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${row.id}`);
}

export async function deletePostAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deletePost(id);
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

function faqsFromForm(formData: FormData): LocationFaq[] {
  const faqs: LocationFaq[] = [];
  for (let i = 0; i < 6; i++) {
    const q = String(formData.get(`faq_q_${i}`) ?? "").trim();
    const a = String(formData.get(`faq_a_${i}`) ?? "").trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

function locationFromForm(formData: FormData): LocationInput {
  return {
    slug: String(formData.get("slug") ?? ""),
    city: String(formData.get("city") ?? ""),
    headline: String(formData.get("headline") ?? ""),
    intro: String(formData.get("intro") ?? ""),
    body: String(formData.get("body") ?? ""),
    metaTitle: String(formData.get("metaTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    focusKeyword: String(formData.get("focusKeyword") ?? ""),
    faqs: faqsFromForm(formData),
    published: bool(formData, "published"),
  };
}

export async function saveLocationAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "") || null;
  const row = await saveLocation(id, locationFromForm(formData));
  revalidatePath("/locations");
  revalidatePath(`/locations/${row.slug}`);
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/locations");
  redirect(`/admin/locations/${row.id}`);
}

export async function deleteLocationAction(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteLocation(id);
  revalidatePath("/locations");
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/locations");
  redirect("/admin/locations");
}

export async function saveContentAction(formData: FormData) {
  await guard();
  const keys = formData.getAll("key").map(String);
  const values = formData.getAll("value").map(String);
  const entries = keys.map((key, i) => ({ key, value: values[i] ?? "" }));
  await upsertBlocks(entries);
  revalidatePath("/", "layout");
  revalidatePath("/features");
  revalidatePath("/pricing");
  revalidatePath("/admin/content");
  return { ok: true };
}

export async function createStaffAction(formData: FormData) {
  if (!(await requireOwner())) return { error: "Only the owner can add staff." };
  const name = String(formData.get("name") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "editor") === "owner" ? "owner" : "editor";
  if (!name || !phoneLooksValid(phone)) return { error: "Name and a valid phone are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  try {
    await prisma.adminUser.create({
      data: { name, phone, passwordHash: await hashPassword(password), role },
    });
  } catch {
    return { error: "That phone is already used." };
  }
  revalidatePath("/admin/staff");
  return { ok: true };
}

export async function deleteStaffAction(formData: FormData): Promise<void> {
  const owner = await requireOwner();
  if (!owner) return;
  const id = String(formData.get("id") ?? "");
  if (!id || id === owner.id) return;
  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/staff");
}
