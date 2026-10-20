import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqList } from "@/components/pages/FaqList";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { ContactSection } from "@/components/pages/contatti/ContactSection";
import { contattiCopy } from "@/components/pages/contatti/copy";
import { Button } from "@/components/ui/Button";
import { contatti, cta } from "@/content/site";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Scrivici o chiamaci — rispondiamo rapidamente.",
  alternates: { canonical: "/contatti" },
};

export default function ContattiPage() {
  const { hero, faq } = contattiCopy;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={contatti.heading}
        intro={contatti.sub}
        art={<Image src="/images/handshake.webp" alt="" width={1536} height={1024} sizes="44vw" />}
      >
        <Button href={hero.ctaHref} tone="blue">
          {cta.primary}
        </Button>
      </PageHero>

      <ContactSection>
        <ContactForm variant="full" />
      </ContactSection>

      <PageSection id="faq" eyebrow={faq.eyebrow} title={faq.title}>
        <FaqList items={contatti.faq} />
      </PageSection>
    </>
  );
}
