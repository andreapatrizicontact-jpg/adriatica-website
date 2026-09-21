type WipBadgeProps = {
  className?: string;
};

// Reusable across any card — just pass `wip: true` in that card's data
// rather than hardcoding this badge into one specific component.
export function WipBadge({ className = "" }: WipBadgeProps) {
  return (
    <span
      className={`inline-flex items-center bg-periwinkle px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-inchiostro ${className}`.trim()}
    >
      Work in progress
    </span>
  );
}
