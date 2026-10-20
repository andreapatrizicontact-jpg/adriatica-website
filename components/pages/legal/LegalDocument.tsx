import { PageHero } from "@/components/pages/PageHero";
import { Prose } from "@/components/pages/Prose";
import { linkifyLegalText } from "./legalLinks";
import styles from "./LegalDocument.module.css";

export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

type LegalDocumentProps = {
  /** prefix for the section ids ("privacy", "cookie") */
  idPrefix: string;
  eyebrow: string;
  heading: string;
  /** "7 agosto 2026", exactly as written in content/site.ts */
  updated: string;
  sections: readonly LegalSection[];
};

const months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

/** "7 agosto 2026" -> "2026-08-07" for <time datetime>. Returns undefined when the label is not in that shape. */
function toIsoDate(label: string): string | undefined {
  const match = /^(\d{1,2}) (\p{L}+) (\d{4})$/u.exec(label.trim());
  if (!match) return undefined;
  const month = months.indexOf(match[2].toLowerCase());
  if (month < 0) return undefined;
  return `${match[3]}-${String(month + 1).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

/** Privacy and cookie policy: shared PageHero + Prose, the text itself comes untouched from content/site.ts. */
export function LegalDocument({ idPrefix, eyebrow, heading, updated, sections }: LegalDocumentProps) {
  const iso = toIsoDate(updated);

  return (
    <>
      <PageHero
        eyebrow={eyebrow.toUpperCase()}
        title={heading}
        intro={
          <p className={styles.updated}>
            Ultimo aggiornamento: {iso ? <time dateTime={iso}>{updated}</time> : updated}
          </p>
        }
      />
      <Prose>
        <div className={styles.document}>
          {sections.map((section, index) => {
            const headingId = `${idPrefix}-${index + 1}`;
            return (
              <section key={section.heading} aria-labelledby={headingId}>
                <h2 id={headingId}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{linkifyLegalText(paragraph)}</p>
                ))}
              </section>
            );
          })}
        </div>
      </Prose>
    </>
  );
}
