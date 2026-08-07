import { brand } from "@/content/site";

// Placeholder for Phase 1 (chrome only) — the real hero/hero-shader/full page
// composition lands in Phase 2 and Phase 3 per the brief's phase plan.
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
            questa pagina verifica solo l&apos;impianto globale — header, menu
            overlay, footer, contact rail.
          </p>
        </div>
      </section>

      <section data-world="green" className="section-y px-6 sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-display-l font-black">Cosa facciamo</h2>
          <p className="mt-4 max-w-xl font-body text-body-m">
            Anche questa sezione arriva in Fase 3 — per ora conferma solo che
            il secondo &quot;mondo&quot; (verde/kraft) del sistema colore
            funziona correttamente.
          </p>
        </div>
      </section>
    </>
  );
}
