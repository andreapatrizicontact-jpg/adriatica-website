/*
  Lanyard physics — a tiny 2D Verlet / position-based-dynamics world.

  Pure TypeScript: no React, no DOM, no dependencies. The component feeds it
  geometry (in CSS pixels, origin = top-left of the hero), calls `advance(dt)`
  once per animation frame and reads the pose back with `readPose(alpha)`.

  Model
    · the strap is a chain of point masses (index 0 = fixed anchor)
    · the badge is a rigid body made of two connected points:
        clip   = last strap point (top centre of the card)
        bottom = a second point, `cardHeight` px below the clip
      so the card rotates around the clip like a real badge
    · the strap + card form a chain of distance constraints. The chain is solved exactly with a
      tridiagonal (Thomas) solve per iteration, so a heavy card can not stretch a light strap
    · fixed step of 1/120 s with an accumulator (so the motion is the same at 30, 60, 120
      or 144 fps and a long frame, e.g. after a tab switch, can never explode it), each
      fixed step split in a few small sub-steps: small steps keep a stiff strap stiff
    · the card is kept inside the world rectangle by projecting its corners
    · a grab is a stiff position constraint on a point of the card, limited to what the
      strap can reach, so the strap never has to stretch to satisfy the pointer

  Coordinates: x right, y down. All lengths in px, time in seconds.
*/

export const FIXED_STEP = 1 / 120;

/** Longest frame the accumulator accepts; a longer one (tab switch) is truncated. */
const MAX_FRAME = 0.05;
const MAX_STEPS_PER_ADVANCE = 8;

export type Vec2 = { x: number; y: number };

export type LanyardGeometry = {
  /** fixed end of the strap (y < 0 = above the top edge) */
  anchor: Vec2;
  /** strap length from the anchor to the clip point */
  ropeLength: number;
  /** distance between the clip point and the bottom point of the card */
  cardHeight: number;
  cardWidth: number;
  /** hardware that sticks out above the clip point (kept inside the world too) */
  clipHeight: number;
  /** world rectangle the card has to stay in */
  bounds: { width: number; height: number };
  /** padding kept between the card and the world edge */
  pad: number;
};

export type LanyardTuning = {
  /** px / s^2 */
  gravity: number;
  /** linear air drag, 1/s (fraction of the speed lost per second) */
  drag: number;
  /** extra damping of the rotation of the card around the clip, 1/s */
  spin: number;
  /** extra drag on strap points, 1/s */
  ropeDrag: number;
  /** inverse mass of a strap point */
  ropeInvMass: number;
  /** inverse mass of the two card points (smaller = heavier card) */
  cardInvMass: number;
  /** sub-steps per fixed step */
  substeps: number;
  /** solver iterations per sub-step (each = pointer, chain solve, bend, walls) */
  iterations: number;
  /** 0..1, resistance of the strap to sharp bends */
  bend: number;
  /** 0..1, fraction of the grab error removed per solver iteration */
  grabStiffness: number;
  /** px, the pull of the pointer per solver iteration never exceeds this (it stays a soft force next to the rigid strap and walls) */
  grabMaxPull: number;
  /** seconds, low-pass on the pointer target (gives a stable release velocity) */
  grabSmoothing: number;
  /** px/s, cap on the speed a point can carry (a fling can not tunnel or explode) */
  maxSpeed: number;
  /** px/s, cap on how fast the pointer target moves */
  grabMaxSpeed: number;
  /** px/s under which the world counts as still */
  sleepSpeed: number;
};

export const defaultTuning: LanyardTuning = {
  gravity: 3400,
  drag: 0.5,
  spin: 1.0,
  ropeDrag: 0.5,
  ropeInvMass: 1,
  cardInvMass: 0.25,
  substeps: 4,
  iterations: 3,
  bend: 0.05,
  grabStiffness: 0.5,
  grabMaxPull: 2.5,
  grabSmoothing: 0.022,
  maxSpeed: 3300,
  grabMaxSpeed: 2600,
  sleepSpeed: 1.4,
};

