import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sphere, Box, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

interface Project3DViewerProps {
  projectId: string;
  isDevilMode: boolean;
}

function Shape({ projectId, isDevilMode }: { projectId: string; isDevilMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const materialColor = isDevilMode ? "#ef4444" : "#dfba44";

  // Render different shapes based on the project id
  switch (projectId) {
    case "nexus-aware":
      return (
        <Sphere args={[1.5, 64, 64]} ref={meshRef}>
          <meshStandardMaterial color={materialColor} wireframe />
        </Sphere>
      );
    case "anti-censorship":
      return (
        <Octahedron args={[1.5, 0]} ref={meshRef}>
          <meshStandardMaterial color={materialColor} wireframe />
        </Octahedron>
      );
    case "manifesto-nexus":
      return (
        <Box args={[1.5, 1.5, 1.5]} ref={meshRef}>
          <meshStandardMaterial color={materialColor} wireframe />
        </Box>
      );
    case "farm2fork-nodes":
      return (
        <Torus args={[1.2, 0.4, 30, 30]} ref={meshRef}>
          <meshStandardMaterial color={materialColor} wireframe />
        </Torus>
      );
    default:
      return (
        <Sphere args={[1.2, 32, 32]} ref={meshRef}>
          <meshStandardMaterial color={materialColor} wireframe={false} />
        </Sphere>
      );
  }
}

export default function Project3DViewer({ projectId, isDevilMode }: Project3DViewerProps) {
  return (
    <div className="w-full h-full min-h-[150px] relative rounded-lg overflow-hidden bg-black/60 border border-white/10 shadow-inner">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Shape projectId={projectId} isDevilMode={isDevilMode} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} autoRotate={true} autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
