import { metodoSeo } from "@/content/site";

export function MetodoSeoSection() {
  return (
    <section data-world="paper" className="section-y-tight border-t border-inchiostro/10 px-6 sm:px-10">
      <div className="mx-auto max-w-[800px]">
        <p className="font-mono text-mono-label uppercase text-inchiostro/50">{metodoSeo.eyebrow}</p>
        <div className="mt-6 flex flex-col gap-4">
          {metodoSeo.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-body text-body-s text-inchiostro/60">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
