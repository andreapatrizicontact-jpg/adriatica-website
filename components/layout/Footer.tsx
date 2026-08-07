import { Wordmark } from "@/components/ui/Wordmark";
import { footerLinkGroups } from "@/content/nav";
import { brand, contact, legal, socials } from "@/content/site";

export function Footer() {
  return (
    <footer data-world="blue" className="mt-auto">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark on="dark" withSubline />
            <p className="mt-6 max-w-sm font-body text-body-m text-bianco/80">
              {brand.positioning}
            </p>
            <div className="mt-6 flex flex-col gap-1 font-body text-body-s text-bianco/80">
              <a href={contact.phoneHref} className="hover:text-periwinkle">
                {contact.phone}
              </a>
              <a href={contact.emailHref} className="hover:text-periwinkle">
                {contact.email}
              </a>
              <span>{contact.cityDisplay}</span>
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-mono-label uppercase text-bianco/60">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-body-s hover:text-periwinkle">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bianco/15 pt-8 font-body text-body-s text-bianco/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <span>{legal.creditLine}</span>
            <span>{legal.piva}</span>
          </div>
          {socials.length > 0 && (
            <div className="flex gap-4 font-mono text-mono-label uppercase">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-periwinkle">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
