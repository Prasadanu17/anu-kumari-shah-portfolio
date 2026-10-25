import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

import HomeStory from './story/HomeStory';
import AboutStory from './story/AboutStory';
import JourneyStory from './story/JourneyStory';
import SkillsStory from './story/SkillsStory';
import ProjectsStory from './story/ProjectsStory';
import ExperienceStory from './story/ExperienceStory';
import CertificationsStory from './story/CertificationsStory';
import AchievementsStory from './story/AchievementsStory';
import ResumeSection from './story/ResumeSection';
import ContactStory from './story/ContactStory';
import Footer from './Footer';

/* ==========================================================================
   STORYTELLER CHAPTER DEFINITIONS
   ========================================================================== */
const CHAPTERS = [
  { id: 'home', number: '01', title: 'HOME', label: 'Introduction', Component: HomeStory },
  { id: 'about', number: '02', title: 'ABOUT', label: 'Background', Component: AboutStory },
  { id: 'journey', number: '03', title: 'JOURNEY', label: 'Milestones', Component: JourneyStory },
  { id: 'skills', number: '04', title: 'SKILLS', label: 'Tech Stack', Component: SkillsStory },
  { id: 'projects', number: '05', title: 'PROJECTS', label: 'Selected Work', Component: ProjectsStory },
  { id: 'experience', number: '06', title: 'EXPERIENCE', label: 'Career & Work', Component: ExperienceStory },
  { id: 'certifications', number: '07', title: 'CERTIFICATIONS', label: 'Credentials', Component: CertificationsStory },
  { id: 'achievements', number: '08', title: 'ACHIEVEMENTS', label: 'Honors & Wins', Component: AchievementsStory },
  { id: 'resume', number: '09', title: 'RESUME', label: 'CV Overview', Component: ResumeSection },
  { id: 'contact', number: '10', title: 'CONTACT', label: 'Connect & Hire', Component: ContactStory },
];

