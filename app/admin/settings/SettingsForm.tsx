"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveSettingsAction } from "@/app/admin/actions";
import { fieldClass, Field, SaveButton } from "@/app/admin/ui";
import { DEFAULT_FAVICON, DEFAULT_LOGO, publicBrandSrc } from "@/lib/branding";
import type { SiteSettings } from "@/lib/settings";

export function SettingsForm({ settings, owner }: { settings: SiteSettings; owner: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const logo = publicBrandSrc(settings.logoUrl, DEFAULT_LOGO);
  const favicon = publicBrandSrc(settings.faviconUrl, publicBrandSrc(settings.logoUrl, DEFAULT_FAVICON));

  async function onSubmit(formData: FormData) {
    setError("");
    const result = await saveSettingsAction(formData);
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <form action={onSubmit} className="mt-8 max-w-xl space-y-8">
      <div className="space-y-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-navy-900/[0.06] sm:p-8">
        <p className="font-display text-lg text-navy-900">WhatsApp and email</p>
        <fieldset disabled={!owner} className="space-y-5">
          <Field label="WhatsApp number" hint="Country code, digits only. Example 9198xxxxxxxx">
            <input name="whatsappNumber" required defaultValue={settings.whatsappNumber} className={fieldClass} />
          </Field>
          <Field label="Default WhatsApp message">
            <textarea name="whatsappMessage" rows={3} defaultValue={settings.whatsappMessage} className={fieldClass} />
          </Field>
          <Field label="Contact email">
            <input name="email" type="email" defaultValue={settings.email} className={fieldClass} />
          </Field>
          <Field label="Leads webhook URL" hint="Optional. Each new demo form lead is POSTed here as JSON.">
            <input name="webhookUrl" defaultValue={settings.webhookUrl} placeholder="https://..." className={fieldClass} />
          </Field>
        </fieldset>
      </div>

      <div className="space-y-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-navy-900/[0.06] sm:p-8">
        <p className="font-display text-lg text-navy-900">Logo and favicon</p>
        <p className="text-sm text-navy-700">
          PNG, JPG or WebP, under 2 MB. The header and footer show this logo in full — not a tiny square next to extra
          text. Upload a square PNG for the browser tab.
        </p>
        <fieldset disabled={!owner} className="space-y-6">
          <div>
            <p className="text-sm font-medium text-navy-900">Header and footer logo</p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <span className="flex h-16 min-w-[9rem] max-w-[16rem] items-center justify-start overflow-hidden rounded-xl bg-navy-50 px-3 ring-1 ring-navy-900/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt="" className="max-h-14 w-auto max-w-full object-contain object-left" />
              </span>
              <input name="logo" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm" />
            </div>
            {settings.logoUrl ? (
              <label className="mt-3 flex items-center gap-2 text-sm text-navy-800">
                <input type="checkbox" name="clearLogo" className="rounded border-navy-900/20" />
                Remove custom logo — use the default
              </label>
            ) : null}
          </div>
          <div>
            <p className="text-sm font-medium text-navy-900">Favicon (browser tab)</p>
            <p className="mt-0.5 text-xs text-navy-700">Square image for the browser tab. Optional.</p>
            <div className="mt-2 flex items-center gap-4">
              <span className="relative h-10 w-10 overflow-hidden rounded-lg bg-navy-50 ring-1 ring-navy-900/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={favicon} alt="" className="h-full w-full object-contain p-0.5" />
              </span>
              <input name="favicon" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm" />
            </div>
            {settings.faviconUrl ? (
              <label className="mt-3 flex items-center gap-2 text-sm text-navy-800">
                <input type="checkbox" name="clearFavicon" className="rounded border-navy-900/20" />
                Remove custom favicon
              </label>
            ) : null}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        {owner ? <SaveButton>Save settings</SaveButton> : <p className="text-sm text-navy-700">Only the owner can change these.</p>}
      </div>
    </form>
  );
}
