import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqList } from "@/components/pages/FaqList";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { Booking } from "@/components/pages/consulenza/Booking";
import { Covers } from "@/components/pages/consulenza/Covers";
import { Steps } from "@/components/pages/consulenza/Steps";
import { consulenzaCopy } from "@/components/pages/consulenza/copy";
import { Button } from "@/components/ui/Button";
import { consulenza } from "@/content/site";

export const metadata: Metadata = {
  title: "Consulenza gratuita",
  description: "Prenota una call gratuita di 30 minuti con Adriatica.",
  alternates: { canonical: "/consulenza" },
};

export default function ConsulenzaPage() {
  const { hero, covers, steps, faq } = consulenzaCopy;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={consulenza.heading} intro={consulenza.sub}>
        <Button href={hero.href} tone="blue">
          {hero.cta}
        </Button>
      </PageHero>

      <PageSection
        id="cosa-copriamo"
        tone="work"
        eyebrow={covers.eyebrow}
        title={consulenza.coversHeading}
      >
        <Covers />
      </PageSection>

      {/* before the calendar: the first step says "dal calendario qui sotto" */}
      <PageSection id="come-funziona" eyebrow={steps.eyebrow} title={consulenza.stepsHeading}>
        <Steps />
      </PageSection>

      <Booking>
        <ContactForm variant="home" />
      </Booking>

      <PageSection id="faq" eyebrow={faq.eyebrow} title={faq.title}>
        <FaqList items={consulenza.faq} />
      </PageSection>
    </>
  );
}
