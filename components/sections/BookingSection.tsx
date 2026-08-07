import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { calendlyUrl, consulenza } from "@/content/site";

export function BookingSection() {
  return (
    <section id="prenota" data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <p className="font-mono text-mono-label uppercase text-bianco/60">Prenota ora</p>
          <h2 className="mt-4 font-display text-display-l font-black">Scegli il tuo orario.</h2>
          <div className="mt-8 h-[700px] overflow-hidden border-2 border-bianco/15 bg-bianco">
            <iframe
              src={calendlyUrl}
              title="Prenota una call gratuita su Calendly"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-body text-body-s text-bianco/60 underline hover:text-periwinkle"
          >
            Il calendario non si carica? Aprilo in una nuova scheda.
          </a>
        </div>

        <div>
          <p className="font-mono text-mono-label uppercase text-bianco/60">{consulenza.formHeading}</p>
          <p className="mt-4 font-body text-body-m text-bianco/75">{consulenza.formSub}</p>
          <div className="mt-6">
            <QuickContactForm idPrefix="consulenza" />
          </div>
        </div>
      </div>
    </section>
  );
}
