/*
  Request guard shared by the form API routes (/api/contatti, /api/analisi):
  in-memory rate limiting per IP, body size limit, JSON parsing and the
  honeypot. Everything here runs before validation and before any email.

  In-memory is deliberate (single instance, small studio): it resets on
  redeploy and is not shared between instances. The store lives on globalThis
  so every route bundle and every dev hot-reload sees the same counters.

  Counting policy ("a human fixing typos must not be locked out, a bot
  hammering must"):
    - requests that REACH DELIVERY (valid payload)  -> 5 / 10 min per IP
    - rejected requests (validation errors, malformed or oversized body, honeypot)
                                                     -> 30 / 10 min per IP
    - valid deliveries of all visitors together      -> 40 / hour per route
      (a distributed bot cannot flood the mailbox or burn the Resend quota)
  A 429 is returned as soon as one of the budgets is spent.
*/

// ---------- sliding-window counters ----------

type Bucket = { windowMs: number; hits: number[] };
type Store = Map<string, Bucket>;

const globalStore = globalThis as typeof globalThis & { __adriaticaRateStore?: Store };
const store: Store = (globalStore.__adriaticaRateStore ??= new Map());

/** Hard cap on tracked keys, so spoofed IPs cannot grow the map without limit. */
const MAX_KEYS = 5000;

function prune(now: number) {
  for (const [key, bucket] of store) {
    const last = bucket.hits[bucket.hits.length - 1];
    if (last === undefined || now - last >= bucket.windowMs) store.delete(key);
  }
  // still too many live keys: drop the oldest-inserted ones
  for (const key of store.keys()) {
    if (store.size <= MAX_KEYS) break;
    store.delete(key);
  }
}

export type RateStatus = { limited: false } | { limited: true; retryAfterSec: number };

export function createRateLimiter({ name, max, windowMs }: { name: string; max: number; windowMs: number }) {
  const keyFor = (key: string) => `${name}|${key}`;

  function live(key: string, now: number): number[] {
    const bucket = store.get(keyFor(key));
    return bucket ? bucket.hits.filter((t) => now - t < windowMs) : [];
  }

  return {
    /** Looks at the budget without spending it. */
    peek(key: string): RateStatus {
      const now = Date.now();
      const hits = live(key, now);
      if (hits.length < max) return { limited: false };
      return { limited: true, retryAfterSec: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)) };
    },
    /** Spends one unit of the budget. */
    hit(key: string): void {
      const now = Date.now();
      const hits = live(key, now);
      hits.push(now);
      store.set(keyFor(key), { windowMs, hits });
      if (store.size > MAX_KEYS) prune(now);
    },
  };
}

// ---------- client address ----------

/**
 * Best-effort client IP. Prefers headers that a hosting proxy sets itself
 * (and overwrites), then the first X-Forwarded-For entry. Behind no proxy at
 * all these headers can be forged by the client; the per-route global budget
 * above is what protects the mailbox in that case.
 */
export function getClientIp(headers: Headers): string {
  const single = headers.get("x-vercel-forwarded-for") ?? headers.get("cf-connecting-ip") ?? headers.get("x-real-ip");
  if (single && single.trim() !== "") return single.split(",")[0].trim().slice(0, 64);
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded && forwarded.trim() !== "") return forwarded.split(",")[0].trim().slice(0, 64);
  return "unknown";
}

// ---------- JSON responses ----------

export function formResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export function formError(status: number, message: string, headers?: Record<string, string>): Response {
  return formResponse({ ok: false, errors: { form: [message] } }, status, headers);
}

// ---------- body ----------

/** Bigger than any real contact request (the longest message is capped at 5000 characters). */
export const MAX_BODY_BYTES = 10 * 1024;

type BodyResult = { ok: true; text: string } | { ok: false; reason: "too-large" | "unreadable" };

/** Reads the request body but gives up as soon as it passes maxBytes (a chunked body has no Content-Length). */
export async function readLimitedBody(request: Request, maxBytes = MAX_BODY_BYTES): Promise<BodyResult> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return { ok: false, reason: "too-large" };
  if (!request.body) return { ok: true, text: "" };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, reason: "too-large" };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "unreadable" };
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { ok: true, text: new TextDecoder().decode(bytes) };
}

/** Parses JSON and only accepts a plain object (not null, array, string…). */
export function parseJsonObject(text: string): Record<string, unknown> | null {
  try {
    const value: unknown = JSON.parse(text);
    return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** The hidden "website" field: anything other than missing / empty means a bot filled it. */
export function isHoneypotTripped(body: Record<string, unknown>): boolean {
  const value = body.website;
  if (value === undefined || value === null) return false;
  return typeof value === "string" ? value.trim() !== "" : true;
}

// ---------- the guard itself ----------

const TEN_MINUTES = 10 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const GLOBAL_KEY = "all";

export function createFormGuard(route: string) {
  const delivery = createRateLimiter({ name: `${route}:delivery`, max: 5, windowMs: TEN_MINUTES });
  const rejected = createRateLimiter({ name: `${route}:rejected`, max: 30, windowMs: TEN_MINUTES });
  const everyone = createRateLimiter({ name: `${route}:everyone`, max: 40, windowMs: ONE_HOUR });

  return {
    check(ip: string): RateStatus {
      for (const status of [delivery.peek(ip), rejected.peek(ip), everyone.peek(GLOBAL_KEY)]) {
        if (status.limited) return status;
      }
      return { limited: false };
    },
    noteRejected(ip: string) {
      rejected.hit(ip);
    },
    noteDelivery(ip: string) {
      delivery.hit(ip);
      everyone.hit(GLOBAL_KEY);
    },
  };
}

export type FormGuard = ReturnType<typeof createFormGuard>;

export type GuardResult =
  | { response: Response }
  | { body: Record<string, unknown>; noteRejected(): void; noteDelivery(): void };

/**
 * Everything that must happen before validation:
 *   429 when a budget is spent · 413 for an oversized body · 400 for a body
 *   that is not a JSON object · honeypot tripped -> 200 {ok:true} (nothing is sent).
 * On success it hands the parsed body back plus two counters the route calls:
 * noteRejected() when validation fails, noteDelivery() right before sending.
 */
export async function guardFormRequest(request: Request, guard: FormGuard): Promise<GuardResult> {
  const ip = getClientIp(request.headers);

  const status = guard.check(ip);
  if (status.limited) {
    return {
      response: formError(429, "Troppe richieste. Riprova tra qualche minuto.", {
        "Retry-After": String(status.retryAfterSec),
      }),
    };
  }

  const read = await readLimitedBody(request);
  if (!read.ok) {
    guard.noteRejected(ip);
    return read.reason === "too-large"
      ? { response: formError(413, "La richiesta è troppo grande.") }
      : { response: formError(400, "Richiesta non valida.") };
  }

  const body = parseJsonObject(read.text);
  if (!body) {
    guard.noteRejected(ip);
    return { response: formError(400, "Richiesta non valida.") };
  }

  if (isHoneypotTripped(body)) {
    // a bot: same answer as a success, nothing is sent, and it still burns its own budget
    guard.noteRejected(ip);
    return { response: formResponse({ ok: true }) };
  }

  return {
    body,
    noteRejected: () => guard.noteRejected(ip),
    noteDelivery: () => guard.noteDelivery(ip),
  };
}
