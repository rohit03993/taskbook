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
            ? "h-[41px] w-auto max-h-[49px] max-w-[13.5rem] object-contain object-left sm:h-[49px] sm:max-h-[57px] sm:max-w-[16rem]"
            : "h-[51px] w-auto max-h-[67px] max-w-[16rem] object-contain object-left"
          : size === "header"
            ? "h-[37px] w-[37px] object-contain lg:h-[49px] lg:w-[49px]"
            : "h-[59px] w-[59px] object-contain"
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
