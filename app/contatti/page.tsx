import type { Metadata } from "next";
import { TornEdge } from "@/components/ui/TornEdge";
import { ContattiSection } from "@/components/sections/ContattiSection";
import { ContattiFaqSection } from "@/components/sections/ContattiFaqSection";
import { contatti } from "@/content/site";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Scrivici o chiamaci — rispondiamo rapidamente.",
  alternates: { canonical: "/contatti" },
};

export default function Contatti() {
  return (
    <>
      <section
        data-world="blue"
        className="flex min-h-[40vh] items-end px-6 pt-40 pb-16 sm:px-10 sm:pt-48 sm:pb-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/70">{contatti.eyebrow}</p>
          <h1 className="mt-4 font-display text-display-xl font-black">{contatti.heading}</h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">{contatti.sub}</p>
        </div>
      </section>

      <ContattiSection />

      <TornEdge from="blue" to="paper" />
      <ContattiFaqSection />
    </>
  );
}
