"use client";

import { usePathname, useRouter } from "next/navigation";
import { INTRO_REPLAY_EVENT, INTRO_REPLAY_FLAG } from "@/lib/intro";

/** "Rivedi la firma ↺" — replays the opening video from any page. */
export function IntroReplayButton({ label, className }: { label: string; className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function replay() {
    if (pathname === "/") {
      window.dispatchEvent(new Event(INTRO_REPLAY_EVENT));
      return;
    }
    try {
      sessionStorage.setItem(INTRO_REPLAY_FLAG, "1");
    } catch {
      // sessionStorage unavailable (private mode / blocked): navigate anyway
    }
    router.push("/");
  }

  return (
    <button type="button" className={className} onClick={replay}>
      {label} <span aria-hidden="true">↺</span>
    </button>
  );
}