export type DropOptions = {
  /** natural frequency of the spring that lowers the anchor, rad/s */
  omega: number;
  /** damping ratio (< 1 = one soft bounce) */
  zeta: number;
  /** horizontal start offset of the anchor, px (the badge swings in from the side) */
  sway: number;
  /** seconds after which the anchor is back on its fixed place */
  duration: number;
};

export const defaultDrop: DropOptions = {
  omega: 6.2,
  zeta: 0.62,
  sway: 46,
  duration: 1.6,
};

export type LanyardPose = {
  /** clip point = top centre of the card */
  clipX: number;
  clipY: number;
  /** card rotation around the clip, radians, clockwise positive (CSS `rotate()`) */
  angle: number;
  /** strap polyline x0,y0,x1,y1,... from the anchor to the clip (length 2 * (segments + 1)) */
  rope: Float64Array;
};

type Grab = {
  /** body-local coordinates of the grabbed point: G = clip + a*d + b*rot90(d), d = bottom - clip */
  a: number;
  b: number;
  /** raw pointer target */
  tx: number;
  ty: number;
  /** smoothed, reach-limited target actually used by the constraint */
  sx: number;
  sy: number;
};

type DropState = { t: number; lift: number; sway: number; opts: DropOptions };

export class LanyardWorld {
  readonly segments: number;
  readonly tuning: LanyardTuning;

  /** index of the clip point (last strap point) */
  private readonly clip: number;
  /** index of the bottom point of the card */
  private readonly bottom: number;
  private readonly count: number;
  /** duration of one sub-step */
  private readonly sub: number;

  // positions at the start of the last fixed step (render interpolation base), current, and Verlet "previous"
  private readonly ox: Float64Array;
  private readonly oy: Float64Array;
  private readonly x: Float64Array;
  private readonly y: Float64Array;
  private readonly px: Float64Array;
  private readonly py: Float64Array;
  private readonly w: Float64Array;
  // scratch space for the chain solve (one entry per distance constraint)
  private readonly cnx: Float64Array;
  private readonly cny: Float64Array;
  private readonly crhs: Float64Array;
  private readonly cdiag: Float64Array;
  private readonly cup: Float64Array;
  private readonly clam: Float64Array;

  private geo: LanyardGeometry | null = null;
  private segLength = 1;
  private acc = 0;
  private quiet = 0;
  private asleepFlag = true;
  private grabbed: Grab | null = null;
  private dropState: DropState | null = null;
  /** card outline as body-local points [a, b]: four corners + top of the clip hardware */
  private outline: number[] = [];

  constructor(segments = 10, tuning: Partial<LanyardTuning> = {}) {
    this.segments = segments;
    this.tuning = { ...defaultTuning, ...tuning };
    this.sub = FIXED_STEP / Math.max(1, Math.round(this.tuning.substeps));
    this.clip = segments;
    this.bottom = segments + 1;
    this.count = segments + 2;
    const n = this.count;
    this.ox = new Float64Array(n);
    this.oy = new Float64Array(n);
    this.x = new Float64Array(n);
    this.y = new Float64Array(n);
    this.px = new Float64Array(n);
    this.py = new Float64Array(n);
    this.w = new Float64Array(n);
    this.cnx = new Float64Array(n);
    this.cny = new Float64Array(n);
    this.crhs = new Float64Array(n);
    this.cdiag = new Float64Array(n);
    this.cup = new Float64Array(n);
    this.clam = new Float64Array(n);
    for (let i = 0; i < n; i += 1) this.w[i] = this.tuning.ropeInvMass;
    this.w[0] = 0;
    this.w[this.clip] = this.tuning.cardInvMass;
    this.w[this.bottom] = this.tuning.cardInvMass;
  }

  // ---------------------------------------------------------------- setup

  /** Apply new geometry and put the whole thing in its rest pose (hanging straight down). */
  configure(geometry: LanyardGeometry): void {
    this.geo = { ...geometry, anchor: { ...geometry.anchor }, bounds: { ...geometry.bounds } };
    this.segLength = geometry.ropeLength / this.segments;
    const hw = geometry.cardWidth / 2 / geometry.cardHeight;
    const hang = geometry.clipHeight / geometry.cardHeight;
    this.outline = [0, -hw, 0, hw, 1, -hw, 1, hw, -hang, 0];
    this.rest();
  }

