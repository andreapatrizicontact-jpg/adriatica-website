"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { resolveLegacyHash } from "@/lib/legacyHashes";

/**
 * Sends old homepage anchors to where that content lives now:
 *   /#chi-siamo -> /#studio (same page: URL rewritten in place + scrolled there)
 *   /#progetti  -> /progetti
 *   /#bollino   -> /bollino
 * A fragment never reaches the server, so this has to run in the browser.
 */
export function HashRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function check() {
      const target = resolveLegacyHash(window.location.pathname, window.location.hash);
      if (!target) return;
      const url = new URL(target, window.location.origin);
      if (url.pathname === window.location.pathname) {
        window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
        document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
      } else {
        router.replace(target);
      }
    }
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [pathname, router]);

  return null;
}
