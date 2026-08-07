import Link from "next/link";
import { brand } from "@/content/site";

type WordmarkProps = {
  /** which world the wordmark sits on (brief §3.2) */
  on?: "dark" | "light";
  withSubline?: boolean;
  className?: string;
};

// Four-point sparkle accent, matching the mark used on Andrea's own real
// letterhead (Fattura 450 euro.pdf) — replaces the colored-period version
// used in Phase 0, which was based on the story-slide reference instead.
// Two real lockups exist in that document: this uppercase + sparkle
// treatment (letterhead) and a mixed-case white-on-navy pill (footer stamp,
// not adopted here — reads as a compact badge mark, not the primary logo).
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0c0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12 0-6.627-5.373-12-12-12 6.627 0 12-5.373 12-12z" />
    </svg>
  );
}

export function Wordmark({ on = "dark", withSubline = false, className = "" }: WordmarkProps) {
  const color = on === "dark" ? "text-bianco" : "text-abisso";

  return (
    <Link href="/" className={`inline-flex flex-col leading-none ${color} ${className}`}>
      <span className="inline-flex items-start font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
        {brand.wordmark.replace(/\.$/, "")}
        <span className="inline-flex">.</span>
        <Sparkle className="ml-0.5 h-[0.32em] w-[0.32em] shrink-0 translate-y-[0.05em]" />
      </span>
      {withSubline && (
        <span className="mt-1.5 font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">
          {brand.subline}
        </span>
      )}
    </Link>
  );
}
