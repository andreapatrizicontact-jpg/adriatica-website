// Copy that belongs to the /metodo layout itself (titles, labels, link labels).
// Every fact (prices, FAQ answers, steps, contact data) stays in content/site.ts;
// the strings below are the headings the old page had hard-coded in its sections.

import type { ServiceId } from "@/lib/services";

export const metodoCopy = {
  hero: {
    eyebrow: "IL METODO",
    title: "Il nostro metodo. Zero fuffa.",
    intro: "Studio piccolo, processo chiaro. Ecco esattamente come lavoriamo.",
  },
  index: {
    ariaLabel: "Indice di pagina",
    items: [
      { number: "01", label: "Servizi", href: "#servizi" },
      { number: "02", label: "Loro / Noi", href: "#loro-noi" },
      { number: "03", label: "Processo", href: "#processo" },
      { number: "04", label: "Vantaggi", href: "#vantaggi" },
      { number: "05", label: "FAQ", href: "#faq" },
    ],
  },
  servizi: {
    eyebrow: "01 / SERVIZI",
    title: "Tutti i servizi.",
    description: "Sei aree di lavoro. Parti da quella che ti serve.",
    settori: "Settori",
  },
  loroNoi: {
    eyebrow: "02 / LORO · NOI",
    title: "Non tutte le agenzie lavorano allo stesso modo.",
    loro: "Loro",
    noi: "Noi",
  },
  processo: {
    eyebrow: "03 / IL PROCESSO",
    title: "Come lavoriamo, passo passo.",
    step: "PASSO",
  },
  vantaggi: {
    eyebrow: "04 / VANTAGGI",
    title: "Perché scegliere Adriatica.",
  },
  prezzi: {
    eyebrow: "05 / PREZZI",
    cta: "Parliamone",
    featuredLabel: "Più scelto",
    extrasLabel: "Extra",
    units: { mese: "al mese", "una tantum": "una tantum" } as Record<string, string>,
  },
  faq: {
    eyebrow: "05 / FAQ",
    title: "Domande frequenti.",
  },
  closing: {
    title: "Parliamone, gratis.",
    text: "30 minuti, senza impegno, per capire se ha senso lavorare insieme.",
    href: "/consulenza",
  },
} as const;

/**
 * Where each service pillar's link goes. The three pillars that match a service of
 * the contact form preselect it (lib/services.ts); the others open the form without
 * a preselection. The bollino pillar links to its own page (see ServicesGrid).
 * Keyed by the pillar's name in content/site.ts.
 */
export const pillarCtas: Record<string, { label: string; service?: ServiceId }> = {
  "Social Media Management": { label: "Parliamo dei social", service: "social" },
  "Content Creation": { label: "Parliamo dei contenuti", service: "shooting" },
  "Strategia & Ads": { label: "Parliamo di strategia", service: "strategy" },
  "Siti Web & SEO": { label: "Parliamo del sito" },
  "Automazione & AI": { label: "Parliamo di automazione" },
  "Il bollino trovabile": { label: "Scopri il bollino" },
};
