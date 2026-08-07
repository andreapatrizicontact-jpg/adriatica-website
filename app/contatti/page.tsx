import type { Metadata } from "next";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Scrivici o chiamaci — rispondiamo rapidamente.",
};

// Full build in Phase 5 — split form + contact card, /api/contatti, map.
export default function Contatti() {
  return (
    <section
      data-world="blue"
      className="flex min-h-[60vh] items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/70">05 — Contatti</p>
        <h1 className="mt-4 font-display text-display-xl font-black">Parliamone.</h1>
        <p className="mt-6 max-w-xl font-body text-body-l text-bianco/85">
          Pagina completa in arrivo — Fase 5. Nel frattempo:{" "}
          <a href={contact.phoneHref} className="underline hover:text-lime">
            {contact.phone}
          </a>{" "}
          ·{" "}
          <a href={contact.emailHref} className="underline hover:text-lime">
            {contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
