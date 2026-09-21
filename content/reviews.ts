export type Review = {
  id: string;
  name: string;
  rating: number;
  quote: string;
  /** Nutriva's card shows a separate sign-off line below the quote, above the date */
  signature?: string;
  date: string;
};

// Real testimonials, given directly by Andrea (2026-09-21) — replaces the
// earlier placeholder screenshots. Nutriva is a named, already-published
// client; the other two are anonymised by role/service rather than named.
export const reviews: Review[] = [
  {
    id: "ristorante-smm",
    name: "Ristorante - SMM",
    rating: 4.5,
    quote:
      "Prima pubblicavamo quando capitava, di solito a fine servizio, e si vedeva. Da quando i nostri social li segue Adriatica il profilo ha finalmente una linea: foto dei piatti fatte bene, storie durante la settimana e testi che sembrano scritti da noi. Andrea viene a fare le riprese senza intralciare il lavoro in sala e ci manda il calendario in anticipo, così sappiamo sempre cosa uscirà. Per noi è stato un sollievo non doverci più pensare, e i clienti che ci dicono di averci trovati su Instagram sono sempre di più.",
    date: "10 giugno 2026",
  },
  {
    id: "branding-pilates",
    name: "Servizio Branding - Pilates",
    rating: 5,
    quote:
      "Quando abbiamo aperto lo studio avevamo le idee chiare sulle lezioni, molto meno su come presentarci. Andrea ha capito subito l'atmosfera che volevamo trasmettere, calma, precisa e accogliente, e l'ha trasformata in un logo e in una palette che ci somigliano davvero. Il percorso è stato semplice: poche call, proposte chiare e il tempo giusto per decidere senza fretta.",
    date: "15 luglio 2026",
  },
  {
    id: "nutriva",
    name: "Nutriva Team",
    rating: 5,
    quote:
      "Volevamo un'immagine riconoscibile, che non sembrasse l'ennesimo marchio del benessere tutto uguale. Andrea ci ha ascoltato con attenzione, ci ha fatto domande a cui non avevamo mai pensato e già alla prima presentazione ci ha proposto una direzione chiara. Oggi logo, colori e materiali raccontano la stessa cosa, e quando presentiamo Nutriva lo facciamo con strumenti di cui siamo davvero soddisfatti. Tempi rispettati, massima disponibilità sulle modifiche. Lo consigliamo a chi vuole partire con un'immagine curata fin dall'inizio.",
    signature: "Il team di Nutriva",
    date: "20 agosto 2026",
  },
];
