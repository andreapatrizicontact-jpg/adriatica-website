import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacyPolicy } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Come trattiamo i dati raccolti tramite questo sito.",
};

export default function Privacy() {
  return (
    <LegalPage
      eyebrow={privacyPolicy.eyebrow}
      heading={privacyPolicy.heading}
      updated={privacyPolicy.updated}
      sections={privacyPolicy.sections}
    />
  );
}
