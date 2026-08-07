import { Accordion } from "@/components/ui/Accordion";
import { processoSteps } from "@/content/site";

export function ProcessoSection() {
  return (
    <section id="processo" data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">02 — Il processo</p>
        <h2 className="mt-4 font-display text-display-l font-black">Come lavoriamo, passo passo.</h2>

        <Accordion
          numbered
          className="mt-10 text-bianco"
          items={processoSteps.map((step) => ({
            title: step.title,
            content: (
              <ul className="flex flex-col gap-2">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="font-body text-body-m text-bianco/75">
                    {bullet}
                  </li>
                ))}
              </ul>
            ),
          }))}
        />
      </div>
    </section>
  );
}
