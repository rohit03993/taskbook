import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { Footer, Header, StickyMobileCta } from "@/components/Chrome";
import { SettingsProvider } from "@/components/SettingsProvider";
import { site } from "@/content/site";
import { listLocations } from "@/lib/locations";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — School software with WhatsApp built in`,
    template: `%s · ${site.name}`,
  },
  description: site.pitch,
  openGraph: {
    title: site.name,
    description: site.pitch,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [settings, locations] = await Promise.all([getSettings(), listLocations({ publishedOnly: true })]);

  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <SettingsProvider
          value={{
            whatsappNumber: settings.whatsappNumber,
            whatsappMessage: settings.whatsappMessage,
            email: settings.email,
            locations: locations.map((l) => ({ slug: l.slug, city: l.city })),
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyMobileCta />
        </SettingsProvider>
      </body>
    </html>
  );
}
