import { Fragment } from "react";
import { bollino } from "@/content/site";
import styles from "./Price.module.css";

/**
 * The price, exactly as written in content/site.ts. The only change is typographic:
 * the amounts ("€650", "€250") are set in the display face; the characters stay the same.
 */
export function Price() {
  const parts = bollino.price.split(/(€\d[\d.,]*)/);
  return (
    <div className={styles.panel}>
      <p className={styles.price}>
        {parts.map((part, index) =>
          index % 2 === 1 ? (
            <strong key={index} className={styles.amount}>
              {part}
            </strong>
          ) : (
            <Fragment key={index}>{part}</Fragment>
          ),
        )}
      </p>
    </div>
  );
}
