import type { Metadata } from "next";
import { Checklist } from "@/components/pages/analisi/Checklist";
import { FormSection } from "@/components/pages/analisi/FormSection";
import { SeoNote } from "@/components/pages/analisi/SeoNote";
import { analisiCopy } from "@/components/pages/analisi/copy";
import { CtaBand } from "@/components/pages/CtaBand";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { analisi, cta } from "@/content/site";

const title = "Analisi social gratuita";
const description = "Scopri cosa frena il tuo profilo. Gratis, in 48 ore.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/analisi" },
  openGraph: {
    title: `${title} — Adriatica`,
    description,
    url: "/analisi",
    siteName: "Adriatica Studio",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${title} — Adriatica`, description },
};

export default function AnalisiPage() {
  return (
    <>
      <PageHero eyebrow={analisiCopy.hero.eyebrow} title={analisi.heading} intro={analisi.sub} />

      <FormSection />

      <PageSection
        id="cosa-controlliamo"
        tone="work"
        eyebrow={analisiCopy.checklist.eyebrow}
        title={analisi.confirmationHeading}
      >
        <Checklist />
      </PageSection>

      <SeoNote />

      <CtaBand
        title={analisiCopy.closing.title}
        text={analisiCopy.closing.text}
        primary={{ label: cta.primary, href: analisiCopy.closing.href }}
      />
    </>
  );
}
