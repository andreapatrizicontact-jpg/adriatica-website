import type { Metadata } from "next";
import { Pill } from "@/components/ui/Pill";
import { TornEdge } from "@/components/ui/TornEdge";
import { LoroNoiSection } from "@/components/sections/LoroNoiSection";
import { ProcessoSection } from "@/components/sections/ProcessoSection";
import { FounderQuoteSection } from "@/components/sections/FounderQuoteSection";
import { VantaggiSection } from "@/components/sections/VantaggiSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { MetodoFaqSection } from "@/components/sections/MetodoFaqSection";
import { MetodoSeoSection } from "@/components/sections/MetodoSeoSection";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "Il Metodo",
  description:
    "Come lavoriamo davvero: Loro/Noi, il nostro processo in 6 passi, prezzi reali e le domande più frequenti.",
};

const inPageNav = [
  { number: "01", label: "Loro / Noi", href: "#loro-noi" },
  { number: "02", label: "Processo", href: "#processo" },
  { number: "03", label: "Prezzi", href: "#prezzi" },
  { number: "04", label: "FAQ", href: "#faq" },
];

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
            Studio piccolo, processo chiaro, prezzi reali. Ecco esattamente come lavoriamo.
          </p>
          <nav aria-label="Indice di pagina" className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {inPageNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 font-mono text-mono-label uppercase text-bianco/60 hover:text-periwinkle"
              >
                <span>{item.number}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <TornEdge from="blue" to="paper" />
      <LoroNoiSection />
      <TornEdge from="paper" to="dark" />

      <ProcessoSection />
      <FounderQuoteSection />
      <VantaggiSection />

      {/* no TornEdge here — Vantaggi and Pricing are both "dark", nothing to transition */}
      <div id="prezzi">
        <PricingSection />
      </div>

      <TornEdge from="dark" to="paper" />
      <MetodoFaqSection />
      <MetodoSeoSection />

      <section data-world="blue" className="section-y-tight px-6 text-center sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-display-l font-black">Parliamone, gratis.</h2>
          <p className="mt-4 font-body text-body-l text-bianco/85">
            30 minuti, senza impegno, per capire se ha senso lavorare insieme.
          </p>
          <div className="mt-8 flex justify-center">
            <Pill href="/consulenza" variant="chunky">
              {cta.primary}
            </Pill>
          </div>
        </div>
      </section>
    </>
  );
}
