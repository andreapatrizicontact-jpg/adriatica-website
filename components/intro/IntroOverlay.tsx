"use client";

import { useLayoutEffect, useRef } from "react";
import { intro } from "@/content/home";
import {
  INTRO_ATTRIBUTE,
  INTRO_DONE_EVENT,
  INTRO_MAX_MS,
  INTRO_PHONE_QUERY,
  INTRO_REPLAY_EVENT,
  INTRO_REPLAY_FLAG,
  INTRO_STORAGE_KEY,
  introSources,
} from "@/lib/intro";
import styles from "./IntroOverlay.module.css";

/*
  The opening video ("la firma").

  Attribute on <html>:  "pending" (boot script, first-paint cover)
                     -> "playing" (this dialog is open)
                     -> removed   (always BEFORE INTRO_DONE_EVENT is dispatched)

  The decision is kept in `phase`, a ref, so React StrictMode (effects run
  twice in dev) and Fast Refresh reach the same decision: the "seen" flag
  written by the first run can never cancel the second one.
*/

type Phase = "idle" | "playing" | "done";

type Run = {
  /** `announce: false` = silent teardown (unmount / StrictMode): no focus return, no done event. */
  end: (announce: boolean) => void;
};

export function IntroOverlay() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const phase = useRef<Phase>("idle");

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    const skip = skipRef.current;
    if (!dialog || !video || !skip) return;

    const root = document.documentElement;
    const canShow = typeof HTMLDialogElement !== "undefined" && typeof dialog.showModal === "function";
    let run: Run | null = null;

    /** Hand the page back: attribute first, then the event (the lanyard checks the attribute). */
    function announceDone() {
      root.removeAttribute(INTRO_ATTRIBUTE);
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    }

    function consumeReplayFlag(): boolean {
      try {
        const flagged = sessionStorage.getItem(INTRO_REPLAY_FLAG) === "1";
        if (flagged) sessionStorage.removeItem(INTRO_REPLAY_FLAG);
        return flagged;
      } catch {
        return false;
      }
    }

    /** First visit of the session, motion allowed. Unreadable storage means no intro (it could never be remembered). */
    function shouldAutoPlay(): boolean {
      try {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
        return sessionStorage.getItem(INTRO_STORAGE_KEY) !== "seen";
      } catch {
        return false;
      }
    }

    function openRun() {
      if (run) return;

      const body = document.body;
      const active = document.activeElement;
      // the control that opened it (replay button) gets focus back; otherwise the hero title
      const returnTo =
        active instanceof HTMLElement && active !== body && active !== root && !dialog!.contains(active)
          ? active
          : null;
      const saved = {
        x: window.scrollX,
        y: window.scrollY,
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
      };
      let finished = false;
      let timer = 0;

      const onFinish = () => end(true);
      // `close` is queued asynchronously: a close fired by an earlier run (StrictMode teardown)
      // can arrive after the dialog was opened again, so only react to a dialog that is really closed
      const onClose = () => {
        if (!dialog!.open) end(true);
      };
      // same for a stale `error` queued by a load that a newer one replaced: video.error is reset by every load
      const onError = () => {
        if (video!.error) end(true);
      };

      function end(announce: boolean) {
        if (finished) return;
        finished = true;
        run = null;

        window.clearTimeout(timer);
        video!.removeEventListener("ended", onFinish);
        video!.removeEventListener("error", onError);
        dialog!.removeEventListener("close", onClose);
        skip!.removeEventListener("click", onFinish);

        // pause + reset; dropping the source also cancels a download still in flight
        video!.pause();
        video!.removeAttribute("src");
        video!.removeAttribute("poster");
        video!.load();

        if (dialog!.open) dialog!.close();

        body.style.overflow = saved.overflow;
        body.style.paddingRight = saved.paddingRight;
        if (window.scrollX !== saved.x || window.scrollY !== saved.y) {
          window.scrollTo({ left: saved.x, top: saved.y, behavior: "instant" });
        }

        if (!announce) {
          root.removeAttribute(INTRO_ATTRIBUTE);
          return;
        }

        const target = returnTo && returnTo.isConnected ? returnTo : document.getElementById("hero-title");
        if (target) {
          if (!target.hasAttribute("tabindex") && target.tabIndex < 0) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
        phase.current = "done";
        announceDone();
      }

      run = { end };

      // one format per device: the other file is never requested
      const source = window.matchMedia(INTRO_PHONE_QUERY).matches ? introSources.phone : introSources.desktop;

      try {
        video!.muted = true;
        video!.preload = "auto";
        video!.poster = source.poster;

        // lock the page; a classic scrollbar that disappears is replaced by padding so the page behind doesn't reflow
        const scrollbar = window.innerWidth - root.clientWidth;
        if (scrollbar > 0) {
          body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbar}px`;
        }
        body.style.overflow = "hidden";

        dialog!.showModal();
      } catch {
        end(true);
        return;
      }

      root.setAttribute(INTRO_ATTRIBUTE, "playing");
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "seen");
      } catch {
        // storage blocked: the intro simply can't be remembered
      }

      video!.addEventListener("ended", onFinish);
      video!.addEventListener("error", onError);
      dialog!.addEventListener("close", onClose); // Escape (native cancel) closes the dialog
      skip!.addEventListener("click", onFinish);
      timer = window.setTimeout(onFinish, INTRO_MAX_MS);

      skip!.focus({ preventScroll: true });

      // The file is attached on the next microtask: React's StrictMode tears this run down and
      // starts another one synchronously, so in development the video is requested once, not twice.
      queueMicrotask(() => {
        if (finished) return;
        video!.src = source.src;
        const playing = video!.play();
        if (playing !== undefined) playing.catch(onFinish); // autoplay refused
      });
    }

    function replay() {
      if (run || !canShow) return;
      phase.current = "playing";
      openRun();
    }

    const requested = consumeReplayFlag();

    if (phase.current === "idle") {
      if (canShow && (requested || shouldAutoPlay())) {
        phase.current = "playing";
        openRun();
      } else {
        phase.current = "done";
        announceDone();
      }
    } else if (phase.current === "playing") {
      // second StrictMode pass: the first run was torn down before it finished
      openRun();
    } else if (requested) {
      replay();
    }

    window.addEventListener(INTRO_REPLAY_EVENT, replay);
    return () => {
      window.removeEventListener(INTRO_REPLAY_EVENT, replay);
      run?.end(false);
    };
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.intro} aria-label={intro.dialogLabel}>
      <video
        ref={videoRef}
        className={styles.video}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        aria-label={intro.videoLabel}
      />
      <button ref={skipRef} type="button" className={styles.skip}>
        {intro.skip} <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
