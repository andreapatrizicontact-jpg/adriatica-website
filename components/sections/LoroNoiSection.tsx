"use client";

import { motion, useReducedMotion } from "motion/react";
import { loroNoi } from "@/content/site";

// brief §5.2 — the single highest-converting block on the reference site.
// Loro (light/muted) vs Noi (blue/white), rows stagger in on scroll.
export function LoroNoiSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="loro-noi" data-world="paper" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-adriatic">01 — Loro / Noi</p>
        <h2 className="mt-4 font-display text-display-l font-black">
          Non tutte le agenzie lavorano allo stesso modo.
        </h2>

        <div className="mt-10 overflow-hidden border-2 border-inchiostro/15">
          <div className="grid grid-cols-2">
            <div className="border-b-2 border-r-2 border-inchiostro/15 bg-carta p-4 sm:p-6">
              <span className="font-mono text-mono-label uppercase text-inchiostro/50">Loro</span>
            </div>
            <div className="border-b-2 border-inchiostro/15 bg-adriatic p-4 sm:p-6">
              <span className="font-mono text-mono-label uppercase text-bianco/80">Noi</span>
            </div>
          </div>

          {loroNoi.map((row, i) => (
            <motion.div
              key={row.loro}
              className="grid grid-cols-2"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
            >
              <div className="border-r-2 border-inchiostro/15 bg-carta p-4 font-body text-body-m text-inchiostro/60 sm:p-6">
                {row.loro}
              </div>
              <div className="bg-adriatic p-4 font-body text-body-m text-bianco sm:p-6">{row.noi}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
