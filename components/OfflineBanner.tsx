"use client";

import { useSyncExternalStore } from "react";
import { OfflineFace } from "@/components/ui/OfflineFace";
import { getOnlineStatus, getServerOnlineStatus, subscribeOnlineStatus } from "@/lib/onlineStatus";

// Non-blocking — already-loaded pages keep working offline, so this doesn't
// take over the screen. It just tells you why a form is about to fail to
// submit, and clears itself the moment the browser fires "online" again.
export function OfflineBanner() {
  const isOnline = useSyncExternalStore(subscribeOnlineStatus, getOnlineStatus, getServerOnlineStatus);

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      data-world="dark"
      // bottom-left on desktop — ContactRail already owns bottom-right
      className="fixed inset-x-0 bottom-0 z-[90] flex justify-center px-4 pb-4 sm:bottom-6 sm:justify-start sm:px-6"
    >
      <div className="flex items-center gap-3 rounded-none border-2 border-bianco/15 bg-nero px-4 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] sm:gap-4 sm:px-5">
        <OfflineFace className="h-12 w-16 shrink-0 sm:h-14 sm:w-20" />
        <div>
          <p className="font-display text-body-m font-black text-bianco">Sei offline.</p>
          <p className="font-body text-body-s text-bianco/70">
            Le pagine già caricate funzionano — form e link torneranno attivi da soli appena si
            riconnette.
          </p>
        </div>
      </div>
    </div>
  );
}
