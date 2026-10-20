import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { contatti } from "@/content/site";
import { DirectContact } from "./DirectContact";
import styles from "./ContactSection.module.css";

/**
 * The page's one blue block (the kit's contact ground): the written request on the
 * left (the form is passed in as `children`) and the direct channels on the right.
 * The form comes first in the source so keyboard and screen-reader order matches
 * what the visitor is here to do.
 */
export function ContactSection({ children }: { children: ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby="contatti-form-title">
      <Container className={styles.grid}>
        <div className={styles.write}>
          <h2 id="contatti-form-title" className={styles.label}>
            {contatti.formHeading}
          </h2>
          {children}
        </div>
        <DirectContact />
      </Container>
    </section>
  );
}
