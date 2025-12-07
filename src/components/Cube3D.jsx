import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Componente del cubo che usa le hook
function RotatingCube() {
  const texture = useLoader(THREE.TextureLoader, "/Empty_Project/images/me.jpeg");
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// Componente principale
export default function Cube3D() {
  return (
    <div style={{ height: "80vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[-2, 2, 2]} intensity={1} />
        <RotatingCube />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
