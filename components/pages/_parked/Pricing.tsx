import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pricingExtras, pricingGuarantee, pricingPlans, pricingSub } from "@/content/site";
import { metodoCopy } from "../metodo/copy";
import styles from "./Pricing.module.css";

/** 1200 → "1.200 €" (non-breaking space), the same convention as the "da 2.000 €" extra. */
function formatEuro(amount: number) {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}

/**
 * Content of #prezzi: the three plans (the one the content marks as `featured` is
 * the dominant blue card), the extras and the guarantee — all verbatim from the store.
 */
export function Pricing() {
  const { prezzi } = metodoCopy;
  return (
    <>
      <p className={styles.intro}>{pricingSub}</p>

      <ul className={styles.plans}>
        {pricingPlans.map((plan) => (
          <li key={plan.name} className={`${styles.plan} ${plan.featured ? styles.featured : ""}`}>
            <div className={styles.top}>
              <div className={styles.titleRow}>
                <h3>{plan.name}</h3>
                {plan.featured && <Eyebrow as="span">{prezzi.featuredLabel}</Eyebrow>}
              </div>
              <p className={styles.tagline}>{plan.tagline}</p>
              <p className={styles.price}>
                <span className={styles.amount}>{formatEuro(plan.price)}</span>
                <Eyebrow as="span" className={styles.unit}>
                  {prezzi.units[plan.unit] ?? plan.unit}
                </Eyebrow>
              </p>
            </div>
            <div className={styles.body}>
              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {plan.note && <p className={styles.note}>{plan.note}</p>}
              <Button href="/consulenza" tone={plan.featured ? "cream" : "blue"} className={styles.cta}>
                {prezzi.cta}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.extras}>
        <Eyebrow as="h3" className={styles.extrasLabel}>
          {prezzi.extrasLabel}
        </Eyebrow>
        <ul className={styles.extrasList}>
          {pricingExtras.map((extra) => (
            <li key={extra.name} className={styles.extra}>
              <div>
                <h4>{extra.name}</h4>
                <p>{extra.description}</p>
              </div>
              <p className={styles.extraPrice}>{extra.priceNote}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.guarantee}>
        <h3>{pricingGuarantee.heading}</h3>
        <p>{pricingGuarantee.body}</p>
      </div>
    </>
  );
}
