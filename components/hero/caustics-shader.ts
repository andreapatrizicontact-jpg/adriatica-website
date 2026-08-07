// Inlined as JS strings rather than .glsl files — Next.js/Turbopack has no
// raw-text loader configured out of the box, and adding one is more
// machinery than a two-shader hero needs.
export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Explicit precision qualifiers throughout — Safari has historically been
// stricter than Chrome about relying on defaults (brief §10).
export const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;       // 0..1, last known position
  uniform float uPointerStrength; // 0..1, decays after the pointer stops moving
  uniform float uDepth;        // 0 (top of hero) .. 1 (scrolled past it)

  uniform vec3 uColorShallow;  // --color-adriatic
  uniform vec3 uColorDeep;     // --color-abisso
  uniform vec3 uColorHighlight; // --color-periwinkle, caustic light-web tint

  // Classic layered-sine caustics — cheap enough for a full-screen quad at
  // 60fps, reads as a plausible underwater light-web without a real light
  // simulation.
  float caustic(vec2 p, float time) {
    vec2 i = p;
    float c = 0.0;
    float inten = 0.005;
    for (int n = 0; n < 5; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      vec2 denom = vec2(
        sin(i.x + t) / inten,
        cos(i.y + t) / inten
      );
      c += 1.0 / length(p / denom + vec2(1e-4));
    }
    c /= 5.0;
    c = 1.17 - pow(c, 1.4);
    return clamp(pow(abs(c), 8.0), 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 6.0;

    // pointer ripple — a soft radial wave that pushes the sampling
    // coordinate outward from the last touch point, fading with
    // uPointerStrength (JS-side exponential decay, ~1.2s to settle).
    vec2 pointerP = (uPointer - 0.5) * vec2(aspect, 1.0) * 6.0;
    float distToPointer = length(p - pointerP);
    float ripple = sin(distToPointer * 3.0 - uTime * 2.5) * 0.35
      * uPointerStrength * smoothstep(3.0, 0.0, distToPointer);
    p += normalize(p - pointerP + 1e-4) * ripple;

    float c1 = caustic(p, uTime * 0.6);
    float c2 = caustic(p * 1.6 + 10.0, uTime * 0.4 + 5.0);
    float light = clamp(c1 * 0.7 + c2 * 0.5, 0.0, 1.0);

    vec3 base = mix(uColorShallow, uColorDeep, uDepth);
    vec3 color = mix(base, uColorHighlight, light * 0.55);
    // depth vignette — darkens further from the pointer, sells the
    // "sinking" read as uDepth increases
    float vignette = smoothstep(1.4, 0.0, length(p) / (3.0 - uDepth));
    color = mix(color * 0.55, color, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;
