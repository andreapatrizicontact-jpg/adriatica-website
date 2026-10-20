import { vantaggi } from "@/content/site";
import styles from "./Vantaggi.module.css";

export function Vantaggi() {
  return (
    <ul className={styles.grid}>
      {vantaggi.map((item) => (
        <li key={item.title} className={styles.item}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
