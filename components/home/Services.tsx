import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { services } from "@/content/home";
import { contactHref } from "@/lib/services";
import styles from "./Services.module.css";

/**
 * #servizi — the kit's `section.services`.
 * Heading row, the big blue "gestione social" card and the two secondary
 * services. Every "Parliamo di…" link goes to the contact form with the
 * service preselected (contactHref) and carries data-service for the form.
 */
export function Services() {
  const { main, secondary } = services;

  return (
    <Container as="section" id="servizi" aria-labelledby="services-title" className={styles.services}>
      <div className={styles.heading}>
        <Eyebrow className={styles.headingEyebrow}>{services.eyebrow}</Eyebrow>
        <h2 id="services-title">
          <Lines lines={services.title} />
        </h2>
        <p className={styles.description}>
          <Lines lines={services.description} />
        </p>
      </div>

      <div className={styles.layout}>
        <article className={styles.main}>
          <div className={styles.top}>
            <Eyebrow>{main.eyebrow}</Eyebrow>
            <span className={styles.spark} aria-hidden="true">
              {main.symbol}
            </span>
          </div>
          <h3 className={styles.mainTitle}>
            <Lines lines={main.title} />
          </h3>
          <p className={styles.mainText}>{main.text}</p>
          <ul className={styles.pills}>
            {main.pills.map((pill) => (
              <li key={pill}>{pill}</li>
            ))}
          </ul>
          <TextLink href={contactHref(main.link.service)} data-service={main.link.service} className={styles.mainLink}>
            {main.link.label}
          </TextLink>
        </article>

        <div className={styles.secondary}>
          {secondary.map((item) => (
            <article key={item.link.service} className={styles.secondaryItem}>
              <div className={styles.top}>
                <Eyebrow>{item.eyebrow}</Eyebrow>
                <span className={styles.miniSymbol} aria-hidden="true">
                  {item.symbol}
                </span>
              </div>
              <h3>
                <Lines lines={item.title} />
              </h3>
              <p>{item.text}</p>
              <TextLink href={contactHref(item.link.service)} data-service={item.link.service} className={styles.secondaryLink}>
                {item.link.label}
              </TextLink>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
