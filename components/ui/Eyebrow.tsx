import type { ElementType, ReactNode } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Geist Mono 11px label — "01 / COSA FACCIAMO". */
export function Eyebrow({ as, className, children }: EyebrowProps) {
  const Tag: ElementType = as ?? "p";
  return <Tag className={className ? `${styles.eyebrow} ${className}` : styles.eyebrow}>{children}</Tag>;
}
