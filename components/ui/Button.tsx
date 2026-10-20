import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Tone = "cream" | "blue";

type CommonProps = {
  tone?: Tone;
  /** hides the trailing arrow */
  noArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function buttonClass(tone: Tone, className?: string) {
  return [styles.button, styles[tone], className].filter(Boolean).join(" ");
}

/** The kit's pill button (radius 30px, padding 17px 22px). Renders a link when `href` is set. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const { tone = "cream", noArrow, className, children, href, ...anchor } = props;
    return (
      <Link href={href} className={buttonClass(tone, className)} {...anchor}>
        {children}
        {!noArrow && <span aria-hidden="true">↗</span>}
      </Link>
    );
  }

  const { tone = "cream", noArrow, className, children, href: _href, ...button } = props;
  void _href;
  return (
    <button type="button" className={buttonClass(tone, className)} {...button}>
      {children}
      {!noArrow && <span aria-hidden="true">↗</span>}
    </button>
  );
}
