import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralNetwork3D = ({ active = false }) => {
  const groupRef = useRef();

  const nodeCount = 35;
  const [nodes, lineGeometry] = useMemo(() => {
    const nodeArray = [];
    for (let i = 0; i < nodeCount; i++) {
      nodeArray.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12
        )
      );
    }

    const linePositions = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodeArray[i].distanceTo(nodeArray[j]);
        if (dist < 5.5) {
          linePositions.push(nodeArray[i].x, nodeArray[i].y, nodeArray[i].z);
          linePositions.push(nodeArray[j].x, nodeArray[j].y, nodeArray[j].z);
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    return [nodeArray, geom];
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={[0, -1, -3]}>
      {/* Node Spheres */}
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial
            color={idx % 3 === 0 ? '#63D8B5' : '#6366f1'}
          />
        </mesh>
      ))}

      {/* Connecting Network Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

export default NeuralNetwork3D;
