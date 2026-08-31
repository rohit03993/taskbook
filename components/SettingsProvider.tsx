"use client";

import { createContext, useContext, type ReactNode } from "react";

type PublicSettings = {
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  logoUrl: string;
  faviconUrl: string;
  locations: { slug: string; city: string }[];
};

const SettingsContext = createContext<PublicSettings>({
  whatsappNumber: "",
  whatsappMessage: "",
  email: "",
  logoUrl: "",
  faviconUrl: "",
  locations: [],
});

export function SettingsProvider({
  value,
  children,
}: {
  value: PublicSettings;
  children: ReactNode;
}) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
