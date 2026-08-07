import type { CSSProperties } from "react";

type DominoLoaderProps = {
  label?: string;
  className?: string;
};

// Falling-domino loading indicator — see globals.css ".domino-loader" for
// the keyframe choreography (adapted from a Uiverse.io snippet, restyled to
// the token system). Freezes to a static row under prefers-reduced-motion.
export function DominoLoader({ label = "Caricamento in corso", className = "" }: DominoLoaderProps) {
  return (
    <div role="status" aria-label={label} className={`domino-loader ${className}`.trim()}>
      {/* fixed-length decorative set — position in the row is the identity */}
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} style={{ "--i": 7 - i } as CSSProperties} />
      ))}
    </div>
  );
}
