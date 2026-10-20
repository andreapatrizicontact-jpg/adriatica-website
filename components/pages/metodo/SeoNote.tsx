import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { metodoSeo } from "@/content/site";
import styles from "./SeoNote.module.css";

/** The published long-form written for search, kept as a quiet, honestly labelled note. */
export function SeoNote() {
  return (
    <section className={styles.section} aria-labelledby="metodo-seo-title">
      <Container>
        <div className={styles.inner}>
          <Eyebrow as="h2" className={styles.label}>
            <span id="metodo-seo-title">{metodoSeo.eyebrow}</span>
          </Eyebrow>
          <div className={styles.text}>
            {metodoSeo.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
