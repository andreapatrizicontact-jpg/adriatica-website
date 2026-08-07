import type { Metadata } from "next";
import { TornEdge } from "@/components/ui/TornEdge";
import { Pill } from "@/components/ui/Pill";
import { AnalisiFormSection } from "@/components/sections/AnalisiFormSection";
import { AnalisiChecklistSection } from "@/components/sections/AnalisiChecklistSection";
import { AnalisiSeoSection } from "@/components/sections/AnalisiSeoSection";
import { analisi, cta } from "@/content/site";

export const metadata: Metadata = {
  title: "Analisi social gratuita",
  description: "Scopri cosa frena il tuo profilo. Gratis, in 48 ore.",
};

export default function Analisi() {
  return (
    <>
      <section
        data-world="blue"
        className="flex min-h-[60vh] items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/70">{analisi.eyebrow}</p>
          <h1 className="mt-4 font-display text-display-xl font-black">{analisi.heading}</h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">{analisi.sub}</p>
        </div>
      </section>

      <TornEdge from="blue" to="paper" />
      <AnalisiFormSection />
      <TornEdge from="paper" to="dark" />

      <AnalisiChecklistSection />
      <AnalisiSeoSection />

      <TornEdge from="dark" to="blue" />
      <section data-world="blue" className="section-y-tight px-6 text-center sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-display-l font-black">Preferisci parlarne subito?</h2>
          <p className="mt-4 font-body text-body-l text-bianco/85">
            Salta l&apos;attesa dei 48 ore e prenota una call gratuita con Andrea.
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
