// Single source of truth for site copy. No copy string lives inside a
// component — see brief §4/§7. Sections not yet built (services, process,
// FAQ, cases, testimonials…) get added here phase by phase, not stubbed
// ahead of time.

// Real domain, bought by Andrea on Namecheap (DECISIONS.md #8). Site isn't
// deployed there yet, but this drives metadataBase/canonicals/sitemap/OG
// now so it's ready the moment it is.
export const siteUrl = "https://adriaticastudio.com";

export const brand = {
  name: "Adriatica",
  wordmark: "Adriatica.",
  subline: "MARKETING STUDIO",
  positioning: "Non facciamo solo social media marketing. Costruiamo connessioni.",
  founder: "Andrea Patrizi",
  // Confirmed by Andrea directly (DECISIONS.md #4). Real framing is
  // solo-founder + 2 external collaborators, not a "team" in the sense the
  // Instagram-derived copy implied — "Chi siamo" copy (not yet built)
  // should read that way rather than overstating headcount.
  foundedYear: 2026,
  teamFraming: "Andrea, più due collaboratori esterni per foto/video e sviluppo.",
};

export const contact = {
  phone: "+39 349 244 2534",
  phoneHref: "tel:+393492442534",
  email: "andreapatrizicontact@gmail.com",
  emailHref: "mailto:andreapatrizicontact@gmail.com",
  whatsappHref: "https://wa.me/393492442534",
  // Confirmed by Andrea directly — Roma is the base city (DECISIONS.md #1).
  cityDisplay: "Roma",
};

// Instagram + LinkedIn confirmed by Andrea directly (DECISIONS.md #7).
// TikTok still open — nav/footer render nothing for a channel until its
// href is set. LinkedIn is Andrea's personal profile, not a company page —
// the only one he sent, so used as-is rather than inventing a company page.
export const socials: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/adriaticacomunicazione/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/andrea-patrizi-126491379" },
];

// Real Calendly link, confirmed by Andrea directly (DECISIONS.md #6).
export const calendlyUrl = "https://calendly.com/team_adriatica";

export const cta = {
  primary: "Prenota una call gratuita",
  secondary: "Guarda i progetti",
};

// brief §5.1 wanted a client-avatar cluster + review-score badge here.
// Andrea confirmed there are no real reviews yet and asked for fabricated
// ones — declined (DECISIONS.md #3): this honest line replaces both rather
// than inventing a score or a follower count that isn't real either.
export const trustNote = "Stiamo raccogliendo le prime recensioni.";

// brief §5.1 — the hero headline/sub are distinct from brand.positioning,
// which is the separate manifesto-strip line further down the home page.
export const hero = {
  eyebrow: "Social Media Marketing & Comunicazione — Roma",
  headline: "Trasformiamo brand in storie che le persone vogliono seguire.",
  sub: "Uniamo strategia, contenuti e dati per far crescere davvero la tua presenza online.",
};

