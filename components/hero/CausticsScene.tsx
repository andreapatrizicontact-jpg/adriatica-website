"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./caustics-shader";

// Reads a CSS color custom property and converts it to a linear-space
// THREE.Color, so the shader stays driven by the token system instead of
// duplicating hex values here.
function readColorVar(name: string, fallback: string) {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(value || fallback);
}

function CausticsMesh({ scrollDepthRef }: { scrollDepthRef: React.RefObject<number> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const pointer = useRef({ x: 0.5, y: 0.5, strength: 0, lastMoveAt: -10 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uPointerStrength: { value: 0 },
      uDepth: { value: 0 },
      uColorShallow: { value: readColorVar("--color-adriatic", "#004AAD") },
      uColorDeep: { value: readColorVar("--color-abisso", "#25227A") },
      uColorHighlight: { value: readColorVar("--color-periwinkle", "#5271FF") },
    }),
    []
  );

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = 1 - e.clientY / window.innerHeight;
      pointer.current.lastMoveAt = performance.now() / 1000;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;
    const t = state.clock.elapsedTime;
    mat.uniforms.uTime.value = t;
    mat.uniforms.uResolution.value.set(size.width, size.height);
    mat.uniforms.uPointer.value.set(pointer.current.x, pointer.current.y);

    // exponential decay, ~0.4s time constant — reaches ~5% (effectively
    // settled) after three time constants, i.e. ~1.2s (brief §3.3).
    const elapsedSinceMove = t - pointer.current.lastMoveAt;
    mat.uniforms.uPointerStrength.value = Math.exp(-elapsedSinceMove / 0.4);

    mat.uniforms.uDepth.value = scrollDepthRef.current ?? 0;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function CausticsScene({ scrollDepthRef }: { scrollDepthRef: React.RefObject<number> }) {
  return (
    <Canvas
      orthographic
      camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0, far: 1, position: [0, 0, 1] }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      className="!absolute !inset-0"
    >
      <CausticsMesh scrollDepthRef={scrollDepthRef} />
    </Canvas>
  );
}
