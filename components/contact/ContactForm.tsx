"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/Button";
import { contactSection } from "@/content/home";
import { contact } from "@/content/site";
import { defaultService, isServiceId, SERVICE_PARAM, serviceOptions, type ServiceId } from "@/lib/services";
import { contattiSchema, toFieldErrors, type FieldErrors } from "@/lib/validation";
import styles from "./ContactForm.module.css";

/*
  The real contact form (home block #contatti and the /contatti page).
  Styled for the blue ground, works standalone.

    <ContactForm />                    homepage: service, name, email, message, consent
    <ContactForm variant="full" />     + azienda, telefono (optional)

  Client and server validate with the same zod schema (lib/validation.ts).
  The visitor only ever sees "success" after POST /api/contatti answered
  200 {ok:true}; anything else keeps what they typed and shows the error
  text with a mailto link.
*/

type Variant = "home" | "full";
type Status = "idle" | "pending" | "validation" | "success" | "error";

type FormValues = {
  nome: string;
  email: string;
  messaggio: string;
  azienda: string;
  telefono: string;
  consenso: boolean;
  /** honeypot: real visitors never see it */
  website: string;
};

const initialValues: FormValues = {
  nome: "",
  email: "",
  messaggio: "",
  azienda: "",
  telefono: "",
  consenso: false,
  website: "",
};

type FocusField = "nome" | "email" | "messaggio" | "azienda" | "telefono" | "consenso";

// DOM order of each variant: "focus the first invalid field" follows it.
const focusOrder: Record<Variant, readonly FocusField[]> = {
  home: ["nome", "email", "messaggio", "consenso"],
  full: ["nome", "azienda", "email", "telefono", "messaggio", "consenso"],
};

// Labels of the extra fields of the "full" variant (the home copy only defines the base fields).
const optionalFields = {
  azienda: { label: "Azienda (opzionale)", placeholder: "Come si chiama la tua attività?" },
  telefono: { label: "Telefono (opzionale)", placeholder: "Se preferisci una chiamata" },
} as const;

const REQUEST_TIMEOUT_MS = 20_000;

// ---------- service preselection ----------

function readServiceFromUrl(): ServiceId | null {
  try {
    const value = new URLSearchParams(window.location.search).get(SERVICE_PARAM);
    return isServiceId(value) ? value : null;
  } catch {
    return null;
  }
}

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

// ---------- small building blocks ----------

type ControlProps = { id: string; "aria-invalid"?: true; "aria-describedby"?: string };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: (control: ControlProps) => ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {children({ id, ...(error ? { "aria-invalid": true as const, "aria-describedby": errorId } : {}) })}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

/** The copy's error sentence contains the studio address: that part becomes a mailto link. */
function ErrorMessage() {
  const text: string = contactSection.status.error;
  const link = (
    <a href={contact.emailHref} className={styles.mailLink}>
      {contact.email}
    </a>
  );
  const parts = text.split(contact.email);
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}
        {link}
        {parts[1]}
      </>
    );
  }
  return (
    <>
      {text} {link}
    </>
  );
}

// ---------- the form ----------

