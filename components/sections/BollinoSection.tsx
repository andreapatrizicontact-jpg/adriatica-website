import { Pill } from "@/components/ui/Pill";
import { BollinoSticker } from "@/components/ui/BollinoSticker";
import { bollino } from "@/content/site";

export function BollinoSection() {
  return (
    <section id="bollino" data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div>
            <p className="font-mono text-mono-label uppercase text-bianco/60">{bollino.label}</p>
            <h2 className="mt-4 font-display text-display-l font-black">{bollino.heading}</h2>
            <p className="mt-6 max-w-2xl font-body text-body-l text-bianco/85">{bollino.intro}</p>
          </div>
          <BollinoSticker className="mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48" />
        </div>

        <div className="mt-14">
          <p className="font-mono text-mono-label uppercase text-bianco/60">{bollino.checksHeading}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {bollino.checks.map((check) => (
              <li key={check} className="flex gap-3 font-body text-body-m text-bianco/85">
                <span aria-hidden="true" className="shrink-0 text-periwinkle">
                  ✓
                </span>
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 border-t border-bianco/15 pt-10">
          <p className="font-mono text-mono-label uppercase text-bianco/60">{bollino.stepsHeading}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {bollino.steps.map((step, i) => (
              <div key={step.title} className="border-t-2 border-bianco/20 pt-4">
                <span className="font-mono text-mono-label text-periwinkle">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-black">{step.title}</h3>
                <p className="mt-2 font-body text-body-s text-bianco/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 bg-periwinkle p-8 text-inchiostro sm:p-10">
          <p className="font-mono text-mono-label uppercase text-inchiostro/60">{bollino.priceHeading}</p>
          <p className="mt-3 max-w-xl font-display text-lg font-black">{bollino.price}</p>
        </div>

        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-body text-body-m text-bianco/75">{bollino.preCta}</p>
          <Pill href="/consulenza" variant="chunky" className="shrink-0">
            {bollino.ctaLabel}
          </Pill>
        </div>
      </div>
    </section>
  );
}
