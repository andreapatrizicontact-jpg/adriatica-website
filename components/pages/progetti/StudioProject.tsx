import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { work } from "@/content/home";
import { progettiCopy } from "./copy";
import styles from "./StudioProject.module.css";

/**
 * Short pointer to the studio's own project, which lives on the homepage
 * (#direzione). Same pattern as the kit's `.work-caption`: title + line + text link.
 */
export function StudioProject() {
  const { studio } = progettiCopy;
  return (
    <section className={styles.section} aria-labelledby="studio-project-title">
      <Container className={styles.inner}>
        <div>
          <h2 id="studio-project-title" className={styles.title}>
            {work.caption.title}
          </h2>
          <p className={styles.text}>{work.caption.text}</p>
        </div>
        <TextLink href={studio.link.href} className={styles.link}>
          {studio.link.label}
        </TextLink>
      </Container>
    </section>
  );
}
