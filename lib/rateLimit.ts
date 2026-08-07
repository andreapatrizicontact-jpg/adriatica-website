// Simple in-memory IP rate limiter — fine for a single-instance small-studio
// site (brief §5.4 just asks for "rate-limits by IP"). Resets on redeploy;
// not meant to survive multi-instance/serverless scale-out, which this site
// doesn't need.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_ATTEMPTS) {
    attempts.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  attempts.set(ip, timestamps);
  return false;
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
