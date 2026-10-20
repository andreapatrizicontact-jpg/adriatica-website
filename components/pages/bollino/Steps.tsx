import { Eyebrow } from "@/components/ui/Eyebrow";
import { bollino } from "@/content/site";
import styles from "./Steps.module.css";

/** "Come funziona": the three steps (verbatim), in the kit's `.method` language. */
export function Steps() {
  return (
    <ol className={styles.steps}>
      {bollino.steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <Eyebrow className={styles.number}>{String(index + 1).padStart(2, "0")}</Eyebrow>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
