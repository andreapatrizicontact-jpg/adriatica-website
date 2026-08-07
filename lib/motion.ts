import type { Transition, Variants } from "motion/react";

// Mirrors the CSS custom properties in app/globals.css §1.5 — one set of
// numbers, referenced from both CSS and Framer variants, never hand-written
// per component.
export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.62,
} as const;

export const ease = {
  entrance: [0.22, 1, 0.36, 1] as const,
  transition: [0.65, 0, 0.35, 1] as const,
};

export const transitions = {
  entrance: { duration: duration.base, ease: ease.entrance } satisfies Transition,
  entranceFast: { duration: duration.fast, ease: ease.entrance } satisfies Transition,
  pageWipe: { duration: duration.slow, ease: ease.transition } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transitions.entrance },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitions.entrance },
};

export const staggerChildren = (stagger = 0.06): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger },
  },
});

/** SSR-safe check; combine with the `useReducedMotion` hook from `motion/react`
 * inside components for the reactive version. Use this only for one-shot,
 * non-reactive reads (e.g. deciding whether to mount a canvas at all). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
