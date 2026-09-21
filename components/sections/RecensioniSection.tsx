import { PaperCard } from "@/components/ui/PaperCard";
import { reviews } from "@/content/reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="relative inline-flex font-display text-sm" aria-label={`Valutazione ${rating} su 5`}>
      <span aria-hidden="true" className="text-bianco/25">
        ★★★★★
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden whitespace-nowrap text-[#f5b400]"
        style={{ width: `${(rating / 5) * 100}%` }}
      >
        ★★★★★
      </span>
    </div>
  );
}

export function RecensioniSection() {
  return (
    <section id="recensioni" data-world="paper" className="section-y px-6 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-mono-label uppercase text-adriatic">Recensioni</p>
        <h2 className="mt-4 font-display text-display-l font-black text-inchiostro">
          Cosa dicono i clienti
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <PaperCard key={review.id}>
              <div className="flex h-full flex-col gap-4 p-6 text-bianco">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg font-black">{review.name}</span>
                  <StarRating rating={review.rating} />
                </div>

                <p className="flex-1 font-body text-body-s text-bianco/85">{review.quote}</p>

                {review.signature && (
                  <p className="font-body text-body-s font-semibold text-bianco/85">{review.signature}</p>
                )}

                <p className="border-t border-bianco/15 pt-3 font-mono text-mono-label uppercase text-bianco/50">
                  {review.date}
                </p>
              </div>
            </PaperCard>
          ))}
        </div>
      </div>
    </section>
  );
}
