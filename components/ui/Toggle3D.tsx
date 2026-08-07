"use client";

type Toggle3DProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** short (2-4 char) labels for the two faces, e.g. "OFF" / "ON" */
  leftLabel: string;
  rightLabel: string;
  /** accessible name describing what the switch controls, not its current state */
  ariaLabel: string;
  className?: string;
};

// Accessible 3D flip-switch — a real checkbox (role="switch") under the
// hood, restyled per DESIGN-PLAN with token-driven colors. See globals.css
// "Bespoke interactive primitives" for the .t3d-* rules.
//
// Note: .t3d-switch is plain CSS (not a Tailwind utility), so it sits after
// Tailwind's generated utilities in the stylesheet and its display:inline-flex
// wins over a same-specificity "hidden" passed through `className` regardless
// of breakpoint — same trap as Pill. Wrap this component in a container and
// toggle display there instead (see SiteHeader for the pattern).
export function Toggle3D({
  checked,
  onChange,
  leftLabel,
  rightLabel,
  ariaLabel,
  className = "",
}: Toggle3DProps) {
  return (
    <label className={`t3d-switch ${className}`.trim()}>
      <input
        type="checkbox"
        role="switch"
        className="t3d-input"
        checked={checked}
        aria-checked={checked}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="t3d-track" aria-hidden="true">
        <span className="t3d-face t3d-face--left">{leftLabel}</span>
        <span className="t3d-face t3d-face--right">{rightLabel}</span>
      </span>
    </label>
  );
}
