"use client";

import { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { Toggle3D } from "@/components/ui/Toggle3D";
import { addonServices, pricingNote, pricingPlans, siteManagementAddon } from "@/content/site";

const currency = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function PricingSection() {
  // real add-on evidenced in Andrea's own proposal (gestione sito €200/mese
  // as a separate line from gestione social) — not the invented
  // monthly/annual framing this section shipped with originally.
  const [withSite, setWithSite] = useState(false);

  return (
    <section data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">Prezzi</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-display-l font-black">
            Un piano per ogni fase di crescita.
          </h2>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-mono-label uppercase ${withSite ? "text-bianco/50" : "text-bianco"}`}>
              Solo social
            </span>
            <Toggle3D
              checked={withSite}
              onChange={setWithSite}
              leftLabel="Solo"
              rightLabel="+Sito"
              ariaLabel="Includi gestione sito web"
            />
            <span className={`font-mono text-mono-label uppercase ${withSite ? "text-bianco" : "text-bianco/50"}`}>
              + Gestione sito
            </span>
          </div>
        </div>

        <p className="mt-3 max-w-xl font-body text-body-s text-bianco/60">{pricingNote}</p>

        {/* gradient-border cards — adapted from a Uiverse.io snippet (Cobp),
            pasted directly for this section. Deliberate exception to the
            dark-world "0 radius" rule (DESIGN-PLAN §1.4): the rounded corner
            is the card, not decoration, so flattening it would lose the
            thing that was actually asked for — see DECISIONS.md. */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            // Full Service already bundles site management in its base
            // price — the toggle must not add it a second time.
            const addonApplies = withSite && !plan.includesSite;
            const monthly = plan.monthly + (addonApplies ? siteManagementAddon.monthly : 0);

            return (
              <div
                key={plan.name}
                className="rounded-[32px] bg-[linear-gradient(to_top_right,var(--color-periwinkle),var(--color-adriatic)_40%,var(--color-abisso)_65%,var(--color-nero)_100%)] p-1"
              >
                <div className="flex items-center justify-between px-6 pb-4 pt-5">
                  <span className="font-display text-xl font-black text-bianco">{plan.name}</span>
                  {plan.featured && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bianco/90">
                      Più scelto
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-5 rounded-[28px] bg-nero p-6 text-bianco/60">
                  <p className="font-body text-body-s">{plan.tagline}</p>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display-m font-black text-bianco">
                        {currency.format(monthly)}
                      </span>
                      <span className="font-mono text-mono-label uppercase opacity-70">/ mese</span>
                    </div>
                    <p className="mt-1 font-mono text-mono-label uppercase text-periwinkle">
                      + {currency.format(plan.oneTime)} una tantum
                    </p>
                    {(addonApplies || plan.includesSite) && (
                      <p className="mt-1 font-body text-body-s">
                        {plan.includesSite
                          ? `${siteManagementAddon.label} già inclusa`
                          : `include ${siteManagementAddon.label.toLowerCase()}`}
                      </p>
                    )}
                  </div>

                  <ul className="flex flex-1 flex-col gap-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="font-body text-body-s">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.siteNote && <p className="-mt-2 font-body text-body-s italic">{plan.siteNote}</p>}

                  <Pill href="/consulenza" variant="gradient">
                    Parliamone
                  </Pill>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 border-t border-bianco/15 pt-8">
          <p className="font-mono text-mono-label uppercase text-bianco/60">Extra</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {addonServices.map((addon) => (
              <div key={addon.name} className="flex items-baseline justify-between gap-4 border-2 border-bianco/10 p-5">
                <div>
                  <span className="font-display text-lg font-black text-bianco">{addon.name}</span>
                  <p className="mt-1 font-body text-body-s text-bianco/70">{addon.description}</p>
                </div>
                <span className="shrink-0 font-mono text-mono-label uppercase text-bianco/50">
                  su richiesta
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