  /** Rest pose: strap and card hanging straight down from the anchor, no velocity, asleep. */
  rest(): void {
    if (!this.geo) return;
    this.grabbed = null;
    this.dropState = null;
    this.placeStraight(this.geo.anchor.x, this.geo.anchor.y);
    this.acc = 0;
    this.quiet = 0;
    this.asleepFlag = true;
  }

  private placeStraight(ax: number, ay: number): void {
    const { x, y, px, py, ox, oy } = this;
    for (let i = 0; i <= this.clip; i += 1) {
      x[i] = ax;
      y[i] = ay + i * this.segLength;
    }
    x[this.bottom] = ax;
    y[this.bottom] = y[this.clip] + (this.geo?.cardHeight ?? 0);
    for (let i = 0; i < this.count; i += 1) {
      px[i] = x[i];
      py[i] = y[i];
      ox[i] = x[i];
      oy[i] = y[i];
    }
  }

  /**
   * Start the drop-in: the anchor starts high enough for the whole badge to be above the top
   * edge and is lowered by a damped spring, so the badge falls into view, bounces once and settles
   * with a small swing.
   */
  beginDrop(options: Partial<DropOptions> = {}): void {
    const geo = this.geo;
    if (!geo) return;
    const opts = { ...defaultDrop, ...options };
    // the clip must start at -(card height + room for the shadow); the rest pose has it at anchor.y + ropeLength
    const lift = geo.anchor.y + geo.ropeLength + geo.cardHeight + 32;
    this.grabbed = null;
    this.dropState = { t: 0, lift, sway: opts.sway, opts };
    this.placeStraight(geo.anchor.x + opts.sway, geo.anchor.y - lift);
    this.acc = 0;
    this.quiet = 0;
    this.asleepFlag = false;
  }

  // ---------------------------------------------------------------- state

  get asleep(): boolean {
    return this.asleepFlag;
  }

  get dragging(): boolean {
    return this.grabbed !== null;
  }

  get dropping(): boolean {
    return this.dropState !== null;
  }

  wake(): void {
    this.asleepFlag = false;
    this.quiet = 0;
  }

  /** Largest point speed in px/s. */
  maxSpeed(): number {
    let m = 0;
    for (let i = 1; i < this.count; i += 1) {
      const dx = this.x[i] - this.px[i];
      const dy = this.y[i] - this.py[i];
      const s = dx * dx + dy * dy;
      if (s > m) m = s;
    }
    return Math.sqrt(m) / this.sub;
  }

  /** Kinetic + potential energy (mass = 1 / invMass), for tests. Potential is relative to y = 0. */
  energy(): number {
    let e = 0;
    for (let i = 1; i < this.count; i += 1) {
      const m = 1 / this.w[i];
      const vx = (this.x[i] - this.px[i]) / this.sub;
      const vy = (this.y[i] - this.py[i]) / this.sub;
      e += 0.5 * m * (vx * vx + vy * vy) - m * this.tuning.gravity * this.y[i];
    }
    return e;
  }

  /** Worst relative length error over the strap segments and the card. For tests. */
  maxStretch(): number {
    const geo = this.geo;
    if (!geo) return 0;
    let worst = 0;
    for (let i = 0; i < this.clip; i += 1) {
      worst = Math.max(worst, Math.abs(this.dist(i, i + 1) - this.segLength) / this.segLength);
    }
    worst = Math.max(worst, Math.abs(this.dist(this.clip, this.bottom) - geo.cardHeight) / geo.cardHeight);
    return worst;
  }

  /** Raw positions for tests: [x0, y0, x1, y1, ...]. */
  snapshot(): number[] {
    const out: number[] = [];
    for (let i = 0; i < this.count; i += 1) out.push(this.x[i], this.y[i]);
    return out;
  }

  private dist(i: number, j: number): number {
    return Math.hypot(this.x[j] - this.x[i], this.y[j] - this.y[i]);
  }

