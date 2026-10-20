import { Eyebrow } from "@/components/ui/Eyebrow";
import { founderQuote } from "@/content/site";
import styles from "./FounderQuote.module.css";

/** Andrea's pull-quote: a typographic moment on paper, no extra colour. */
export function FounderQuote() {
  return (
    <figure className={styles.figure}>
      <blockquote className={styles.quote}>
        <p>
          <span className={styles.mark} aria-hidden="true">
            &ldquo;
          </span>
          {founderQuote.quote}
          <span className={styles.mark} aria-hidden="true">
            &rdquo;
          </span>
        </p>
      </blockquote>
      <figcaption>
        <Eyebrow as="span" className={styles.caption}>
          — {founderQuote.attribution}
        </Eyebrow>
      </figcaption>
    </figure>
  );
}
