import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ color, size, speed, count, radius = 2.5 }: { color: string, size: number, speed: number, count: number, radius?: number }) {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.8 + Math.random() * 0.4);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.05 * speed;
      ref.current.rotation.y += delta * 0.075 * speed;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ParticleField color="#3b82f6" size={0.008} speed={0.8} count={2000} radius={3} />
          <ParticleField color="#60a5fa" size={0.012} speed={0.4} count={1000} radius={2.5} />
          <ParticleField color="#ffffff" size={0.004} speed={1.2} count={800} radius={3.5} />
        </Float>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
    </div>
  );
}
