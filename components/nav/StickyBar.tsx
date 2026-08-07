"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { provocations } from "@/content/site";

const STORAGE_KEY = "adriatica:sticky-bar-dismissed";
const DISMISS_EVENT = "adriatica:sticky-bar-dismiss";
const ROTATE_MS = 7000;

// A tiny same-tab store around sessionStorage, read via useSyncExternalStore
// so the client can safely diverge from the server-rendered default (hidden)
// without a setState-in-effect — sessionStorage's own "storage" event only
// fires in *other* tabs, so dismiss() dispatches a matching same-tab event.
function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback);
  return () => window.removeEventListener(DISMISS_EVENT, callback);
}
function getSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}
function getServerSnapshot() {
  return true; // hidden until proven otherwise — avoids a flash for returning, already-dismissed visitors
}
function dismiss() {
  sessionStorage.setItem(STORAGE_KEY, "1");
  window.dispatchEvent(new Event(DISMISS_EVENT));
}

export function StickyBar() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (dismissed || provocations.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % provocations.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed || provocations.length === 0) return null;

  return (
    <div
      role="status"
      className="relative z-50 flex items-center justify-center gap-4 bg-[var(--chrome-bg)] px-4 py-2 text-center font-mono text-mono-label uppercase text-bianco transition-colors duration-base ease-entrance"
    >
      <div className="relative h-4 w-full max-w-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.32 }}
            className="absolute inset-0 flex items-center justify-center normal-case tracking-normal font-body text-body-s"
          >
            {provocations[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Chiudi il messaggio"
        className="shrink-0 text-base leading-none opacity-70 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}
