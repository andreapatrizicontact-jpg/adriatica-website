// Homepage copy — verbatim from the approved design kit
// (copy-italiano.json / design-reference/index.html, 2026-10-09).
// Line breaks are arrays of lines: render them with <Lines lines={...} />.
// Contact data (email, phone, WhatsApp, LinkedIn…) stays in content/site.ts.

export const instagramUrl = "https://www.instagram.com/adriaticastudio/";

export const homeNav = {
  ariaLabel: "Navigazione principale",
  links: [
    { label: "Servizi", href: "/#servizi" },
    { label: "Studio", href: "/#studio" },
    { label: "Recensioni", href: "/#recensioni" },
  ],
  handle: { label: "@adriaticastudio", href: instagramUrl },
  contact: { label: "Parliamone", href: "/#contatti" },
} as const;

export const hero = {
  titleSrOnly: "Adriatica, studio di social media, foto e video a Roma.",
  eyebrow: "SOCIAL MEDIA STUDIO · ROMA",
  title: ["Un’altra", "prospettiva."],
  offer: ["Sui tuoi social.", "Strategia, foto e video per dare", "più carattere alla tua attività."],
  photoAlt: "Persone che attraversano una piazza dall’alto, su un tappeto blu",
  cta: { label: "Parliamo dei tuoi social", href: "/#contatti" },
  foot: {
    services: [
      { n: "01", label: "Gestione social" },
      { n: "02", label: "Foto + video" },
      { n: "03", label: "Strategia" },
    ],
    right: "ROMA · A MODO TUO.",
  },
} as const;

export const lanyardBadge = {
  name: "Andrea Patrizi",
  role: "Social Media Manager and Brand Creator",
  studio: "Adriatica Studio · Roma",
  photoAlt: "Andrea Patrizi",
  hint: "Trascinami",
  keyboardHint: "Usa le frecce per muovere il cartellino",
  // keys added for the lanyard component (the keys above are the approved ones)
  mark: "ADRIATICA STUDIO",
  place: "ROMA · 2026",
  strapText: "adriatica.",
} as const;

export const services = {
  eyebrow: "01 / COSA FACCIAMO",
  title: ["da dove", "partiamo?"],
  description: ["Un percorso continuativo.", "O il contenuto che ti mancava."],
  main: {
    eyebrow: "GESTIONE SOCIAL · OGNI MESE",
    symbol: "✳",
    title: ["I tuoi social,", "con un piano."],
    text: "Strategia, contenuti e pubblicazioni. Una direzione riconoscibile, un calendario condiviso e una persona con cui confrontarti.",
    pills: ["Direzione editoriale", "Contenuti", "Calendario", "Pubblicazione"],
    link: { label: "Parliamo della gestione", service: "social" },
  },
  secondary: [
    {
      eyebrow: "FOTO + VIDEO",
      symbol: "◎",
      title: ["Prima l’idea.", "Poi il ciak."],
      text: "Uno shooting nella tua attività. Foto e video pensati per i tuoi canali, con un motivo dietro ogni ripresa.",
      link: { label: "Parliamo dello shooting", service: "shooting" },
    },
    {
      eyebrow: "SESSIONE STRATEGICA",
      symbol: "↗",
      title: ["Facciamo", "il punto."],
      text: "Un confronto per mettere a fuoco la tua comunicazione, scegliere le priorità e trovare da dove partire.",
      link: { label: "Parliamo della strategia", service: "strategy" },
    },
  ],
} as const;

export const work = {
  eyebrow: "02 / UNA DIREZIONE CHE SI VEDE",
  title: ["stessa voce.", "forme diverse."],
  description: ["Un’identità funziona quando torna.", "Nei colori, nelle parole, nelle idee."],
  boardLabel: "Esempi di contenuti del progetto Adriatica",
  boardNote: "A MODO TUO.",
  posts: [
    { src: "/images/post-01.png", alt: "Post Adriatica: parla a qualcuno, con megafono blu" },
    { src: "/images/post-03.png", alt: "Post Adriatica: il profilo è una porta, con porta blu" },
    { src: "/images/post-05.png", alt: "Post Adriatica: fatti riconoscere, con graffetta blu" },
  ],
  caption: {
    title: "Adriatica, da vicino.",
    text: "Identità visiva e contenuti Instagram · progetto dello studio",
    link: { label: "Il profilo Adriatica" },
  },
} as const;

