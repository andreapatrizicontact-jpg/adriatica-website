import { loroNoi } from "@/content/site";
import { metodoCopy } from "./copy";
import styles from "./LoroNoi.module.css";

/**
 * Loro / Noi: a list of pairs. "Noi" is the one dominant blue column (the kit's
 * blue panel); "Loro" stays on the paper ground. Each row reads "Loro: … Noi: …"
 * to screen readers; the visible column labels are decorative.
 */
export function LoroNoi() {
  return (
    <div className={styles.compare}>
      <div className={styles.head} aria-hidden="true">
        <span className={styles.headLoro}>{metodoCopy.loroNoi.loro}</span>
        <span className={styles.headNoi}>{metodoCopy.loroNoi.noi}</span>
      </div>
      <ul className={styles.rows}>
        {loroNoi.map((row) => (
          <li key={row.loro} className={styles.row}>
            <p className={styles.loro}>
              <span className={styles.srOnly}>{metodoCopy.loroNoi.loro}: </span>
              <span className={styles.tag} aria-hidden="true">
                {metodoCopy.loroNoi.loro}
              </span>
              {row.loro}
            </p>
            <p className={styles.noi}>
              <span className={styles.srOnly}>{metodoCopy.loroNoi.noi}: </span>
              <span className={styles.tag} aria-hidden="true">
                {metodoCopy.loroNoi.noi}
              </span>
              {row.noi}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
