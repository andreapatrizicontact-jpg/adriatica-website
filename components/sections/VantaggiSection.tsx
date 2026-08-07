import { PaperCard } from "@/components/ui/PaperCard";
import { vantaggi } from "@/content/site";

export function VantaggiSection() {
  return (
    <section data-world="dark" className="section-y-tight px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-bianco/60">03 — Vantaggi</p>
        <h2 className="mt-4 font-display text-display-l font-black">Perché scegliere Adriatica.</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vantaggi.map((item) => (
            <PaperCard key={item.title}>
              <div className="p-6 text-bianco">
                <span className="font-display text-lg font-black">{item.title}</span>
                <p className="mt-2 font-body text-body-s text-bianco/75">{item.description}</p>
              </div>
            </PaperCard>
          ))}
        </div>
      </div>
    </section>
  );
}
