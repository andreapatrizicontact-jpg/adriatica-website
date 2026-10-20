import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { analisi, contact } from "@/content/site";
import { AnalisiForm } from "./AnalisiForm";
import { analisiCopy } from "./copy";
import styles from "./FormSection.module.css";

const headingId = "analisi-form-title";

/** Request form on the paper ground: copy on the left, the form on the right (kit's contact grid). */
export function FormSection() {
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <Eyebrow className={styles.eyebrow}>{analisiCopy.form.eyebrow}</Eyebrow>
          <h2 id={headingId}>{analisi.formHeading}</h2>
          <p className={styles.note}>{analisi.confirmationNote}</p>
          <p className={styles.direct}>
            {analisiCopy.form.directLead}{" "}
            <a href={contact.emailHref} className={styles.email}>
              {contact.email} <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
        <AnalisiForm
          settoreOptions={analisi.settoreOptions}
          obiettivoOptions={analisi.obiettivoOptions}
          submitLabel={analisi.submitLabel}
          responseNote={analisi.confirmationNote}
          email={contact.email}
          emailHref={contact.emailHref}
          headingId={headingId}
        />
      </Container>
    </section>
  );
}
