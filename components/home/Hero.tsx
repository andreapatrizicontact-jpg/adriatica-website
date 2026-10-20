import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { hero } from "@/content/home";
import { Lanyard } from "./Lanyard";
import styles from "./Hero.module.css";

/**
 * #inizio — opening screen: people crossing a square on a blue carpet (the photo
 * is the top half, the carpet's flat blue continues as the hero background), the
 * floating nav bar, "Un’altra prospettiva.", and the cartellino hanging in front.
 */
export function Hero() {
  return (
    <section id="inizio" className={styles.hero} aria-labelledby="hero-title">
      {/* The LCP image: preloaded in <head>. */}
      <Image
        className={styles.photo}
        src="/images/hero-people.webp"
        alt={hero.photoAlt}
        width={1672}
        height={941}
        preload
        sizes="100vw"
      />

      <SiteHeader variant="hero" />

      <Container className={styles.content}>
        <Eyebrow className={styles.label}>{hero.eyebrow}</Eyebrow>

        <div className={styles.row}>
          {/* The intro returns keyboard focus here, hence tabIndex -1. */}
          <h1 className={styles.title} id="hero-title" tabIndex={-1}>
            <span className={styles.srOnly}>{hero.titleSrOnly} </span>
            <span aria-hidden="true">
              <Lines lines={hero.title} />
            </span>
          </h1>

          <div className={styles.offer}>
            <p>
              <Lines lines={hero.offer} />
            </p>
            <Button href={hero.cta.href} tone="cream" className={styles.cta}>
              {hero.cta.label}
            </Button>
          </div>
        </div>

        <Eyebrow as="div" className={styles.foot}>
          <ul>
            {hero.foot.services.map((service) => (
              <li key={service.n}>
                <span className={styles.n}>{service.n}</span> {service.label}
              </li>
            ))}
          </ul>
          <span>{hero.foot.right}</span>
        </Eyebrow>
      </Container>

      <Lanyard />
    </section>
  );
}
