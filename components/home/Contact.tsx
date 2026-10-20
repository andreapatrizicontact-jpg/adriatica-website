import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { contactSection } from "@/content/home";
import { contact } from "@/content/site";
import styles from "./Contact.module.css";

/**
 * #contatti — the kit's `section.contact`: blue ground, copy on the left,
 * the real form on the right. Everything interactive lives in ContactForm
 * (a small Client Component); this block stays a Server Component.
 */
export function Contact() {
  return (
    <section id="contatti" aria-labelledby="contact-title" className={styles.contact}>
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <Eyebrow className={styles.eyebrow}>{contactSection.eyebrow}</Eyebrow>
          <h2 id="contact-title">
            <Lines lines={contactSection.title} />
          </h2>
          <p className={styles.text}>{contactSection.text}</p>
          <a className={styles.email} href={contact.emailHref}>
            {contact.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
