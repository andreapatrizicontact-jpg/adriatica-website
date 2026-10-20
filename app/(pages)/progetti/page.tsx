import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { progettiCopy } from "@/components/pages/progetti/copy";
import { ProjectList } from "@/components/pages/progetti/ProjectList";
import { StudioProject } from "@/components/pages/progetti/StudioProject";

const title = "Progetti";
const description =
  "I primi progetti reali di Adriatica: Nutriva, Rosso Pomodoro, La Tellina, un personal brand e uno studio Pilates in lavorazione.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/progetti" },
  openGraph: {
    title: `${title} — Adriatica`,
    description,
    url: "/progetti",
    siteName: "Adriatica Studio",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${title} — Adriatica`, description },
};

export default function ProgettiPage() {
  const { hero } = progettiCopy;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />

      <PageSection id="lavori" tone="work" ariaLabel={progettiCopy.listAriaLabel}>
        <ProjectList />
      </PageSection>

      <StudioProject />
    </>
  );
}
