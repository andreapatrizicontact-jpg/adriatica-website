"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { analisiSchema, type AnalisiInput } from "@/lib/validation";
import { Pill } from "@/components/ui/Pill";
import { DominoLoader } from "@/components/ui/DominoLoader";
import { analisi, contact } from "@/content/site";

const inputClass =
  "mt-2 w-full border-2 border-inchiostro/20 bg-bianco px-4 py-3 font-body text-body-m text-inchiostro outline-none focus-visible:border-adriatic";
const labelClass = "font-mono text-mono-label uppercase text-inchiostro/60";
const errorClass = "mt-1 font-body text-body-s text-adriatic";

export function AnalisiForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnalisiInput>({ resolver: zodResolver(analisiSchema) });

  async function onSubmit(values: AnalisiInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/analisi", {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* honeypot — hidden from sighted/screen-reader users, bots that fill every field trip it */}
      <div className="h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="analisi-website">Non compilare questo campo</label>
        <input id="analisi-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label htmlFor="analisi-handle" className={labelClass}>
          Handle Instagram o TikTok
        </label>
        <input
          id="analisi-handle"
          type="text"
          placeholder="@iltuoprofilo"
          aria-invalid={!!errors.handle}
          aria-describedby={errors.handle ? "analisi-handle-error" : undefined}
          className={inputClass}
          {...register("handle")}
        />
        {errors.handle && (
          <p id="analisi-handle-error" className={errorClass}>
            {errors.handle.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="analisi-sito" className={labelClass}>
          Sito web (opzionale)
        </label>
        <input id="analisi-sito" type="text" className={inputClass} {...register("sito")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="analisi-settore" className={labelClass}>
            Settore
          </label>
          <select
            id="analisi-settore"
            defaultValue=""
            aria-invalid={!!errors.settore}
            aria-describedby={errors.settore ? "analisi-settore-error" : undefined}
            className={inputClass}
            {...register("settore")}
          >
            <option value="" disabled>
              Seleziona
            </option>
            {analisi.settoreOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.settore && (
            <p id="analisi-settore-error" className={errorClass}>
              {errors.settore.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="analisi-obiettivo" className={labelClass}>
            Obiettivo
          </label>
          <select
            id="analisi-obiettivo"
            defaultValue=""
            aria-invalid={!!errors.obiettivo}
            aria-describedby={errors.obiettivo ? "analisi-obiettivo-error" : undefined}
            className={inputClass}
            {...register("obiettivo")}
          >
            <option value="" disabled>
              Seleziona
            </option>
            {analisi.obiettivoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.obiettivo && (
            <p id="analisi-obiettivo-error" className={errorClass}>
              {errors.obiettivo.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="analisi-nome" className={labelClass}>
            Nome
          </label>
          <input
            id="analisi-nome"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "analisi-nome-error" : undefined}
            className={inputClass}
            {...register("nome")}
          />
          {errors.nome && (
            <p id="analisi-nome-error" className={errorClass}>
              {errors.nome.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="analisi-email" className={labelClass}>
            Email
          </label>
          <input
            id="analisi-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "analisi-email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p id="analisi-email-error" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="analisi-telefono" className={labelClass}>
          Telefono (opzionale)
        </label>
        <input id="analisi-telefono" type="tel" autoComplete="tel" className={inputClass} {...register("telefono")} />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="analisi-consenso"
          type="checkbox"
          aria-invalid={!!errors.consenso}
          aria-describedby={errors.consenso ? "analisi-consenso-error" : undefined}
          className="mt-1 h-4 w-4 shrink-0 border-2 border-inchiostro/40 bg-bianco"
          {...register("consenso")}
        />
        <label htmlFor="analisi-consenso" className="font-body text-body-s text-inchiostro/70">
          Accetto l&apos;informativa{" "}
          <a href="/privacy" className="underline hover:text-adriatic">
            privacy
          </a>
          .
        </label>
      </div>
      {errors.consenso && (
        <p id="analisi-consenso-error" className="-mt-3 font-body text-body-s text-adriatic">
          {errors.consenso.message}
        </p>
      )}

      <Pill type="submit" variant="chunky" className="mt-2 justify-center">
        {status === "sending" ? <DominoLoader label="Invio in corso" className="scale-75" /> : analisi.submitLabel}
      </Pill>

      <p role="status" aria-live="polite" className="font-body text-body-s">
        {status === "sent" && (
          <span className="text-adriatic">Ricevuto — {analisi.confirmationNote.toLowerCase()}</span>
        )}
        {status === "error" && (
          <span className="text-adriatic">
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
