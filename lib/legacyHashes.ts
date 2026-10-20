// Fragments that existed on the previous homepage. A fragment never reaches
// the server, so these are resolved on the client (components/layout/HashRedirect.tsx).
// "#recensioni" is deliberately absent: it is still a real section.

export const legacyHomeHashes: Record<string, string> = {
  "#chi-siamo": "/#studio",
  "#progetti": "/progetti",
  "#bollino": "/bollino",
};

export function resolveLegacyHash(pathname: string, hash: string): string | null {
  if (pathname !== "/") return null;
  return legacyHomeHashes[hash.toLowerCase()] ?? null;
}
