import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

type LogoProps = {
  /** "white" on dark/photographic backgrounds, "ink" on paper */
  tone?: "white" | "ink";
  href?: string;
  ariaLabel?: string;
  className?: string;
};

/**
 * Wordmark = the original Adriatica "A" symbol + "driatica." typeset in
 * Instrument Sans. The symbol IS the first letter: never render a second "A".
 */
export function Logo({ tone = "ink", href = "/", ariaLabel = "Adriatica, inizio", className }: LogoProps) {
  const src = tone === "white" ? "/images/mark-white.png" : "/images/mark-ink.png";
  const classes = className ? `${styles.logo} ${className}` : styles.logo;
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      <Image src={src} alt="" width={1029} height={852} sizes="40px" />
      <span>driatica.</span>
    </Link>
  );
}
