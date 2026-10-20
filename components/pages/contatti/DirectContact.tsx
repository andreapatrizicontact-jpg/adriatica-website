import { contact, contatti, socials } from "@/content/site";
import { contattiCopy } from "./copy";
import styles from "./DirectContact.module.css";

type Channel = { key: string; label: string; value: string; href: string; external?: boolean };

const channels: Channel[] = [
  { key: "phone", label: contattiCopy.channels.phone, value: contact.phone, href: contact.phoneHref },
  { key: "email", label: contattiCopy.channels.email, value: contact.email, href: contact.emailHref },
  {
    key: "whatsapp",
    label: contattiCopy.channels.whatsapp,
    value: contact.phone,
    href: contact.whatsappHref,
    external: true,
  },
];

/** "opens in a new tab" for screen readers, used on every external link */
function NewTabHint() {
  return <span className={styles.srOnly}> ({contattiCopy.external})</span>;
}

/**
 * The direct-contact block of /contatti: every real channel as a thin-ruled row
 * (phone, email, WhatsApp), the base city, the response-time note and the
 * three public profiles — all read from the content store, nothing typed here.
 */
export function DirectContact() {
  return (
    <div className={styles.direct}>
      <h2 id="contatti-diretto-title" className={styles.label}>
        {contatti.directHeading}
      </h2>

      <ul className={styles.channels}>
        {channels.map((channel) => (
          <li key={channel.key}>
            <a
              href={channel.href}
              className={styles.row}
              {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className={styles.rowLabel}>{channel.label}</span>
              <span className={styles.rowValue}>
                {channel.value}
                {channel.external && <NewTabHint />}
              </span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
        <li className={styles.row}>
          <span className={styles.rowLabel}>{contattiCopy.channels.base}</span>
          <span className={styles.rowValue}>{contact.cityDisplay}</span>
        </li>
      </ul>

      <p className={styles.note}>{contatti.responseNote}</p>

      <div className={styles.online}>
        <p className={styles.label}>{contattiCopy.online}</p>
        <ul className={styles.profiles}>
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} className={styles.profile} target="_blank" rel="noopener noreferrer">
                {social.label} <span aria-hidden="true">↗</span>
                <NewTabHint />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
