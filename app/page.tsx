import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";
import { Studio } from "@/components/home/Studio";
import { Work } from "@/components/home/Work";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { JsonLd } from "@/components/seo/JsonLd";
import { instagramUrl } from "@/content/home";
import { brand, contact, siteUrl, socials } from "@/content/site";

// Only facts the site already publishes: no rating, no review markup, no address beyond the city.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Adriatica Studio",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description: "Studio di social media, foto e video a Roma.",
  email: contact.email,
  telephone: contact.phone,
  address: { "@type": "PostalAddress", addressLocality: contact.cityDisplay, addressCountry: "IT" },
  founder: { "@type": "Person", name: brand.founder, jobTitle: "Social Media Manager and Brand Creator" },
  sameAs: [instagramUrl, ...socials.filter((s) => s.label !== "Instagram").map((s) => s.href)],
};

// Six blocks, in the order and with the ids defined by the approved concept:
// #inizio · #servizi · #direzione · #studio · #recensioni · #contatti
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Studio />
      <Reviews />
      <Contact />
      <IntroOverlay />
      <JsonLd data={organization} />
    </>
  );
}
