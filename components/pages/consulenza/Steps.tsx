import { Eyebrow } from "@/components/ui/Eyebrow";
import { consulenza } from "@/content/site";
import { consulenzaCopy } from "./copy";
import styles from "./Steps.module.css";

/** "Come funziona": three steps in the kit's `.method` language (thin top rule, blue mono label). */
export function Steps() {
  return (
    <ol className={styles.steps}>
      {consulenza.steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <Eyebrow as="span" className={styles.number}>
            {consulenzaCopy.steps.step} {String(index + 1).padStart(2, "0")}
          </Eyebrow>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
