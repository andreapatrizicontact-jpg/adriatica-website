"use client";

import { type ReactNode, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export type AccordionItem = {
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** shows 01, 02, 03… before each title — for the process steps, not FAQ */
  numbered?: boolean;
  className?: string;
};

// Multiple items can be open at once (independent toggles) — this fits FAQ
// better than a single-open-only pattern, and works fine for the numbered
// process list too since steps aren't mutually exclusive to read.
export function Accordion({ items, numbered = false, className = "" }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const reduceMotion = useReducedMotion();

  function toggle(i: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className={`flex flex-col border-t border-current/15 ${className}`.trim()}>
      {items.map((item, i) => {
        const isOpen = openIndexes.has(i);
        const panelId = `accordion-panel-${numbered ? "step" : "faq"}-${i}`;
        const buttonId = `accordion-button-${numbered ? "step" : "faq"}-${i}`;

        return (
          <div key={item.title} className="border-b border-current/15">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                {numbered && (
                  <span className="font-mono text-body-s text-periwinkle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <span className="flex-1 font-display text-display-m font-black">{item.title}</span>
                <span aria-hidden="true" className="shrink-0 text-2xl font-black">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-6">{item.content}</div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
