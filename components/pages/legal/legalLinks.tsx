import Link from "next/link";
import type { ReactNode } from "react";
import { contact } from "@/content/site";

// Where it names a page or an address that exists on the site, the words are
// wrapped in a link at render time (the text itself does not change).

type LinkRule = { text: string; href: string; external?: boolean };

const rules: readonly LinkRule[] = [
  { text: contact.email, href: contact.emailHref },
  { text: "Analisi social gratuita", href: "/analisi" },
  { text: "Consulenza gratuita", href: "/consulenza" },
  { text: "Cookie Policy", href: "/cookie-policy" },
  { text: "Contatti", href: "/contatti" },
  { text: "resend.com", href: "https://resend.com", external: true },
  { text: "www.garanteprivacy.it", href: "https://www.garanteprivacy.it", external: true },
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// one capturing group: String.split keeps the matches at the odd indexes
const matcher = new RegExp(`(${[...rules].sort((a, b) => b.text.length - a.text.length).map((rule) => escapeRegExp(rule.text)).join("|")})`);

const ruleByText = new Map(rules.map((rule) => [rule.text, rule] as const));

/** Returns the paragraph as React nodes, with the known pages/addresses turned into links. */
export function linkifyLegalText(text: string): ReactNode[] {
  return text.split(matcher).map((part, index) => {
    if (index % 2 === 0) return part;
    const rule = ruleByText.get(part);
    if (!rule) return part;
    if (rule.external) {
      return (
        <a key={index} href={rule.href} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    if (rule.href.startsWith("mailto:")) {
      return (
        <a key={index} href={rule.href}>
          {part}
        </a>
      );
    }
    return (
      <Link key={index} href={rule.href}>
        {part}
      </Link>
    );
  });
}
