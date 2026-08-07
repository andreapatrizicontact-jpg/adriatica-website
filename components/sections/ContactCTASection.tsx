import { Pill } from "@/components/ui/Pill";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { cta } from "@/content/site";

export function ContactCTASection() {
  return (
    <section data-world="blue" className="section-y px-6 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 sm:gap-16">
        <div>
          <h2 className="font-display text-display-l font-black">Pronto a crescere davvero?</h2>
          <p className="mt-4 max-w-md font-body text-body-l text-bianco/85">
            Scrivici due righe, oppure prenota direttamente una call gratuita di 30 minuti.
          </p>
          <div className="mt-8">
            <Pill href="/consulenza" variant="chunky">
              {cta.primary}
            </Pill>
          </div>
        </div>

        <QuickContactForm idPrefix="cta" />
      </div>
    </section>
  );
}