export const studio = {
  eyebrow: "03 / LO STUDIO",
  title: ["dietro Adriatica,", "ci sono io."],
  portraitAlt: "Andrea Patrizi, fondatore di Adriatica, a Roma",
  portraitTag: "piacere, Andrea.",
  paragraphs: [
    "Sono Andrea Patrizi. Seguo personalmente la direzione del progetto e il confronto con te.",
    "Per foto e video lavoro con collaboratori. Il tuo riferimento resto io, dal primo incontro al prossimo contenuto.",
  ],
  link: { label: "Conosciamoci", href: "/#contatti" },
  methodLabel: "Come lavoriamo insieme",
  methodTitle: ["Dalle persone.", "Alle idee."],
  methodDescription: "Ogni progetto parte da un confronto. Poi trova una direzione, un ritmo e una voce.",
  method: [
    {
      eyebrow: "01 / ASCOLTO",
      title: "Prima ti ascolto.",
      text: "La tua attività, le persone che vuoi raggiungere e quello che ti rende riconoscibile.",
      image: "/images/figure-ascolto.webp",
    },
    {
      eyebrow: "02 / DIREZIONE",
      title: "Troviamo una direzione.",
      text: "Mettiamo a fuoco le priorità. Poi scegliamo le idee e i contenuti da sviluppare.",
      image: "/images/figure-direzione.webp",
    },
    {
      eyebrow: "03 / CONTINUITÀ",
      title: "La portiamo avanti.",
      text: "Approvi i contenuti prima che escano. Poi guardiamo le risposte, insieme.",
      image: "/images/figure-continuita.webp",
    },
  ],
} as const;

export const reviewsSection = {
  eyebrow: "04 / LE PAROLE DEI CLIENTI",
  title: ["cosa dicono", "i clienti."],
  description: ["Chi ci ha affidato i social.", "Chi è partito dall’identità.", "Qui, le loro parole."],
  openLabel: "Leggi la recensione",
} as const;

export const contactSection = {
  eyebrow: "05 / IL PROSSIMO PASSO",
  title: ["facciamo", "spazio alla", "tua idea."],
  text: "Dimmi che attività hai e cosa vorresti migliorare. Partiamo da un primo confronto.",
  legend: "Da dove vuoi partire?",
  fields: {
    name: { label: "Il tuo nome", placeholder: "Come ti chiami?" },
    email: { label: "La tua email", placeholder: "Dove posso risponderti?" },
    message: {
      label: "Raccontami la tua attività",
      placeholder: "Cosa fai e cosa vorresti migliorare? Puoi aggiungere il link al tuo profilo.",
    },
  },
  // same mechanism as the previous site: required checkbox + link to /privacy
  consent: { before: "Accetto l’informativa ", linkLabel: "privacy", after: ".", href: "/privacy" },
  submit: "Vediamo da dove partire",
  status: {
    pending: "Invio in corso…",
    success: "Grazie, ho ricevuto la tua richiesta. Ti risponderò all’email che hai indicato.",
    error: "L’invio non è riuscito. Riprova oppure scrivimi a contact@adriaticastudio.com.",
    validation: "Controlla i campi richiesti e inserisci un indirizzo email valido.",
  },
} as const;

export const footer = {
  homeAria: "Adriatica, torna all’inizio",
  links: {
    reviews: { label: "Recensioni", href: "/#recensioni" },
    instagram: { label: "Instagram" },
    replay: { label: "Rivedi la firma" },
  },
  place: "ROMA · 2026",
} as const;

export const intro = {
  dialogLabel: "La firma di Adriatica",
  videoLabel: "Animazione del logo Adriatica",
  skip: "Entra nello studio",
} as const;
