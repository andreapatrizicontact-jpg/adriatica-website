import { z } from "zod";

const consensoField = z.literal(true, {
  error: "Devi accettare l'informativa privacy per continuare.",
});

export const contattiSchema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome."),
  azienda: z.string().trim().optional(),
  email: z.email("Inserisci un'email valida."),
  telefono: z.string().trim().optional(),
  budget: z.string().trim().optional(),
  messaggio: z.string().trim().min(10, "Raccontaci qualcosa in più (almeno 10 caratteri)."),
  consenso: consensoField,
});

export type ContattiInput = z.infer<typeof contattiSchema>;

export const analisiSchema = z.object({
  handle: z.string().trim().min(2, "Inserisci il tuo handle Instagram o TikTok."),
  sito: z.string().trim().optional(),
  settore: z.string().trim().min(1, "Seleziona un settore."),
  obiettivo: z.string().trim().min(1, "Seleziona un obiettivo."),
  nome: z.string().trim().min(2, "Inserisci il tuo nome."),
  email: z.email("Inserisci un'email valida."),
  telefono: z.string().trim().optional(),
  consenso: consensoField,
  // honeypot — real users never see or fill this field (globals.css hides
  // it visually + aria-hidden); bots that fill every input trip it.
  website: z.string().max(0, "").optional(),
});

export type AnalisiInput = z.infer<typeof analisiSchema>;
