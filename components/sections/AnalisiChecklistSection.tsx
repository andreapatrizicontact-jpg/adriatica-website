import { analisi } from "@/content/site";

export function AnalisiChecklistSection() {
  return (
    <section data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">Cosa ricevi</p>
        <h2 className="mt-4 font-display text-display-l font-black">{analisi.confirmationHeading}</h2>
        <p className="mt-4 max-w-xl font-body text-body-m text-bianco/75">{analisi.confirmationNote}</p>

        <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {analisi.checklist.map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-body-m text-bianco/85">
              <span aria-hidden="true" className="mt-0.5 text-periwinkle">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
