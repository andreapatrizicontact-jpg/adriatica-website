// Tiny same-tab store for the header's chrome-accent toggle (Toggle3D),
// same useSyncExternalStore pattern as StickyBar — see that component for
// why (avoids setState-in-effect and hydration mismatches on a client-only
// preference read).
const STORAGE_KEY = "adriatica:chrome-accent";
const CHANGE_EVENT = "adriatica:chrome-accent-change";

export type ChromeAccent = "blue" | "dark";

export function getChromeAccent(): ChromeAccent {
  return sessionStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "blue";
}

export function getServerChromeAccent(): ChromeAccent {
  return "blue";
}

export function setChromeAccent(value: ChromeAccent) {
  sessionStorage.setItem(STORAGE_KEY, value);
  document.documentElement.setAttribute("data-chrome-accent", value);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeChromeAccent(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}
