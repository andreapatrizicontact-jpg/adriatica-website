import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { analisiSeo } from "@/content/site";
import styles from "./SeoNote.module.css";

/** The published long-form written for search, kept as a quiet, honestly labelled note. */
export function SeoNote() {
  return (
    <section className={styles.section} aria-labelledby="analisi-seo-title">
      <Container>
        <div className={styles.inner}>
          <Eyebrow as="h2" className={styles.label}>
            <span id="analisi-seo-title">{analisiSeo.eyebrow}</span>
          </Eyebrow>
          <div className={styles.text}>
            {analisiSeo.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
