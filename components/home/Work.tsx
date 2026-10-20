import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { instagramUrl, work } from "@/content/home";
import styles from "./Work.module.css";

// Rotation per post lives in the CSS module (kit: -6 / 3 / -2deg, phone -7 / 5).
const postClass = [styles.postOne, styles.postTwo, styles.postThree] as const;

// Rendered width of one post, from the board maths in Work.module.css
// (container = viewport minus the side margins):
//  - phone (<=600):   46% of the board content box (container - 52px padding)
//  - tablet (601-850): 29% of 90% of the container (container = 100vw - 48px)
//  - desktop:          29% of 86% of the container (100vw - 88px), capped at 320px from ~1371px
const sizesFromTablet =
  "(max-width: 850px) calc((100vw - 48px) * 0.26), (min-width: 1371px) 320px, calc((100vw - 88px) * 0.25)";
const postSizes = `(max-width: 600px) calc((100vw - 92px) * 0.46), ${sizesFromTablet}`;
// The third post is display:none on phones, but Chromium still fetches lazy
// images that have no box: tell it honestly that it is not rendered there, so
// it picks the smallest candidate instead of a ~384px file nobody sees.
const hiddenOnPhoneSizes = `(max-width: 600px) 1px, ${sizesFromTablet}`;

/**
 * #direzione — the kit's `section.work`.
 * The posts are Adriatica's own project (declared as such in the caption),
 * never client results.
 */
export function Work() {
  return (
    <section id="direzione" aria-labelledby="work-title" className={styles.work}>
      <Container>
        <div className={styles.heading}>
          <div>
            <Eyebrow className={styles.headingEyebrow}>{work.eyebrow}</Eyebrow>
            <h2 id="work-title">
              <Lines lines={work.title} />
            </h2>
          </div>
          <p className={styles.description}>
            <Lines lines={work.description} />
          </p>
        </div>

        <div className={styles.board} role="group" aria-label={work.boardLabel}>
          {work.posts.map((post, index) => (
            <Image
              key={post.src}
              className={`${styles.post} ${postClass[index]}`}
              src={post.src}
              alt={post.alt}
              width={1080}
              height={1350}
              sizes={index === 2 ? hiddenOnPhoneSizes : postSizes}
              loading="lazy"
            />
          ))}
          <Eyebrow as="span" className={styles.boardNote}>
            {work.boardNote}
          </Eyebrow>
        </div>

        <div className={styles.caption}>
          <div>
            <h3>{work.caption.title}</h3>
            <p className={styles.captionText}>{work.caption.text}</p>
          </div>
          <TextLink href={instagramUrl} external className={styles.captionLink}>
            {work.caption.link.label}
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
