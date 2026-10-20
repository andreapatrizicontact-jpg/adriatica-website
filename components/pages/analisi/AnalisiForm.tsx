"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { analisiSchema } from "@/lib/validation";
import { analisiCopy } from "./copy";
import styles from "./AnalisiForm.module.css";

/*
  Free social analysis request → POST /api/analisi.

  Contract (lib/validation.ts → analisiSchema, app/api/analisi/route.ts):
    200 { ok: true }                         only after the request was really accepted
    400 { ok: false, errors: { field: [] } } field errors, keyed like the form
    429 / 502 / 503 { ok: false, errors: { form: [] } }
  The success state is shown ONLY for a 200 whose body says ok: true; everything else
  (any other status, a network failure, a timeout, a body that is not JSON) is an error
  that keeps what the visitor typed and offers the direct email.
*/

type TextName = "handle" | "sito" | "nome" | "email" | "telefono";
type ChoiceName = "settore" | "obiettivo";
type FieldName = TextName | ChoiceName | "consenso";

type Values = Record<TextName | ChoiceName | "website", string> & { consenso: boolean };
type FieldErrors = Partial<Record<FieldName, string>>;

type Status =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "validation" }
  | { kind: "error"; message: string }
  | { kind: "success" };

type AnalisiFormProps = {
  settoreOptions: readonly string[];
  obiettivoOptions: readonly string[];
  /** "Invia la mia richiesta" */
  submitLabel: string;
  /** "Ti rispondiamo entro 48 ore, via email." — shown in the confirmation */
  responseNote: string;
  email: string;
  emailHref: string;
  /** id of the heading that names the form */
  headingId: string;
};

const initialValues: Values = {
  handle: "",
  sito: "",
  settore: "",
  obiettivo: "",
  nome: "",
  email: "",
  telefono: "",
  consenso: false,
  website: "",
};

// first invalid field gets the focus: where each one lives in the DOM
const fieldOrder: FieldName[] = ["handle", "settore", "obiettivo", "nome", "email", "consenso"];
const focusId: Record<FieldName, string> = {
  handle: "analisi-handle",
  sito: "analisi-sito",
  settore: "analisi-settore-0",
  obiettivo: "analisi-obiettivo-0",
  nome: "analisi-nome",
  email: "analisi-email",
  telefono: "analisi-telefono",
  consenso: "analisi-consenso",
};
const knownFields = new Set<string>(Object.keys(focusId));

// The honeypot ("website") is not validated here: a real visitor never sees it, and if an
// aggressive autofill fills it the server decides. It is still sent along.
const clientSchema = analisiSchema.omit({ website: true });

const REQUEST_TIMEOUT_MS = 20_000;

function isFieldName(key: string): key is FieldName {
  return knownFields.has(key);
}

function firstMessage(value: unknown): string | undefined {
  if (Array.isArray(value) && typeof value[0] === "string" && value[0]) return value[0];
  return undefined;
}

function focusFirstInvalid(errors: FieldErrors) {
  const first = fieldOrder.find((name) => errors[name]) ?? (Object.keys(errors) as FieldName[])[0];
  if (first) document.getElementById(focusId[first])?.focus();
}