  // ---------------------------------------------------------------- input

  /** Grab the card at world point (px, py): it then follows `moveGrab`. */
  grab(px: number, py: number): void {
    const geo = this.geo;
    if (!geo || this.dropState) return;
    const c = this.clip;
    const b = this.bottom;
    const dx = this.x[b] - this.x[c];
    const dy = this.y[b] - this.y[c];
    const l2 = dx * dx + dy * dy || 1;
    const wx = px - this.x[c];
    const wy = py - this.y[c];
    let la = (wx * dx + wy * dy) / l2;
    let lb = (wx * -dy + wy * dx) / l2;
    const hw = geo.cardWidth / 2 / geo.cardHeight;
    la = Math.min(1.05, Math.max(-0.05, la));
    lb = Math.min(hw + 0.05, Math.max(-hw - 0.05, lb));
    // start from where the grabbed point really is, so the first step does not jump
    const p = this.cardPoint(la, lb);
    const t = this.clampTarget(px, py);
    this.grabbed = { a: la, b: lb, tx: t.x, ty: t.y, sx: p.x, sy: p.y };
    this.wake();
  }

  moveGrab(px: number, py: number): void {
    const g = this.grabbed;
    if (!g) return;
    const t = this.clampTarget(px, py);
    g.tx = t.x;
    g.ty = t.y;
    this.wake();
  }

  release(): void {
    if (!this.grabbed) return;
    this.grabbed = null;
    this.wake();
  }

  /** Add a velocity change (px/s) to the whole mobile system. */
  impulse(vx: number, vy: number): void {
    if (!this.geo || this.dropState) return;
    for (let i = 1; i < this.count; i += 1) {
      this.px[i] -= vx * this.sub;
      this.py[i] -= vy * this.sub;
    }
    this.wake();
  }

  private clampTarget(px: number, py: number): Vec2 {
    const geo = this.geo;
    if (!geo) return { x: px, y: py };
    const m = geo.pad;
    return {
      x: Math.min(geo.bounds.width - m, Math.max(m, px)),
      y: Math.min(geo.bounds.height - m, Math.max(m, py)),
    };
  }

  // ---------------------------------------------------------------- stepping

  /**
   * Advance by `dt` seconds of wall time (any value: it is cut into fixed steps).
   * Returns the render interpolation factor 0..1 for `readPose`.
   */
  advance(dt: number): number {
    if (!this.geo || this.asleepFlag) return 1;
    const frame = Number.isFinite(dt) ? Math.min(Math.max(dt, 0), MAX_FRAME) : 0;
    this.acc += frame;
    let steps = 0;
    while (this.acc >= FIXED_STEP && steps < MAX_STEPS_PER_ADVANCE) {
      this.step();
      this.acc -= FIXED_STEP;
      steps += 1;
      if (this.asleepFlag) {
        this.acc = 0;
        return 1;
      }
    }
    if (steps === MAX_STEPS_PER_ADVANCE) this.acc = 0;
    return this.acc / FIXED_STEP;
  }

  /** One fixed step (1/120 s). Public so tests can drive the world without wall time. */
  step(): void {
    if (!this.geo) return;
    const { x, y, ox, oy } = this;
    for (let i = 0; i < this.count; i += 1) {
      ox[i] = x[i];
      oy[i] = y[i];
    }
    const n = Math.max(1, Math.round(this.tuning.substeps));
    for (let s = 0; s < n; s += 1) this.substep();
    this.updateSleep();
  }

