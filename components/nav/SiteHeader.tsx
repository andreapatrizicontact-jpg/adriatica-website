"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { Pill } from "@/components/ui/Pill";
import { Toggle3D } from "@/components/ui/Toggle3D";
import { OverlayNav } from "@/components/nav/OverlayNav";
import { mainNav } from "@/content/nav";
import { cta } from "@/content/site";
import {
  getChromeAccent,
  getServerChromeAccent,
  setChromeAccent,
  subscribeChromeAccent,
} from "@/lib/chromeAccent";

export function SiteHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const chromeAccent = useSyncExternalStore(
    subscribeChromeAccent,
    getChromeAccent,
    getServerChromeAccent
  );

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // sync the persisted preference onto <html> on mount / when it changes —
  // a DOM write driven by already-known state, not a setState call, so it's
  // exactly what useEffect is for (unlike the sessionStorage *read* pattern
  // above, which needs useSyncExternalStore instead).
  useEffect(() => {
    document.documentElement.setAttribute("data-chrome-accent", chromeAccent);
  }, [chromeAccent]);

  const activeIndex = mainNav.findIndex((item) => item.href === pathname) + 1;

  return (
    <>
      <header
        className={`transition-colors duration-base ease-entrance ${
          scrolled ? "bg-[var(--chrome-bg)]/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 text-bianco sm:px-10">
          <Wordmark on="dark" />

          {/* social-proof cluster — desktop only, populated once real numbers are confirmed (DECISIONS.md #3/#4) */}
          <div className="hidden items-center gap-2 font-mono text-mono-label uppercase opacity-80 lg:flex">
            <span>Adriatica — Marketing Studio</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Toggle3D
                checked={chromeAccent === "dark"}
                onChange={(checked) => setChromeAccent(checked ? "dark" : "blue")}
                leftLabel="Blu"
                rightLabel="Nero"
                ariaLabel="Tema dell'interfaccia"
              />
            </div>
            <div className="hidden sm:block">
              <Pill href="/consulenza" variant="chunky">
                {cta.primary}
              </Pill>
            </div>
            <button
              type="button"
              onClick={() => setIsNavOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isNavOpen}
              className="flex items-center gap-2 font-mono text-mono-label uppercase"
            >
              <span aria-hidden className="text-body-s">
                {String(activeIndex || 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-1">
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-6 bg-current" />
              </span>
              <span className="sr-only">Apri il menu</span>
            </button>
          </div>
        </div>
      </header>

      <OverlayNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
