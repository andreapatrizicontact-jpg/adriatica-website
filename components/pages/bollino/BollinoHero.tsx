import Image from "next/image";
import { PageHero } from "@/components/pages/PageHero";
import { Container } from "@/components/ui/Container";
import { bollino } from "@/content/site";
import { bollinoCopy } from "./copy";
import styles from "./BollinoHero.module.css";

/**
 * The shared PageHero (single h1) with the sticker artwork next to it.
 * The sticker is a sibling of the hero, not a child: on wide screens it is laid over the
 * hero's right-hand side, on tablets and phones it sits under the intro, in the page flow.
 */
export function BollinoHero() {
  return (
    <div className={styles.wrap}>
      <PageHero eyebrow={bollino.label.toUpperCase()} title={bollino.heading} intro={bollino.intro} />
      <Container className={styles.stickerRow}>
        {/* 446×446 source (the artwork Andrea supplied): width/height reserve the space */}
        <Image
          src="/brand/bollino/oro-qr.png"
          alt={bollinoCopy.stickerAlt}
          width={446}
          height={446}
          sizes="(max-width: 1000px) 168px, 256px"
          loading="eager"
          className={styles.sticker}
        />
      </Container>
    </div>
  );
}