export function ContactForm({ variant = "home" }: { variant?: Variant }) {
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const isFull = variant === "full";

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  // The service the visitor picked by hand (radio or a data-service link). It always wins over the URL,
  // so a stale ?servizio= can never overwrite a later manual choice.
  const [picked, setPicked] = useState<ServiceId | null>(null);
  const fromUrl = useSyncExternalStore(subscribeToUrl, readServiceFromUrl, () => null);
  const service: ServiceId = picked ?? fromUrl ?? defaultService;

  const submitLock = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<Partial<Record<FocusField, HTMLElement | null>>>({});
  const register = (name: FocusField) => (element: HTMLElement | null) => {
    fieldRefs.current[name] = element;
  };

  // Any element with data-service (the homepage service links) preselects that service,
  // whether it sits on this page or the visitor arrives from another one.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const source = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-service]") : null;
      const value = source?.dataset.service;
      if (isServiceId(value)) setPicked(value);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Never leave a request (or its state update) behind when the form goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  function setText(name: Exclude<keyof FormValues, "consenso">) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [name]: value }));
      clearFieldError(name);
    };
  }

  function clearFieldError(name: string) {
    if (status === "success") setStatus("idle");
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function focusFirstInvalid(found: FieldErrors) {
    const first = focusOrder[variant].find((name) => found[name]?.length);
    if (first) fieldRefs.current[first]?.focus();
  }

  function restoreFocusToSubmit() {
    const submit = formRef.current?.querySelector<HTMLElement>('button[type="submit"]');
    const active = document.activeElement;
    if (submit && (active === document.body || active === submit)) submit.focus({ preventScroll: true });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return; // the disabled attribute is not enough: Enter can fire twice before React re-renders

    const payload = {
      servizio: service,
      nome: values.nome,
      email: values.email,
      messaggio: values.messaggio,
      consenso: values.consenso,
      website: values.website,
      ...(isFull ? { azienda: values.azienda, telefono: values.telefono } : {}),
    };

    const parsed = contattiSchema.safeParse(payload);
    if (!parsed.success) {
      const found = toFieldErrors(parsed.error);
      setErrors(found);
      setStatus("validation");
      focusFirstInvalid(found);
      return;
    }

    submitLock.current = true;
    setErrors({});
    setStatus("pending");

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });
      const data: unknown = await response.json().catch(() => null);
      const body = typeof data === "object" && data !== null ? (data as { ok?: unknown; errors?: unknown }) : null;

      if (response.status === 200 && body?.ok === true) {
        setValues(initialValues);
        setPicked(defaultService);
        setStatus("success");
      } else if (response.status === 400 && body?.errors && typeof body.errors === "object") {
        // the server disagreed with the browser: show its field messages
        const found = body.errors as FieldErrors;
        const hasFieldError = focusOrder[variant].some((name) => found[name]?.length);
        if (hasFieldError) {
          setErrors(found);
          setStatus("validation");
          focusFirstInvalid(found);
        } else {
          setStatus("error");
        }
      } else {
        setStatus("error"); // 413, 429, 5xx, unexpected body: never a fake confirmation
      }
    } catch {
      setStatus("error"); // offline, timeout, aborted
    } finally {
      clearTimeout(timeout);
      submitLock.current = false;
      restoreFocusToSubmit();
    }
  }

  const pending = status === "pending";
  const showValidation = status === "validation" && Object.keys(errors).length > 0;
  const first = (name: string) => errors[name]?.[0];
  const { fields, consent, legend, status: copy } = contactSection;

  return (
    <form ref={formRef} className={styles.form} data-variant={variant} onSubmit={onSubmit} noValidate aria-busy={pending}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{legend}</legend>
        <div className={styles.choices}>
          {serviceOptions.map((option) => (
            <label key={option.id} className={styles.choice}>
              <input
                type="radio"
                name={`${uid}-servizio`}
                value={option.id}
                checked={service === option.id}
                onChange={() => {
                  setPicked(option.id);
                  if (status === "success") setStatus("idle");
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={isFull ? styles.pair : undefined}>
        <Field id={fieldId("nome")} label={fields.name.label} error={first("nome")}>
          {(control) => (
            <input
              {...control}
              ref={register("nome")}
              className={styles.control}
              name="nome"
              type="text"
              autoComplete="name"
              required
              placeholder={fields.name.placeholder}
              value={values.nome}
              onChange={setText("nome")}
            />
          )}
        </Field>

        {isFull && (
          <Field id={fieldId("azienda")} label={optionalFields.azienda.label} error={first("azienda")}>
            {(control) => (
              <input
                {...control}
                ref={register("azienda")}
                className={styles.control}
                name="azienda"
                type="text"
                autoComplete="organization"
                placeholder={optionalFields.azienda.placeholder}
                value={values.azienda}
                onChange={setText("azienda")}
              />
            )}
          </Field>
        )}
      </div>

      <div className={isFull ? styles.pair : undefined}>
        <Field id={fieldId("email")} label={fields.email.label} error={first("email")}>
          {(control) => (
            <input
              {...control}
              ref={register("email")}
              className={styles.control}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={fields.email.placeholder}
              value={values.email}
              onChange={setText("email")}
            />
          )}
        </Field>

        {isFull && (
          <Field id={fieldId("telefono")} label={optionalFields.telefono.label} error={first("telefono")}>
            {(control) => (
              <input
                {...control}
                ref={register("telefono")}
                className={styles.control}
                name="telefono"
                type="tel"
                autoComplete="tel"
                placeholder={optionalFields.telefono.placeholder}
                value={values.telefono}
                onChange={setText("telefono")}
              />
            )}
          </Field>
        )}
      </div>

      <Field id={fieldId("messaggio")} label={fields.message.label} error={first("messaggio")}>
        {(control) => (
          <textarea
            {...control}
            ref={register("messaggio")}
            className={styles.control}
            name="messaggio"
            rows={3}
            required
            placeholder={fields.message.placeholder}
            value={values.messaggio}
            onChange={setText("messaggio")}
          />
        )}
      </Field>

      {/* honeypot: off-screen, out of the tab order and hidden from assistive tech; bots that fill every input trip it */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={fieldId("website")}>Non compilare questo campo</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={setText("website")}
        />
      </div>

      <div className={styles.consentRow}>
        <label className={styles.consent} htmlFor={fieldId("consenso")}>
          <input
            ref={register("consenso")}
            id={fieldId("consenso")}
            name="consenso"
            type="checkbox"
            required
            checked={values.consenso}
            aria-invalid={first("consenso") ? true : undefined}
            aria-describedby={first("consenso") ? `${fieldId("consenso")}-error` : undefined}
            onChange={(event) => {
              const checked = event.target.checked;
              setValues((current) => ({ ...current, consenso: checked }));
              clearFieldError("consenso");
            }}
          />
          <span>
            {consent.before}
            <a href={consent.href} target="_blank" rel="noopener noreferrer" className={styles.consentLink}>
              {consent.linkLabel}
              <span className={styles.srOnly}> (si apre in una nuova scheda)</span>
            </a>
            {consent.after}
          </span>
        </label>
        {first("consenso") && (
          <p id={`${fieldId("consenso")}-error`} className={styles.error}>
            {first("consenso")}
          </p>
        )}
      </div>

      <Button type="submit" tone="cream" className={styles.submit} disabled={pending} aria-busy={pending}>
        {contactSection.submit}
      </Button>

      <div className={styles.messages}>
        <p role="status" aria-live="polite" className={styles.status}>
          {pending ? copy.pending : status === "success" ? copy.success : null}
        </p>
        <p role="alert" className={styles.alert}>
          {showValidation ? copy.validation : status === "error" ? <ErrorMessage /> : null}
        </p>
      </div>
    </form>
  );
}
