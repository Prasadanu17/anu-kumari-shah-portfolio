import React from 'react';
import CustomCursor from '../components/common/CustomCursor';
import Hero3DCanvas from '../components/Hero3DCanvas';
import Navbar from '../components/Navbar';
import StoryStage from '../components/StoryStage';
import Footer from '../components/Footer';
import BackToTop from '../components/common/BackToTop';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#07080B] text-[#F4F4F6] relative overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#07080B]">

      {/* ── PERSISTENT 3D BACKGROUND ──────────────────────────────────────
          Mounted once at page level. Fixed to the viewport.
          Never re-mounts or resets between sections.
          Hero3DCanvas remains untouched as visual foundation.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <Hero3DCanvas />
      </div>

      {/* ── INTERACTIVE OVERLAY & NAVIGATION ── */}
      <CustomCursor />
      <Navbar />

      {/* ── PINNED SCROLL STORYTELLER STAGE ── */}
      <main className="relative z-10">
        <StoryStage />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default HomePage;