  private substep(): void {
    const geo = this.geo;
    if (!geo) return;
    const h = this.sub;
    const t = this.tuning;
    const { x, y, px, py } = this;
    const count = this.count;

    // --- anchor (kinematic while the drop-in runs)
    this.moveAnchor(h);

    // --- pointer target: low-pass, speed limit, and never farther than the strap can reach
    const g = this.grabbed;
    if (g) this.updateGrabTarget(g, h);

    // --- Verlet integration with drag; the carried speed is capped
    const gdt2 = t.gravity * h * h;
    const baseDrag = 1 - t.drag * h;
    const ropeDrag = 1 - (t.drag + t.ropeDrag) * h;
    const cap = t.maxSpeed * h;
    for (let i = 1; i < count; i += 1) {
      const damp = i < this.clip ? ropeDrag : baseDrag;
      let vx = (x[i] - px[i]) * damp;
      let vy = (y[i] - py[i]) * damp;
      const v2 = vx * vx + vy * vy;
      if (v2 > cap * cap) {
        const f = cap / Math.sqrt(v2);
        vx *= f;
        vy *= f;
      }
      px[i] = x[i];
      py[i] = y[i];
      x[i] += vx;
      y[i] += vy + gdt2;
    }
    this.dampSpin(h);

    // --- constraints: soft pointer pull, exact chain solve, soft bend, walls; the chain is solved again last
    const clampWorld = !this.dropState;
    for (let it = 0; it < t.iterations; it += 1) {
      if (g) this.solveGrab(g);
      this.solveChain();
      if (t.bend > 0) this.solveBend();
      if (clampWorld) this.solveWorld();
    }
    this.solveChain();
    this.solveChain();
    this.looseRopeBounds();
  }

  private updateGrabTarget(g: Grab, h: number): void {
    const t = this.tuning;
    const k = 1 - Math.exp(-h / Math.max(1e-4, t.grabSmoothing));
    let mx = (g.tx - g.sx) * k;
    let my = (g.ty - g.sy) * k;
    const lim = t.grabMaxSpeed * h;
    const m2 = mx * mx + my * my;
    if (m2 > lim * lim) {
      const f = lim / Math.sqrt(m2);
      mx *= f;
      my *= f;
    }
    g.sx += mx;
    g.sy += my;
    // reach: the grabbed point can be at most ropeLength + its distance from the clip away from the anchor
    const geo = this.geo;
    if (!geo) return;
    const reach = (geo.ropeLength + geo.cardHeight * Math.hypot(g.a, g.b)) * 0.995;
    const ax = this.x[0];
    const ay = this.y[0];
    const dx = g.sx - ax;
    const dy = g.sy - ay;
    const d = Math.hypot(dx, dy);
    if (d > reach) {
      g.sx = ax + (dx / d) * reach;
      g.sy = ay + (dy / d) * reach;
    }
  }

  private moveAnchor(h: number): void {
    const geo = this.geo;
    if (!geo) return;
    const d = this.dropState;
    if (!d) {
      this.x[0] = geo.anchor.x;
      this.y[0] = geo.anchor.y;
      this.px[0] = geo.anchor.x;
      this.py[0] = geo.anchor.y;
      return;
    }
    d.t += h;
    const { omega, zeta, duration } = d.opts;
    // step response of an underdamped second-order system: 0 -> 1 with a soft overshoot
    const wd = omega * Math.sqrt(1 - zeta * zeta);
    const s = 1 - Math.exp(-zeta * omega * d.t) * (Math.cos(wd * d.t) + ((zeta * omega) / wd) * Math.sin(wd * d.t));
    this.px[0] = this.x[0];
    this.py[0] = this.y[0];
    this.x[0] = geo.anchor.x + d.sway * (1 - s);
    this.y[0] = geo.anchor.y - d.lift * (1 - s);
    if (d.t >= duration) {
      this.dropState = null;
      this.x[0] = geo.anchor.x;
      this.y[0] = geo.anchor.y;
      this.px[0] = this.x[0];
      this.py[0] = this.y[0];
    }
  }

  /** Extra damping of the card's rotation: damp the velocity of the bottom relative to the clip. */
  private dampSpin(h: number): void {
    const c = this.clip;
    const b = this.bottom;
    const k = Math.min(0.5, this.tuning.spin * h);
    const vcx = this.x[c] - this.px[c];
    const vcy = this.y[c] - this.py[c];
    const vbx = this.x[b] - this.px[b];
    const vby = this.y[b] - this.py[b];
    const mx = (vcx + vbx) / 2;
    const my = (vcy + vby) / 2;
    const rx = (vbx - vcx) / 2;
    const ry = (vby - vcy) / 2;
    const f = 1 - k;
    // positions already include the old velocities, so adjust by the difference
    this.x[c] += mx - rx * f - vcx;
    this.y[c] += my - ry * f - vcy;
    this.x[b] += mx + rx * f - vbx;
    this.y[b] += my + ry * f - vby;
  }

