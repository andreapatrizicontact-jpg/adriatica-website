import { analisiSeo } from "@/content/site";

export function AnalisiSeoSection() {
  return (
    <section data-world="dark" className="section-y-tight border-t border-bianco/10 px-6 sm:px-10">
      <div className="mx-auto max-w-[800px]">
        <p className="font-mono text-mono-label uppercase text-bianco/50">{analisiSeo.eyebrow}</p>
        <div className="mt-6 flex flex-col gap-4">
          {analisiSeo.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-body text-body-s text-bianco/60">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
