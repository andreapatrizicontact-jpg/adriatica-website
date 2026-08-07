import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StickyBar } from "@/components/nav/StickyBar";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { ContactRail } from "@/components/nav/ContactRail";
import { OfflineBanner } from "@/components/OfflineBanner";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Adriatica — Social Media Marketing & Comunicazione",
    template: "%s — Adriatica",
  },
  description:
    "Adriatica è uno studio di marketing e comunicazione. Trasformiamo brand in storie che le persone vogliono seguire.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="it"
      className={`${archivo.variable} ${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
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
