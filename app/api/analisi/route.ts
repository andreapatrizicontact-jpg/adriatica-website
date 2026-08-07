import { NextResponse } from "next/server";
import { analisiSchema } from "@/lib/validation";
import { sendNotificationEmail } from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, errors: { form: ["Troppe richieste. Riprova tra qualche minuto."] } },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = analisiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // honeypot tripped — pretend success so the bot doesn't learn anything,
  // just don't actually send a notification.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { handle, sito, settore, obiettivo, nome, email, telefono } = parsed.data;

  await sendNotificationEmail({
    subject: `Nuova richiesta di analisi social — ${nome}`,
    text: [
      `Nome: ${nome}`,
      `Email: ${email}`,
      telefono ? `Telefono: ${telefono}` : null,
      `Handle: ${handle}`,
      sito ? `Sito: ${sito}` : null,
      `Settore: ${settore}`,
      `Obiettivo: ${obiettivo}`,
    ]
      .filter(Boolean)
      .join("\n"),
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
