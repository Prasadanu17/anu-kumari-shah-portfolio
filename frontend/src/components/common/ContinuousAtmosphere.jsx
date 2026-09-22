import React from 'react';
import Hero3DCanvas from '../Hero3DCanvas';

/* ─── Master Continuous Atmosphere Component ─── */
export default function ContinuousAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Canvas Canvas World */}
      <Hero3DCanvas />

      {/* Atmospheric Ambient Lighting Gradients — Emerald Brand Colors (#1e6f5c) */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(30, 111, 92, 0.22) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[40%] right-[10%] w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-12"
        style={{ background: 'radial-gradient(circle, rgba(40, 150, 125, 0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[10%] left-[15%] w-[650px] h-[650px] rounded-full blur-[150px] pointer-events-none opacity-12"
        style={{ background: 'radial-gradient(circle, rgba(13, 19, 16, 0.25) 0%, transparent 70%)' }}
      />

      {/* Subtle Dot Grid Matrix */}
      <div className="absolute inset-0 dot-grid-bg opacity-20" />
    </div>
  );
}