// "Chi siamo" — brief §5.1.7. Built from confirmed real facts only
// (brand.foundedYear/teamFraming) — no invented headcount, years of
// experience, or client counts. Founder portrait still missing
// (MISSING-ASSETS.md), ships as an initials block until supplied.
export const chiSiamo = {
  eyebrow: "Chi siamo?",
  heading: "Sono Andrea, e sono Adriatica.",
  paragraph:
    "Adriatica nasce nel 2026 a Roma. Non è un'agenzia con cinquanta persone in open space — sono io, Andrea Patrizi, più due collaboratori esterni per foto/video e sviluppo. Seguo personalmente ogni progetto dalla prima chiamata al report mensile: niente passaggi di mano, niente account manager tra te e chi lavora davvero.",
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
  // Andrea confirmed no P.IVA yet — omitted from the site entirely rather
  // than showing a placeholder. Revisit if/when one exists (DECISIONS.md #5).
  piva: null as string | null,
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
  /** oneTime is the top of a real range Andrea gave, not a fixed figure — render as "a partire da" */
  fromPrice?: boolean;
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
    // Andrea confirmed a real site-build range (€1.800–2.000 for "un sito
    // complesso e pronto") — using the low end + brand identity (500) as an
    // honest "a partire da" floor rather than the flat 2.500 (2.000+500)
    // this used to show.
    oneTime: 2300,
    fromPrice: true,
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

// DECISIONS.md #10. Photography has real client prices too (€300 in zona /
// €400 fuori regione, vs. his own cost of €180/€250) but Andrea asked to
// keep it as "su richiesta" on-page anyway — kept here as a comment for
// reference, not wired to priceNote. Website edits: Andrea confirmed the
// client price genuinely varies by the specific edit requested (not a
// single flat rate) — "da €500" keeps his real anchor figure as a floor
// rather than presenting it as one fixed price.
export const addonServices: { name: string; description: string; priceNote?: string }[] = [
  {
    name: "Servizio fotografico",
    description: "Uno shooting dedicato di circa 4 ore, per 20–30 contenuti pronti da pubblicare.",
  },
  {
    name: "Modifiche extra al sito",
    description: "Interventi one-off fuori dal piano di gestione mensile.",
    priceNote: "da €500",
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

// Real Progetti content for the home page ScrollScatter — see DECISIONS.md.
// Nutriva and Rosso Pomodoro: both confirmed publishable (Rosso Pomodoro's
// approval landed after an initial "no" — see DECISIONS.md #2 for the
// timeline). La Tellina: real client, confirmed nameable, no deck yet —
// shown honestly as "in arrivo" rather than invented. Closing slot is a
// plain CTA, not a fabricated fourth project.
export type ProgettoCard = {
  fig: string;
  title: string;
  subtitle: string;
  x: number;
  rotate: number;
  depth: number;
  accent: "periwinkle" | "adriatic" | "abisso";
};

export const progettiCards: ProgettoCard[] = [
  {
    fig: "PROGETTO 01",
    title: "Nutriva",
    subtitle: "Brand identity — logo, palette, sistema visivo",
    x: -0.6,
    rotate: -5,
    depth: 0.5,
    accent: "adriatic",
  },
  {
    fig: "PROGETTO 02",
    title: "Rosso Pomodoro",
    subtitle: "Brand identity per pizzeria — logo, packaging, menu",
    x: 0.55,
    rotate: 6,
    depth: 0.65,
    accent: "abisso",
  },
  {
    fig: "PROGETTO 03",
    title: "La Tellina",
    subtitle: "Stabilimento, San Benedetto del Tronto — case study in arrivo",
    x: -0.15,
    rotate: -4,
    depth: 0.85,
    accent: "periwinkle",
  },
  {
    fig: "PROSSIMO",
    title: "Il prossimo progetto?",
    subtitle: "Prenota una call gratuita e parliamone.",
    x: -0.1,
    rotate: -3,
    depth: 0.35,
    accent: "abisso",
  },
];

// /metodo (brief §5.2). Positioning copy (Loro/Noi, vantaggi, FAQ) is
// opinion/brand voice, not factual claims about competitors — written to
// match confirmed real facts (solo + 2 collaboratori, no contracts data,
// real pricing already on this page) rather than inventing stats or client
// counts. Founder pull-quote is original, not a client-supplied quote.
export const loroNoi: { loro: string; noi: string }[] = [
  { loro: "Ti vendono un pacchetto standard.", noi: "Partiamo da una consulenza gratuita per capire cosa ti serve davvero." },
  { loro: "Contano i like.", noi: "Contiamo richieste, prenotazioni, vendite." },
  { loro: "Un account manager tra te e chi lavora.", noi: "Parli direttamente con chi crea i contenuti." },
  { loro: "Contratti lunghi, uscita difficile.", noi: "Nessun vincolo nascosto — restiamo se il lavoro funziona." },
  { loro: "Contenuti generici, uguali per ogni cliente.", noi: "Ogni piano editoriale parte dal tuo settore specifico." },
  { loro: "I file restano loro.", noi: "Tutto quello che creiamo è tuo, sempre." },
  { loro: "Report trimestrali, se va bene.", noi: "Report mensile, con dati veri — non vanity metrics." },
  { loro: "Team enorme, comunicazione lenta.", noi: "Studio piccolo — io più due collaboratori — risposte rapide." },
];

export type ProcessoStep = { title: string; bullets: string[] };

export const processoSteps: ProcessoStep[] = [
  {
    title: "Analisi",
    bullets: [
      "Studio del tuo settore e dei competitor",
      "Audit dei canali social e del sito esistenti",
      "Individuazione del pubblico reale",
    ],
  },
  {
    title: "Strategia",
    bullets: [
      "Obiettivi concreti, non vanity metrics",
      "Piano editoriale su misura",
      "Selezione dei canali giusti, non tutti",
    ],
  },
  {
    title: "Produzione",
    bullets: [
      "Foto, video, grafiche e copy",
      "Format pensati per come le persone guardano davvero i social",
      "Revisione prima della pubblicazione",
    ],
  },
  {
    title: "Distribuzione",
    bullets: [
      "Calendario di pubblicazione",
      "Ads mirate quando ha senso, non sempre",
      "Ottimizzazione di orari e formati",
    ],
  },
  {
    title: "Community",
    bullets: [
      "Risposta a commenti e messaggi",
      "Gestione di recensioni e situazioni delicate",
      "Costruzione di relazioni reali, non solo numeri",
    ],
  },
  {
    title: "Report & iterazione",
    bullets: [
      "Report mensile con dati veri",
      "Call di allineamento",
      "Aggiustamenti basati su cosa funziona davvero",
    ],
  },
];

export const founderQuote = {
  quote:
    "Non voglio gestire il tuo profilo social. Voglio essere il motivo per cui i tuoi clienti scelgono te invece del tuo concorrente.",
  attribution: brand.founder,
};

export const vantaggi: { title: string; description: string }[] = [
  { title: "Zero intermediari", description: "Parli sempre con chi lavora davvero sul tuo progetto." },
  { title: "Preventivo chiaro", description: "Tariffe reali, nessuna sorpresa dopo la firma." },
  { title: "Contenuti su misura", description: "Pensati per il tuo settore, non template riciclati." },
  { title: "Report mensile", description: "Dati veri, non screenshot di vanity metrics." },
  { title: "Nessun vincolo nascosto", description: "Restiamo insieme finché il lavoro ha senso per entrambi." },
  { title: "Consulenza gratuita", description: "Sempre, prima di qualsiasi impegno." },
];

export const metodoFaq: { question: string; answer: string }[] = [
  {
    question: "Quanto costa lavorare con voi?",
    answer:
      "Dipende dal servizio e dal piano — trovi le tariffe reali qui sopra. Ogni preventivo viene comunque calibrato dopo la consulenza gratuita.",
  },
  {
    question: "Quanto dura un contratto?",
    answer: "Non ci sono vincoli nascosti. Restiamo se il lavoro funziona, non perché sei legato a un contratto lungo.",
  },
  {
    question: "Lavorate anche fuori Roma?",
    answer:
      "Sì, con clienti in tutta Italia. Per gli shooting fotografici fuori regione i costi di trasferta sono inclusi nel preventivo.",
  },
  {
    question: "Chi crea davvero i contenuti?",
    answer:
      "Andrea, più due collaboratori esterni per foto/video e sviluppo. Nessun team enorme, nessun passaggio di mano.",
  },
  {
    question: "Cosa succede se non siete la soluzione giusta per me?",
    answer:
      "Te lo diciamo nella consulenza gratuita, senza girarci intorno — non ha senso iniziare una collaborazione che non funziona.",
  },
  {
    question: "Gestite anche le campagne pubblicitarie (Ads)?",
    answer:
      "Sì — la gestione è inclusa nei piani, il budget pubblicitario resta a tuo carico, così sai sempre dove va ogni euro.",
  },
  {
    question: "Posso vedere dei lavori reali?",
    answer:
      "Trovi i nostri progetti nella sezione Progetti in home page. Lo studio è giovane — ogni caso pubblicato è reale, non un archivio gonfiato.",
  },
  {
    question: "Come iniziamo?",
    answer:
      "Prenoti una call gratuita di 30 minuti, ci raccontiamo la situazione, e se ha senso ti mandiamo un preventivo su misura.",
  },
];

export const consulenza = {
  eyebrow: "03 — Consulenza",
  heading: "30 minuti, gratis, senza impegno.",
  sub: "Una call diretta con Andrea per capire se ha senso lavorare insieme — prima ancora di parlare di prezzi.",
  coversHeading: "Cosa copriamo nella call",
  covers: [
    "La situazione attuale del tuo brand: cosa funziona, cosa no, cosa manca.",
    "Un'idea concreta di strategia — non generica, calibrata sul tuo settore.",
    "Tempi e costi reali, così sai già a cosa vai incontro prima di decidere.",
  ],
  isNotHeading: "Cosa NON è",
  isNot: "Non è una call di vendita a pressione. Se non ha senso lavorare insieme, te lo diciamo — gratis, senza secondi fini.",
  stepsHeading: "Come funziona",
  steps: [
    { title: "Prenoti", description: "Scegli il giorno e l'ora che preferisci dal calendario qui sotto." },
    { title: "Ci sentiamo", description: "30 minuti al telefono o in videocall, direttamente con Andrea." },
    { title: "Ricevi un piano", description: "Se ha senso proseguire, ti mandiamo un preventivo su misura entro pochi giorni." },
  ],
  formHeading: "Preferisci scriverci prima?",
  formSub: "Lasciaci due righe e ti rispondiamo entro 24 ore per fissare la call.",
  faq: [
    {
      question: "La call è davvero gratuita?",
      answer: "Sì, sempre. Nessuna carta di credito, nessun impegno.",
    },
    {
      question: "Con chi parlo?",
      answer: "Direttamente con Andrea Patrizi, il fondatore — non con un commerciale.",
    },
    {
      question: "Devo prepararmi qualcosa?",
      answer: "No, basta che tu sappia dirci a grandi linee di cosa si occupa il tuo brand. Al resto pensiamo insieme in call.",
    },
    {
      question: "E se dopo la call decido di non proseguire?",
      answer: "Nessun problema — la consulenza resta gratuita in ogni caso, senza vincoli.",
    },
  ],
};

// SEO long-form — brief §5.2 target keywords, honestly labeled on-page as
// written for search rather than pretending it's more editorial copy.
export const metodoSeo = {
  eyebrow: "Per Google — SEO",
  paragraphs: [
    "Cerchi un'agenzia social media marketing a Roma? Adriatica è uno studio di comunicazione digitale che segue aziende, professionisti e attività locali nella gestione social, nella creazione di contenuti e nello sviluppo di siti web che convertono davvero.",
    "Ci occupiamo di gestione social aziende in settori diversi — dal fitness alla ristorazione, dal socio-sanitario all'ospitalità — con un approccio diretto: niente report gonfiati, niente vanity metrics. Come social media manager a Roma lavoriamo su strategia, contenuti e dati insieme, non uno alla volta.",
    "Se cerchi un partner per la tua presenza online, la prima consulenza è sempre gratuita.",
  ],
};

export const analisi = {
  eyebrow: "04 — Analisi social gratuita",
  heading: "Scopri cosa frena il tuo profilo.",
  sub: "Gratis, in 48 ore. Mandaci il tuo profilo e ti diciamo esattamente cosa non sta funzionando.",
  formHeading: "Raccontaci del tuo profilo",
  settoreOptions: [
    "Fitness",
    "Sanitario & Socio-Sanitario",
    "Ristorazione",
    "Altro",
  ],
  obiettivoOptions: [
    "Più follower qualificati",
    "Più contatti o prenotazioni",
    "Brand awareness",
    "Lanciare un nuovo progetto",
    "Non lo so ancora — è per questo che scrivo",
  ],
  submitLabel: "Invia la mia richiesta",
  confirmationHeading: "Cosa controlliamo davvero",
  confirmationNote: "Ti rispondiamo entro 48 ore, via email.",
  checklist: [
    "Bio & posizionamento",
    "Cadenza di pubblicazione",
    "Mix dei formati (reel, carosello, statico)",
    "Hook nei primi 3 secondi",
    "Hashtag & SEO on-profile",
    "Coerenza delle cover",
    "CTA presenti nei contenuti",
    "Tempo di risposta alla community",
    "Advertising attivo sì/no",
    "Distanza dai competitor diretti",
    "Coerenza visiva del brand",
    "Opportunità di crescita immediate",
  ],
};

// SEO long-form for /analisi — same honest-labeling approach as metodoSeo.
export const analisiSeo = {
  eyebrow: "Per Google — SEO",
  paragraphs: [
    "Analisi social gratuita per aziende e professionisti: controlliamo bio, contenuti, cadenza di pubblicazione e posizionamento del tuo profilo Instagram o TikTok, e ti diciamo cosa cambiare per crescere davvero.",
    "Non è un report automatico generato da un tool — è un'analisi fatta a mano da chi poi, se deciderai di lavorare con noi, seguirà davvero il tuo profilo.",
  ],
};

export const contatti = {
  eyebrow: "05 — Contatti",
  heading: "Parliamone.",
  sub: "Scrivici, chiama, o passa direttamente al punto con una call gratuita.",
  formHeading: "Scrivici",
  budgetOptions: [
    "Sotto i 500€/mese",
    "500–1000€/mese",
    "Oltre 1000€/mese",
    "Non sono sicuro/a",
  ],
  directHeading: "Contatto diretto",
  responseNote: "Rispondiamo entro 24 ore, dal lunedì al venerdì.",
  faq: [
    {
      question: "Preferite email, telefono o WhatsApp?",
      answer: "Va bene qualsiasi canale — rispondiamo tutti i giorni lavorativi, di solito entro 24 ore.",
    },
    {
      question: "Rispondete anche nel weekend?",
      answer: "Non sempre, ma se scrivi di venerdì sera non aspetterai fino a lunedì sera per una risposta.",
    },
  ],
};

// Real, accurate description of how this site's forms actually work
// (Resend for delivery, no other processors, no P.IVA yet — see
// DECISIONS.md #5/#15). Not a substitute for professional legal review,
// especially once Andrea registers a P.IVA — flagged there too.
export const privacyPolicy = {
  eyebrow: "Legale",
  heading: "Privacy Policy",
  updated: "7 agosto 2026",
  sections: [
    {
      heading: "Titolare del trattamento",
      paragraphs: [
        `Il titolare del trattamento dei dati raccolti tramite questo sito è ${brand.founder}, che opera come libero professionista con base a ${contact.cityDisplay}. Al momento l'attività non ha ancora una partita IVA attiva. Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a ${contact.email}.`,
      ],
    },
    {
      heading: "Quali dati raccogliamo",
      paragraphs: [
        "Raccogliamo solo i dati che inserisci volontariamente nei moduli del sito (pagine Contatti, Consulenza gratuita e Analisi social gratuita): nome, email, telefono ed azienda se forniti, budget indicativo se selezionato, e — nel modulo di analisi — il tuo handle social e il sito web da analizzare.",
        "Non usiamo cookie di tracciamento né raccogliamo dati di navigazione — vedi la Cookie Policy per i dettagli.",
      ],
    },
    {
      heading: "Perché li raccogliamo",
      paragraphs: [
        "Usiamo questi dati esclusivamente per risponderti, preparare un preventivo, oppure svolgere l'analisi social gratuita che hai richiesto. Non li usiamo per finalità di marketing non richieste e non li vendiamo né condividiamo con terzi a scopo commerciale.",
      ],
    },
    {
      heading: "Base giuridica",
      paragraphs: [
        "Il trattamento si basa sul consenso esplicito che dai selezionando la casella \"Accetto l'informativa privacy\" al momento dell'invio di un modulo.",
      ],
    },
    {
      heading: "Chi riceve i tuoi dati",
      paragraphs: [
        "I moduli del sito inviano i dati via email tramite Resend (resend.com), un servizio di invio email usato solo come infrastruttura tecnica di consegna — non ha altri usi. Nessun altro fornitore terzo riceve i dati che invii tramite i moduli.",
        "La pagina Consulenza gratuita include inoltre un embed di Calendly per la prenotazione delle call: se prenoti una call, i dati che inserisci in quel calendario (nome, email, orario) sono gestiti direttamente da Calendly secondo la loro informativa privacy, non dalla nostra.",
      ],
    },
    {
      heading: "Conservazione",
      paragraphs: [
        "Conserviamo i tuoi dati solo per il tempo necessario a gestire la tua richiesta e l'eventuale collaborazione successiva, salvo diversi obblighi di legge.",
      ],
    },
    {
      heading: "I tuoi diritti",
      paragraphs: [
        `Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli o farli cancellare, scrivendo a ${contact.email}.`,
      ],
    },
    {
      heading: "Modifiche a questa informativa",
      paragraphs: [
        "Questa informativa verrà aggiornata se cambiano gli strumenti usati dal sito o la struttura legale dell'attività (ad esempio con l'attivazione di una partita IVA).",
      ],
    },
  ],
};

export const cookiePolicy = {
  eyebrow: "Legale",
  heading: "Cookie Policy",
  updated: "7 agosto 2026",
  sections: [
    {
      heading: "Cookie utilizzati da questo sito",
      paragraphs: [
        "Questo sito non utilizza cookie di tracciamento, profilazione o marketing, e non installa strumenti di analytics.",
      ],
    },
    {
      heading: "Servizi di terze parti",
      paragraphs: [
        "La pagina Consulenza gratuita include un calendario Calendly incorporato per prenotare una call. Calendly può impostare i propri cookie tecnici secondo la propria informativa, indipendente da questo sito.",
      ],
    },
    {
      heading: "Aggiornamenti futuri",
      paragraphs: [
        "Se in futuro aggiungeremo strumenti di analisi del traffico (ad esempio per capire quali pagine funzionano meglio), questa pagina verrà aggiornata di conseguenza — e, se necessario, verrà aggiunto un banner di consenso.",
      ],
    },
  ],
};
