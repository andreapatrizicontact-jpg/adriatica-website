import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Container.module.css";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** The kit's `.wrap`: 1440px max, 44 / 24 / 20px side margins (CSS variable driven). */
export function Container<T extends ElementType = "div">({ as, className, ...rest }: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={className ? `${styles.wrap} ${className}` : styles.wrap} {...rest} />;
}
