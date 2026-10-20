// Service identifiers shared by the homepage cards, the contact form and (in
// the future) the Adriatica app. They are the contract between "Parliamo di…"
// links and the form's radio group. They do NOT imply that anything can be
// booked or paid online today.

export const serviceOptions = [
  { id: "social", label: "Gestione social" },
  { id: "shooting", label: "Foto + video" },
  { id: "strategy", label: "Strategia" },
] as const;

export type ServiceId = (typeof serviceOptions)[number]["id"];

export const defaultService: ServiceId = "social";

export function isServiceId(value: unknown): value is ServiceId {
  return serviceOptions.some((option) => option.id === value);
}

/** Query-string key used to preselect a service from any page: /?servizio=shooting#contatti */
export const SERVICE_PARAM = "servizio";

/** Builds the link a CTA should use to land on the contact form with a service preselected. */
export function contactHref(service?: ServiceId): string {
  return service ? `/?${SERVICE_PARAM}=${service}#contatti` : "/#contatti";
}
