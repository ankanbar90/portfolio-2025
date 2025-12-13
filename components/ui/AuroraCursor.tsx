// components/ui/AuroraCursor.tsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// --- SHADER CODE BEGINS ---
// Vertex Shader: Handles the position of the mesh on screen
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader: Handles the coloring and swirling logic
const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex 2D noise function
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  // Correct aspect ratio
  st.x *= uResolution.x / uResolution.y;
  
  // Mouse influence position
  vec2 mouse = uMouse / uResolution.xy;
  mouse.x *= uResolution.x / uResolution.y;
  
  // Distance from mouse
  float dist = distance(st, mouse);
  
  // Create swirling noise patterns based on time and distance
  float noise1 = snoise(vec2(st.x * 2.0 + uTime * 0.1, st.y * 2.0 - uTime * 0.2));
  float noise2 = snoise(vec2(st.x * 4.0 - uTime * 0.3 + noise1, st.y * 4.0 + uTime * 0.1));
  
  // Aurora colors
  vec3 color1 = vec3(1.0, 0.9, 0.9); // Teal/Green
  vec3 color2 = vec3(0.1, 0.3, 0.4); // Purple/Blue
  vec3 color3 = vec3(0.4, 0.2, 0.4); // Deep Blue background
  
  // Mix colors based on noise patterns
  vec3 finalColor = mix(color1, color2, noise1 * 0.5 + 0.5);
  
  // Create the "rays" effect radiating from mouse
  float rays = 1.0 - smoothstep(0.0, 0.3 + noise2 * 0.2, dist);
  
  // Combine background with aurora rays
  vec3 result = mix(color3, finalColor, rays * (noise2*0.5 + 0.8));
  
  // Fade out edges for soft look
  float alpha = rays * (0.8 + noise1 * 0.2);
  // Fade out severely if mouse hasn't moved yet (top left corner)
  if(uMouse.x < 10.0 && uMouse.y < 10.0) alpha = 0.0;

  gl_FragColor = vec4(result, alpha);
}
`;
// --- SHADER CODE ENDS ---

function FluidScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport, size } = useThree();

  // Initialize shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    []
  );

  // Track real mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Invert Y axis for Three.js coordinate system
      mouseRef.current.set(e.clientX, size.height - e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size.height]);

  // Update shader parameters on every frame
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      // Smoothly lerp current mouse position towards target position for fluid feel
      material.uniforms.uMouse.value.lerp(mouseRef.current, 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* A plane that covers the whole screen */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false} // Important: Don't block other 3D objects
        depthTest={false}
      />
    </mesh>
  );
}

export default function AuroraCursor() {
  return (
    // Changed mix-blend-screen to mix-blend-difference
    <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-difference">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ alpha: true, antialias: true }} // alpha: true is critical for transparency
      >
        <FluidScene />
      </Canvas>
    </div>
  );
}
