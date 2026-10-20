import { Eyebrow } from "@/components/ui/Eyebrow";
import { bollino } from "@/content/site";
import styles from "./Checks.module.css";

/** The twelve checks, all visible, as small bordered cards (verbatim from content/site.ts). */
export function Checks() {
  return (
    <ol className={styles.grid}>
      {bollino.checks.map((check, index) => (
        <li key={check} className={styles.card}>
          <Eyebrow as="span" className={styles.number}>
            {String(index + 1).padStart(2, "0")}
          </Eyebrow>
          <span className={styles.text}>{check}</span>
        </li>
      ))}
    </ol>
  );
}
