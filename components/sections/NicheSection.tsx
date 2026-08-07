import { nicheCategories } from "@/content/site";

export function NicheSection() {
  return (
    <section data-world="blue" className="section-y-tight px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/70">Settori</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-l font-black">
          I settori in cui lavoriamo meglio.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {nicheCategories.map((group) => (
            <div key={group.category}>
              <span className="font-mono text-mono-label uppercase text-periwinkle">
                {group.category}
              </span>
              <ul className="mt-4 flex flex-col gap-2">
                {group.niches.map((niche) => (
                  <li key={niche} className="font-display text-xl font-black text-bianco">
                    {niche}
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
