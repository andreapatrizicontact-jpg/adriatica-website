// Copy that belongs to the /progetti layout itself (headings, labels, link text).
// The projects (fig, title, subtitle) stay verbatim in content/site.ts → progettiCards;
// "Adriatica, da vicino." and its caption come from content/home.ts → work.caption.

export const progettiCopy = {
  hero: {
    eyebrow: "PROGETTI",
    title: "I nostri primi progetti.",
    // the honest line the old homepage carried above the cards
    intro: "Studio ancora giovane — questi sono i primi progetti reali, non un archivio di dieci anni.",
  },
  listAriaLabel: "Progetti pubblicati",
  wipLabel: "Work in progress",
  /** the closing card ("PROSSIMO") */
  next: { href: "/consulenza" },
  studio: {
    ariaLabel: "Il progetto dello studio",
    link: { label: "Guarda il progetto dello studio", href: "/#direzione" },
  },
} as const;
