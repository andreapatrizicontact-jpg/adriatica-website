import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { homeNav } from "@/content/home";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  /** "hero": floats over the opening photo (homepage) · "page": sits above the content of every other page */
  variant?: "hero" | "page";
};

/** Floating cream bar: logo · Servizi / Studio / Recensioni · @handle · Parliamone. */
export function SiteHeader({ variant = "page" }: SiteHeaderProps) {
  const isHero = variant === "hero";
  return (
    <Container as="header" className={`${styles.wrap} ${isHero ? styles.hero : styles.page}`}>
      <div className={styles.bar}>
        <Logo tone="ink" href="/" ariaLabel={isHero ? "Adriatica, inizio" : "Adriatica, vai alla homepage"} className={styles.logo} />
        <nav aria-label={homeNav.ariaLabel} className={styles.links}>
          {homeNav.links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.right}>
          <a href={homeNav.handle.href} className={styles.handle} target="_blank" rel="noopener noreferrer">
            {homeNav.handle.label}
          </a>
          <Link href={homeNav.contact.href} className={styles.contact}>
            {homeNav.contact.label} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
