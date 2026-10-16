import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { Footer, Header } from "@/components/Chrome";
import { JsonLd } from "@/components/MarkdownBody";
import { SettingsProvider } from "@/components/SettingsProvider";
import { site } from "@/content/site";
import { listLocations } from "@/lib/locations";
import { organizationLd } from "@/lib/schema";
import { getSettings, siteLogoSrc } from "@/lib/settings";
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: "School CRM for attendance, fees and WhatsApp",
      template: `%s · ${site.name}`,
    },
    description: site.pitch,
    icons: {
      icon: [
        { url: "/icon", type: "image/png", sizes: "32x32" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    openGraph: {
      title: "School CRM for attendance, fees and WhatsApp · Task Book",
      description: site.pitch,
      url: site.url,
      siteName: site.name,
      type: "website",
      images: [{ url: "/logos/taskbook-og.png", width: 1200, height: 630, alt: "Task Book" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "School CRM for attendance, fees and WhatsApp · Task Book",
      description: site.pitch,
      images: ["/logos/taskbook-og.png"],
    },
  };
}

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
        <JsonLd data={organizationLd(siteLogoSrc(settings))} />
        <SettingsProvider
          value={{
            whatsappNumber: settings.whatsappNumber,
            whatsappMessage: settings.whatsappMessage,
            email: settings.email,
            logoUrl: settings.logoUrl,
            faviconUrl: settings.faviconUrl,
            locations: locations.map((l) => ({ slug: l.slug, city: l.city })),
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
