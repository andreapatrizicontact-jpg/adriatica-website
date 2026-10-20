import { z } from "zod";
import { serviceOptions, type ServiceId } from "@/lib/services";

/*
  Shared by the browser (ContactForm / analisi form) and by the API routes:
  client and server validate with the very same schemas, so they always agree.
  Messages are Italian and are shown to the visitor as they are.
*/

// ---------- shared building blocks ----------

const consensoField = z.literal(true, {
  error: "Devi accettare l'informativa privacy per continuare.",
});

const serviceIds = serviceOptions.map((option) => option.id) as [ServiceId, ...ServiceId[]];

/** Required, trimmed email. The empty case gets its own message; "pippo" gets the format one. */
const emailField = z
  .string({ error: "Inserisci la tua email." })
  .trim()
  .min(1, "Inserisci la tua email.")
  .max(254, "Questa email è troppo lunga.")
  .pipe(z.email("Inserisci un'email valida."));

/** Required, trimmed text. A missing/non-string value gets the same message as an empty one. */
const requiredText = (message: string, min: number, max: number, tooLong: string) =>
  z.string({ error: message }).trim().min(min, message).max(max, tooLong);

/** Optional free-text field: accepts "" (an untouched input), trims, caps the length. */
const optionalText = (max: number) =>
  z.string().trim().max(max, `Massimo ${max} caratteri.`).optional();

/*
  Honeypot — real visitors never see or fill this field (visually hidden,
  aria-hidden, tabIndex -1); bots that fill every input trip it.
  The routes check it BEFORE validating so a bot always gets the same
  "ok" answer; the schema still declares it so the contract is explicit.
*/
const honeypotField = z.string().max(0, "Campo non valido.").optional();

// ---------- contact form (home block + /contatti) ----------

export const contattiSchema = z.object({
  servizio: z.enum(serviceIds, { error: "Scegli uno dei servizi indicati." }).optional(),
  nome: requiredText("Inserisci il tuo nome.", 2, 120, "Il nome è troppo lungo."),
  email: emailField,
  messaggio: requiredText(
    "Raccontami qualcosa in più (almeno 10 caratteri).",
    10,
    5000,
    "Il messaggio è troppo lungo (massimo 5000 caratteri).",
  ),
  consenso: consensoField,
  azienda: optionalText(160),
  telefono: optionalText(40),
  budget: optionalText(80),
  website: honeypotField,
});

export type ContattiInput = z.infer<typeof contattiSchema>;

// ---------- free social analysis (/analisi) ----------

export const analisiSchema = z.object({
  handle: requiredText("Inserisci il tuo handle Instagram o TikTok.", 2, 120, "L'handle è troppo lungo."),
  sito: optionalText(200),
  settore: requiredText("Seleziona un settore.", 1, 120, "Valore non valido."),
  obiettivo: requiredText("Seleziona un obiettivo.", 1, 160, "Valore non valido."),
  nome: requiredText("Inserisci il tuo nome.", 2, 120, "Il nome è troppo lungo."),
  email: emailField,
  telefono: optionalText(40),
  consenso: consensoField,
  website: honeypotField,
});

export type AnalisiInput = z.infer<typeof analisiSchema>;

// ---------- error shape ----------

/** Field name -> messages, exactly what the API puts in `errors` and what the forms read back. */
export type FieldErrors = Record<string, string[]>;

/** Flattens a zod error into { field: [messages] }. Issues without a field land under "form". */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const result: FieldErrors = {};
  for (const issue of error.issues) {
    const key = typeof issue.path[0] === "string" ? issue.path[0] : "form";
    (result[key] ??= []).push(issue.message);
  }
  return result;
}

/** Order the forms follow when they move focus to "the first invalid field". */
export const contattiFieldOrder = ["servizio", "nome", "email", "messaggio", "azienda", "telefono", "budget", "consenso"] as const;
