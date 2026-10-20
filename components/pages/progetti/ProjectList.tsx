import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cta, progettiCards, type ProgettoCard } from "@/content/site";
import { progettiCopy } from "./copy";
import styles from "./ProjectList.module.css";

/** The closing slot of the old scatter is a plain call to action, not a fabricated project. */
function isNextCard(card: ProgettoCard) {
  return card.fig === "PROSSIMO";
}

/**
 * The published projects as a calm list of bordered cards (the old homepage scattered
 * them while scrolling). Text is verbatim from content/site.ts; the work-in-progress
 * card keeps its placeholder image and is marked as such.
 */
export function ProjectList() {
  return (
    <ul className={styles.list}>
      {progettiCards.map((card) =>
        isNextCard(card) ? (
          <li key={card.fig} className={`${styles.card} ${styles.next}`}>
            <article className={styles.article}>
              <Eyebrow className={styles.fig}>{card.fig}</Eyebrow>
              <div className={styles.body}>
                <h2 className={styles.title}>{card.title}</h2>
                <p className={styles.text}>{card.subtitle}</p>
                <Button href={progettiCopy.next.href} tone="cream" className={styles.cta}>
                  {cta.primary}
                </Button>
              </div>
            </article>
          </li>
        ) : (
          <li key={card.fig} className={styles.card}>
            <article className={styles.article}>
              <div className={styles.top}>
                <Eyebrow className={styles.fig}>{card.fig}</Eyebrow>
                {card.wip && (
                  <Eyebrow as="span" className={styles.wip}>
                    {progettiCopy.wipLabel}
                  </Eyebrow>
                )}
              </div>
              {card.image && (
                <div className={styles.media}>
                  {/* plain img: the placeholder is an SVG (next/image does not optimise SVGs) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt="" width={400} height={300} loading="lazy" decoding="async" />
                </div>
              )}
              <div className={styles.body}>
                <h2 className={styles.title}>{card.title}</h2>
                <p className={styles.text}>{card.subtitle}</p>
              </div>
            </article>
          </li>
        ),
      )}
    </ul>
  );
}
