import type { Metadata } from "next";
import { TornEdge } from "@/components/ui/TornEdge";
import { Pill } from "@/components/ui/Pill";
import { ConsulenzaCoversSection } from "@/components/sections/ConsulenzaCoversSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { ComeFunzionaSection } from "@/components/sections/ComeFunzionaSection";
import { ConsulenzaFaqSection } from "@/components/sections/ConsulenzaFaqSection";
import { consulenza } from "@/content/site";

export const metadata: Metadata = {
  title: "Consulenza gratuita",
  description: "Prenota una call gratuita di 30 minuti con Adriatica.",
};

export default function Consulenza() {
  return (
    <>
      <section
        data-world="blue"
        className="flex min-h-[60vh] items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/70">{consulenza.eyebrow}</p>
          <h1 className="mt-4 font-display text-display-xl font-black">{consulenza.heading}</h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">{consulenza.sub}</p>
          <div className="mt-10">
            <Pill href="#prenota" variant="chunky">
              Prenota adesso
            </Pill>
          </div>
        </div>
      </section>

      <TornEdge from="blue" to="paper" />
      <ConsulenzaCoversSection />
      <TornEdge from="paper" to="dark" />

      <BookingSection />

      <TornEdge from="dark" to="paper" />
      <ComeFunzionaSection />
      <ConsulenzaFaqSection />
    </>
  );
}
