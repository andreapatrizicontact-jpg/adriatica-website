import { brand, cta, hero, progettiCards, trustNote } from "@/content/site";
import { Pill } from "@/components/ui/Pill";
import { TornEdge } from "@/components/ui/TornEdge";
import { CausticsCanvas } from "@/components/hero/CausticsCanvas";
import { ScrollScatter } from "@/components/sections/ScrollScatter";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NicheSection } from "@/components/sections/NicheSection";
import { ChiSiamoSection } from "@/components/sections/ChiSiamoSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export default function Home() {
  return (
    <>
      <section
        data-world="blue"
        className="relative flex min-h-[90vh] items-center overflow-hidden px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
      >
        <CausticsCanvas />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/70">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-display-2xl font-black">{hero.headline}</h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Pill href="/consulenza" variant="chunky">
              {cta.primary}
            </Pill>
            <Pill href="#progetti" variant="ghost">
              {cta.secondary}
            </Pill>
          </div>
          <p className="mt-6 font-mono text-mono-label uppercase text-bianco/50">{trustNote}</p>
        </div>
      </section>

      <TornEdge from="blue" to="dark" />

      {/* manifesto strip — brand.positioning, distinct from the hero headline (brief §5.1.2) */}
      <section data-world="dark" className="section-y-tight px-6 text-center sm:px-10">
        <p className="mx-auto max-w-4xl font-display text-display-xl font-black">
          {brand.positioning}
        </p>
      </section>

      <ServicesSection />

      <TornEdge from="dark" to="blue" />
      <NicheSection />
      <TornEdge from="blue" to="dark" />

      <section id="progetti" data-world="dark" className="section-y-tight px-6 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/60">Progetti</p>
          <h2 className="mt-4 font-display text-display-l font-black">
            Scorri per vedere i progetti prendere forma.
          </h2>
          <p className="mt-4 max-w-xl font-body text-body-m text-bianco/80">
            Studio ancora giovane — questi sono i primi progetti reali, non un archivio di dieci
            anni. Meccanica ispirata a karolortyl.com.
          </p>
        </div>
        <div className="mt-8">
          <ScrollScatter cards={progettiCards} />
        </div>
      </section>

      <TornEdge from="dark" to="blue" />
      <ChiSiamoSection />

      <ContactCTASection />
    </>
  );
}
