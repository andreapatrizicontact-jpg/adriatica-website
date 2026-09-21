"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { WipBadge } from "@/components/ui/WipBadge";

export type ScatterCard = {
  fig: string;
  title: string;
  subtitle: string;
  /** -1 (left) .. 1 (right) resting horizontal position */
  x: number;
  /** resting tilt in degrees */
  rotate: number;
  /** 0 (far/slow) .. 1 (near/fast) — drives scroll speed, scale and z-order */
  depth: number;
  accent: "periwinkle" | "adriatic" | "abisso";
  /** optional cover image — cards without one stay text-only, exactly as before */
  image?: string;
  /** shows the reusable WipBadge in the card's corner */
  wip?: boolean;
};

const accentClasses: Record<ScatterCard["accent"], string> = {
  periwinkle: "bg-periwinkle text-inchiostro",
  adriatic: "bg-adriatic text-bianco",
  abisso: "bg-abisso text-bianco",
};

function CardFace({ card }: { card: ScatterCard }) {
  return (
    <>
      {card.wip && <WipBadge className="absolute right-3 top-3 z-10" />}
      {card.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {/* plain img, not next/image: these are placeholder SVGs, and
              Next's image optimizer refuses SVGs by default (security) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.image} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">{card.fig}</span>
      <span className="font-display text-xl font-black leading-tight">{card.title}</span>
      <span className="font-body text-body-s opacity-80">{card.subtitle}</span>
    </>
  );
}

// Only ever rendered from ScrollScatter's motion branch — the parent
// substitutes a static grid entirely when prefers-reduced-motion is set, so
// this component doesn't need to re-check it.
function Card({ card, progress }: { card: ScatterCard; progress: MotionValue<number> }) {
  const speed = 0.4 + card.depth * 1.1; // deeper cards travel further — the karolortyl differential-speed cue
  const y = useTransform(progress, [0, 1], [`${60 / speed}vh`, `${-60 * speed}vh`]);
  const rotate = useTransform(progress, [0, 1], [card.rotate - 4, card.rotate + 4]);
  const scale = 0.85 + card.depth * 0.3;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{ x: `calc(${card.x * 32}vw - 50%)`, y, rotate, scale }}
    >
      <div
        className={`relative flex w-[13rem] flex-col gap-3 rounded-none p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] sm:w-[16rem] ${accentClasses[card.accent]}`}
        style={{ zIndex: Math.round(card.depth * 10) }}
      >
        <CardFace card={card} />
      </div>
    </motion.div>
  );
}

export function ScrollScatter({ cards }: { cards: ScatterCard[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(scrollYProgress, (p) =>
    Math.min(cards.length - 1, Math.floor(p * cards.length))
  );

  if (reduceMotion) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.fig}
            className={`relative flex flex-col gap-3 p-5 ${accentClasses[card.accent]}`}
          >
            <CardFace card={card} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${cards.length * 60}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden [perspective:1400px]">
        {/* left index rail — mirrors karolortyl.com's "FIG. 1-6 / FIG. 7-12" reading aid */}
        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bianco/50 sm:flex sm:left-10">
          {cards.map((card, i) => (
            <IndexRow key={card.fig} card={card} index={i} activeIndex={activeIndex} />
          ))}
        </div>

        <div className="relative mx-auto h-full w-full">
          {cards.map((card) => (
            <Card key={card.fig} card={card} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IndexRow({
  card,
  index,
  activeIndex,
}: {
  card: ScatterCard;
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const opacity = useTransform(activeIndex, (active) => (active === index ? 1 : 0.4));
  return (
    <motion.div style={{ opacity }} className="flex items-center gap-2">
      <span className="text-bianco">{card.fig}</span>
      <span className="text-bianco/80">{card.title}</span>
    </motion.div>
  );
}
