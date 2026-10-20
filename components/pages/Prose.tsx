import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import styles from "./Prose.module.css";

/** Long-form text (privacy, cookie policy): readable measure, quiet headings. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.prose}>{children}</div>
      </Container>
    </section>
  );
}
