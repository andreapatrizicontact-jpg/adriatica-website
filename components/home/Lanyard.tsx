"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { lanyardBadge } from "@/content/home";
import { INTRO_DONE_EVENT, isIntroActive } from "@/lib/intro";
import { LanyardWorld, type LanyardGeometry, type LanyardPose } from "@/lib/lanyardPhysics";
import styles from "./Lanyard.module.css";

/*
  The cartellino: a badge on a strap that hangs from the top of the hero.
  Physics live in lib/lanyardPhysics.ts; this file is only the DOM glue.

  · server render / no JS / reduced motion: the badge is in its rest pose, pure CSS
    (Lanyard.module.css). The script reads the geometry back from the layout, so the
    live simulation starts from exactly the same pose.
  · live: requestAnimationFrame writes the badge `transform` and the strap `d`
    straight to the elements through refs. No React state in the loop.
  · the loop only runs while the hero is on screen, the tab is visible and the
    world is moving; it sleeps when everything is still and wakes on pointer, key,
    resize, visibility and intersection changes.
*/

const STRAP_TEXT = Array.from({ length: 18 }, () => lanyardBadge.strapText).join(" ");
const [firstName, ...otherNames] = lanyardBadge.name.split(" ");
const lastName = otherNames.join(" ");
const spoken = `${lanyardBadge.name}, ${lanyardBadge.role}, ${lanyardBadge.studio.replace(" · ", ", ")}`;
const LABEL_INTERACTIVE = `${spoken}. ${lanyardBadge.keyboardHint}.`;
const LABEL_STILL = spoken;

/** velocity change (px/s) given by one arrow key press */
const KEY_IMPULSE = 380;
const PAD = 4;

type Refs = {
  layer: HTMLDivElement;
  badge: HTMLDivElement;
  anchor: HTMLSpanElement;
  clip: HTMLSpanElement;
  strapStatic: HTMLDivElement;
  svgText: SVGTextElement;
  shadow: SVGPathElement;
  edge: SVGPathElement;
  main: SVGPathElement;
};

type Layout = {
  /** where the clip point sits in the rest pose (= top centre of the card's layout box) */
  cx0: number;
  cy0: number;
  geometry: LanyardGeometry;
  strapWidth: number;
};

