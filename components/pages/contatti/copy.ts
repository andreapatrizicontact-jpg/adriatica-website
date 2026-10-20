// Copy that belongs to the /contatti layout itself (labels, headings the old
// page had hard-coded in its sections). The contact data, the response-time
// note and the FAQ stay in content/site.ts.

export const contattiCopy = {
  hero: {
    eyebrow: "CONTATTI",
    ctaHref: "/consulenza",
  },
  channels: {
    phone: "Telefono",
    email: "Email",
    whatsapp: "WhatsApp",
    base: "Base",
  },
  online: "Online",
  external: "si apre in una nuova scheda",
  faq: {
    eyebrow: "FAQ",
    title: "Due domande veloci.",
  },
} as const;
