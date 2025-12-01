import { type JSX, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { type Mesh } from "three";

export default function LoadingFallback(): JSX.Element {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current !== null) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial wireframe color="#4F46E5" />
    </mesh>
  );
}
