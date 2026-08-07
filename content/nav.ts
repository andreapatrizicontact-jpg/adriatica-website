export type NavItem = {
  number: string;
  label: string;
  href: string;
};

// Numbered on purpose — this is the deliberate funnel order (brief §2), not decoration.
export const mainNav: NavItem[] = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "Il Metodo", href: "/metodo" },
  { number: "03", label: "Consulenza gratuita", href: "/consulenza" },
  { number: "04", label: "Analisi social gratuita", href: "/analisi" },
  { number: "05", label: "Contatti", href: "/contatti" },
];

export type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Servizi",
    links: [
      { label: "Social Media Management", href: "/metodo#servizi" },
      { label: "Content Creation", href: "/metodo#servizi" },
      { label: "Strategia & Ads", href: "/metodo#servizi" },
      { label: "Siti Web che convertono", href: "/metodo#servizi" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Il Metodo", href: "/metodo" },
      { label: "Chi siamo", href: "/#chi-siamo" },
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
