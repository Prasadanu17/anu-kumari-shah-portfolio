import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Neural Nodes & Latent Manifold ─── */
function NeuralManifold({ scrollRef }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes = [];
    const count = 38;
    const radius = 1.95;

    // Fibonacci sphere distribution for uniform manifold surface
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      nodes.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }

    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 1.38) {
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
    const scrollY = scrollRef.current || 0;

    if (groupRef.current) {
      // Rotation combines time delta with subtle scroll rotation
      groupRef.current.rotation.y = t * 0.08 + scrollY * 0.0004;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.12 + scrollY * 0.0002;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.14;
      innerRef.current.rotation.z += delta * 0.06;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.12;
      ring1Ref.current.rotation.y = t * 0.08 + scrollY * 0.0003;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.1;
      ring2Ref.current.rotation.z = t * 0.14 - scrollY * 0.0002;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.35}>
        {/* Core Mathematical Kernel */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.85, 2]} />
          <meshStandardMaterial
            color="#0E121B"
            roughness={0.25}
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
            size={0.06}
            color="#38BDF8"
            transparent
            opacity={0.85}
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
            opacity={0.18}
            linewidth={1}
          />
        </lineSegments>

        {/* Latent Coordinate Orbit Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.4, 0.007, 16, 80]} />
          <meshBasicMaterial
            color="#818CF8"
            transparent
            opacity={0.2}
          />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.7, 0.005, 16, 80]} />
          <meshBasicMaterial
            color="#34D399"
            transparent
            opacity={0.14}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Smooth Parallax Camera Rig ─── */
function ParallaxCamera({ mouse, scrollRef }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.25 - (scrollRef.current || 0) * 0.0003;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Master Continuous Atmosphere Component ─── */
export default function ContinuousAtmosphere() {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Canvas Canvas World */}
      <div className="absolute inset-0 opacity-55">
        <Canvas
          camera={{ position: [0, 0, 6.4], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 8, 5]} intensity={1.2} color="#F4F4F6" />
          <pointLight position={[-6, -6, -4]} intensity={0.7} color="#38BDF8" />
          <pointLight position={[6, -4, 4]} intensity={0.5} color="#34D399" />

          <ParallaxCamera mouse={mouse} scrollRef={scrollRef} />
          <NeuralManifold scrollRef={scrollRef} />
        </Canvas>
      </div>

      {/* Atmospheric Ambient Lighting Gradients */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[40%] right-[10%] w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(129, 140, 248, 0.2) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[10%] left-[15%] w-[650px] h-[650px] rounded-full blur-[150px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)' }}
      />

      {/* Subtle Dot Grid Matrix */}
      <div className="absolute inset-0 dot-grid-bg opacity-30" />
    </div>
  );
}
