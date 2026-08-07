"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type PaperCardProps = {
  children: ReactNode;
  className?: string;
};

const DESKTOP_QUERY = "(min-width: 1024px)";

// Real perspective tilt on pointer (max 9°, DESIGN-PLAN §3.4) with a
// translateZ layered stack — a back panel offset behind the content face,
// standing in for the original brief's kraft/lime paper stack in the
// black+blue system (--color-abisso back, --color-adriatic face). Disabled
// below 1024px per spec; touch gets a CSS press-scale instead of tilt.
export function PaperCard({ children, className = "" }: PaperCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 300, damping: 30 });
  const springY = useSpring(py, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [9, -9]);
  const rotateY = useTransform(springX, [0, 1], [-9, 9]);
  const sheenX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(springY, [0, 1], ["0%", "100%"]);
  // hooks must run unconditionally — this is always computed, the reduced-
  // motion branch below just chooses not to render the element that uses it
  const sheenBackground = useMotionTemplate`radial-gradient(320px circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.16), transparent 60%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType === "touch") return;
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative active:scale-[0.98] lg:active:scale-100 ${className}`.trim()}
      style={{ perspective: "1000px" }}
    >
      {/* back panel — the layered-depth cue, offset behind the face */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-2 bg-abisso" />

      <motion.div
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ duration: 0.15 }}
        className="relative bg-adriatic"
      >
        {children}

        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 lg:group-hover:opacity-100"
            style={{ background: sheenBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
