"use client";

import { useState } from "react";
import { saveContentAction } from "@/app/admin/actions";
import { fieldClass, SaveButton } from "@/app/admin/ui";

export type ContentField = {
  key: string;
  label: string;
  hint?: string;
  rows?: number;
  value: string;
};

export function ContentForm({ fields }: { fields: ContentField[] }) {
  const [ok, setOk] = useState(false);

  async function onSubmit(formData: FormData) {
    setOk(false);
    await saveContentAction(formData);
    setOk(true);
  }

  return (
    <form action={onSubmit} className="mt-8 space-y-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-navy-900/[0.06] sm:p-8">
      {fields.map((f) => (
        <label key={f.key} className="block text-sm">
          <input type="hidden" name="key" value={f.key} />
          <span className="font-medium text-navy-900">{f.label}</span>
          {f.hint ? <span className="mt-0.5 block text-xs text-navy-700">{f.hint}</span> : null}
          {f.rows ? (
            <textarea name="value" rows={f.rows} defaultValue={f.value} className={fieldClass} />
          ) : (
            <input name="value" defaultValue={f.value} className={fieldClass} />
          )}
        </label>
      ))}
      {ok && <p className="text-sm text-emerald-700">Saved. Public pages pick this up immediately.</p>}
      <SaveButton />
    </form>
  );
}
