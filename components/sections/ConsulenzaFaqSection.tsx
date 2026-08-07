import { Accordion } from "@/components/ui/Accordion";
import { consulenza } from "@/content/site";

export function ConsulenzaFaqSection() {
  return (
    <section data-world="paper" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1000px]">
        <p className="font-mono text-mono-label uppercase text-adriatic">FAQ</p>
        <h2 className="mt-4 font-display text-display-l font-black">Domande frequenti.</h2>

        <Accordion
          className="mt-10 text-inchiostro"
          items={consulenza.faq.map((item) => ({
            title: item.question,
            content: <p className="font-body text-body-m text-inchiostro/70">{item.answer}</p>,
          }))}
        />
      </div>
    </section>
  );
}
