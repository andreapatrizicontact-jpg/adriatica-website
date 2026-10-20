import styles from "./FaqList.module.css";

type FaqItem = { question: string; answer: string };

/** Native <details> accordion — no JS, keyboard and screen-reader friendly. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
