// The three reviews already published on the site (source: kit
// reviews-source.json, 2026-10-09). Text, ratings, dates and attributions are
// kept verbatim. No aggregate score, no external-platform badge: none of it is
// verified, so none of it is shown. A 4,5 stays a 4,5.

export type Review = {
  id: string;
  /** label shown on top of the card (the service / client descriptor) */
  client: string;
  /** name shown in the card footer */
  author: string;
  /** "4,5" | "5" — Italian decimal comma, exactly as published */
  rating: string;
  /** short excerpt shown while the card is closed */
  excerpt: string;
  /** full review, shown when the card is opened */
  text: string;
  /** human date, as published */
  date: string;
  /** ISO date for <time datetime> */
  iso: string;
};

export const reviews: Review[] = [
  {
    id: "ristorante-smm",
    client: "Ristorante - SMM",
    author: "Ristorante - SMM",
    rating: "4,5",
    excerpt:
      "Da quando i nostri social li segue Adriatica il profilo ha finalmente una linea: foto dei piatti fatte bene, storie durante la settimana e testi che sembrano scritti da noi.",
    text: "Prima pubblicavamo quando capitava, di solito a fine servizio, e si vedeva. Da quando i nostri social li segue Adriatica il profilo ha finalmente una linea: foto dei piatti fatte bene, storie durante la settimana e testi che sembrano scritti da noi. Andrea viene a fare le riprese senza intralciare il lavoro in sala e ci manda il calendario in anticipo, così sappiamo sempre cosa uscirà. Per noi è stato un sollievo non doverci più pensare, e i clienti che ci dicono di averci trovati su Instagram sono sempre di più.",
    date: "10 giugno 2026",
    iso: "2026-06-10",
  },
  {
    id: "servizio-branding-pilates",
    client: "Servizio Branding - Pilates",
    author: "Servizio Branding - Pilates",
    rating: "5",
    excerpt:
      "Andrea ha capito subito l'atmosfera che volevamo trasmettere, calma, precisa e accogliente, e l'ha trasformata in un logo e in una palette che ci somigliano davvero.",
    text: "Quando abbiamo aperto lo studio avevamo le idee chiare sulle lezioni, molto meno su come presentarci. Andrea ha capito subito l'atmosfera che volevamo trasmettere, calma, precisa e accogliente, e l'ha trasformata in un logo e in una palette che ci somigliano davvero. Il percorso è stato semplice: poche call, proposte chiare e il tempo giusto per decidere senza fretta.",
    date: "15 luglio 2026",
    iso: "2026-07-15",
  },
  {
    id: "nutriva-team",
    client: "Nutriva Team",
    author: "Il team di Nutriva",
    rating: "5",
    excerpt:
      "Andrea ci ha ascoltato con attenzione, ci ha fatto domande a cui non avevamo mai pensato e già alla prima presentazione ci ha proposto una direzione chiara.",
    text: "Volevamo un'immagine riconoscibile, che non sembrasse l'ennesimo marchio del benessere tutto uguale. Andrea ci ha ascoltato con attenzione, ci ha fatto domande a cui non avevamo mai pensato e già alla prima presentazione ci ha proposto una direzione chiara. Oggi logo, colori e materiali raccontano la stessa cosa, e quando presentiamo Nutriva lo facciamo con strumenti di cui siamo davvero soddisfatti. Tempi rispettati, massima disponibilità sulle modifiche. Lo consigliamo a chi vuole partire con un'immagine curata fin dall'inizio.",
    date: "20 agosto 2026",
    iso: "2026-08-20",
  },
];