export function AnalisiForm({
  settoreOptions,
  obiettivoOptions,
  submitLabel,
  responseNote,
  email,
  emailHref,
  headingId,
}: AnalisiFormProps) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const submitting = useRef(false); // synchronous guard: state updates are too late for a double click
  const successRef = useRef<HTMLDivElement>(null);

  const pending = status.kind === "pending";

  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  function setText(name: TextName | "website", value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (name !== "website" && errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function setChoice(name: ChoiceName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function setConsent(checked: boolean) {
    setValues((current) => ({ ...current, consenso: checked }));
    if (errors.consenso) setErrors((current) => ({ ...current, consenso: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const parsed = clientSchema.safeParse(values);
    if (!parsed.success) {
      const found: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (isFieldName(key) && !found[key]) found[key] = issue.message;
      }
      setErrors(found);
      setStatus({ kind: "validation" });
      focusFirstInvalid(found);
      return;
    }

    submitting.current = true;
    setErrors({});
    setStatus({ kind: "pending" });

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/analisi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: values.website }),
        signal: controller.signal,
      });
      const body: unknown = await response.json().catch(() => null);
      const payload = body && typeof body === "object" ? (body as { ok?: unknown; errors?: unknown }) : null;

      if (response.ok && payload?.ok === true) {
        setStatus({ kind: "success" });
        return;
      }

      // the server refused it: show where, keep everything typed
      const serverErrors =
        payload?.errors && typeof payload.errors === "object" ? (payload.errors as Record<string, unknown>) : {};
      const found: FieldErrors = {};
      for (const [key, value] of Object.entries(serverErrors)) {
        const message = firstMessage(value);
        if (message && isFieldName(key)) found[key] = message;
      }

      if (Object.keys(found).length > 0) {
        setErrors(found);
        setStatus({ kind: "validation" });
        focusFirstInvalid(found);
        return;
      }

      setStatus({
        kind: "error",
        message:
          firstMessage(serverErrors.form) ??
          (response.status === 429 ? analisiCopy.status.rateLimited : analisiCopy.status.generic),
      });
    } catch {
      setStatus({ kind: "error", message: analisiCopy.status.generic });
    } finally {
      window.clearTimeout(timer);
      submitting.current = false;
    }
  }

  if (status.kind === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className={styles.success}>
        <p className={styles.successTitle}>{analisiCopy.success.title}</p>
        <p className={styles.successText}>{responseNote}</p>
      </div>
    );
  }

  const { fields, consent, status: messages } = analisiCopy;

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={headingId} aria-busy={pending} className={styles.form}>
      {/* honeypot: invisible and unreachable for people, bots that fill every input trip it */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="analisi-website">Non compilare questo campo</label>
        <input
          id="analisi-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setText("website", event.target.value)}
        />
      </div>

      <TextField
        name="handle"
        label={fields.handle.label}
        placeholder={fields.handle.placeholder}
        value={values.handle}
        error={errors.handle}
        onChange={setText}
        required
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        autoComplete="off"
      />
      <TextField
        name="sito"
        label={fields.sito.label}
        placeholder={fields.sito.placeholder}
        value={values.sito}
        error={errors.sito}
        onChange={setText}
        inputMode="url"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        autoComplete="url"
      />

      <ChoiceGroup
        name="settore"
        legend={fields.settore.legend}
        options={settoreOptions}
        value={values.settore}
        error={errors.settore}
        onChange={setChoice}
      />
      <ChoiceGroup
        name="obiettivo"
        legend={fields.obiettivo.legend}
        options={obiettivoOptions}
        value={values.obiettivo}
        error={errors.obiettivo}
        onChange={setChoice}
      />

      <TextField
        name="nome"
        label={fields.nome.label}
        placeholder={fields.nome.placeholder}
        value={values.nome}
        error={errors.nome}
        onChange={setText}
        required
        autoComplete="name"
      />
      <TextField
        name="email"
        label={fields.email.label}
        placeholder={fields.email.placeholder}
        value={values.email}
        error={errors.email}
        onChange={setText}
        type="email"
        required
        autoComplete="email"
      />
      <TextField
        name="telefono"
        label={fields.telefono.label}
        placeholder={fields.telefono.placeholder}
        value={values.telefono}
        error={errors.telefono}
        onChange={setText}
        type="tel"
        autoComplete="tel"
      />

      <div className={styles.consent}>
        <div className={styles.consentRow}>
          <input
            id="analisi-consenso"
            name="consenso"
            type="checkbox"
            checked={values.consenso}
            onChange={(event) => setConsent(event.target.checked)}
            required
            aria-invalid={errors.consenso ? true : undefined}
            aria-describedby={errors.consenso ? "analisi-consenso-error" : undefined}
          />
          <label htmlFor="analisi-consenso">
            {consent.before}
            {/* a new tab, so the typed answers are not lost when someone reads the policy */}
            <Link href={consent.href} target="_blank" rel="noopener noreferrer">
              {consent.linkLabel}
              <span className={styles.srOnly}>{consent.newTab}</span>
            </Link>
            {consent.after}
          </label>
        </div>
        {errors.consenso && (
          <p id="analisi-consenso-error" className={styles.error}>
            {errors.consenso}
          </p>
        )}
      </div>

      <Button type="submit" tone="blue" className={styles.submit} aria-disabled={pending ? true : undefined}>
        {pending ? analisiCopy.submit.pending : submitLabel}
      </Button>

      <p className={styles.status} data-kind={status.kind} role="status" aria-live="polite">
        {pending && messages.pending}
        {status.kind === "validation" && messages.validation}
        {status.kind === "error" && (
          <>
            {status.message} {messages.emailLead}
            <a href={emailHref}>{email}</a>.
          </>
        )}
      </p>
    </form>
  );
}

/* ---------- field pieces ---------- */

type TextFieldProps = {
  name: TextName;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (name: TextName, value: string) => void;
  type?: "text" | "email" | "tel";
  required?: boolean;
  autoComplete?: string;
  autoCapitalize?: string;
  autoCorrect?: string;
  spellCheck?: boolean;
  inputMode?: "url";
};

function TextField({ name, label, placeholder, value, error, onChange, type = "text", ...rest }: TextFieldProps) {
  const id = `analisi-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={(event) => onChange(name, event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

type ChoiceGroupProps = {
  name: ChoiceName;
  legend: ReactNode;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (name: ChoiceName, value: string) => void;
};

function ChoiceGroup({ name, legend, options, value, error, onChange }: ChoiceGroupProps) {
  const errorId = `analisi-${name}-error`;
  return (
    <fieldset
      className={styles.group}
      data-invalid={error ? "true" : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={styles.label}>{legend}</legend>
      <div className={styles.choices}>
        {options.map((option, index) => (
          <label key={option} className={styles.choice}>
            <input
              id={`analisi-${name}-${index}`}
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(name, option)}
              required
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
