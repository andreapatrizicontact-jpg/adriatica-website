import { NextResponse } from "next/server";
import { contattiSchema } from "@/lib/validation";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contattiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { nome, azienda, email, telefono, budget, messaggio } = parsed.data;

  await sendNotificationEmail({
    subject: `Nuovo contatto dal sito — ${nome}`,
    text: [
      `Nome: ${nome}`,
      azienda ? `Azienda: ${azienda}` : null,
      `Email: ${email}`,
      telefono ? `Telefono: ${telefono}` : null,
      budget ? `Budget: ${budget}` : null,
      "",
      "Messaggio:",
      messaggio,
    ]
      .filter(Boolean)
      .join("\n"),
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
