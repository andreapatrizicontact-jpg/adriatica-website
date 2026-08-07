import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analisi social gratuita",
  description: "Scopri cosa frena il tuo profilo. Gratis, in 48 ore.",
};

// Full build in Phase 5 — lead form, /api/analisi, honest confirmation checklist.
export default function Analisi() {
  return (
    <section
      data-world="blue"
      className="flex min-h-[60vh] items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/70">
          04 — Analisi social gratuita
        </p>
        <h1 className="mt-4 font-display text-display-xl font-black">
          Scopri cosa frena il tuo profilo.
        </h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">
          Pagina completa in arrivo — Fase 5.
        </p>
      </div>
    </section>
  );
}
