import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";

interface Scene3DProps {
  bgColor: string;
  characterColor: string;
  ambientIntensity: number;
  directionalIntensity: number;
  lightColor: string;
}

function Character({ color }: { color: string }) {
  return (
    <group position={[0, 0, 0]} castShadow>
      {/* Cabeza */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Cuerpo */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.15} />
      </mesh>
      {/* Brazos */}
      <mesh position={[-0.5, 0.85, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0.5, 0.85, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Piernas */}
      <mesh position={[-0.18, 0.05, 0]} castShadow>
        <capsuleGeometry args={[0.14, 0.5, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0.18, 0.05, 0]} castShadow>
        <capsuleGeometry args={[0.14, 0.5, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Ojos */}
      <mesh position={[-0.12, 1.6, 0.28]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[0.12, 1.6, 0.28]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </group>
  );
}

export function Scene3D({
  bgColor,
  characterColor,
  ambientIntensity,
  directionalIntensity,
  lightColor,
}: Scene3DProps) {
  return (
    <Canvas shadows camera={{ position: [3, 2.5, 4], fov: 50 }}>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 8, 20]} />

      <Suspense fallback={null}>
        <ambientLight intensity={ambientIntensity} color={lightColor} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={directionalIntensity}
          color={lightColor}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <pointLight position={[-3, 2, -2]} intensity={0.4} color={lightColor} />

        <Character color={characterColor} />

        {/* Suelo */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
        </mesh>

        <ContactShadows position={[0, -0.24, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />

        <OrbitControls enablePan={false} minDistance={3} maxDistance={10} target={[0, 0.8, 0]} />
      </Suspense>
    </Canvas>
  );
}
