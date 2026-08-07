import { brand, cta, hero } from "@/content/site";
import { Pill } from "@/components/ui/Pill";
import { TornEdge } from "@/components/ui/TornEdge";
import { CausticsCanvas } from "@/components/hero/CausticsCanvas";
import { ScrollScatter, type ScatterCard } from "@/components/sections/ScrollScatter";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NicheSection } from "@/components/sections/NicheSection";

// Real case-study content still pending (see MISSING-ASSETS.md) — full
// Progetti build lands in Phase 3.
const demoCards: ScatterCard[] = [
  { fig: "FIG. 01", title: "Progetto A", subtitle: "Social Media Management", x: -0.7, rotate: -6, depth: 0.3, accent: "abisso" },
  { fig: "FIG. 02", title: "Progetto B", subtitle: "Content Creation", x: 0.1, rotate: 4, depth: 0.6, accent: "adriatic" },
  { fig: "FIG. 03", title: "Progetto C", subtitle: "Strategia & Ads", x: -0.2, rotate: -3, depth: 0.9, accent: "periwinkle" },
  { fig: "FIG. 04", title: "Progetto D", subtitle: "Siti Web che convertono", x: 0.75, rotate: 7, depth: 0.45, accent: "abisso" },
  { fig: "FIG. 05", title: "Progetto E", subtitle: "Social Media Management", x: 0.4, rotate: -5, depth: 0.75, accent: "adriatic" },
];

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
            Meccanica ispirata a karolortyl.com: carte in CSS 3D che si muovono a velocità diverse
            durante lo scroll. Contenuti reali in Fase 3 — vedi MISSING-ASSETS.md.
          </p>
        </div>
        <div className="mt-8">
          <ScrollScatter cards={demoCards} />
        </div>
      </section>
    </>
  );
}
