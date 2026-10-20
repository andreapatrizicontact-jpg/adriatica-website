// Shared contract for the opening video ("la firma").
//
//  - app/layout.tsx injects `introBootScript` in <head>. On a fresh load of "/"
//    it sets html[data-intro="pending"] (first-paint cover, see globals.css).
//  - components/intro/IntroOverlay.tsx (client) owns the real <dialog>, removes
//    the attribute when it takes over, and fires INTRO_DONE_EVENT when closed.
//  - Anything that must wait for the intro (the hero lanyard) listens for
//    INTRO_DONE_EVENT or checks `isIntroActive()`.
//  - The footer "Rivedi la firma" button fires INTRO_REPLAY_EVENT (same page)
//    or sets the replay flag and navigates to "/" (other pages).

export const INTRO_STORAGE_KEY = "adriatica-intro";
export const INTRO_REPLAY_FLAG = "adriatica-intro-replay";
export const INTRO_REPLAY_EVENT = "adriatica:intro-replay";
export const INTRO_DONE_EVENT = "adriatica:intro-done";
export const INTRO_ATTRIBUTE = "data-intro";

/** Same breakpoint the CSS cover uses: portrait phones get the 720x1280 master. */
export const INTRO_PHONE_QUERY = "(max-width: 700px) and (orientation: portrait)";

/** Hard stop: if the video stalls or never ends, the overlay closes itself this long after it was shown. */
export const INTRO_MAX_MS = 10_000;

export const introSources = {
  desktop: { src: "/intro/intro-1080p.mp4", poster: "/intro/poster-1080p.png" },
  phone: { src: "/intro/intro-phone.mp4", poster: "/intro/poster-phone.png" },
} as const;

/** Runs synchronously in <head>, before first paint. Must stay tiny and exception-safe. */
export const introBootScript = `(function(){try{
var d=document.documentElement;
if(location.pathname!=="/")return;
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var seen=sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="seen";
var replay=sessionStorage.getItem("${INTRO_REPLAY_FLAG}")==="1";
if(seen&&!replay)return;
d.setAttribute("${INTRO_ATTRIBUTE}","pending");
}catch(e){}})();`;

/** Client-only helper: is the opening video currently covering or playing? */
export function isIntroActive(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.hasAttribute(INTRO_ATTRIBUTE);
}
