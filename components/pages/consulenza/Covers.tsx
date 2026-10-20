import { Eyebrow } from "@/components/ui/Eyebrow";
import { consulenza } from "@/content/site";
import styles from "./Covers.module.css";

/**
 * What the call covers (numbered list, thin rules) next to the one bordered
 * card that says what it is not. Content verbatim from the store.
 */
export function Covers() {
  return (
    <div className={styles.layout}>
      <ol className={styles.covers}>
        {consulenza.covers.map((item, index) => (
          <li key={item} className={styles.cover}>
            <Eyebrow as="span" className={styles.number}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </Eyebrow>
            <p>{item}</p>
          </li>
        ))}
      </ol>

      <div className={styles.isNot}>
        <Eyebrow as="h3" className={styles.isNotLabel}>
          {consulenza.isNotHeading}
        </Eyebrow>
        <p>{consulenza.isNot}</p>
      </div>
    </div>
  );
}
