"use client";

import { useState } from "react";
import { loginAction } from "@/app/admin/actions";
import { fieldClass } from "@/app/admin/ui";

export function LoginForm() {
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    const result = await loginAction(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={onSubmit} className="mt-8 space-y-4">
      <label className="block text-sm">
        <span className="font-medium text-navy-900">Phone</span>
        <span className="mt-0.5 block text-xs text-navy-700">Staff mobile, with country code if you have it.</span>
        <input name="phone" type="tel" required autoFocus autoComplete="username" className={fieldClass} />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-navy-900">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={fieldClass} />
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button type="submit" className="w-full rounded-full bg-navy-900 py-3 text-sm font-semibold text-white">
        Open admin
      </button>
    </form>
  );
}
