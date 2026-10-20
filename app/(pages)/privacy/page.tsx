import type { Metadata } from "next";
import { LegalDocument } from "@/components/pages/legal/LegalDocument";
import { privacyPolicy } from "@/content/site";

const title = "Privacy Policy";
const description = "Come trattiamo i dati raccolti tramite questo sito.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${title} — Adriatica`,
    description,
    url: "/privacy",
    siteName: "Adriatica Studio",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${title} — Adriatica`, description },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      idPrefix="privacy"
      eyebrow={privacyPolicy.eyebrow}
      heading={privacyPolicy.heading}
      updated={privacyPolicy.updated}
      sections={privacyPolicy.sections}
    />
  );
}
