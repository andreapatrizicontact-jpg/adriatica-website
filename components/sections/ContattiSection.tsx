import { ContattiForm } from "@/components/forms/ContattiForm";
import { contact, contatti, socials } from "@/content/site";

export function ContattiSection() {
  return (
    <section data-world="blue" className="section-y px-6 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="font-mono text-mono-label uppercase text-bianco/60">{contatti.formHeading}</p>
          <div className="mt-8">
            <ContattiForm />
          </div>
        </div>

        <div className="border-2 border-bianco/15 p-6 sm:p-8">
          <p className="font-mono text-mono-label uppercase text-bianco/60">{contatti.directHeading}</p>

          <ul className="mt-6 flex flex-col gap-4 font-body text-body-m">
            <li>
              <a href={contact.phoneHref} className="text-bianco underline decoration-bianco/30 hover:text-periwinkle">
                ☎ {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="text-bianco underline decoration-bianco/30 hover:text-periwinkle">
                ✉ {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bianco underline decoration-bianco/30 hover:text-periwinkle"
              >
                WhatsApp
              </a>
            </li>
            <li className="text-bianco/70">📍 {contact.cityDisplay}</li>
          </ul>

          <p className="mt-6 font-body text-body-s text-bianco/60">{contatti.responseNote}</p>

          <div className="mt-6 flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-mono-label uppercase text-bianco/70 underline hover:text-periwinkle"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