  /**
   * Make every length of the chain anchor - strap points - clip - bottom exact (one Newton step on
   * the linearised constraints). The constraint matrix J W J^T is tridiagonal, so it is solved
   * with the Thomas algorithm in O(n): the correction travels along the whole strap at once.
   */
  private solveChain(): void {
    const geo = this.geo;
    if (!geo) return;
    const m = this.segments + 1; // constraints: `segments` strap pieces + the card
    const { x, y, w, cnx, cny, crhs, cdiag, cup, clam } = this;
    const r = this.segLength;

    for (let k = 0; k < m; k += 1) {
      const dx = x[k + 1] - x[k];
      const dy = y[k + 1] - y[k];
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > 1e-9) {
        cnx[k] = dx / d;
        cny[k] = dy / d;
      } else {
        cnx[k] = 0;
        cny[k] = 1;
      }
      crhs[k] = -(d - (k < this.segments ? r : geo.cardHeight));
      cdiag[k] = w[k] + w[k + 1] + 1e-9;
    }
    // sub-diagonal a[k] couples constraint k-1 and k through point k; the matrix is symmetric
    // forward elimination (cup holds the modified super-diagonal, clam the modified rhs)
    let prevUp = 0;
    let prevRhs = 0;
    for (let k = 0; k < m; k += 1) {
      const a = k > 0 ? -w[k] * (cnx[k - 1] * cnx[k] + cny[k - 1] * cny[k]) : 0;
      const c = k < m - 1 ? -w[k + 1] * (cnx[k] * cnx[k + 1] + cny[k] * cny[k + 1]) : 0;
      const denom = cdiag[k] - a * prevUp;
      const up = c / denom;
      const rhs = (crhs[k] - a * prevRhs) / denom;
      cup[k] = up;
      clam[k] = rhs;
      prevUp = up;
      prevRhs = rhs;
    }
    // back substitution
    for (let k = m - 2; k >= 0; k -= 1) clam[k] -= cup[k] * clam[k + 1];

