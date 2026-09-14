import React from 'react';
import CustomCursor from '../components/common/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Playground from '../components/Playground';
import Experience from '../components/Experience';
import Research from '../components/Research';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/common/BackToTop';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#E6E2DD] text-[#2A2825] transition-colors duration-300 overflow-x-hidden selection:bg-[#2A2825] selection:text-[#FAF8F5]">
      <CustomCursor />
      <Navbar />
      <main>
        {/* 01 — Hero / Intro (stats embedded at bottom row) */}
        <Hero />

        {/* 02 — About / Focus */}
        <About />

        {/* 03 — Selected Work */}
        <FeaturedProjects />

        {/* 04 — Technical Skills */}
        <Skills />

        {/* 05 — Playground (Physics Drag) */}
        <Playground />

        {/* 06 — Experience */}
        <Experience />

        {/* 07 — Research */}
        <Research />

        {/* Achievements & Certifications */}
        <Achievements />
        <Certifications />

        {/* 08 — Let's Talk */}
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default HomePage;
