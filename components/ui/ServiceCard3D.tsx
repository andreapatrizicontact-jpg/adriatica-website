import Link from "next/link";
import { Sparkle } from "@/components/ui/Sparkle";
import { contact } from "@/content/site";
import type { ServicePillar } from "@/content/site";

// Real actions, not decorative placeholders — the original Uiverse snippet's
// row of generic "social" buttons is repurposed as the same three contact
// channels used everywhere else on the site (ContactRail, footer). The third
// glyph is a generic chat bubble rather than the WhatsApp logo mark, since
// that's a trademarked icon and a plain message icon says the same thing.
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-4.6 3.6A1 1 0 0 1 2 19.8V4z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ServiceCard3D({ pillar }: { pillar: ServicePillar }) {
  return (
    <div className="svc3d-parent">
      <div className="svc3d-card">
        <div className="svc3d-glass" />

        <div className="svc3d-badge">
          <span className="svc3d-circle svc3d-circle1" />
          <span className="svc3d-circle svc3d-circle2" />
          <span className="svc3d-circle svc3d-circle3" />
          <span className="svc3d-circle svc3d-circle4" />
          <span className="svc3d-circle svc3d-circle5">
            <Sparkle />
          </span>
        </div>

        <div className="svc3d-content">
          <span className="svc3d-title">{pillar.name}</span>
          <span className="svc3d-text">{pillar.description}</span>
        </div>

        <div className="svc3d-bottom">
          <Link href={pillar.href ?? "/consulenza"} className="svc3d-view-more">
            Parliamone
            <ArrowIcon />
          </Link>
          <div className="svc3d-socials">
            <a href={contact.phoneHref} className="svc3d-social-btn" aria-label="Chiamaci">
              <PhoneIcon />
            </a>
            <a href={contact.emailHref} className="svc3d-social-btn" aria-label="Scrivici un&apos;email">
              <MailIcon />
            </a>
            <a href={contact.whatsappHref} className="svc3d-social-btn" aria-label="Scrivici su WhatsApp">
              <ChatIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
