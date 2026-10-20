// Secondary navigation. The primary navigation (Servizi / Studio / Parliamone)
// lives in content/home.ts → homeNav and is identical on every page.
// These links keep every previously published page reachable from the footer
// without crowding the homepage.

export type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Servizi e progetti",
    links: [
      { label: "Tutti i servizi", href: "/metodo#servizi" },
      { label: "Il bollino trovabile", href: "/bollino" },
      { label: "Progetti", href: "/progetti" },
      { label: "Il metodo", href: "/metodo" },
    ],
  },
  {
    title: "Parliamone",
    links: [
      { label: "Consulenza gratuita", href: "/consulenza" },
      { label: "Analisi social gratuita", href: "/analisi" },
      { label: "Contatti", href: "/contatti" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];
