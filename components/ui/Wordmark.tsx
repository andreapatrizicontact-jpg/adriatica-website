import Link from "next/link";
import { brand } from "@/content/site";
import { Sparkle } from "@/components/ui/Sparkle";

type WordmarkProps = {
  /** which world the wordmark sits on (brief §3.2) */
  on?: "dark" | "light";
  withSubline?: boolean;
  className?: string;
};

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
