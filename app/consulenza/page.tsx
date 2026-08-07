import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consulenza gratuita",
  description: "Prenota una call gratuita di 30 minuti con Adriatica.",
};

// Full build in Phase 5 — booking flow, Calendly embed + native fallback.
export default function Consulenza() {
  return (
    <section
      data-world="blue"
      className="flex min-h-[60vh] items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/70">
          03 — Consulenza gratuita
        </p>
        <h1 className="mt-4 font-display text-display-xl font-black">
          La tua prima mossa è gratis.
        </h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">
          Pagina completa in arrivo — Fase 5.
        </p>
      </div>
    </section>
  );
}
