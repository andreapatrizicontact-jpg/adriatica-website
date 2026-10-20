import { metodoCopy } from "./copy";
import styles from "./PageIndex.module.css";

/** In-page index under the hero: plain anchor links to the page's sections. */
export function PageIndex() {
  return (
    <nav aria-label={metodoCopy.index.ariaLabel} className={styles.nav}>
      <ul className={styles.list}>
        {metodoCopy.index.items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={styles.link}>
              <span className={styles.number} aria-hidden="true">
                {item.number}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
