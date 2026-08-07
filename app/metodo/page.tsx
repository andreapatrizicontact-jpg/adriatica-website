import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";

export const metadata: Metadata = {
  title: "Il Metodo",
  description: "Il nostro metodo. Zero fuffa.",
};

// Full build in Phase 4 — Loro/Noi, processo, pull-quote, vantaggi, FAQ, SEO.
// Pricing landed early (requested directly) — see DECISIONS.md for the
// placeholder-figures caveat.
export default function Metodo() {
  return (
    <>
      <section
        data-world="blue"
        className="flex min-h-[60vh] items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/70">02 — Il Metodo</p>
          <h1 className="mt-4 font-display text-display-xl font-black">
            Il nostro metodo. Zero fuffa.
          </h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">
            Pagina completa in arrivo — Fase 4.
          </p>
        </div>
      </section>

      <PricingSection />
    </>
  );
}
