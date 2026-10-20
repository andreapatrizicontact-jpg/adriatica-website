import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { calendlyUrl, consulenza } from "@/content/site";
import { consulenzaCopy } from "./copy";
import styles from "./Booking.module.css";

/**
 * #prenota — the single dominant blue block of the page.
 * Left: the Calendly calendar in an iframe (same embed as the old site: the
 * public link, lazy-loaded) with a visible fallback link underneath. The frame has a
 * fixed height so nothing shifts while it loads. Right: the written alternative
 * ("Preferisci scriverci prima?"); the form itself is passed in as `children`.
 */
export function Booking({ children }: { children: ReactNode }) {
  const { booking } = consulenzaCopy;
  return (
    <section id="prenota" className={styles.section} aria-labelledby="prenota-title">
      <Container className={styles.grid}>
        <div className={styles.calendar}>
          <Eyebrow className={styles.eyebrow}>{booking.eyebrow}</Eyebrow>
          <h2 id="prenota-title">{booking.title}</h2>
          <div className={styles.frame}>
            <iframe src={calendlyUrl} title={booking.iframeTitle} className={styles.iframe} loading="lazy" />
          </div>
          <TextLink href={calendlyUrl} external className={styles.fallback}>
            {booking.fallback}
          </TextLink>
        </div>

        <div className={styles.write}>
          <Eyebrow as="h2" className={styles.eyebrow}>
            {consulenza.formHeading}
          </Eyebrow>
          <p className={styles.writeSub}>{consulenza.formSub}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}
