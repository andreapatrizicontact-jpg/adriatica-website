import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";
import { footer, instagramUrl } from "@/content/home";
import { footerLinkGroups } from "@/content/nav";
import { IntroReplayButton } from "./IntroReplayButton";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <Container as="footer" className={styles.footer}>
      <div className={styles.main}>
        <Logo tone="ink" href="/" ariaLabel={footer.homeAria} className={styles.logo} />
        <div className={styles.links}>
          <Link href={footer.links.reviews.href}>{footer.links.reviews.label}</Link>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            {footer.links.instagram.label} ↗
          </a>
          <IntroReplayButton label={footer.links.replay.label} className={styles.replay} />
          <Eyebrow as="span" className={styles.place}>
            {footer.place}
          </Eyebrow>
        </div>
      </div>
      <nav className={styles.more} aria-label="Altre pagine">
        {footerLinkGroups.map((group) => (
          <ul key={group.title} className={styles.group} aria-label={group.title}>
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </Container>
  );
}
