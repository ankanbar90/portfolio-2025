"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function SanityCheck() {
  return (
    // FORCE height with inline style to bypass Tailwind issues
    <div style={{ height: "100vh", width: "100vw", background: "black" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* A simple spinning box */}
        <mesh rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="red" />
        </mesh>

        <OrbitControls />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          zIndex: 10,
        }}
      >
        <h1>If you see a red box, 3D is working!</h1>
      </div>
    </div>
  );
}
