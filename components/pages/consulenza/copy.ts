// Copy that belongs to the /consulenza layout itself (labels, headings the old
// page had hard-coded in its sections). Every fact (what the call covers, the
// steps, the FAQ, the Calendly link) stays in content/site.ts.

export const consulenzaCopy = {
  hero: {
    eyebrow: "CONSULENZA",
    cta: "Prenota adesso",
    href: "#prenota",
  },
  covers: {
    eyebrow: "01 / LA CALL",
  },
  steps: {
    eyebrow: "02 / IN PRATICA",
    step: "PASSO",
  },
  booking: {
    eyebrow: "03 / PRENOTA ORA",
    title: "Scegli il tuo orario.",
    iframeTitle: "Prenota una call gratuita su Calendly",
    fallback: "Il calendario non si carica? Aprilo in una nuova scheda.",
  },
  faq: {
    eyebrow: "04 / FAQ",
    title: "Domande frequenti.",
  },
} as const;
