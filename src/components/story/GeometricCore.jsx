import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GeometricCore = ({ scrollProgress = 0, currentChapter = 0 }) => {
  const outerRef = useRef();
  const innerRef = useRef();
  const wireframeRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.15 + scrollProgress * Math.PI;
      outerRef.current.rotation.y = t * 0.2 + scrollProgress * Math.PI * 0.5;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.2;
      innerRef.current.rotation.z = t * 0.1;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.1;
    }
  });

  // Calculate dynamic colors based on active chapter
  const getChapterColors = (chapter) => {
    switch (chapter) {
      case 0: // CURIOUS
        return { primary: '#6366f1', wire: '#8b5cf6', distort: 0.2 };
      case 1: // LEARN
        return { primary: '#4f46e5', wire: '#63D8B5', distort: 0.15 };
      case 2: // BUILD
        return { primary: '#1E6F5C', wire: '#63D8B5', distort: 0.25 };
      case 3: // DISCOVER
        return { primary: '#059669', wire: '#6366f1', distort: 0.35 };
      case 4: // CREATE
        return { primary: '#8b5cf6', wire: '#63D8B5', distort: 0.4 };
      case 5: // RESEARCH
        return { primary: '#63D8B5', wire: '#6366f1', distort: 0.5 };
      case 6: // EVOLVE
        return { primary: '#10b981', wire: '#8b5cf6', distort: 0.3 };
      case 7: // NEXT
        return { primary: '#6366f1', wire: '#63D8B5', distort: 0.2 };
      default: // MEET ANU
        return { primary: '#63D8B5', wire: '#6366f1', distort: 0.15 };
    }
  };

  const activeColors = getChapterColors(currentChapter);

  return (
    <group position={[0, 0, -2]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Outer Crystalline / Distorted Mesh */}
        <mesh ref={outerRef} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color={activeColors.primary}
            roughness={0.2}
            metalness={0.8}
            distort={activeColors.distort}
            speed={2}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Wireframe Shell */}
        <mesh ref={wireframeRef} scale={2.1}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={activeColors.wire}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerRef} scale={0.75}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#63D8B5"
            emissive="#1E6F5C"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
};

export default GeometricCore;
