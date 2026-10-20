// UI copy for /analisi that the old page had hard-coded in its components (headings,
// field labels, status messages). The real content (heading, sub, option lists,
// checklist, response note, SEO paragraphs) stays in content/site.ts → analisi, analisiSeo.
// This file is imported by the client form: keep it free of heavy imports.

export const analisiCopy = {
  hero: { eyebrow: "ANALISI SOCIAL GRATUITA" },
  form: {
    eyebrow: "01 / LA RICHIESTA",
    directLead: "Preferisci scrivere direttamente?",
  },
  checklist: {
    eyebrow: "02 / COSA RICEVI",
  },
  closing: {
    title: "Preferisci parlarne subito?",
    // the old copy said "dei 48 ore", a typo
    text: "Salta l'attesa delle 48 ore e prenota una call gratuita con Andrea.",
    href: "/consulenza",
  },
  fields: {
    handle: { label: "Handle Instagram o TikTok", placeholder: "@iltuoprofilo" },
    sito: { label: "Sito web (opzionale)", placeholder: "https://" },
    settore: { legend: "Settore" },
    obiettivo: { legend: "Obiettivo" },
    nome: { label: "Il tuo nome", placeholder: "Come ti chiami?" },
    email: { label: "La tua email", placeholder: "Dove possiamo risponderti?" },
    telefono: { label: "Telefono (opzionale)", placeholder: "Solo se preferisci una chiamata" },
  },
  consent: {
    before: "Accetto l'informativa ",
    linkLabel: "privacy",
    after: ".",
    href: "/privacy",
    newTab: " (si apre in una nuova scheda)",
  },
  submit: { pending: "Invio in corso…" },
  status: {
    pending: "Invio in corso…",
    validation: "Controlla i campi evidenziati e riprova.",
    generic: "L'invio non è riuscito. Riprova tra poco.",
    rateLimited: "Troppe richieste ravvicinate. Riprova tra qualche minuto.",
    emailLead: "Oppure scrivici direttamente a ",
  },
  success: {
    title: "Grazie, abbiamo ricevuto la tua richiesta.",
  },
} as const;
