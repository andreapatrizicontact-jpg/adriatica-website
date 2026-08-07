import Image from "next/image";
import { chiSiamo, contact } from "@/content/site";

export function ChiSiamoSection() {
  return (
    <section id="chi-siamo" data-world="blue" className="section-y px-6 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-[minmax(0,280px)_1fr] sm:items-start sm:gap-16">
        <div className="relative aspect-square w-full max-w-[280px] overflow-hidden border-2 border-bianco/15 bg-abisso">
          <Image
            src="/team/andrea-patrizi.jpg"
            alt={chiSiamo.heading}
            fill
            sizes="280px"
            className="object-cover"
            priority={false}
          />
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
