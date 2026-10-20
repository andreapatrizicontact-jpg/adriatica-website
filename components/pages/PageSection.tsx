import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./PageSection.module.css";

type PageSectionProps = {
  id?: string;
  /** background ground; "work" and "reviews" are the kit's two neutral greys */
  tone?: "paper" | "work" | "reviews" | "blue";
  eyebrow?: string;
  /** rendered as <h2> */
  title?: ReactNode;
  /** short line aligned to the right of the title on wide screens */
  description?: ReactNode;
  children?: ReactNode;
  /** accessible name when there is no visible title */
  ariaLabel?: string;
};

/** A section of an inner page: kit padding (96/68/58), optional eyebrow + h2 + description. */
export function PageSection({ id, tone = "paper", eyebrow, title, description, children, ariaLabel }: PageSectionProps) {
  const titleId = id && title ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[tone]}`}
      aria-labelledby={titleId}
      aria-label={!titleId ? ariaLabel : undefined}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div className={styles.heading}>
            <div>
              {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
              {title && <h2 id={titleId}>{title}</h2>}
            </div>
            {description && <div className={styles.description}>{description}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
