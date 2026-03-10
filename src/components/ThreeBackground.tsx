import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ color, size, speed, count }: { color: string, size: number, speed: number, count: number }) {
  const ref = useRef<THREE.Points>(null!);
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / (10 * speed);
      ref.current.rotation.y -= delta / (15 * speed);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <ParticleField color="#10b981" size={0.005} speed={1} count={3000} />
        <ParticleField color="#059669" size={0.008} speed={0.5} count={1500} />
        <ParticleField color="#ffffff" size={0.002} speed={2} count={1000} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
}