const StoryStage = () => {
  const { activeSection, setActiveSection } = usePortfolio();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const lastScrollTimeRef = useRef(0);
  const contentScrollRef = useRef(null);
  const touchStartY = useRef(0);

  // Sync with context activeSection
  useEffect(() => {
    const idx = CHAPTERS.findIndex((c) => c.id === activeSection);
    if (idx !== -1 && idx !== currentChapterIndex) {
      setDirection(idx > currentChapterIndex ? 1 : -1);
      setCurrentChapterIndex(idx);
    }
  }, [activeSection]);

  // Read initial hash on mount
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const idx = CHAPTERS.findIndex((c) => c.id === hashId);
      if (idx !== -1) {
        setCurrentChapterIndex(idx);
        setActiveSection(hashId);
      }
    }
  }, []);

  // Hide scroll hint after user starts navigating
  useEffect(() => {
    if (currentChapterIndex > 0) {
      setShowScrollHint(false);
    }
  }, [currentChapterIndex]);

  const goToChapter = (newIndex) => {
    if (newIndex < 0 || newIndex >= CHAPTERS.length || newIndex === currentChapterIndex) return;
    const isForward = newIndex > currentChapterIndex;
    setDirection(isForward ? 1 : -1);
    setCurrentChapterIndex(newIndex);
    const targetId = CHAPTERS[newIndex].id;
    setActiveSection(targetId);
    window.history.replaceState(null, '', `#${targetId}`);

    // Set scroll position cleanly on chapter switch
    if (contentScrollRef.current) {
      if (isForward) {
        contentScrollRef.current.scrollTop = 0;
      } else {
        // If returning backwards to a section with overflow, start near bottom so user scrolls up
        requestAnimationFrame(() => {
          if (contentScrollRef.current) {
            const max = contentScrollRef.current.scrollHeight - contentScrollRef.current.clientHeight;
            contentScrollRef.current.scrollTop = max > 50 ? max - 20 : 0;
          }
        });
      }
    }
  };

  // Robust wheel handler: allows native smooth scrolling of inner content, then advances chapters at bounds
  useEffect(() => {
    let accumulatedDelta = 0;
    let edgeResetTimeout = null;

    const handleWheel = (e) => {
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 33;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      // Filter tiny jitter
      if (Math.abs(delta) < 8) return;

      const el = contentScrollRef.current;
      const maxScroll = el ? el.scrollHeight - el.clientHeight : 0;
      const hasOverflow = maxScroll > 30;

      const isAtBottom = !hasOverflow || (el ? el.scrollTop >= maxScroll - 12 : true);
      const isAtTop = !hasOverflow || (el ? el.scrollTop <= 12 : true);

      const now = Date.now();
      if (now - lastScrollTimeRef.current < 500) return;

      if (delta > 0 && isAtBottom && currentChapterIndex < CHAPTERS.length - 1) {
        accumulatedDelta += delta;
        clearTimeout(edgeResetTimeout);
        edgeResetTimeout = setTimeout(() => { accumulatedDelta = 0; }, 250);

        if (accumulatedDelta > 45) {
          accumulatedDelta = 0;
          lastScrollTimeRef.current = now;
          goToChapter(currentChapterIndex + 1);
        }
      } else if (delta < 0 && isAtTop && currentChapterIndex > 0) {
        accumulatedDelta += delta;
        clearTimeout(edgeResetTimeout);
        edgeResetTimeout = setTimeout(() => { accumulatedDelta = 0; }, 250);

        if (accumulatedDelta < -45) {
          accumulatedDelta = 0;
          lastScrollTimeRef.current = now;
          goToChapter(currentChapterIndex - 1);
        }
      } else {
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(edgeResetTimeout);
    };
  }, [currentChapterIndex]);

  // Touch swipe handler with high intent threshold so user can scroll content inside
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 500) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // Intentional swipe threshold
    if (Math.abs(diff) < 65) return;

    const el = contentScrollRef.current;
    const maxScroll = el ? el.scrollHeight - el.clientHeight : 0;
    const hasOverflow = maxScroll > 30;

    const isAtBottom = !hasOverflow || (el ? el.scrollTop >= maxScroll - 20 : true);
    const isAtTop = !hasOverflow || (el ? el.scrollTop <= 20 : true);

    if (diff > 0 && isAtBottom && currentChapterIndex < CHAPTERS.length - 1) {
      lastScrollTimeRef.current = now;
      goToChapter(currentChapterIndex + 1);
    } else if (diff < 0 && isAtTop && currentChapterIndex > 0) {
      lastScrollTimeRef.current = now;
      goToChapter(currentChapterIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const el = contentScrollRef.current;
      const maxScroll = el ? el.scrollHeight - el.clientHeight : 0;
      const hasOverflow = maxScroll > 50;
      const isAtBottom = !hasOverflow || (el ? el.scrollTop >= maxScroll - 40 : true);
      const isAtTop = !hasOverflow || (el ? el.scrollTop <= 40 : true);

      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        if (isAtBottom && currentChapterIndex < CHAPTERS.length - 1) {
          e.preventDefault();
          goToChapter(currentChapterIndex + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (isAtTop && currentChapterIndex > 0) {
          e.preventDefault();
          goToChapter(currentChapterIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIndex]);

  // Intercept anchor clicks
  useEffect(() => {
    const handleAnchor = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const targetId = hash.replace('#', '');
      const idx = CHAPTERS.findIndex((c) => c.id === targetId);
      if (idx !== -1) {
        e.preventDefault();
        goToChapter(idx);
      }
    };

    document.addEventListener('click', handleAnchor);
    return () => document.removeEventListener('click', handleAnchor);
  }, [currentChapterIndex]);

  const currentChapter = CHAPTERS[currentChapterIndex];
  const CurrentComponent = currentChapter.Component;

  // Cinematic Storytelling Slide Animation Variants (Fast, silky-smooth & GPU friendly)
  const storyVariants = {
    enter: (dir) => ({
      opacity: 0,
      y: dir > 0 ? 30 : -30,
      scale: 0.99,
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1], // easeOutCubic
      },
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir > 0 ? -30 : 30,
      scale: 0.99,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div
      id="story-scroll-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] overflow-hidden text-[#F4F5F4] flex flex-col justify-between"
    >

      {/* =========================================================================
          MAIN STAGE VIEWPORT (Full Screen, Cinematic Presentation)
          ========================================================================= */}
      <div
        ref={contentScrollRef}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        className="relative flex-1 w-full overflow-y-auto overflow-x-hidden pt-12 sm:pt-16 pb-16 md:pb-4 scroll-smooth"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentChapter.id}
            custom={direction}
            variants={storyVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-full flex flex-col justify-start py-2 sm:py-4 my-auto"
          >
            <CurrentComponent
              onNextChapter={() => goToChapter(currentChapterIndex + 1)}
              onPrevChapter={() => goToChapter(currentChapterIndex - 1)}
            />
          </motion.div>
        </AnimatePresence>
      </div>



      {/* =========================================================================
          MOBILE BOTTOM HUD (Story progress pill on small screens)
          ========================================================================= */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center gap-3 bg-[#171717]/90 border border-[#8E8170]/30 px-4 py-2 rounded-full backdrop-blur-md shadow-2xl">
        <button
          onClick={() => goToChapter(currentChapterIndex - 1)}
          disabled={currentChapterIndex === 0}
          className={`p-1 text-[#C8B99F] ${currentChapterIndex === 0 ? 'opacity-20' : 'hover:text-[#EAD9B8]'}`}
          aria-label="Previous Section"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <span className="text-[10px] font-mono text-[#EAD9B8] tracking-widest font-bold">
          {currentChapter.number} / 10 • {currentChapter.title}
        </span>

        <button
          onClick={() => goToChapter(currentChapterIndex + 1)}
          disabled={currentChapterIndex === CHAPTERS.length - 1}
          className={`p-1 text-[#C8B99F] ${currentChapterIndex === CHAPTERS.length - 1 ? 'opacity-20' : 'hover:text-[#EAD9B8]'}`}
          aria-label="Next Section"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          SCROLL HINT (Subtle animated indicator on intro)
          ========================================================================= */}
      <AnimatePresence>
        {showScrollHint && currentChapterIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1 pointer-events-none"
          >
            <span className="text-[8.5px] font-mono text-[#C8B99F] tracking-[0.25em] uppercase">
              SCROLL TO ADVANCE STORY
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#10b981]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryStage;
