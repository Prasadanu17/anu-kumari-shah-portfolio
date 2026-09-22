import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Neural Nodes & Latent Connections Manifold ─── */
function NeuralManifold({ scrollInfo, isMobile, prefersReducedMotion }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  // Deterministic node coordinates on a Fibonacci sphere surface
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes = [];
    const count = isMobile ? 26 : 38;
    const radius = 1.85;

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
    const distThreshold = isMobile ? 1.5 : 1.35;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < distThreshold) {
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
  }, [isMobile]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const progress = prefersReducedMotion ? 0 : scrollInfo.current.progress; // 0 to 1
    const scrollVelocity = prefersReducedMotion ? 0 : scrollInfo.current.velocity;

    // Base smooth continuous rotation
    const rotationSpeed = prefersReducedMotion ? 0.02 : 0.08;

    if (groupRef.current) {
      // Smooth lerped scroll rotation effect
      const targetRotY = t * rotationSpeed + progress * Math.PI * 0.45;
      const targetRotX = Math.sin(t * 0.15) * 0.1 + (progress - 0.5) * 0.2;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);

      // Section-aware subtle scale modulation
      // Projects section (~0.45 - 0.7 progress) brings manifold slightly more into focus
      let targetScale = isMobile ? 1.0 : 1.28;
      if (!isMobile && progress > 0.45 && progress < 0.7) {
        targetScale = 1.36; // Subtle focus shift during projects
      }

      // Smooth scale lerp
      const currentScale = groupRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.03);
      groupRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * (0.10 + scrollVelocity * 0.05);
      innerRef.current.rotation.z += delta * 0.05;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.09 + progress * 0.3;
      ring1Ref.current.rotation.y = t * 0.06 + progress * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.08 - progress * 0.25;
      ring2Ref.current.rotation.z = t * 0.1 - progress * 0.15;
    }
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0.5 : 1.2}
      rotationIntensity={prefersReducedMotion ? 0.05 : 0.2}
      floatIntensity={prefersReducedMotion ? 0.1 : 0.35}
    >
      <group ref={groupRef} scale={isMobile ? 1.0 : 1.28}>
        {/* Core Mathematical Kernel — Muted Dark Obsidian Emerald Wireframe */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.85, 2]} />
          <meshStandardMaterial
            color="#0b120f"
            roughness={0.3}
            metalness={0.85}
            wireframe={true}
          />
        </mesh>

        {/* Neural Synapse Nodes — Subtler Emerald #1e6f5c */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.04 : 0.048}
            color="#1e6f5c"
            transparent
            opacity={isMobile ? 0.5 : 0.65}
            sizeAttenuation
          />
        </points>

        {/* Synaptic Edge Matrix — Restrained Emerald Line Matrix */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#1e6f5c"
            transparent
            opacity={isMobile ? 0.12 : 0.18}
            linewidth={1}
          />
        </lineSegments>

        {/* Latent Coordinate Orbit Rings — Subtle Emerald & Muted Teal */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.4, 0.007, 16, 90]} />
          <meshBasicMaterial
            color="#28967d"
            transparent
            opacity={0.22}
          />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.75, 0.005, 16, 90]} />
          <meshBasicMaterial
            color="#13463a"
            transparent
            opacity={0.14}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Scroll-Responsive Parallax Camera Rig ─── */
function ParallaxCamera({ mouse, scrollInfo, isMobile, prefersReducedMotion }) {
  const { camera } = useThree();

  useFrame(() => {
    if (prefersReducedMotion) {
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 6.2;
      camera.lookAt(0, 0, 0);
      return;
    }

    const progress = scrollInfo.current.progress; // 0 to 1

    // Section-aware subtle camera offset targets:
    // Hero (0.0): Center
    // About (0.15): Slight horizontal camera shift left (-0.12)
    // Journey (0.3): Slight depth pull back (z: 6.4)
    // Skills (0.45): Center with subtle tilt
    // Projects (0.6): Move camera slightly closer (z: 5.9)
    // Contact (0.95): Subtle vertical camera shift down (-0.15)
    let targetX = mouse.current.x * (isMobile ? 0.15 : 0.35);
    let targetY = mouse.current.y * (isMobile ? 0.1 : 0.25);
    let targetZ = 6.2;

    if (!isMobile) {
      if (progress < 0.2) {
        targetX += (progress / 0.2) * -0.12;
      } else if (progress < 0.4) {
        targetZ = 6.2 + ((progress - 0.2) / 0.2) * 0.25;
      } else if (progress < 0.7) {
        targetZ = 6.2 - ((progress - 0.4) / 0.3) * 0.3; // Bring into focus for projects
      } else {
        targetY += ((progress - 0.7) / 0.3) * -0.15;
      }
    }

    // Silky smooth lerped camera interpolation
    camera.position.x += (targetX - camera.position.x) * 0.035;
    camera.position.y += (targetY - camera.position.y) * 0.035;
    camera.position.z += (targetZ - camera.position.z) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Exported 3D Scene ─── */
export default function Hero3DCanvas() {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollInfo = useRef({ progress: 0, velocity: 0, lastScrollY: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check mobile viewport & reduced motion preferences
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Pointer move listener
    const handlePointerMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Scroll listener with smoothed scroll velocity calculation
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const currentProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
          
          const deltaY = Math.abs(scrollY - scrollInfo.current.lastScrollY);
          scrollInfo.current.velocity = Math.min(2.0, deltaY * 0.02);
          scrollInfo.current.progress = currentProgress;
          scrollInfo.current.lastScrollY = scrollY;

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 ${isMobile ? 'opacity-45' : 'opacity-60'}`}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Soft, restrained lighting focused on emerald visual brand identity */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[8, 8, 5]} intensity={0.9} color="#f4f5f4" />
        <pointLight position={[-6, -6, -4]} intensity={0.6} color="#1e6f5c" />
        <pointLight position={[6, -4, 4]} intensity={0.4} color="#28967d" />

        <ParallaxCamera
          mouse={mouse}
          scrollInfo={scrollInfo}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
        <NeuralManifold
          scrollInfo={scrollInfo}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}
