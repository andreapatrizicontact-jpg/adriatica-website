// Single source of truth for site copy. No copy string lives inside a
// component — see brief §4/§7. Sections not yet built (services, process,
// FAQ, cases, testimonials…) get added here phase by phase, not stubbed
// ahead of time.

export const brand = {
  name: "Adriatica",
  wordmark: "Adriatica.",
  subline: "MARKETING STUDIO",
  positioning: "Non facciamo solo social media marketing. Costruiamo connessioni.",
  founder: "Andrea Patrizi",
};

export const contact = {
  phone: "+39 349 244 2534",
  phoneHref: "tel:+393492442534",
  email: "andreapatrizicontact@gmail.com",
  emailHref: "mailto:andreapatrizicontact@gmail.com",
  whatsappHref: "https://wa.me/393492442534",
  // TODO_CLIENT: base city unconfirmed — business card says San Benedetto del
  // Tronto, brief text says Roma. Showing both pending confirmation
  // (DECISIONS.md #1).
  cityDisplay: "Roma · San Benedetto del Tronto",
};

// TODO_CLIENT: no handles found in ADRIATICA DATA — DECISIONS.md #7.
// Nav/footer render nothing for a channel until its href is filled in here.
export const socials: { label: string; href: string }[] = [];

export const cta = {
  primary: "Prenota una call gratuita",
  secondary: "Guarda i progetti",
};

// rotates every 7s in the sticky bar, dismissible per-session (brief §6).
// Original copy in the client's voice — not a client-supplied quote, flagged
// for approval in DECISIONS.md.
export const provocations: string[] = [
  "Ancora nessuna strategia social? Si vede.",
  "I follower non pagano le bollette. I clienti sì.",
  "Zero fuffa. Solo social media marketing che funziona.",
];

export const legal = {
  // TODO_CLIENT: DECISIONS.md #5
  piva: "TODO_CLIENT — P.IVA",
  creditLine: `© ${new Date().getFullYear()} Adriatica — Marketing Studio. Tutti i diritti riservati.`,
};
