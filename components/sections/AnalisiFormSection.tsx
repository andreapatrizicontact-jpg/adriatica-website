import { AnalisiForm } from "@/components/forms/AnalisiForm";
import { analisi } from "@/content/site";

export function AnalisiFormSection() {
  return (
    <section data-world="paper" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[800px]">
        <p className="font-mono text-mono-label uppercase text-adriatic">{analisi.formHeading}</p>
        <div className="mt-8">
          <AnalisiForm />
        </div>
      </div>
    </section>
  );
}
