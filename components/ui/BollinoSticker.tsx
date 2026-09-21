import Image from "next/image";

// Real design, supplied by Andrea (2026-09-21) — gold + QR variant, chosen
// since it reads as a generic concept rather than one specific numbered
// badge. Other 3 variants (rosso-qr, rosso-logo, oro-logo) live alongside
// this one in public/brand/bollino/ if a different one is preferred.
export function BollinoSticker({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/bollino/oro-qr.png"
      alt="Bollino Trovabile — verificato da Adriatica Studio"
      width={446}
      height={446}
      className={className}
    />
  );
}
