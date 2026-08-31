import { Pill } from "@/components/ui/Pill";
import { PaperCard } from "@/components/ui/PaperCard";
import { pricingExtras, pricingGuarantee, pricingHeading, pricingPlans, pricingSub } from "@/content/site";

const currency = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function PricingSection() {
  return (
    <section data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">Prezzi</p>
        <h2 className="mt-4 font-display text-display-l font-black">{pricingHeading}</h2>
        <p className="mt-4 max-w-xl font-body text-body-l text-bianco/75">{pricingSub}</p>

        {/* gradient-border cards — adapted from a Uiverse.io snippet (Cobp),
            pasted directly for this section. Deliberate exception to the
            dark-world "0 radius" rule (DESIGN-PLAN §1.4): the rounded corner
            is the card, not decoration, so flattening it would lose the
            thing that was actually asked for — see DECISIONS.md. */}
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[32px] bg-[linear-gradient(to_top_right,var(--color-periwinkle),var(--color-adriatic)_40%,var(--color-abisso)_65%,var(--color-nero)_100%)] p-1 ${
                plan.featured ? "lg:scale-[1.04] shadow-[0_0_0_2px_var(--color-periwinkle)]" : ""
              }`}
            >
              <div className="flex items-center justify-between px-6 pb-4 pt-5">
                <span className="font-display text-xl font-black text-bianco">{plan.name}</span>
                {plan.featured && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bianco/90">
                    Più scelto
                  </span>
                )}
              </div>

              <div className="flex h-full flex-col gap-5 rounded-[28px] bg-nero p-6 text-bianco/60">
                <p className="border-b border-bianco/15 pb-5 font-body text-body-s">{plan.tagline}</p>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-display-m font-black text-bianco">
                    {currency.format(plan.price)}
                  </span>
                  <span className="font-mono text-mono-label uppercase opacity-70">{plan.unit}</span>
                </div>

                <ul className="flex flex-1 flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="font-body text-body-s">
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.note && <p className="-mt-2 font-body text-body-s text-bianco/50">{plan.note}</p>}

                <Pill href="/consulenza" variant="gradient">
                  Parliamone
                </Pill>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-bianco/15 pt-8">
          <p className="font-mono text-mono-label uppercase text-bianco/60">Extra</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {pricingExtras.map((extra) => (
              <PaperCard key={extra.name}>
                <div className="flex items-baseline justify-between gap-4 p-5 text-bianco">
                  <div>
                    <span className="font-display text-lg font-black">{extra.name}</span>
                    <p className="mt-1 font-body text-body-s text-bianco/75">{extra.description}</p>
                  </div>
                  <span className="shrink-0 text-right font-mono text-mono-label uppercase text-bianco/60">
                    {extra.priceNote}
                  </span>
                </div>
              </PaperCard>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-periwinkle p-8 text-inchiostro">
          <h3 className="max-w-lg font-display text-xl font-black">{pricingGuarantee.heading}</h3>
          <p className="mt-3 max-w-2xl font-body text-body-m text-inchiostro/80">{pricingGuarantee.body}</p>
        </div>
      </div>
    </section>
  );
}
