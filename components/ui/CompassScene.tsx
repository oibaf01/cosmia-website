'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Procedural gas-giant shading — 3D seamless noise (no UV wrap seam) + directional terminator + specular glint + fresnel rim
const PLANET_VERTEX = `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const PLANET_FRAGMENT = `
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uLight;
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // 3D value noise — evaluated directly on the sphere direction, so it wraps with zero seam
  float hash3(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.x + p.y) * p.z);
  }
  float noise3(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n000 = hash3(i + vec3(0.0, 0.0, 0.0));
    float n100 = hash3(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash3(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash3(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash3(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash3(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash3(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash3(i + vec3(1.0, 1.0, 1.0));
    float nx00 = mix(n000, n100, f.x), nx10 = mix(n010, n110, f.x);
    float nx01 = mix(n001, n101, f.x), nx11 = mix(n011, n111, f.x);
    return mix(mix(nx00, nx10, f.y), mix(nx01, nx11, f.y), f.z);
  }
  float fbm3(vec3 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 4; i++) { v += amp * noise3(p); p *= 2.0; amp *= 0.5; }
    return v;
  }

  void main() {
    vec3 dir = normalize(vPos);
    float warp = fbm3(dir * 2.5) * 0.4;
    float bands = sin((dir.y + warp) * 9.0) * 0.5 + 0.5;
    bands = mix(bands, fbm3(dir * 4.0), 0.18);
    vec3 base = mix(uDeep, uMid, smoothstep(0.15, 0.7, bands));

    vec3 N = normalize(vNormal);
    vec3 L = normalize(vec3(0.5, 0.45, 0.8));
    float diff = pow(max(dot(N, L), 0.0), 0.85);
    vec3 lit = base * (0.22 + diff * 0.95);

    vec3 V = normalize(vViewPosition);
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 70.0);
    lit += uLight * spec * 0.7;

    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    lit += uLight * fres * 0.25;

    gl_FragColor = vec4(lit, 1.0);
  }
`;

function PlanetOrb() {
  const uniforms = useMemo(
    () => ({
      uDeep: { value: new THREE.Color('#5C4527') },
      uMid: { value: new THREE.Color('#C8A26E') },
      uLight: { value: new THREE.Color('#F2DDB0') },
    }),
    []
  );

  return (
    <mesh>
      <sphereGeometry args={[1.05, 96, 96]} />
      <shaderMaterial uniforms={uniforms} vertexShader={PLANET_VERTEX} fragmentShader={PLANET_FRAGMENT} />
    </mesh>
  );
}

// Slow auto-spin + pointer-driven parallax tilt — only the planet+ring system moves
function CompassRig() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.26,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -state.pointer.x * 0.2,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.08} floatIntensity={0.3}>
        <PlanetOrb />
        {/* Compass bezel — twin rings */}
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.7, 0.015, 16, 100]} />
          <meshStandardMaterial color="#E7D7B7" emissive="#C8A26E" emissiveIntensity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.95, 0.008, 16, 100]} />
          <meshStandardMaterial color="#C8A26E" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

// Camera drifts slightly toward the pointer — near planet shifts more than far stars, real depth parallax
function CameraRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.45;
    const targetY = state.pointer.y * 0.28;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const STAR_VERTEX = `
  attribute float phase;
  attribute float aSize;
  varying float vPhase;
  void main() {
    vPhase = phase;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * (65.0 / -mvPosition.z), 4.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const STAR_FRAGMENT = `
  uniform float uTime;
  uniform vec3 uColor;
  varying float vPhase;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float twinkle = 0.45 + 0.4 * sin(uTime * 0.5 + vPhase);
    float alpha = smoothstep(0.5, 0.0, d) * twinkle;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// Fixed background starfield — positions never move, only brightness twinkles slowly
function Starfield({ count = 90 }: { count?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // One-shot random star layout — generated lazily on mount, never recomputed on re-render
  const [{ positions, phases, sizes }] = useState(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 2.6;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      positions[i * 3 + 2] = Math.sin(theta) * r - 4;
      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.9 + Math.random() * 1.6;
    }
    return { positions, phases, sizes };
  });

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color('#F7F4EF') } }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-phase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={STAR_VERTEX}
        fragmentShader={STAR_FRAGMENT}
      />
    </points>
  );
}

export default function CompassScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} color="#E7D7B7" />
      <pointLight position={[3, 3, 4]} intensity={6} color="#C8A26E" />
      <pointLight position={[-3, -2, -3]} intensity={4} color="#1E2938" />
      <Starfield />
      <CompassRig />
      <CameraRig />
      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.65} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
