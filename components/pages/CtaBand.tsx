import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./CtaBand.module.css";

type CtaBandProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing blue band for inner pages — the same ground as the homepage contact block. */
export function CtaBand({ eyebrow, title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className={styles.band}>
      <Container className={styles.inner}>
        <div>
          {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
          <h2>{title}</h2>
          {text && <p className={styles.text}>{text}</p>}
        </div>
        <div className={styles.actions}>
          <Button href={primary.href} tone="cream">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} tone="blue" className={styles.ghost}>
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
