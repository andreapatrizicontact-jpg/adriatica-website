import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { studio } from "@/content/home";
import styles from "./Studio.module.css";

// Portrait column width at each layout step of the kit's grid
// (.9fr / 1.2fr with an 11% gap, 7% under 850px, 86% of the wrap under 600px).
const PORTRAIT_SIZES =
  "(max-width: 600px) calc((100vw - 40px) * 0.86), (max-width: 850px) calc((100vw - 48px) * 0.4), (max-width: 1528px) calc((100vw - 88px) * 0.382), 550px";

export function Studio() {
  return (
    <Container as="section" id="studio" aria-labelledby="studio-title" className={styles.studio}>
      <div className={styles.grid}>
        <div className={styles.portrait}>
          <Image
            className={styles.portraitImage}
            src="/images/andrea.jpg"
            alt={studio.portraitAlt}
            width={1428}
            height={2000}
            sizes={PORTRAIT_SIZES}
            loading="lazy"
          />
          <span className={styles.portraitTag}>{studio.portraitTag}</span>
        </div>

        <div className={styles.copy}>
          <Eyebrow className={styles.eyebrow}>{studio.eyebrow}</Eyebrow>
          <h2 id="studio-title" className={styles.title}>
            <Lines lines={studio.title} />
          </h2>
          {studio.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          <TextLink href={studio.link.href} className={styles.link}>
            {studio.link.label}
          </TextLink>
        </div>
      </div>

      <div className={styles.methodBlock} role="group" aria-label={studio.methodLabel}>
        <div className={styles.methodHead}>
          <h2 className={styles.methodTitle}>
            <Lines lines={studio.methodTitle} />
          </h2>
          <p className={styles.methodDescription}>{studio.methodDescription}</p>
        </div>
        <ol className={styles.method} role="list">
          {studio.method.map((step) => (
            <li key={step.eyebrow} className={styles.step}>
              <div className={styles.figure}>
                <Image src={step.image} alt="" width={1254} height={1254} sizes="(max-width: 600px) 60vw, 30vw" loading="lazy" />
              </div>
              <div className={styles.stepBody}>
                <Eyebrow as="span" className={styles.stepEyebrow}>
                  {step.eyebrow}
                </Eyebrow>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
