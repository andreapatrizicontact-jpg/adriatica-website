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

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            // Full Service already bundles site management in its base
            // price — the toggle must not add it a second time.
            const addonApplies = withSite && !plan.includesSite;
            const monthly = plan.monthly + (addonApplies ? siteManagementAddon.monthly : 0);

            return (
              <div
                key={plan.name}
                className={`flex flex-col gap-6 p-8 ${
                  plan.featured
                    ? "bg-periwinkle text-inchiostro"
                    : "border-2 border-bianco/15 text-bianco"
                }`}
              >
                <div>
                  <span className="font-display text-2xl font-black">{plan.name}</span>
                  <p
                    className={`mt-2 font-body text-body-s ${
                      plan.featured ? "text-inchiostro/75" : "text-bianco/70"
                    }`}
                  >
                    {plan.tagline}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-display-m font-black">
                      {currency.format(monthly)}
                    </span>
                    <span className="font-mono text-mono-label uppercase opacity-70">/ mese</span>
                  </div>
                  <p
                    className={`mt-1 font-mono text-mono-label uppercase ${
                      plan.featured ? "text-inchiostro/70" : "text-periwinkle"
                    }`}
                  >
                    + {currency.format(plan.oneTime)} una tantum
                  </p>
                  {(addonApplies || plan.includesSite) && (
                    <p
                      className={`mt-1 font-body text-body-s ${
                        plan.featured ? "text-inchiostro/70" : "text-bianco/60"
                      }`}
                    >
                      {plan.includesSite
                        ? `${siteManagementAddon.label} già inclusa`
                        : `include ${siteManagementAddon.label.toLowerCase()}`}
                    </p>
                  )}
                </div>

                <ul className="flex flex-1 flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`font-body text-body-s ${
                        plan.featured ? "text-inchiostro/85" : "text-bianco/80"
                      }`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.siteNote && (
                  <p
                    className={`-mt-2 font-body text-body-s italic ${
                      plan.featured ? "text-inchiostro/60" : "text-bianco/50"
                    }`}
                  >
                    {plan.siteNote}
                  </p>
                )}

                {/* featured card is already periwinkle — a periwinkle chunky
                    button on top of it would disappear, so it gets the
                    underlined ghost treatment instead; regular cards get the
                    chunky button so it pops against the dark/bordered card */}
                <Pill href="/consulenza" variant={plan.featured ? "ghost" : "chunky"}>
                  Parliamone
                </Pill>
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
