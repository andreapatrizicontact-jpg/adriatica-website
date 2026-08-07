"use client";

import { useState } from "react";
import { contact } from "@/content/site";

export function ContactRail() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
      {/* mobile: single FAB that expands; desktop: both links always visible */}
      <div
        className={`flex flex-col items-end gap-2 sm:flex ${expanded ? "flex" : "hidden"}`}
      >
        <a
          href={contact.phoneHref}
          className="flex items-center gap-2 rounded-full bg-inchiostro px-4 py-3 font-body text-body-s text-bianco shadow-none hover:bg-adriatic sm:px-5"
        >
          <span aria-hidden>☎</span>
          <span className="hidden sm:inline">{contact.phone}</span>
        </a>
        <a
          href={contact.emailHref}
          className="flex items-center gap-2 rounded-full bg-inchiostro px-4 py-3 font-body text-body-s text-bianco hover:bg-adriatic sm:px-5"
        >
          <span aria-hidden>✉</span>
          <span className="hidden sm:inline">{contact.email}</span>
        </a>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={expanded ? "Chiudi contatti rapidi" : "Apri contatti rapidi"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-periwinkle text-inchiostro sm:hidden"
      >
        {expanded ? "×" : "☎"}
      </button>
    </div>
  );
}
