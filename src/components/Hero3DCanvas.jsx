import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Particle Field ─── */
function ParticleField() {
  const pointsRef = useRef();
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.015) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#2A2825"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Rotating 3D Shape ─── */
function RotatingShape() {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.1;
      wireframeRef.current.rotation.y = -time * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group scale={1.8}>
        {/* Inner Distorted Core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 4]} />
          <MeshDistortMaterial
            color="#2A2825"
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            wireframe={false}
          />
        </mesh>

        {/* Outer Geodesic Wireframe Ring */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.6, 2]} />
          <meshBasicMaterial
            color="#4A4641"
            wireframe={true}
            transparent={true}
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Mouse Parallax Camera Rig ─── */
function CameraRig({ mouse }) {
  const { camera } = useThree();

  useFrame(() => {
    // Gently move camera toward mouse position — subtle parallax
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Canvas Export ─── */
export default function Hero3DCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FAF8F5" />

        <CameraRig mouse={mouse} />
        <ParticleField />
        <RotatingShape />
      </Canvas>
    </div>
  );
}
