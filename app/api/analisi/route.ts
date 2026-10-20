import { formatFieldLines, httpResultFor, sanitizeHeaderValue, sendNotificationEmail } from "@/lib/email";
import { createFormGuard, formResponse, guardFormRequest } from "@/lib/rateLimit";
import { analisiSchema, toFieldErrors } from "@/lib/validation";

// Free social analysis request (/analisi). Same contract and the same hardening
// as /api/contatti: 200 {ok:true} only if delivered (or dev fallback) · 400 · 413 · 429 · 503.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const guard = createFormGuard("analisi");

export async function POST(request: Request) {
  const guarded = await guardFormRequest(request, guard);
  if ("response" in guarded) return guarded.response;

  const parsed = analisiSchema.safeParse(guarded.body);
  if (!parsed.success) {
    guarded.noteRejected();
    return formResponse({ ok: false, errors: toFieldErrors(parsed.error) }, 400);
  }

  guarded.noteDelivery();
  const { handle, sito, settore, obiettivo, nome, email, telefono } = parsed.data;

  const result = await sendNotificationEmail({
    subject: sanitizeHeaderValue(`Nuova richiesta di analisi social — ${nome}`),
    text: formatFieldLines([
      ["Nome", nome],
      ["Email", email],
      ["Telefono", telefono],
      ["Handle", handle],
      ["Sito", sito],
      ["Settore", settore],
      ["Obiettivo", obiettivo],
    ]).join("\n"),
    replyTo: email,
  });

  const { status, body } = httpResultFor(result);
  return formResponse(body, status);
}
