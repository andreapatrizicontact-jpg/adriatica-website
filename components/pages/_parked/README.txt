Parked on purpose (Oct 2026): prices were taken off the site for now, and the founder quote was removed from /metodo to keep it neutral.
The data is still in content/site.ts (pricingPlans, pricingExtras, pricingGuarantee, founderQuote, bollino.price). These components are not imported anywhere;
fix their relative imports (./copy, ./Price.module.css) when moving them back.
