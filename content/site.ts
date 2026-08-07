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
  /** one-time setup/build cost */
  oneTime: number;
  /** recurring monthly management fee, social-only */
  monthly: number;
  features: string[];
  /** shown only for Avvio — a separately-rateized one-time cost, not part of the +Sito toggle */
  siteNote?: string;
  /** Full Service's `monthly` already bundles site management (300 social +
   * 200 sito, per the real proposal) — the +Sito toggle must skip it rather
   * than adding another 200 on top. */
  includesSite?: boolean;
  featured?: boolean;
};

// Real rates, taken directly from Andrea's own documents (not placeholders):
// - "Fattura 450 euro.pdf" — Guida creazione brand €450
// - "Proposta Aniela Corsisi.pdf" — sito custom €2.000 una tantum, brand
//   identity €500 una tantum (list; €350 was a one-off negotiated discount,
//   not used here), gestione social €300/mese, gestione sito €200/mese
// - "fattura_proforma_servizi_digitali_8_rate.pdf" — the launch-tier
//   structure: €140 una tantum (setup IG+FB+TikTok+studio competitor),
//   €430/mese canone (dal 9° mese), €500 modifica sito rateizzata in 8×€62,50
// The "+ Gestione Sito" toggle applies Andrea's own €200/mese site-management
// rate (from the Aniela proposal) uniformly across tiers as a standard
// add-on — not fabricated, but generalized from one real quote to a
// repeatable rate; flagged in DECISIONS.md in case that's not what he wants.
export const siteManagementAddon = {
  monthly: 200,
  label: "Gestione e aggiornamento sito web",
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Avvio",
    tagline: "La tariffa di lancio per chi parte adesso.",
    oneTime: 140,
    monthly: 430,
    features: [
      "Impostazione profili Instagram, Facebook e TikTok",
      "Studio competitor iniziale",
      "2 post + 1 reel a settimana su Instagram",
      "Locandine eventi settimanali",
      "Gestione campagne Ads (budget escluso)",
      "Community management e messaggistica",
      "Report settimanale",
    ],
    siteNote: "Modifica sito a parte, da €500 (rateizzabile in 8 mesi)",
  },
  {
    name: "Crescita",
    tagline: "Il piano più scelto da chi vuole risultati costanti.",
    oneTime: 500,
    monthly: 300,
    features: [
      "Brand identity completa — logo, palette, sistema visivo",
      "Creazione e gestione contenuti social",
      "Piano editoriale mensile",
      "Gestione campagne Ads (budget escluso)",
      "Community management",
      "Monitoraggio e ottimizzazione continua",
    ],
    featured: true,
  },
  {
    name: "Full Service",
    tagline: "Per brand che vogliono sito e social insieme.",
    oneTime: 2500,
    monthly: 500,
    features: [
      "Tutto il piano Crescita",
      "Sito web professionale su misura",
      "UX/UI design responsive",
      "SEO on-page di base",
      "Database, automazioni ed export anagrafica clienti",
      "Gestione e aggiornamento continuo del sito incluso",
    ],
    includesSite: true,
  },
];

export const pricingNote =
  "Tariffe reali dei nostri progetti — ogni preventivo viene comunque calibrato dopo la consulenza gratuita.";

// TODO_CLIENT (DECISIONS.md): these are Andrea's own subcontractor COSTS
// (website editor €500–800, photographer €200–350/shoot for 20–30 assets),
// not client-facing prices — no markup/margin decision has been made, so no
// price ships for these yet. Rendered as "price on request" until Andrea
// sets one.
export const addonServices: { name: string; description: string }[] = [
  {
    name: "Servizio fotografico",
    description: "Uno shooting dedicato per 20–30 contenuti pronti da pubblicare.",
  },
  {
    name: "Modifiche extra al sito",
    description: "Interventi one-off fuori dal piano di gestione mensile.",
  },
];

export type ServicePillar = {
  name: string;
  description: string;
  /** the granular real deliverables Andrea listed, grouped under this pillar */
  includes: string[];
};

// Andrea's full real service list, grouped into 5 pillars so "Cosa facciamo"
// stays scannable — the granular items (report mensile, analisi competitor,
// impostazione profili…) already appear as concrete deliverables in
// pricingPlans[].features above, so they're not repeated as their own
// top-level cards here.
export const servicePillars: ServicePillar[] = [
  {
    name: "Social Media Management",
    description: "Gestione completa dei tuoi profili: contenuti, community e crescita costante.",
    includes: [
      "Social media management",
      "Impostazione profili Instagram, Facebook, TikTok e Google",
      "Report mensile",
    ],
  },
  {
    name: "Content Creation",
    description: "Foto, video e copy che catturano l'attenzione e fanno parlare il brand.",
    includes: [
      "Content creation — fotografia e videografia",
      "Copywriting",
      "Locandine ed eventi settimanali",
      "Brand identity completa — logo, palette, sistema visivo",
    ],
  },
  {
    name: "Strategia & Ads",
    description: "Piani su misura e campagne pubblicitarie per risultati veri, non solo like.",
    includes: ["Social media marketing", "Ads", "Analisi competitor"],
  },
  {
    name: "Siti Web & SEO",
    description: "Siti che convertono, veloci e ottimizzati per essere trovati su Google.",
    includes: ["Website design", "Website creation", "SEO"],
  },
  {
    name: "Automazione & AI",
    description: "Bot e automazioni che fanno risparmiare tempo a te e al tuo team.",
    includes: ["AI automation", "Bot WhatsApp e Instagram"],
  },
];

export type NicheCategory = {
  category: string;
  niches: string[];
};

// Real target verticals — used for "Settori" on-page and as SEO/positioning
// signal, not invented examples.
export const nicheCategories: NicheCategory[] = [
  { category: "Fitness", niches: ["Studi Pilates", "Gym Boutique"] },
  {
    category: "Sanitario & Socio-Sanitario",
    niches: ["Studi Dentistici", "Studi Nutrizione", "Studi Psicologi"],
  },
  {
    category: "Ristorazione",
    niches: [
      "Ristoranti",
      "Bar / Cocktail Bar",
      "Hotel",
      "Stabilimenti",
      "Discoteche",
      "Airbnb",
    ],
  },
];
