// useSyncExternalStore source for navigator.onLine — same pattern as
// StickyBar/chromeAccent: a browser-only value read safely without a
// setState-in-effect or an SSR/client hydration mismatch.
export function subscribeOnlineStatus(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function getOnlineStatus() {
  return navigator.onLine;
}

export function getServerOnlineStatus() {
  return true; // assume online during SSR/hydration — this is a live status indicator, not a gate
}
