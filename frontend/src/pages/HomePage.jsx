import React from 'react';
import CustomCursor from '../components/common/CustomCursor';
import Navbar from '../components/Navbar';
import StoryStage from '../components/StoryStage';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#171717] text-[#F5EBDD] relative overflow-x-hidden selection:bg-[#EAD9B8] selection:text-[#171717]">

      {/* ── INTERACTIVE OVERLAY & NAVIGATION ── */}
      <CustomCursor />
      <Navbar />

      {/* ── PINNED SCROLL STORYTELLER STAGE ── */}
      <main className="relative z-10 w-full h-screen overflow-hidden">
        <StoryStage />
      </main>
    </div>
  );
};

export default HomePage;
