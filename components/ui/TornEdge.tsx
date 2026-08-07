"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type World = "blue" | "dark" | "paper";

type TornEdgeProps = {
  /** section above the seam — becomes the wrapper's own fill */
  from: World;
  /** section below the seam — the jagged shape torn through it */
  to: World;
  className?: string;
};

const worldVar: Record<World, string> = {
  blue: "var(--color-abisso)",
  dark: "var(--color-nero)",
  paper: "var(--color-carta)",
};

// Irregular, not a repeating zigzag — hand-placed points so it reads as torn
// paper rather than a decorative chevron pattern.
const TORN_PATH =
  "M0,100 L0,38 L58,8 L131,54 L214,4 L288,61 L367,13 L452,49 L527,6 " +
  "L611,59 L688,19 L771,44 L849,3 L931,56 L1009,11 L1091,47 L1168,7 " +
  "L1251,53 L1329,17 L1409,41 L1440,18 L1440,100 Z";

// Scroll-triggered "rip" — see DESIGN-PLAN §3.4 item 5. One-time reveal as
// the seam enters the viewport, not a continuous scroll-linked effect. Uses
// the useInView hook (rather than the whileInView prop, which never fired
// here in testing) against a wrapper ref for a directly observable trigger.
// The wrapper itself is filled with `from`'s color so the jagged `to` shape
// has something to tear through — without it, the gaps in the torn path
// fall through to the page's own background instead of the section above.
export function TornEdge({ from, to, className = "" }: TornEdgeProps) {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.4 });

  return (
    <div
      ref={wrapperRef}
      className={`relative h-16 overflow-hidden sm:h-24 ${className}`.trim()}
      style={{ background: worldVar[from] }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={reduceMotion || inView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.65, 0, 0.35, 1] }}
      >
        <path d={TORN_PATH} fill={worldVar[to]} />
      </motion.svg>
    </div>
  );
}
