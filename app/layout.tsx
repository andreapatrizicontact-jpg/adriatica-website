import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { HashRedirect } from "@/components/layout/HashRedirect";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteUrl } from "@/content/site";
import { introBootScript } from "@/lib/intro";

const defaultTitle = "Adriatica Studio — Social media, foto e video a Roma";
const defaultDescription =
  "Gestione social, foto e video per farti riconoscere, a modo tuo. Adriatica è lo studio di Andrea Patrizi, a Roma.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s — Adriatica",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "Adriatica Studio",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f2ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // the two faces every first paint needs: section titles and the wordmark
  preload("/fonts/Poppins-Bold-Latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/InstrumentSans-Semibold.ttf", { as: "font", type: "font/ttf", crossOrigin: "anonymous" });
  preload("/fonts/InstrumentSans-Regular.ttf", { as: "font", type: "font/ttf", crossOrigin: "anonymous" });

  return (
    // data-intro is written by the inline script below before first paint
    <html lang="it" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>
        <SkipLink />
        <main id="contenuto" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </main>
        <Footer />
        <HashRedirect />
      </body>
    </html>
  );
}
