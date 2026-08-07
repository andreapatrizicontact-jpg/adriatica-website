"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pill } from "@/components/ui/Pill";
import { DominoLoader } from "@/components/ui/DominoLoader";
import { contact } from "@/content/site";

// A lighter subset of the full contattiSchema (lib/validation.ts) — this is
// the quick form used on the home page CTA and /consulenza's Calendly
// fallback, not /contatti's fuller version (azienda, telefono, budget).
// Both post to the same /api/contatti route, which treats the omitted
// fields as optional.
const quickContactSchema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome."),
  email: z.email("Inserisci un'email valida."),
  messaggio: z.string().trim().min(10, "Raccontaci qualcosa in più (almeno 10 caratteri)."),
  consenso: z.literal(true, { error: "Devi accettare l'informativa privacy." }),
});

type QuickContactValues = z.infer<typeof quickContactSchema>;

// idPrefix keeps element IDs unique in case this form appears more than
// once in the DOM across the site's lifetime (defensive, not currently
// the case on any single page).
export function QuickContactForm({ idPrefix = "qc" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuickContactValues>({ resolver: zodResolver(quickContactSchema) });

  async function onSubmit(values: QuickContactValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const ids = {
    nome: `${idPrefix}-nome`,
    email: `${idPrefix}-email`,
    messaggio: `${idPrefix}-messaggio`,
    consenso: `${idPrefix}-consenso`,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor={ids.nome} className="font-mono text-mono-label uppercase text-bianco/70">
          Nome
        </label>
        <input
          id={ids.nome}
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? `${ids.nome}-error` : undefined}
          className="mt-2 w-full border-2 border-bianco/20 bg-transparent px-4 py-3 font-body text-body-m text-bianco outline-none focus-visible:border-periwinkle"
          {...register("nome")}
        />
        {errors.nome && (
          <p id={`${ids.nome}-error`} className="mt-1 font-body text-body-s text-periwinkle">
            {errors.nome.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={ids.email} className="font-mono text-mono-label uppercase text-bianco/70">
          Email
        </label>
        <input
          id={ids.email}
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${ids.email}-error` : undefined}
          className="mt-2 w-full border-2 border-bianco/20 bg-transparent px-4 py-3 font-body text-body-m text-bianco outline-none focus-visible:border-periwinkle"
          {...register("email")}
        />
        {errors.email && (
          <p id={`${ids.email}-error`} className="mt-1 font-body text-body-s text-periwinkle">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={ids.messaggio} className="font-mono text-mono-label uppercase text-bianco/70">
          Messaggio
        </label>
        <textarea
          id={ids.messaggio}
          rows={4}
          aria-invalid={!!errors.messaggio}
          aria-describedby={errors.messaggio ? `${ids.messaggio}-error` : undefined}
          className="mt-2 w-full border-2 border-bianco/20 bg-transparent px-4 py-3 font-body text-body-m text-bianco outline-none focus-visible:border-periwinkle"
          {...register("messaggio")}
        />
        {errors.messaggio && (
          <p id={`${ids.messaggio}-error`} className="mt-1 font-body text-body-s text-periwinkle">
            {errors.messaggio.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id={ids.consenso}
          type="checkbox"
          aria-invalid={!!errors.consenso}
          aria-describedby={errors.consenso ? `${ids.consenso}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 border-2 border-bianco/40 bg-transparent"
          {...register("consenso")}
        />
        <label htmlFor={ids.consenso} className="font-body text-body-s text-bianco/70">
          Accetto l&apos;informativa{" "}
          <a href="/privacy" className="underline hover:text-periwinkle">
            privacy
          </a>
          .
        </label>
      </div>
      {errors.consenso && (
        <p id={`${ids.consenso}-error`} className="-mt-2 font-body text-body-s text-periwinkle">
          {errors.consenso.message}
        </p>
      )}

      <Pill type="submit" variant="chunky" className="mt-2 justify-center">
        {status === "sending" ? <DominoLoader label="Invio in corso" className="scale-75" /> : "Invia"}
      </Pill>

      <p role="status" aria-live="polite" className="font-body text-body-s">
        {status === "sent" && (
          <span className="text-periwinkle">Ricevuto — ti rispondiamo entro 24 ore.</span>
        )}
        {status === "error" && (
          <span className="text-periwinkle">
            Qualcosa è andato storto — scrivici direttamente a{" "}
            <a href={contact.emailHref} className="underline">
              {contact.email}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
}
