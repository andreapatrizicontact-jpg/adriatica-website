import type { Metadata } from "next";
import { BollinoHero } from "@/components/pages/bollino/BollinoHero";
import { Checks } from "@/components/pages/bollino/Checks";
import { Steps } from "@/components/pages/bollino/Steps";
import { bollinoCopy } from "@/components/pages/bollino/copy";
import { CtaBand } from "@/components/pages/CtaBand";
import { PageSection } from "@/components/pages/PageSection";
import { bollino } from "@/content/site";

const title = "Il bollino trovabile";
const description =
  "Controlliamo la tua scheda su dodici punti, sistemiamo quello che non va e, quando li passi tutti, ricevi il bollino da mettere in vetrina. Vale un anno.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/bollino" },
  openGraph: {
    title: `${title} — Adriatica`,
    description,
    url: "/bollino",
    siteName: "Adriatica Studio",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${title} — Adriatica`, description },
};

export default function BollinoPage() {
  return (
    <>
      <BollinoHero />

      <PageSection id="controlli" tone="work" eyebrow={bollinoCopy.checks.eyebrow} title={bollino.checksHeading}>
        <Checks />
      </PageSection>

      <PageSection id="come-funziona" eyebrow={bollinoCopy.steps.eyebrow} title={bollino.stepsHeading}>
        <Steps />
      </PageSection>

      <CtaBand
        title={bollinoCopy.closing.title}
        text={bollino.preCta}
        primary={{ label: bollino.ctaLabel, href: bollinoCopy.closing.href }}
      />
    </>
  );
}
