import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Neural Nodes & Latent Connections ─── */
function NeuralManifold() {
  const groupRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  // Deterministic node coordinates on a geometric manifold
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes = [];
    const count = 42;
    const radius = 1.9;

    // Fibonacci sphere distribution for uniform manifold surface
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      nodes.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }

    // Build connections between nearest neighbor nodes
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 1.35) {
          lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
          lines.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const posArray = new Float32Array(nodes.length * 3);
    nodes.forEach((n, idx) => {
      posArray[idx * 3] = n.x;
      posArray[idx * 3 + 1] = n.y;
      posArray[idx * 3 + 2] = n.z;
    });

    return {
      nodePositions: posArray,
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.18;
      innerRef.current.rotation.z += delta * 0.08;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.15;
      ring1Ref.current.rotation.y = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.12;
      ring2Ref.current.rotation.z = t * 0.18;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.4}>
        {/* Core Mathematical Kernel */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.9, 2]} />
          <meshStandardMaterial
            color="#0E121B"
            roughness={0.2}
            metalness={0.9}
            wireframe={true}
          />
        </mesh>

        {/* Neural Synapse Nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            color="#38BDF8"
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </points>

        {/* Synaptic Edge Matrix */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.22}
            linewidth={1}
          />
        </lineSegments>

        {/* Latent Dimension Coordinate Orbit Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.5, 0.008, 16, 100]} />
          <meshBasicMaterial
            color="#818CF8"
            transparent
            opacity={0.25}
          />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.8, 0.006, 16, 100]} />
          <meshBasicMaterial
            color="#34D399"
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Subtle Parallax Rig ─── */
function ParallaxCamera({ mouse }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = mouse.current.x * 0.6;
    const targetY = mouse.current.y * 0.4;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Exported 3D Scene ─── */
export default function Hero3DCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[8, 8, 5]} intensity={1.5} color="#F4F4F6" />
        <pointLight position={[-6, -6, -4]} intensity={0.8} color="#38BDF8" />
        <pointLight position={[6, -4, 4]} intensity={0.6} color="#34D399" />

        <ParallaxCamera mouse={mouse} />
        <NeuralManifold />
      </Canvas>
    </div>
  );
}

