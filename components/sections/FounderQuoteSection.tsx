import { founderQuote } from "@/content/site";

export function FounderQuoteSection() {
  return (
    <section data-world="blue" className="section-y-tight px-6 sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-display text-display-l font-black text-periwinkle">
          &ldquo;{founderQuote.quote}&rdquo;
        </p>
        <p className="mt-6 font-mono text-mono-label uppercase text-bianco/60">
          — {founderQuote.attribution}
        </p>
      </div>
    </section>
  );
}
