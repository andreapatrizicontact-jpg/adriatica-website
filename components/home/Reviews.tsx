import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { reviewsSection } from "@/content/home";
import { reviews, type Review } from "@/content/reviews";
import styles from "./Reviews.module.css";

// Server Component, zero client JS: the "Leggi la recensione" toggle is a native
// <details>. The excerpt is clamped with CSS and swapped out (CSS :has) when the
// full text is open. Review copy comes straight from content/reviews.ts and is
// rendered as one text node, untouched. No aggregate score, no platform badge,
// no review structured data: none of it is verified.

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className={styles.card} aria-label={`Recensione di ${review.client}`}>
      <div className={styles.top}>
        <Eyebrow as="span" className={styles.label}>
          {review.client}
        </Eyebrow>
        <span className={styles.rating} role="img" aria-label={`Valutazione ${review.rating} su 5`}>
          {`${review.rating} / 5`}
        </span>
      </div>

      <blockquote className={styles.quote}>
        <p className={styles.preview}>{review.excerpt}</p>
      </blockquote>

      <details className={styles.details}>
        <summary>
          {reviewsSection.openLabel}
          <span className={styles.srOnly}>{` di ${review.client}`}</span>
        </summary>
        <p>{review.text}</p>
      </details>

      <footer className={styles.author}>
        <span>{review.author}</span>
        <time dateTime={review.iso}>{review.date}</time>
      </footer>
    </article>
  );
}

export function Reviews() {
  return (
    <section id="recensioni" aria-labelledby="reviews-title" className={styles.reviews}>
      <Container>
        <div className={styles.heading}>
          <div>
            <Eyebrow className={styles.headingEyebrow}>{reviewsSection.eyebrow}</Eyebrow>
            <h2 id="reviews-title" className={styles.title}>
              <Lines lines={reviewsSection.title} />
            </h2>
          </div>
          <p className={styles.description}>
            <Lines lines={reviewsSection.description} />
          </p>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </section>
  );
}
