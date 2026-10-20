import { analisi } from "@/content/site";
import styles from "./Checklist.module.css";

/** What the analysis looks at: the twelve points of the old checklist, verbatim. */
export function Checklist() {
  return (
    <ul className={styles.grid}>
      {analisi.checklist.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.check} aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
