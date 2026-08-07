"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { mainNav } from "@/content/nav";
import { contact, socials } from "@/content/site";

type OverlayNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function OverlayNav({ isOpen, onClose }: OverlayNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Esc to close + focus trap while open
  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusables?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
          data-world="blue"
          initial={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0.12 : 0.62, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-abisso px-6 py-8 text-bianco sm:px-12 sm:py-12"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-black">
              Adriatica<span className="text-periwinkle">.</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi il menu"
              className="text-3xl leading-none"
            >
              ×
            </button>
          </div>

          <nav className="mt-16 flex flex-1 flex-col justify-center gap-3 sm:mt-0">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-baseline gap-4 py-2 sm:gap-6"
                >
                  <span className="font-mono text-body-s text-periwinkle">{item.number}</span>
                  <span
                    className={`font-display text-[12vw] font-black leading-[0.95] tracking-tight transition-opacity sm:text-[6vw] ${
                      active ? "opacity-100" : "opacity-90 group-hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-16 flex flex-col gap-4 border-t border-bianco/15 pt-8 font-body text-body-m sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <a href={contact.phoneHref} className="hover:text-periwinkle">
                {contact.phone}
              </a>
              <a href={contact.emailHref} className="hover:text-periwinkle">
                {contact.email}
              </a>
            </div>
            {socials.length > 0 && (
              <div className="flex gap-4 font-mono text-mono-label uppercase">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="hover:text-periwinkle">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
