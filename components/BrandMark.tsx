"use client";

import { useState } from "react";
import { DEFAULT_LOGO, publicBrandSrc } from "@/lib/branding";
import { site } from "@/content/site";

export function BrandMark({
  logoUrl,
  size = "header",
}: {
  logoUrl?: string;
  size?: "header" | "footer";
}) {
  const custom = Boolean(logoUrl?.trim());
  const initial = publicBrandSrc(logoUrl, DEFAULT_LOGO);
  const [src, setSrc] = useState(initial);
  const [failed, setFailed] = useState(false);
  const showLockup = custom && !failed && src !== DEFAULT_LOGO;

  const img = (
    // Uploaded files live under /uploads — skip next/image so a missing optimizer never shows a broken tile.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={site.name}
      onError={() => {
        setFailed(true);
        setSrc(DEFAULT_LOGO);
      }}
      className={
        showLockup
          ? size === "header"
            ? "h-10 w-auto max-h-12 max-w-[13.5rem] object-contain object-left sm:h-12 sm:max-h-14 sm:max-w-[16rem]"
            : "h-12 w-auto max-h-16 max-w-[16rem] object-contain object-left"
          : size === "header"
            ? "h-9 w-9 object-contain lg:h-12 lg:w-12"
            : "h-14 w-14 object-contain"
      }
    />
  );

  if (showLockup) {
    return img;
  }

  return (
    <>
      {img}
      <span className="leading-tight">
        <span className={`block font-bold tracking-tight ${size === "header" ? "text-[1.05rem] lg:text-[1.35rem]" : "text-2xl"}`}>
          <span className="text-navy-900">TASK</span>
          <span className="text-[#007BFF]">BOOK</span>
        </span>
      </span>
    </>
  );
}
