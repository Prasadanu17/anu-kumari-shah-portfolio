import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import ParticleUniverse from './ParticleUniverse';
import GeometricCore from './GeometricCore';
import NeuralNetwork3D from './NeuralNetwork3D';

const StoryCanvas = ({ scrollProgress = 0, currentChapter = 0 }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show Neural network in AI & Research chapters (3 to 6)
  const isNeuralActive = currentChapter >= 3 && currentChapter <= 6;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050608]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
      >
        {/* Volumetric / Ambient Fog & Lighting */}
        <color attach="background" args={['#050608']} />
        <fog attach="fog" args={['#050608', 6, 25]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#6366f1" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#63D8B5" />
        <spotLight position={[0, 15, 10]} angle={0.4} penumbra={1} intensity={1.5} color="#8b5cf6" />

        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} />
          <ParticleUniverse count={isMobile ? 250 : 700} scrollProgress={scrollProgress} />
          <GeometricCore scrollProgress={scrollProgress} currentChapter={currentChapter} />
          <NeuralNetwork3D active={isNeuralActive} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StoryCanvas;
