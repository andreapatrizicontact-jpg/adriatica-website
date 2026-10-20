import { Eyebrow } from "@/components/ui/Eyebrow";
import { processoSteps } from "@/content/site";
import { metodoCopy } from "./copy";
import styles from "./ProcessSteps.module.css";

/** The six steps, all visible (the old accordion hid real content behind clicks). */
export function ProcessSteps() {
  return (
    <ol className={styles.steps}>
      {processoSteps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <Eyebrow className={styles.number}>
            {metodoCopy.processo.step} {String(index + 1).padStart(2, "0")}
          </Eyebrow>
          <h3>{step.title}</h3>
          <ul className={styles.bullets}>
            {step.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
