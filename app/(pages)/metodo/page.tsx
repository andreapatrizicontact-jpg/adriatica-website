import type { Metadata } from "next";
import { CtaBand } from "@/components/pages/CtaBand";
import { FaqList } from "@/components/pages/FaqList";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { LoroNoi } from "@/components/pages/metodo/LoroNoi";
import { PageIndex } from "@/components/pages/metodo/PageIndex";
import { ProcessSteps } from "@/components/pages/metodo/ProcessSteps";
import { SeoNote } from "@/components/pages/metodo/SeoNote";
import { ServicesGrid } from "@/components/pages/metodo/ServicesGrid";
import { Vantaggi } from "@/components/pages/metodo/Vantaggi";
import { metodoCopy } from "@/components/pages/metodo/copy";
import { cta, metodoFaq } from "@/content/site";

export const metadata: Metadata = {
  title: "Il Metodo",
  description:
    "Come lavoriamo davvero: Loro/Noi, il nostro processo in 6 passi, i vantaggi e le domande più frequenti.",
  alternates: { canonical: "/metodo" },
};

export default function MetodoPage() {
  const { hero, servizi, loroNoi, processo, vantaggi, faq, closing } = metodoCopy;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro}>
        <PageIndex />
      </PageHero>

      {/* #servizi keeps every non-homepage service reachable: /metodo#servizi is a published URL */}
      <PageSection
        id="servizi"
        tone="work"
        eyebrow={servizi.eyebrow}
        title={servizi.title}
        description={servizi.description}
      >
        <ServicesGrid />
      </PageSection>

      <PageSection id="loro-noi" eyebrow={loroNoi.eyebrow} title={loroNoi.title}>
        <LoroNoi />
      </PageSection>

      <PageSection id="processo" tone="work" eyebrow={processo.eyebrow} title={processo.title}>
        <ProcessSteps />
      </PageSection>

      <PageSection id="vantaggi" eyebrow={vantaggi.eyebrow} title={vantaggi.title}>
        <Vantaggi />
      </PageSection>

      <PageSection id="faq" tone="work" eyebrow={faq.eyebrow} title={faq.title}>
        <FaqList items={metodoFaq} />
      </PageSection>

      <SeoNote />

      <CtaBand
        title={closing.title}
        text={closing.text}
        primary={{ label: cta.primary, href: closing.href }}
      />
    </>
  );
}
