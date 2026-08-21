"use client";

import { useState } from "react";
import { createStaffAction } from "@/app/admin/actions";
import { fieldClass } from "@/app/admin/ui";

export function StaffForm() {
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  async function onSubmit(formData: FormData) {
    setError("");
    setOk(false);
    const result = await createStaffAction(formData);
    if (result?.error) setError(result.error);
    else setOk(true);
  }

  return (
    <form action={onSubmit} className="mt-8 max-w-xl space-y-4 rounded-[1.6rem] bg-white p-6 ring-1 ring-navy-900/[0.06]">
      <label className="block text-sm">
        <span className="font-medium">Name</span>
        <input name="name" required className={fieldClass} />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Phone</span>
        <input name="phone" type="tel" required className={fieldClass} />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Password</span>
        <input name="password" type="password" required minLength={8} className={fieldClass} />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Role</span>
        <select name="role" defaultValue="editor" className={fieldClass}>
          <option value="editor">Editor</option>
          <option value="owner">Owner</option>
        </select>
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {ok && <p className="text-sm text-emerald-700">Staff added.</p>}
      <button type="submit" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
        Add staff
      </button>
    </form>
  );
}