/** Everything that exists while the physics runs. Returns the teardown. */
function mountPhysics(refs: Refs): () => void {
  const { layer, badge, anchor, clip, strapStatic, svgText, shadow, edge, main } = refs;
  const world = new LanyardWorld(10);
  const pose: LanyardPose = { clipX: 0, clipY: 0, angle: 0, rope: new Float64Array(0) };

  let layout: Layout | null = null;
  let raf = 0;
  let last = 0;
  let onScreen = true;
  let introPending = isIntroActive();
  let ready = false;
  let pointerId: number | null = null;
  let destroyed = false;

  // ------------------------------------------------------------ layout

  /** Reads the rest pose the CSS gives the badge (no transform applied). */
  function readLayout(): Layout | null {
    badge.style.transform = "";
    const lr = layer.getBoundingClientRect();
    if (lr.width < 1 || lr.height < 1) return null;
    const br = badge.getBoundingClientRect();
    const ar = anchor.getBoundingClientRect();
    const cr = clip.getBoundingClientRect();
    const sr = strapStatic.getBoundingClientRect();
    const cx0 = br.left - lr.left + br.width / 2;
    const cy0 = br.top - lr.top;
    const ay = ar.top - lr.top;
    return {
      cx0,
      cy0,
      strapWidth: sr.width,
      geometry: {
        anchor: { x: cx0, y: ay },
        ropeLength: Math.max(40, cy0 - ay),
        cardHeight: br.height,
        cardWidth: br.width,
        clipHeight: Math.max(0, br.top - cr.top),
        bounds: { width: lr.width, height: lr.height },
        pad: PAD,
      },
    };
  }

  function sameGeometry(a: LanyardGeometry, b: LanyardGeometry): boolean {
    const eps = 0.25;
    return (
      Math.abs(a.anchor.x - b.anchor.x) < eps &&
      Math.abs(a.anchor.y - b.anchor.y) < eps &&
      Math.abs(a.ropeLength - b.ropeLength) < eps &&
      Math.abs(a.cardHeight - b.cardHeight) < eps &&
      Math.abs(a.cardWidth - b.cardWidth) < eps &&
      Math.abs(a.bounds.width - b.bounds.width) < eps &&
      Math.abs(a.bounds.height - b.bounds.height) < eps
    );
  }

  /** Strap drawing sizes follow the strap width the CSS gives the rest pose. */
  function sizeStrap(strapWidth: number) {
    const w = Math.max(6, strapWidth);
    main.setAttribute("stroke-width", w.toFixed(2));
    shadow.setAttribute("stroke-width", w.toFixed(2));
    edge.setAttribute("stroke-width", (w + 2).toFixed(2));
    const fontSize = w * 0.3;
    svgText.setAttribute("font-size", fontSize.toFixed(2));
    svgText.setAttribute("dy", (fontSize * 0.36).toFixed(2));
  }

  // ------------------------------------------------------------ paint

  function paint(alpha: number) {
    if (!layout) return;
    world.readPose(alpha, pose);
    const { cx0, cy0 } = layout;
    badge.style.transform = `translate3d(${(pose.clipX - cx0).toFixed(2)}px, ${(pose.clipY - cy0).toFixed(2)}px, 0) rotate(${pose.angle.toFixed(4)}rad)`;

    // strap: smooth curve through the strap points (quadratic through midpoints), ends on the clip
    const r = pose.rope;
    const n = r.length / 2 - 1;
    let d = `M${r[0].toFixed(1)} ${r[1].toFixed(1)}`;
    for (let i = 1; i < n; i += 1) {
      const mx = (r[i * 2] + r[i * 2 + 2]) / 2;
      const my = (r[i * 2 + 1] + r[i * 2 + 3]) / 2;
      d += `Q${r[i * 2].toFixed(1)} ${r[i * 2 + 1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    d += `L${r[n * 2].toFixed(1)} ${r[n * 2 + 1].toFixed(1)}`;
    shadow.setAttribute("d", d);
    edge.setAttribute("d", d);
    main.setAttribute("d", d);
  }

  // ------------------------------------------------------------ loop

  function canRun(): boolean {
    return !destroyed && onScreen && !document.hidden && !introPending && !world.asleep;
  }

  function frame(now: number) {
    raf = 0;
    const dt = last ? (now - last) / 1000 : 1 / 60;
    last = now;
    const alpha = world.advance(dt);
    paint(alpha);
    if (!ready && !world.dropping) {
      ready = true;
      layer.dataset.ready = "1";
    }
    if (canRun()) raf = requestAnimationFrame(frame);
    else last = 0;
  }

  function wake() {
    world.wake();
    if (!raf && canRun()) raf = requestAnimationFrame(frame);
  }

  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
  }

  // ------------------------------------------------------------ drop-in

  function startDrop() {
    if (destroyed) return;
    const next = readLayout();
    if (!next) return;
    layout = next;
    sizeStrap(next.strapWidth);
    world.configure(next.geometry);
    world.beginDrop();
    ready = false;
    delete layer.dataset.ready;
    layer.dataset.phase = "live";
    paint(1);
    last = 0;
    if (!raf && canRun()) raf = requestAnimationFrame(frame);
  }

  function onIntroDone() {
    introPending = false;
    startDrop();
  }

  // ------------------------------------------------------------ input

  function markTouched() {
    layer.dataset.touched = "1";
  }

  function toLocal(event: PointerEvent) {
    const lr = layer.getBoundingClientRect();
    return { x: event.clientX - lr.left, y: event.clientY - lr.top };
  }

  function onPointerDown(event: PointerEvent) {
    if (pointerId !== null || world.dropping || introPending || !layout) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerId = event.pointerId;
    try {
      badge.setPointerCapture(event.pointerId);
    } catch {
      // synthetic or already released pointer: dragging still works with the events we get
    }
    const p = toLocal(event);
    world.grab(p.x, p.y);
    layer.dataset.dragging = "true";
    markTouched();
    wake();
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerId !== pointerId) return;
    const p = toLocal(event);
    world.moveGrab(p.x, p.y);
    wake();
  }

  function endDrag(event: PointerEvent) {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    delete layer.dataset.dragging;
    world.release();
    wake();
  }

  function onLostCapture(event: PointerEvent) {
    if (event.pointerId === pointerId) endDrag(event);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (world.dropping || introPending) return;
    const k = event.repeat ? 0.5 : 1;
    switch (event.key) {
      case "ArrowLeft":
        world.impulse(-KEY_IMPULSE * k, 0);
        break;
      case "ArrowRight":
        world.impulse(KEY_IMPULSE * k, 0);
        break;
      case "ArrowUp":
        world.impulse(0, -KEY_IMPULSE * 1.3 * k);
        break;
      case "ArrowDown":
        world.impulse(0, KEY_IMPULSE * 0.7 * k);
        break;
      default:
        return;
    }
    event.preventDefault();
    markTouched();
    wake();
  }

  // ------------------------------------------------------------ observers

  const resizeObserver = new ResizeObserver(() => {
    if (destroyed) return;
    const next = readLayout();
    if (!next) return;
    if (layout && sameGeometry(layout.geometry, next.geometry)) {
      layout = next;
      return;
    }
    const wasDropping = world.dropping;
    layout = next;
    sizeStrap(next.strapWidth);
    world.configure(next.geometry);
    if (layer.dataset.phase === "live" && wasDropping) {
      startDrop();
    } else {
      paint(1);
    }
    wake();
  });

  const intersection = new IntersectionObserver((entries) => {
    const entry = entries[entries.length - 1];
    onScreen = entry ? entry.isIntersecting : true;
    if (onScreen) {
      last = 0;
      wake();
    } else {
      stopLoop();
    }
  });

  function onVisibility() {
    if (document.hidden) stopLoop();
    else {
      last = 0;
      wake();
    }
  }

  // ------------------------------------------------------------ go

  resizeObserver.observe(layer);
  intersection.observe(layer);
  document.addEventListener("visibilitychange", onVisibility);
  badge.addEventListener("pointerdown", onPointerDown);
  badge.addEventListener("pointermove", onPointerMove);
  badge.addEventListener("pointerup", endDrag);
  badge.addEventListener("pointercancel", endDrag);
  badge.addEventListener("lostpointercapture", onLostCapture);
  badge.addEventListener("keydown", onKeyDown);
  // fired every time the opening video ends (also on "Rivedi la firma"): the badge drops in again
  window.addEventListener(INTRO_DONE_EVENT, onIntroDone);

  layout = readLayout();
  if (layout) {
    sizeStrap(layout.strapWidth);
    world.configure(layout.geometry);
  }
  if (introPending) {
    layer.dataset.phase = "waiting";
  } else {
    startDrop();
  }

  return () => {
    destroyed = true;
    stopLoop();
    resizeObserver.disconnect();
    intersection.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    badge.removeEventListener("pointerdown", onPointerDown);
    badge.removeEventListener("pointermove", onPointerMove);
    badge.removeEventListener("pointerup", endDrag);
    badge.removeEventListener("pointercancel", endDrag);
    badge.removeEventListener("lostpointercapture", onLostCapture);
    badge.removeEventListener("keydown", onKeyDown);
    window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
    if (pointerId !== null) {
      try {
        badge.releasePointerCapture(pointerId);
      } catch {
        // already gone
      }
    }
    // back to the pristine server-rendered state (StrictMode runs the effect twice)
    badge.style.transform = "";
    delete layer.dataset.phase;
    delete layer.dataset.ready;
    delete layer.dataset.dragging;
    main.removeAttribute("d");
    edge.removeAttribute("d");
    shadow.removeAttribute("d");
  };
}

export function Lanyard() {
  const pathId = useId();
  const layerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const clipRef = useRef<HTMLSpanElement>(null);
  const strapStaticRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);
  const mainRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const badge = badgeRef.current;
    const anchor = anchorRef.current;
    const clip = clipRef.current;
    const strapStatic = strapStaticRef.current;
    const svgText = textRef.current;
    const shadow = shadowRef.current;
    const edge = edgeRef.current;
    const main = mainRef.current;
    if (!layer || !badge || !anchor || !clip || !strapStatic || !svgText || !shadow || !edge || !main) return;

    const refs: Refs = { layer, badge, anchor, clip, strapStatic, svgText, shadow, edge, main };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown: (() => void) | null = null;

    // reduced motion: a still badge; it does nothing, so it leaves the tab order
    // and stops promising that the arrow keys move it
    function applyStill() {
      layer!.dataset.phase = "static";
      badge!.removeAttribute("tabindex");
      badge!.setAttribute("aria-label", LABEL_STILL);
    }

    function apply() {
      if (teardown) {
        teardown();
        teardown = null;
      }
      if (motion.matches) {
        applyStill();
      } else {
        badge!.setAttribute("tabindex", "0");
        badge!.setAttribute("aria-label", LABEL_INTERACTIVE);
        teardown = mountPhysics(refs);
      }
    }

    apply();
    motion.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      if (teardown) teardown();
      teardown = null;
      delete layer.dataset.phase;
      delete layer.dataset.touched;
      badge.setAttribute("tabindex", "0");
      badge.setAttribute("aria-label", LABEL_INTERACTIVE);
    };
  }, []);

  return (
    <div className={styles.layer} ref={layerRef}>
      <span className={styles.anchor} ref={anchorRef} aria-hidden="true" />

      {/* rest-pose strap: CSS only, replaced by the SVG one while the physics run */}
      <div className={styles.strapStatic} ref={strapStaticRef} aria-hidden="true">
        <span>{STRAP_TEXT}</span>
      </div>

      <svg className={styles.strapLive} aria-hidden="true" focusable="false">
        <path className={styles.strapShadow} ref={shadowRef} />
        <path className={styles.strapEdge} ref={edgeRef} />
        <path className={styles.strapMain} ref={mainRef} id={pathId} />
        <text className={styles.strapText} ref={textRef}>
          <textPath href={`#${pathId}`} startOffset="14">
            {STRAP_TEXT}
          </textPath>
        </text>
      </svg>

      <div className={styles.badge} ref={badgeRef} role="group" tabIndex={0} aria-label={LABEL_INTERACTIVE}>
        <div className={styles.card}>
          <span className={styles.slot} aria-hidden="true" />
          <div className={styles.top}>
            <Image src="/images/mark-ink.png" alt="" width={1029} height={852} sizes="24px" draggable={false} />
            <span className={styles.mark}>{lanyardBadge.mark}</span>
          </div>
          <div className={styles.photo}>
            <Image
              src="/images/andrea.jpg"
              alt={lanyardBadge.photoAlt}
              fill
              sizes="(max-width: 600px) 140px, 212px"
              loading="eager"
              draggable={false}
            />
          </div>
          <p className={styles.name}>
            <span>{firstName}</span>
            {lastName && <span>{lastName}</span>}
          </p>
          <p className={styles.role}>{lanyardBadge.role}</p>
          <p className={styles.place}>{lanyardBadge.place}</p>
        </div>
        <span className={styles.clip} ref={clipRef} aria-hidden="true" />
        <span className={styles.hint} aria-hidden="true">
          {lanyardBadge.hint}
        </span>
      </div>
    </div>
  );
}
