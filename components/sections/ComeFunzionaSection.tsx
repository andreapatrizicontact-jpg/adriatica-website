import { consulenza } from "@/content/site";

export function ComeFunzionaSection() {
  return (
    <section data-world="paper" className="section-y-tight px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-adriatic">{consulenza.stepsHeading}</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {consulenza.steps.map((step, i) => (
            <div key={step.title} className="border-t-2 border-inchiostro/20 pt-4">
              <span className="font-mono text-mono-label text-adriatic">0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-black text-inchiostro">{step.title}</h3>
              <p className="mt-2 font-body text-body-s text-inchiostro/65">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
