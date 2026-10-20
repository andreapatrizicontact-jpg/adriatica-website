import { formatFieldLines, formatMessageBlock, httpResultFor, sanitizeHeaderValue, sendNotificationEmail } from "@/lib/email";
import { createFormGuard, formResponse, guardFormRequest } from "@/lib/rateLimit";
import { serviceOptions } from "@/lib/services";
import { contattiSchema, toFieldErrors } from "@/lib/validation";

// Contact form (home block + /contatti page).
// POST JSON -> 200 {ok:true} only if the email was really accepted (or the dev
// fallback logged it) · 400 validation · 413 > 10KB · 429 rate limit · 503 not delivered.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const guard = createFormGuard("contatti");

export async function POST(request: Request) {
  const guarded = await guardFormRequest(request, guard);
  if ("response" in guarded) return guarded.response;

  const parsed = contattiSchema.safeParse(guarded.body);
  if (!parsed.success) {
    guarded.noteRejected();
    return formResponse({ ok: false, errors: toFieldErrors(parsed.error) }, 400);
  }

  guarded.noteDelivery();
  const { servizio, nome, email, messaggio, azienda, telefono, budget } = parsed.data;
  const servizioLabel = serviceOptions.find((option) => option.id === servizio)?.label;

  const result = await sendNotificationEmail({
    subject: sanitizeHeaderValue(`Nuovo contatto dal sito — ${nome}`),
    text: [
      ...formatFieldLines([
        ["Servizio", servizioLabel],
        ["Nome", nome],
        ["Email", email],
        ["Telefono", telefono],
        ["Azienda", azienda],
        ["Budget", budget],
      ]),
      "",
      "Messaggio:",
      formatMessageBlock(messaggio),
    ].join("\n"),
    replyTo: email,
  });

  const { status, body } = httpResultFor(result);
  return formResponse(body, status);
}
