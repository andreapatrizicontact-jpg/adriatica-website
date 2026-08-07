import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StickyBar } from "@/components/nav/StickyBar";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { ContactRail } from "@/components/nav/ContactRail";
import { OfflineBanner } from "@/components/OfflineBanner";
import { siteUrl } from "@/content/site";

// Switched from Archivo to Poppins — the confirmed "Adriatica." logo image
// and the Nutriva case study (which documents Poppins by name as its
// typeface) both point the same direction. Poppins only ships as static
// weight files (not variable), so request exactly the weights the type
// scale uses. See DECISIONS.md.
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-poppins",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const defaultTitle = "Adriatica — Social Media Marketing & Comunicazione";
const defaultDescription =
  "Adriatica è uno studio di marketing e comunicazione. Trasformiamo brand in storie che le persone vogliono seguire.";

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
    siteName: "Adriatica",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="it"
      className={`${poppins.variable} ${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* fixed together so the header floats transparently over each
            page's hero — content underneath reserves its own clearance
            rather than the layout pushing everything down globally */}
        <div className="fixed inset-x-0 top-0 z-40 flex flex-col">
          <StickyBar />
          <SiteHeader />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
        <ContactRail />
        <OfflineBanner />
      </body>
    </html>
  );
}
