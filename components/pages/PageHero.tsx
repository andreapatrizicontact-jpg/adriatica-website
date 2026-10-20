import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  eyebrow?: string;
  /** rendered as the page's single <h1> */
  title: ReactNode;
  intro?: ReactNode;
  /** extra content under the intro (buttons, links) */
  children?: ReactNode;
  tone?: "paper" | "blue";
  /** optional decorative illustration on the right (wide screens only) */
  art?: ReactNode;
};

/** Opening block of every inner page (the homepage has its own hero). */
export function PageHero({ eyebrow, title, intro, children, tone = "paper", art }: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${tone === "blue" ? styles.blue : ""}`}>
      <Container className={styles.container}>
        {art && <div className={styles.art} aria-hidden="true">{art}</div>}
        {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
        <h1 className={styles.title}>{title}</h1>
        {intro && <div className={styles.intro}>{intro}</div>}
        {children && <div className={styles.actions}>{children}</div>}
      </Container>
    </section>
  );
}
