import { chiSiamo, contact } from "@/content/site";

// Founder portrait still missing (MISSING-ASSETS.md) — an initials block
// ships instead of a broken image or a stock photo standing in for Andrea.
export function ChiSiamoSection() {
  return (
    <section id="chi-siamo" data-world="blue" className="section-y px-6 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-[minmax(0,280px)_1fr] sm:items-start sm:gap-16">
        <div className="flex aspect-square w-full max-w-[280px] items-center justify-center border-2 border-bianco/15 bg-abisso">
          <span className="font-display text-display-l font-black text-bianco/70">AP</span>
        </div>

        <div>
          <p className="font-mono text-mono-label uppercase text-bianco/70">{chiSiamo.eyebrow}</p>
          <h2 className="mt-4 font-display text-display-l font-black">{chiSiamo.heading}</h2>
          <p className="mt-6 max-w-2xl font-body text-body-l text-bianco/85">{chiSiamo.paragraph}</p>
          <p className="mt-6 font-body text-body-s text-bianco/60">
            {contact.cityDisplay} ·{" "}
            <a href={contact.emailHref} className="underline hover:text-periwinkle">
              {contact.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
