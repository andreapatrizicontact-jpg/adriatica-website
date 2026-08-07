import { servicePillars } from "@/content/site";
import { ServiceCard3D } from "@/components/ui/ServiceCard3D";

export function ServicesSection() {
  return (
    <section data-world="dark" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">Cosa facciamo</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-l font-black">
          Cinque modi per far crescere il tuo brand.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {servicePillars.map((pillar) => (
            <ServiceCard3D key={pillar.name} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
