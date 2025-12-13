"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Center } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ProjectBox({ position, color, title }: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} ref={mesh}>
        <boxGeometry args={[3, 2, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        <Center>
          <Text3D
            position={[0, 0, 0.26]}
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.3}
            height={0.1}
          >
            {title}
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    // Changed bg-black to bg-transparent
    <div className="h-full w-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <ProjectBox position={[-4, 2, 0]} color="#6366f1" title="Web" />
        <ProjectBox position={[4, -2, 0]} color="#ec4899" title="Mobile" />
        <ProjectBox position={[0, 3, -2]} color="#10b981" title="Design" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
