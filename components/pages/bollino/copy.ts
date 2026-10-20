// Copy that belongs to the /bollino layout itself (section labels, the closing heading,
// where the CTA goes). Everything the page says about the service — label, heading,
// intro, the twelve checks, the steps, the price, the pre-CTA line and the button label —
// stays verbatim in content/site.ts → bollino.

export const bollinoCopy = {
  /** alt text the old BollinoSticker used, kept as is */
  stickerAlt: "Bollino Trovabile — verificato da Adriatica Studio",
  checks: { eyebrow: "01 / CONTROLLI" },
  steps: { eyebrow: "02 / COME FUNZIONA" },
  price: { eyebrow: "03 / PREZZO" },
  closing: {
    // heading above the pre-CTA line ("Prova adesso: cerca su Google…")
    title: "Ti trovano già?",
    /**
     * /contatti rather than /#contatti: the homepage form preselects one of the three
     * services (social / shooting / strategy) and the bollino is none of them, while the
     * contact page is the open form where the visitor can name the bollino.
     */
    href: "/contatti",
  },
} as const;