    // apply: p[k+1] += w[k+1] n_k lambda_k ; p[k] -= w[k] n_k lambda_k
    for (let k = 0; k < m; k += 1) {
      const l = clam[k];
      const ax = cnx[k] * l;
      const ay = cny[k] * l;
      x[k + 1] += w[k + 1] * ax;
      y[k + 1] += w[k + 1] * ay;
      x[k] -= w[k] * ax;
      y[k] -= w[k] * ay;
    }
  }

  private solveBend(): void {
    const r2 = this.segLength * 2;
    const k = this.tuning.bend;
    for (let i = 0; i + 2 <= this.clip; i += 1) this.solveDistance(i, i + 2, r2, k);
  }

  private solveDistance(i: number, j: number, rest: number, stiffness: number): void {
    const { x, y, w } = this;
    const dx = x[j] - x[i];
    const dy = y[j] - y[i];
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 1e-9) return;
    const wsum = w[i] + w[j];
    if (wsum === 0) return;
    const s = ((d - rest) / d) * (stiffness / wsum);
    x[i] += dx * s * w[i];
    y[i] += dy * s * w[i];
    x[j] -= dx * s * w[j];
    y[j] -= dy * s * w[j];
  }

  /**
   * Move the body-local point (a, b) of the card by (ex, ey) (scaled by k), sharing the correction
   * between the clip and the bottom point in proportion to their inverse masses.
   *   G = clip + M (bottom - clip),  M = [[a, -b], [b, a]]  ->  J_clip = I - M, J_bottom = M
   * and since M is a scaled rotation the 2x2 system collapses to a scalar.
   */
  private movePoint(a: number, b: number, ex: number, ey: number, k: number): void {
    const c = this.clip;
    const bt = this.bottom;
    const wc = this.w[c];
    const wb = this.w[bt];
    const s = wc * ((1 - a) * (1 - a) + b * b) + wb * (a * a + b * b);
    if (s < 1e-9) return;
    const inv = k / s;
    // M^T e
    const mx = a * ex + b * ey;
    const my = -b * ex + a * ey;
    this.x[c] += wc * (ex - mx) * inv;
    this.y[c] += wc * (ey - my) * inv;
    this.x[bt] += wb * mx * inv;
    this.y[bt] += wb * my * inv;
  }

  /** Current world position of the body-local point (a, b). */
  private cardPoint(a: number, b: number): Vec2 {
    const c = this.clip;
    const bt = this.bottom;
    const dx = this.x[bt] - this.x[c];
    const dy = this.y[bt] - this.y[c];
    return { x: this.x[c] + a * dx - b * dy, y: this.y[c] + a * dy + b * dx };
  }

  private solveGrab(g: Grab): void {
    const p = this.cardPoint(g.a, g.b);
    let ex = (g.sx - p.x) * this.tuning.grabStiffness;
    let ey = (g.sy - p.y) * this.tuning.grabStiffness;
    const lim = this.tuning.grabMaxPull;
    const e2 = ex * ex + ey * ey;
    if (e2 > lim * lim) {
      const f = lim / Math.sqrt(e2);
      ex *= f;
      ey *= f;
    }
    this.movePoint(g.a, g.b, ex, ey, 1);
  }

  private solveWorld(): void {
    const geo = this.geo;
    if (!geo) return;
    const m = geo.pad;
    const minX = m;
    const maxX = geo.bounds.width - m;
    const minY = m;
    const maxY = geo.bounds.height - m;
    const o = this.outline;
    for (let i = 0; i < o.length; i += 2) {
      const a = o[i];
      const b = o[i + 1];
      const p = this.cardPoint(a, b);
      const tx = Math.min(maxX, Math.max(minX, p.x));
      const ty = Math.min(maxY, Math.max(minY, p.y));
      if (tx !== p.x || ty !== p.y) this.movePoint(a, b, tx - p.x, ty - p.y, 1);
    }
  }

  private looseRopeBounds(): void {
    const geo = this.geo;
    if (!geo) return;
    const minX = -geo.pad;
    const maxX = geo.bounds.width + geo.pad;
    const maxY = geo.bounds.height;
    for (let i = 1; i < this.clip; i += 1) {
      if (this.x[i] < minX) this.x[i] = minX;
      else if (this.x[i] > maxX) this.x[i] = maxX;
      if (this.y[i] > maxY) this.y[i] = maxY;
    }
  }

  private updateSleep(): void {
    if (this.grabbed || this.dropState) {
      this.quiet = 0;
      return;
    }
    if (this.maxSpeed() < this.tuning.sleepSpeed) {
      this.quiet += 1;
      if (this.quiet >= 60) this.asleepFlag = true;
    } else {
      this.quiet = 0;
    }
  }

  // ---------------------------------------------------------------- output

  /** Pose interpolated between the last two fixed steps. `into` is reused when passed in. */
  readPose(alpha: number, into?: LanyardPose): LanyardPose {
    const a = Math.min(1, Math.max(0, alpha));
    const need = (this.segments + 1) * 2;
    const rope = into && into.rope.length === need ? into.rope : new Float64Array(need);
    for (let i = 0; i <= this.clip; i += 1) {
      rope[i * 2] = this.ox[i] + (this.x[i] - this.ox[i]) * a;
      rope[i * 2 + 1] = this.oy[i] + (this.y[i] - this.oy[i]) * a;
    }
    const c = this.clip;
    const b = this.bottom;
    const cx = rope[c * 2];
    const cy = rope[c * 2 + 1];
    const bx = this.ox[b] + (this.x[b] - this.ox[b]) * a;
    const by = this.oy[b] + (this.y[b] - this.oy[b]) * a;
    const pose = into ?? { clipX: 0, clipY: 0, angle: 0, rope };
    pose.clipX = cx;
    pose.clipY = cy;
    pose.angle = Math.atan2(-(bx - cx), by - cy);
    pose.rope = rope;
    return pose;
  }
}
