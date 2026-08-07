import Link from "next/link";
import { brand } from "@/content/site";

type WordmarkProps = {
  /** which world the wordmark sits on (brief §3.2) */
  on?: "dark" | "light";
  withSubline?: boolean;
  className?: string;
};

// Mixed-case, no icon — per the logo image Andrea confirmed directly as
// "the logo," which superseded two earlier in-repo references (the
// all-caps + sparkle invoice letterhead, and the story-slide colored-period
// version before that). font-display is Poppins site-wide now, matching
// this logo and the Nutriva case study, which documents Poppins by name —
// see DECISIONS.md.
export function Wordmark({ on = "dark", withSubline = false, className = "" }: WordmarkProps) {
  const color = on === "dark" ? "text-bianco" : "text-abisso";

  return (
    <Link href="/" className={`inline-flex flex-col leading-none ${color} ${className}`}>
      <span className="font-display text-2xl font-black tracking-tight sm:text-3xl">
        {brand.wordmark}
      </span>
      {withSubline && (
        <span className="mt-1.5 font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">
          {brand.subline}
        </span>
      )}
    </Link>
  );
}
