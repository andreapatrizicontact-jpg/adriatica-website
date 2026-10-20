import { Resend } from "resend";
import { contact } from "@/content/site";

/*
  Delivery of the notification emails sent by the site forms.

  The rule that matters: a form may only tell the visitor "ok" when the
  email was really accepted by the provider (Resend), or — outside
  production, and only without an API key — when the submission was logged
  to the dev console so the form can be exercised locally.
  In production a missing key or a provider failure NEVER becomes "ok".

  Everything that decides is a small pure function (planDelivery,
  interpretProviderResponse, httpResultFor, sanitizeHeaderValue) so it can be
  tested without a network. sendNotificationEmail is the only impure part.
*/

/** Same sender and recipient the previous site used. */
export const EMAIL_FROM = "Adriatica — Sito Web <onboarding@resend.dev>";
export const EMAIL_TO = contact.email;

/** The provider must answer within this time, otherwise the visitor gets an honest "not sent". */
export const DELIVERY_TIMEOUT_MS = 10_000;

export type SendEmailInput = {
  subject: string;
  /** plain text, one "Label: value" line per field — an internal notification, not a marketing email */
  text: string;
  replyTo?: string;
};

// ---------- pure decision logic ----------

export type EmailEnv = {
  apiKey?: string | undefined;
  nodeEnv?: string | undefined;
};

export type DeliveryPlan = "send" | "dev-fallback" | "refuse";

/**
 * - key present                      -> "send" (really call the provider)
 * - no key, NODE_ENV !== production  -> "dev-fallback" (log to console, form can be tested)
 * - no key, NODE_ENV === production  -> "refuse" (cannot deliver: never confirm)
 */
export function planDelivery(env: EmailEnv): DeliveryPlan {
  if (env.apiKey && env.apiKey.trim() !== "") return "send";
  return env.nodeEnv === "production" ? "refuse" : "dev-fallback";
}

export type DeliveryFailure = "missing-api-key" | "provider-rejected" | "provider-unreachable";

export type DeliveryResult =
  | { ok: true; mode: "sent" | "dev-fallback" }
  | { ok: false; reason: DeliveryFailure };

/**
 * Resend answers { data, error }. The email counts as accepted only when there
 * is no error AND the provider gave back an id. Anything else is a failure.
 */
export function interpretProviderResponse(response: unknown): DeliveryResult {
  if (typeof response === "object" && response !== null) {
    const { data, error } = response as { data?: unknown; error?: unknown };
    const id = typeof data === "object" && data !== null ? (data as { id?: unknown }).id : undefined;
    if (!error && typeof id === "string" && id !== "") return { ok: true, mode: "sent" };
  }
  return { ok: false, reason: "provider-rejected" };
}

export const DELIVERY_FAILED_MESSAGE = `Non sono riuscito a inviare il messaggio in questo momento. Riprova tra poco oppure scrivi a ${contact.email}.`;

export type DeliveryHttpResult =
  | { status: 200; body: { ok: true } }
  | { status: 503; body: { ok: false; errors: { form: string[] } } };

/** What the API answers for a delivery result. 200 only for ok:true, 503 for every failure. */
export function httpResultFor(result: DeliveryResult): DeliveryHttpResult {
  if (result.ok) return { status: 200, body: { ok: true } };
  return { status: 503, body: { ok: false, errors: { form: [DELIVERY_FAILED_MESSAGE] } } };
}

/**
 * Makes a value safe for an email header (subject, reply-to) and for a
 * "Label: value" line: removes CR, LF and every other control character
 * (header injection), collapses whitespace, caps the length.
 */
export function sanitizeHeaderValue(value: string, max = 200): string {
  return value
    .replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Turns [label, value] pairs into "Label: value" lines, skipping empty values. Values are forced to one line. */
export function formatFieldLines(fields: ReadonlyArray<readonly [string, string | undefined]>): string[] {
  return fields.flatMap(([label, value]) => {
    const clean = value === undefined ? "" : sanitizeHeaderValue(value, 500);
    return clean === "" ? [] : [`${label}: ${clean}`];
  });
}

/** Free multi-line text (the visitor's message): only normalises line endings and strips control characters. */
export function formatMessageBlock(message: string): string {
  return message
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f-\u009f\u2028\u2029]/g, "")
    .trim();
}

/** Removes anything that looks like a Resend key from text that is about to be logged. */
export function redactSecrets(text: string): string {
  return text.replace(/\bre_[A-Za-z0-9_-]{6,}/g, "re_[redacted]");
}

function describeError(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const { name, statusCode, message } = error as { name?: unknown; statusCode?: unknown; message?: unknown };
    return redactSecrets(
      [name, statusCode, message].filter((part) => typeof part === "string" || typeof part === "number").join(" · "),
    );
  }
  return redactSecrets(String(error));
}

// ---------- impure shell ----------

type EmailClient = {
  emails: {
    send(payload: { from: string; to: string; subject: string; text: string; replyTo?: string }): Promise<unknown>;
  };
};

export type SendEmailOptions = {
  /** defaults to process.env */
  env?: EmailEnv;
  /** defaults to the real Resend client (tests inject a fake one) */
  createClient?: (apiKey: string) => EmailClient;
  timeoutMs?: number;
};

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`provider did not answer within ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export async function sendNotificationEmail(
  { subject, text, replyTo }: SendEmailInput,
  options: SendEmailOptions = {},
): Promise<DeliveryResult> {
  const env = options.env ?? { apiKey: process.env.RESEND_API_KEY, nodeEnv: process.env.NODE_ENV };
  const safeSubject = sanitizeHeaderValue(subject);
  const safeReplyTo = replyTo ? sanitizeHeaderValue(replyTo, 254) : undefined;
  const plan = planDelivery(env);

  if (plan === "refuse") {
    console.error(
      "[email:not-configured] RESEND_API_KEY is missing in production: the submission was NOT delivered and the visitor was told so.",
    );
    return { ok: false, reason: "missing-api-key" };
  }

  if (plan === "dev-fallback") {
    console.log(
      `[email:dev-fallback] no RESEND_API_KEY (non-production): nothing was emailed, the submission is only logged here.\n` +
        `To: ${EMAIL_TO}\nSubject: ${safeSubject}${safeReplyTo ? `\nReply-To: ${safeReplyTo}` : ""}\n\n${text}`,
    );
    return { ok: true, mode: "dev-fallback" };
  }

  let response: unknown;
  try {
    const createClient = options.createClient ?? ((apiKey: string): EmailClient => new Resend(apiKey));
    const client = createClient((env.apiKey as string).trim());
    response = await withTimeout(
      client.emails.send({ from: EMAIL_FROM, to: EMAIL_TO, subject: safeSubject, text, replyTo: safeReplyTo }),
      options.timeoutMs ?? DELIVERY_TIMEOUT_MS,
    );
  } catch (error) {
    console.error(`[email:provider-unreachable] ${describeError(error)}`);
    return { ok: false, reason: "provider-unreachable" };
  }

  const result = interpretProviderResponse(response);
  if (!result.ok) {
    const error = typeof response === "object" && response !== null ? (response as { error?: unknown }).error : undefined;
    console.error(`[email:provider-rejected] ${error ? describeError(error) : "no error and no id in the provider response"}`);
  }
  return result;
}
