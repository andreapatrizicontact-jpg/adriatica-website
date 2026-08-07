"use client";

import { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { Toggle3D } from "@/components/ui/Toggle3D";
import { pricingNote, pricingPlans } from "@/content/site";

const currency = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">Prezzi</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-display-l font-black">
            Un piano per ogni fase di crescita.
          </h2>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-mono-label uppercase ${annual ? "text-bianco/50" : "text-bianco"}`}>
              Mensile
            </span>
            <Toggle3D
              checked={annual}
              onChange={setAnnual}
              leftLabel="Mese"
              rightLabel="Anno"
              ariaLabel="Cadenza di fatturazione"
            />
            <span className={`font-mono text-mono-label uppercase ${annual ? "text-bianco" : "text-bianco/50"}`}>
              Annuale
            </span>
          </div>
        </div>

        <p className="mt-3 max-w-xl font-body text-body-s text-bianco/60">{pricingNote}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const monthlyEquivalent = Math.round(plan.annualPrice / 12);
            const savingsMonths = Math.round(
              (plan.monthlyPrice * 12 - plan.annualPrice) / plan.monthlyPrice
            );

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
                      {currency.format(price)}
                    </span>
                    <span className="font-mono text-mono-label uppercase opacity-70">
                      / {annual ? "anno" : "mese"}
                    </span>
                  </div>
                  {annual && (
                    <p
                      className={`mt-1 font-mono text-mono-label uppercase ${
                        plan.featured ? "text-inchiostro/70" : "text-periwinkle"
                      }`}
                    >
                      ≈ {currency.format(monthlyEquivalent)}/mese · risparmi {savingsMonths} mesi
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
      </div>
    </section>
  );
}
