import { servicePillars } from "@/content/site";

export function ServicesSection() {
  return (
    <section data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">Cosa facciamo</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-l font-black">
          Cinque modi per far crescere il tuo brand.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((pillar) => (
            <div key={pillar.name} className="flex flex-col gap-4 border-2 border-bianco/15 p-6 text-bianco">
              <div>
                <span className="font-display text-xl font-black">{pillar.name}</span>
                <p className="mt-2 font-body text-body-s text-bianco/70">{pillar.description}</p>
              </div>
              <ul className="mt-auto flex flex-col gap-1.5 border-t border-bianco/10 pt-4">
                {pillar.includes.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] uppercase tracking-[0.1em] text-periwinkle"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
