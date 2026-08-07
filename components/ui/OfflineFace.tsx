// Reconstructed SVG for the .face__* animation classes in globals.css — see
// the comment there. A small friendly face: eyes settle in, an idle blink +
// wandering-pupil loop, and a mouth that draws itself in once.
export function OfflineFace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={`face ${className}`.trim()} aria-hidden="true">
      <g className="face__eyes">
        <circle cx="70" cy="55" r="18" fill="var(--color-bianco)" />
        <circle cx="130" cy="55" r="18" fill="var(--color-bianco)" />
      </g>

      <g className="face__pupil">
        <circle cx="70" cy="55" r="6" fill="none" stroke="var(--color-inchiostro)" strokeWidth="9" strokeDasharray="35" strokeDashoffset="0" />
        <circle cx="130" cy="55" r="6" fill="none" stroke="var(--color-inchiostro)" strokeWidth="9" strokeDasharray="35" strokeDashoffset="0" />
      </g>

      <g className="face__eye-lid">
        <rect x="50" y="24" width="40" height="20" fill="var(--color-nero)" />
        <rect x="110" y="24" width="40" height="20" fill="var(--color-nero)" />
      </g>

      <circle className="face__nose" cx="100" cy="80" r="3.5" fill="var(--color-bianco)" />

      <path
        className="face__mouth-left"
        d="M70,105 Q85,118 100,105"
        fill="none"
        stroke="var(--color-bianco)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="102"
        strokeDashoffset="-102"
      />
      <path
        className="face__mouth-right"
        d="M100,105 Q115,118 130,105"
        fill="none"
        stroke="var(--color-bianco)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="102"
        strokeDashoffset="102"
      />
    </svg>
  );
}
