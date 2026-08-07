import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type PillOwnProps = {
  variant?: "solid" | "ghost" | "chunky";
};

type PillLinkProps = PillOwnProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type PillButtonProps = PillOwnProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type PillProps = PillLinkProps | PillButtonProps;

// The one deliberately-rounded shape in the system — earned by the client's
// own periwinkle-pill CTA asset, not a default (DESIGN-PLAN §1.4).
// transition-property is listed once here (as an arbitrary superset covering
// every variant's needs) so no variant has to redeclare it — two conflicting
// transition-* utilities in the same class list fight for Tailwind's cascade
// order the same way the display-utility trap above does.
const base =
  "inline-flex items-center justify-center gap-2 font-body text-body-s " +
  "font-semibold tracking-tight transition-[color,background-color,box-shadow,transform] " +
  "duration-fast ease-entrance whitespace-nowrap";

const variants = {
  solid: "rounded-full px-6 py-3 bg-periwinkle text-inchiostro hover:bg-bianco",
  ghost:
    "bg-transparent text-current underline decoration-1 underline-offset-4 hover:decoration-2",
  // stacked-edge "keycap" depth — a flat top face over a darker abisso edge
  // that compresses on press, same layered-depth language as Toggle3D.
  chunky:
    "rounded-full px-7 py-3.5 bg-periwinkle text-inchiostro " +
    "shadow-[0_4px_0_0_var(--color-abisso)] hover:brightness-105 " +
    "active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-abisso)]",
};

// Note: `base` always sets display:inline-flex. To conditionally show/hide a
// Pill (e.g. responsively), wrap it in a container and toggle display there —
// passing "hidden" through `className` won't reliably win against `base`,
// since Tailwind's cascade order isn't guaranteed to follow class-string order.
export function Pill({ variant = "solid", className = "", ...props }: PillProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as PillLinkProps;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as PillButtonProps)} />;
}
