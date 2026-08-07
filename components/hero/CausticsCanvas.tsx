"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CausticsScene = dynamic(() => import("./CausticsScene").then((m) => m.CausticsScene), {
  ssr: false,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// deviceMemory isn't in the standard lib.dom.d.ts yet.
type NavigatorWithMemory = Navigator & { deviceMemory?: number };

/**
 * Static gradient poster first (matches the shader's own color mood, so
 * there's no flash when the canvas mounts on top), then the real WebGL
 * scene only once: the hero is actually visible, the browser is idle, and
 * the device isn't flagged as low-power / reduced-motion (brief §10).
 */
export function CausticsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollDepthRef = useRef(0);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMemory = ((navigator as NavigatorWithMemory).deviceMemory ?? 8) < 4;
    if (reduceMotion || lowMemory || !supportsWebGL()) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => setShouldMount(true));
        } else {
          setTimeout(() => setShouldMount(true), 200);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      scrollDepthRef.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 20% 0%, var(--color-adriatic) 0%, var(--color-abisso) 60%, var(--color-nero) 100%)",
      }}
    >
      {shouldMount && <CausticsScene scrollDepthRef={scrollDepthRef} />}
    </div>
  );
}
