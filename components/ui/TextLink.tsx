import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./TextLink.module.css";

type TextLinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

/** Underlined text link with the trailing arrow — the kit's `.text-link`. */
export function TextLink({ href, external, className, children, ...rest }: TextLinkProps) {
  const classes = className ? `${styles.link} ${className}` : styles.link;
  const content = (
    <>
      {children} <span aria-hidden="true">↗</span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
