import { Resend } from "resend";
import { contact } from "@/content/site";

type SendEmailInput = {
  subject: string;
  /** plain text, one "Label: value" line per field — kept simple, this is an internal notification, not a marketing email */
  text: string;
  replyTo?: string;
};

// No RESEND_API_KEY is configured yet (DECISIONS.md) — falls back to
// logging the submission to the server console so forms are fully
// functional in dev, and don't silently swallow a submission once deployed
// without the key set either.
export async function sendNotificationEmail({ subject, text, replyTo }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[email:dev-fallback] ${subject}\n${text}${replyTo ? `\nReply-To: ${replyTo}` : ""}`);
    return { delivered: false as const, reason: "no-api-key" as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Adriatica — Sito Web <onboarding@resend.dev>",
    to: contact.email,
    subject,
    text,
    replyTo,
  });

  if (error) {
    console.error("[email:resend-error]", error);
    return { delivered: false as const, reason: "send-failed" as const };
  }

  return { delivered: true as const };
}
