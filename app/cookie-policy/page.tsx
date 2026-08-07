import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { cookiePolicy } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Quali cookie utilizza questo sito.",
};

export default function CookiePolicy() {
  return (
    <LegalPage
      eyebrow={cookiePolicy.eyebrow}
      heading={cookiePolicy.heading}
      updated={cookiePolicy.updated}
      sections={cookiePolicy.sections}
    />
  );
}
