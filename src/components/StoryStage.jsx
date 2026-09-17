import React from 'react';
import { useScroll, useReducedMotion } from 'framer-motion';

import HomeStory from './story/HomeStory';
import AboutStory from './story/AboutStory';
import ExperienceStory from './story/ExperienceStory';
import SkillsStory from './story/SkillsStory';
import ProjectsStory from './story/ProjectsStory';
import ContactStory from './story/ContactStory';

const StoryStage = () => {
  const shouldReduceMotion = useReducedMotion();

  // Master window-level scroll progress — 100% synchronized with document scrolling and Lenis
  const { scrollYProgress } = useScroll();

  return (
    <div
      id="story-scroll-container"
      className="relative w-full h-[750vh] bg-transparent text-[#F4F4F6]"
    >
      {/* ── Native Hash Anchor Target Elements ──
          Positioned at exact scroll percentage heights corresponding to each chapter's active center.
          Clicking nav links (#about, #projects etc.) scrolls precisely into that chapter's peak active state!
      ── */}
      <div id="home" className="absolute top-[0%] left-0 w-full h-[5vh] pointer-events-none" />
      <div id="about" className="absolute top-[20%] left-0 w-full h-[5vh] pointer-events-none" />
      <div id="experience" className="absolute top-[38%] left-0 w-full h-[5vh] pointer-events-none" />
      <div id="skills" className="absolute top-[58%] left-0 w-full h-[5vh] pointer-events-none" />
      <div id="projects" className="absolute top-[74%] left-0 w-full h-[5vh] pointer-events-none" />
      <div id="contact" className="absolute top-[92%] left-0 w-full h-[5vh] pointer-events-none" />

      {/* ── PINNED STORY STAGE ──
          Stays sticky in the viewport while the user scrolls through the 750vh timeline.
      ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        {/* Stage Viewport Box */}
        <div className="relative w-full h-full story-container mx-auto pointer-events-auto">
          <HomeStory scrollProgress={scrollYProgress} isReducedMotion={shouldReduceMotion} />
          <AboutStory scrollProgress={scrollYProgress} isReducedMotion={shouldReduceMotion} />
          <ExperienceStory scrollProgress={scrollYProgress} isReducedMotion={shouldReduceMotion} />
          <SkillsStory scrollProgress={scrollYProgress} isReducedMotion={shouldReduceMotion} />
          <ProjectsStory scrollProgress={scrollYProgress} isReducedMotion={shouldReduceMotion} />
          <ContactStory scrollProgress={scrollYProgress} isReducedMotion={shouldReduceMotion} />
        </div>
      </div>
    </div>
  );
};

export default StoryStage;
