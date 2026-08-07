import Link from "next/link";
import { brand } from "@/content/site";

type WordmarkProps = {
  /** which world the wordmark sits on — controls the period color (brief §3.2) */
  on?: "dark" | "light";
  withSubline?: boolean;
  className?: string;
};

export function Wordmark({ on = "dark", withSubline = false, className = "" }: WordmarkProps) {
  const periodColor = on === "dark" ? "text-lime" : "text-adriatic";

  return (
    <Link href="/" className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-display text-2xl font-black tracking-tight sm:text-3xl">
        Adriatica<span className={periodColor}>.</span>
      </span>
      {withSubline && (
        <span className="mt-1.5 font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">
          {brand.subline}
        </span>
      )}
    </Link>
  );
}
