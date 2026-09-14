import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CameraController = ({ scrollProgress = 0 }) => {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Define 3D Camera Keyframes corresponding to scroll progress (0.0 to 1.0)
  const keyframes = [
    { pos: [0, 0, 8], target: [0, 0, 0] },          // 01 CURIOUS
    { pos: [2.8, 1.2, 7.2], target: [-0.6, 0, 0] },  // 02 LEARN
    { pos: [-3.0, -0.8, 6.8], target: [0.8, 0, 0] }, // 03 BUILD
    { pos: [0, -1.8, 7.5], target: [0, 0.4, 0] },    // 04 DISCOVER
    { pos: [3.2, 0.6, 6.2], target: [-1.0, 0, 0] },  // 05 CREATE
    { pos: [-3.6, 1.4, 5.8], target: [0.5, -0.4, 0] },// 06 RESEARCH
    { pos: [2.2, -1.6, 6.5], target: [-0.5, 0, 0] }, // 07 EVOLVE
    { pos: [0, 2.2, 7.2], target: [0, -0.6, 0] },    // 08 NEXT
    { pos: [0, 0, 6.2], target: [0, 0, 0] },         // MEET ANU
  ];

  useFrame((state, delta) => {
    // Map scrollProgress (0..1) into keyframe index
    const totalSegments = keyframes.length - 1;
    const progressClamped = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const scaledProgress = progressClamped * totalSegments;
    const index = Math.floor(scaledProgress);
    const fraction = scaledProgress - index;

    const currentKF = keyframes[Math.min(index, totalSegments)];
    const nextKF = keyframes[Math.min(index + 1, totalSegments)];

    // Interpolate camera position
    const targetX = THREE.MathUtils.lerp(currentKF.pos[0], nextKF.pos[0], fraction);
    const targetY = THREE.MathUtils.lerp(currentKF.pos[1], nextKF.pos[1], fraction);
    const targetZ = THREE.MathUtils.lerp(currentKF.pos[2], nextKF.pos[2], fraction);

    // Interpolate camera target (lookAt)
    const lookX = THREE.MathUtils.lerp(currentKF.target[0], nextKF.target[0], fraction);
    const lookY = THREE.MathUtils.lerp(currentKF.target[1], nextKF.target[1], fraction);
    const lookZ = THREE.MathUtils.lerp(currentKF.target[2], nextKF.target[2], fraction);

    // Smooth lerp camera position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3, delta);

    // Smooth lerp lookAt target
    currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, lookX, 3, delta);
    currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, lookY, 3, delta);
    currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, lookZ, 3, delta);

    camera.lookAt(currentTarget.current);
  });

  return null;
};

export default CameraController;
