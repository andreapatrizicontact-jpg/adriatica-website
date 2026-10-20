import type { Metadata } from "next";
import { LegalDocument } from "@/components/pages/legal/LegalDocument";
import { cookiePolicy } from "@/content/site";

const title = "Cookie Policy";
const description = "Quali cookie utilizza questo sito.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: `${title} — Adriatica`,
    description,
    url: "/cookie-policy",
    siteName: "Adriatica Studio",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${title} — Adriatica`, description },
};

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      idPrefix="cookie"
      eyebrow={cookiePolicy.eyebrow}
      heading={cookiePolicy.heading}
      updated={cookiePolicy.updated}
      sections={cookiePolicy.sections}
    />
  );
}
