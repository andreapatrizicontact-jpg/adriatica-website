"use client";

import { motion, useReducedMotion } from "motion/react";
import { consulenza } from "@/content/site";

export function ConsulenzaCoversSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section data-world="paper" className="section-y px-6 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 sm:gap-16">
        <div>
          <p className="font-mono text-mono-label uppercase text-adriatic">{consulenza.coversHeading}</p>
          <ul className="mt-6 flex flex-col gap-4">
            {consulenza.covers.map((item, i) => (
              <motion.li
                key={item}
                className="flex gap-3 font-body text-body-m text-inchiostro/80"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : i * 0.08 }}
              >
                <span className="font-mono text-adriatic">0{i + 1}</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-inchiostro/15 bg-carta p-6 sm:p-8">
          <p className="font-mono text-mono-label uppercase text-inchiostro/50">{consulenza.isNotHeading}</p>
          <p className="mt-4 font-body text-body-m text-inchiostro/70">{consulenza.isNot}</p>
        </div>
      </div>
    </section>
  );
}
