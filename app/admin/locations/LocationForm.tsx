import { AdminShell } from "@/app/admin/AdminShell";
import { saveLocationAction } from "@/app/admin/actions";
import { fieldClass, Field, SaveButton } from "@/app/admin/ui";
import type { LocationFaq } from "@/lib/locations";

type Initial = {
  id?: string;
  slug: string;
  city: string;
  headline: string;
  intro: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  faqs: LocationFaq[];
  published: boolean;
};

export function LocationForm({ initial }: { initial: Initial }) {
  const faqs = [...initial.faqs];
  while (faqs.length < 5) faqs.push({ q: "", a: "" });

  return (
    <form action={saveLocationAction} className="mt-8 space-y-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-navy-900/[0.06] sm:p-8">
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <Field label="City">
        <input name="city" required defaultValue={initial.city} className={fieldClass} />
      </Field>
      <Field label="Slug" hint="agra, india, jaipur…">
        <input name="slug" required defaultValue={initial.slug} className={fieldClass} />
      </Field>
      <Field label="Headline">
        <input name="headline" required defaultValue={initial.headline} className={fieldClass} />
      </Field>
      <Field label="Unique intro" hint="Do not clone another city. Write why this city is this page.">
        <textarea name="intro" rows={4} required defaultValue={initial.intro} className={fieldClass} />
      </Field>
      <Field label="Body" hint="Plain paragraphs. ## for headings. Link to features and blogs.">
        <textarea name="body" rows={12} required defaultValue={initial.body} className={fieldClass} />
      </Field>
      <Field label="Focus keyword">
        <input name="focusKeyword" required defaultValue={initial.focusKeyword} className={fieldClass} />
      </Field>
      <Field label="Meta title">
        <input name="metaTitle" required defaultValue={initial.metaTitle} className={fieldClass} />
      </Field>
      <Field label="Meta description">
        <textarea name="metaDescription" rows={2} required defaultValue={initial.metaDescription} className={fieldClass} />
      </Field>
      <p className="text-sm font-medium text-navy-900">FAQs (3–5)</p>
      {faqs.map((faq, i) => (
        <div key={i} className="grid gap-3 sm:grid-cols-2">
          <Field label={`Question ${i + 1}`}>
            <input name={`faq_q_${i}`} defaultValue={faq.q} className={fieldClass} />
          </Field>
          <Field label={`Answer ${i + 1}`}>
            <textarea name={`faq_a_${i}`} rows={3} defaultValue={faq.a} className={fieldClass} />
          </Field>
        </div>
      ))}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={initial.published} />
        <span>Published</span>
      </label>
      <SaveButton>{initial.id ? "Update city page" : "Create city page"}</SaveButton>
    </form>
  );
}
