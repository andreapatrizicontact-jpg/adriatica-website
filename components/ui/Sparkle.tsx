// Four-point sparkle accent, matching the mark used on Andrea's own real
// letterhead (Fattura 450 euro.pdf) — the accent glyph in the "ADRIATICA.✦"
// wordmark (see ui/Wordmark.tsx). Shared here since it's also used as the
// badge icon on ui/ServiceCard3D.
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0c0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12 0-6.627-5.373-12-12-12 6.627 0 12-5.373 12-12z" />
    </svg>
  );
}
