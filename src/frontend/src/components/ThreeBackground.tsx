import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

function AnimatedParticles({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 500 : 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const t = Math.random();
      colors[i * 3] = t * 0.5 + 0.5;
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 1;
    }

    return { positions, colors };
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GeometricShapes({ isMobile }: { isMobile: boolean }) {
  const torusRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (octahedronRef.current) {
      octahedronRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      octahedronRef.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const torusSegments = isMobile ? 8 : 16;
  const torusRadialSegments = isMobile ? 50 : 100;

  return (
    <>
      <mesh ref={torusRef} position={[-10, 5, -20]}>
        <torusGeometry args={[3, 0.5, torusSegments, torusRadialSegments]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      <mesh ref={octahedronRef} position={[10, -5, -20]}>
        <octahedronGeometry args={[4, 0]} />
        <meshStandardMaterial
          color="#9333ea"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      <mesh ref={boxRef} position={[0, 0, -15]} rotation={[0.3, 0.4, 0]}>
        <boxGeometry args={[6, 6, 0.3]} />
        <meshStandardMaterial
          color="#0f0f0f"
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}

export function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <AnimatedParticles isMobile={isMobile} />
        <GeometricShapes isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
