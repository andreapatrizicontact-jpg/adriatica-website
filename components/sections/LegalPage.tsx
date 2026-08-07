export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  eyebrow: string;
  heading: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, heading, updated, sections }: LegalPageProps) {
  return (
    <>
      <section data-world="paper" className="px-6 pt-40 pb-16 sm:px-10 sm:pt-48 sm:pb-20">
        <div className="mx-auto max-w-[800px]">
          <p className="font-mono text-mono-label uppercase text-adriatic">{eyebrow}</p>
          <h1 className="mt-4 font-display text-display-l font-black text-inchiostro">{heading}</h1>
          <p className="mt-4 font-body text-body-s text-inchiostro/50">Ultimo aggiornamento: {updated}</p>
        </div>
      </section>

      <section data-world="paper" className="section-y-tight px-6 sm:px-10">
        <div className="mx-auto flex max-w-[800px] flex-col gap-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-lg font-black text-inchiostro">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="font-body text-body-m text-inchiostro/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
