"use client";

import { useMemo, useState } from "react";
import { savePostAction } from "@/app/admin/actions";
import { fieldClass, Field, SaveButton, ScoreBadge } from "@/app/admin/ui";
import { scoreKeyword } from "@/lib/keyword-score";

type Initial = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
  focusKeyword: string;
  extraKeywords: string;
  cityTag: string;
  published: boolean;
  readMinutes: number;
};

export function BlogForm({ initial }: { initial: Initial }) {
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [description, setDescription] = useState(initial.description);
  const [body, setBody] = useState(initial.body);
  const [metaDescription, setMetaDescription] = useState(initial.metaDescription);
  const [focusKeyword, setFocusKeyword] = useState(initial.focusKeyword);
  const [extraKeywords, setExtraKeywords] = useState(initial.extraKeywords);
  const [cityTag, setCityTag] = useState(initial.cityTag);

  const report = useMemo(
    () =>
      scoreKeyword({
        focusKeyword,
        title,
        slug,
        metaDescription: metaDescription || description,
        body,
        extraKeywords,
        cityTag,
      }),
    [focusKeyword, title, slug, metaDescription, description, body, extraKeywords, cityTag],
  );

  return (
    <form action={savePostAction} className="mt-8 space-y-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-navy-900/[0.06] sm:p-8">
      {initial.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ScoreBadge score={report.score} label={report.label} />
        <p className="text-xs text-navy-700">On-page check — not Google rank.</p>
      </div>
      {(report.missing.length > 0 || report.notes.length > 0) && (
        <ul className="list-disc pl-5 text-sm text-navy-700">
          {report.missing.map((m) => (
            <li key={m}>{m}</li>
          ))}
          {report.notes.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <Field label="Title">
        <input name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className={fieldClass} />
      </Field>
      <Field label="Slug" hint="URL piece after /blog/">
        <input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} className={fieldClass} />
      </Field>
      <Field label="Short description">
        <textarea name="description" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className={fieldClass} />
      </Field>
      <Field label="Body" hint="Plain paragraphs. Use ## for a heading. Blank line between paragraphs.">
        <textarea name="body" rows={16} required value={body} onChange={(e) => setBody(e.target.value)} className={fieldClass} />
      </Field>
      <Field label="Focus keyword" hint="Required. Example: school software in Agra">
        <input name="focusKeyword" required value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} className={fieldClass} />
      </Field>
      <Field label="Extra keywords" hint="Comma separated">
        <input name="extraKeywords" value={extraKeywords} onChange={(e) => setExtraKeywords(e.target.value)} className={fieldClass} />
      </Field>
      <Field label="City / intent tag" hint="Agra, India, attendance, fees…">
        <input name="cityTag" value={cityTag} onChange={(e) => setCityTag(e.target.value)} className={fieldClass} />
      </Field>
      <Field label="Meta title">
        <input name="metaTitle" defaultValue={initial.metaTitle} className={fieldClass} />
      </Field>
      <Field label="Meta description">
        <textarea
          name="metaDescription"
          rows={2}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className={fieldClass}
        />
      </Field>
      <Field label="OG title">
        <input name="ogTitle" defaultValue={initial.ogTitle} className={fieldClass} />
      </Field>
      <Field label="OG description">
        <textarea name="ogDescription" rows={2} defaultValue={initial.ogDescription} className={fieldClass} />
      </Field>
      <Field label="Canonical path" hint="Leave blank to use /blog/slug">
        <input name="canonicalPath" defaultValue={initial.canonicalPath} className={fieldClass} />
      </Field>
      <Field label="Read minutes">
        <input name="readMinutes" type="number" min={1} defaultValue={initial.readMinutes} className={fieldClass} />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={initial.published} />
        <span>Published</span>
      </label>
      <SaveButton>{initial.id ? "Update post" : "Create post"}</SaveButton>
    </form>
  );
}
