"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contattiSchema, type ContattiInput } from "@/lib/validation";
import { Pill } from "@/components/ui/Pill";
import { DominoLoader } from "@/components/ui/DominoLoader";
import { contact, contatti } from "@/content/site";

const inputClass =
  "mt-2 w-full border-2 border-bianco/20 bg-transparent px-4 py-3 font-body text-body-m text-bianco outline-none focus-visible:border-periwinkle";
const labelClass = "font-mono text-mono-label uppercase text-bianco/70";
const errorClass = "mt-1 font-body text-body-s text-periwinkle";

export function ContattiForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContattiInput>({ resolver: zodResolver(contattiSchema) });

  async function onSubmit(values: ContattiInput) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contatti-nome" className={labelClass}>
            Nome
          </label>
          <input
            id="contatti-nome"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "contatti-nome-error" : undefined}
            className={inputClass}
            {...register("nome")}
          />
          {errors.nome && (
            <p id="contatti-nome-error" className={errorClass}>
              {errors.nome.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contatti-azienda" className={labelClass}>
            Azienda (opzionale)
          </label>
          <input id="contatti-azienda" type="text" className={inputClass} {...register("azienda")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contatti-email" className={labelClass}>
            Email
          </label>
          <input
            id="contatti-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contatti-email-error" : undefined}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p id="contatti-email-error" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contatti-telefono" className={labelClass}>
            Telefono (opzionale)
          </label>
          <input id="contatti-telefono" type="tel" autoComplete="tel" className={inputClass} {...register("telefono")} />
        </div>
      </div>

      <div>
        <label htmlFor="contatti-budget" className={labelClass}>
          Budget indicativo (opzionale)
        </label>
        <select id="contatti-budget" defaultValue="" className={inputClass} {...register("budget")}>
          <option value="">Preferisco non dirlo</option>
          {contatti.budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contatti-messaggio" className={labelClass}>
          Messaggio
        </label>
        <textarea
          id="contatti-messaggio"
          rows={5}
          aria-invalid={!!errors.messaggio}
          aria-describedby={errors.messaggio ? "contatti-messaggio-error" : undefined}
          className={inputClass}
          {...register("messaggio")}
        />
        {errors.messaggio && (
          <p id="contatti-messaggio-error" className={errorClass}>
            {errors.messaggio.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="contatti-consenso"
          type="checkbox"
          aria-invalid={!!errors.consenso}
          aria-describedby={errors.consenso ? "contatti-consenso-error" : undefined}
          className="mt-1 h-4 w-4 shrink-0 border-2 border-bianco/40 bg-transparent"
          {...register("consenso")}
        />
        <label htmlFor="contatti-consenso" className="font-body text-body-s text-bianco/70">
          Accetto l&apos;informativa{" "}
          <a href="/privacy" className="underline hover:text-periwinkle">
            privacy
          </a>
          .
        </label>
      </div>
      {errors.consenso && (
        <p id="contatti-consenso-error" className="-mt-3 font-body text-body-s text-periwinkle">
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
