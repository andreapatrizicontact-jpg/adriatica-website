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

export type PricingPlan = {
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  featured?: boolean;
};

// TODO_CLIENT (DECISIONS.md): every figure here is a placeholder — round,
// plausible numbers for a working pricing UI, not real rates. Real pricing
// (or a decision to keep this custom-quote-only, common for agencies) must
// come from Andrea before this ships. pricingNote below says so on-page too.
export const pricingPlans: PricingPlan[] = [
  {
    name: "Essenziale",
    tagline: "Per chi inizia a prendere sul serio i social.",
    monthlyPrice: 490,
    annualPrice: 4900,
    features: [
      "Gestione di 1 canale social",
      "12 contenuti al mese",
      "Content calendar mensile",
      "Report mensile",
    ],
  },
  {
    name: "Crescita",
    tagline: "Il piano più scelto da chi vuole risultati costanti.",
    monthlyPrice: 990,
    annualPrice: 9900,
    features: [
      "Gestione di 2 canali social",
      "20 contenuti al mese",
      "Content creation — foto e video",
      "Community management",
      "Report mensile + call strategica",
    ],
    featured: true,
  },
  {
    name: "Full Service",
    tagline: "Per brand che vogliono strategia, ads e sito insieme.",
    monthlyPrice: 1890,
    annualPrice: 18900,
    features: [
      "Gestione multi-canale",
      "Content creation illimitata",
      "Strategia & Ads",
      "Sito web incluso",
      "Report mensile + call settimanale",
    ],
  },
];

export const pricingNote =
  "Prezzi indicativi — ogni progetto riceve un preventivo su misura dopo la consulenza gratuita.";
