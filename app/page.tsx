import { brand } from "@/content/site";
import { Pill } from "@/components/ui/Pill";
import { DominoLoader } from "@/components/ui/DominoLoader";
import { ScrollScatter, type ScatterCard } from "@/components/sections/ScrollScatter";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NicheSection } from "@/components/sections/NicheSection";

// Placeholder for Phase 1 (chrome only) — the real hero/hero-shader/full page
// composition lands in Phase 2 and Phase 3 per the brief's phase plan. The
// scroll gallery and button/loader demos below are included early because
// they were requested directly — real case-study content replaces the
// placeholder cards once available (see MISSING-ASSETS.md).
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
        className="flex min-h-[70vh] items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/70">
            Social Media Marketing &amp; Comunicazione — Roma
          </p>
          <h1 className="mt-4 font-display text-display-2xl font-black">
            {brand.positioning}
          </h1>
          <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">
            Fase 1 in corso: qui arriverà l&apos;hero con lo shader caustico
            (Fase 2) e la composizione completa della home (Fase 3). Per ora
            questa pagina verifica l&apos;impianto globale e le nuove
            primitive — pulsante 3D, toggle tema, loader e la galleria
            scroll qui sotto.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Pill href="/consulenza" variant="chunky">
              Prenota una call gratuita
            </Pill>
            <DominoLoader />
          </div>
        </div>
      </section>

      <ServicesSection />
      <NicheSection />

      <section data-world="dark" className="section-y-tight px-6 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-mono-label uppercase text-bianco/60">
            Progetti — bozza Fase 1
          </p>
          <h2 className="mt-4 font-display text-display-l font-black">
            Scorri per vedere i progetti prendere forma.
          </h2>
          <p className="mt-4 max-w-xl font-body text-body-m text-bianco/80">
            Meccanica ispirata a karolortyl.com: carte in CSS 3D che si
            muovono a velocità diverse durante lo scroll. Contenuti reali in
            Fase 3 — vedi MISSING-ASSETS.md.
          </p>
        </div>
        <div className="mt-8">
          <ScrollScatter cards={demoCards} />
        </div>
      </section>
    </>
  );
}
