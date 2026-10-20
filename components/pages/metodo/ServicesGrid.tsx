import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { nicheCategories, servicePillars, type ServicePillar } from "@/content/site";
import { contactHref } from "@/lib/services";
import { metodoCopy, pillarCtas } from "./copy";
import styles from "./ServicesGrid.module.css";

/**
 * A pillar's href in the content store is an in-page anchor of the old homepage
 * ("#bollino"): on the new site that block is its own page.
 */
function pillarHref(pillar: ServicePillar) {
  if (pillar.href?.startsWith("#")) return `/${pillar.href.slice(1)}`;
  if (pillar.href) return pillar.href;
  return contactHref(pillarCtas[pillar.name]?.service);
}

/** Content of #servizi: the six service pillars + the sectors, as a quiet list. */
export function ServicesGrid() {
  return (
    <>
      <ul className={styles.grid}>
        {servicePillars.map((pillar, index) => {
          const cta = pillarCtas[pillar.name] ?? { label: "Parliamone" };
          const featured = index === 0;
          return (
            <li key={pillar.name} className={`${styles.card} ${featured ? styles.featured : ""}`}>
              <Eyebrow className={styles.number}>{String(index + 1).padStart(2, "0")}</Eyebrow>
              <h3 className={styles.name}>{pillar.name}</h3>
              <p className={styles.description}>{pillar.description}</p>
              <ul className={styles.includes}>
                {pillar.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <TextLink href={pillarHref(pillar)} className={styles.link}>
                {cta.label}
              </TextLink>
            </li>
          );
        })}
      </ul>

      <div className={styles.settori}>
        <Eyebrow as="h3" className={styles.settoriLabel}>
          {metodoCopy.servizi.settori}
        </Eyebrow>
        <dl className={styles.settoriList}>
          {nicheCategories.map(({ category, niches }) => (
            <div key={category} className={styles.settore}>
              <dt>{category}</dt>
              <dd>{niches.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
