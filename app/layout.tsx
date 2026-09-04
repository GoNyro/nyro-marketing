import type { Metadata, Viewport } from "next";
import {
  Archivo,
  DM_Sans,
  IBM_Plex_Mono,
  Instrument_Sans,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { CONSENT_DEFAULTS, GA_ID } from "@/lib/analytics";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

// The product's UI face - loaded for the app mockups only, so they set in the
// same type as the shipping builder rather than an approximation of it.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  // Only used for small eyebrow/dimension labels - keep it off the critical
  // font path.
  preload: false,
});

// Display voice. The width axis matters: headings run slightly expanded, the
// "signage on a workshop wall" register.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: siteConfig.founders.map((name) => ({ name })),
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#272b24" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${dmSans.variable} ${plexMono.variable} ${archivo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Google Consent Mode v2 defaults (all denied in the EU/UK/CH).
            Must execute before gtag.js loads, so it uses beforeInteractive -
            which the App Router requires to be in the root layout. Keep it
            above <Analytics />, which loads GA4 afterInteractive. */}
        {GA_ID ? (
          <Script
            id="consent-defaults"
            strategy="beforeInteractive"
            // Static string from lib/analytics.ts; no user input interpolated.
            dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS }}
          />
        ) : null}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
