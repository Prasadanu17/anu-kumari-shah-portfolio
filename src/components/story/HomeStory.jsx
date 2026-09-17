import React from 'react';
import { motion, useTransform } from 'framer-motion';

const HomeStory = ({ scrollProgress, isReducedMotion }) => {
  // Master container exit opacity & blur: fully active at 0.00 to 0.10, exits smoothly by 0.18
  const opacity = useTransform(scrollProgress, [0, 0.10, 0.18], [1, 1, 0]);
  const blur = useTransform(scrollProgress, [0, 0.10, 0.18], ['blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Multi-layered depth parallax for elements (WORLD STAYS, STORY MOVES WITH DEPTH)
  const eyebrowY  = useTransform(scrollProgress, [0, 0.10, 0.18], [0, 0, -50]);
  const headlineY = useTransform(scrollProgress, [0, 0.10, 0.18], [0, 0, -100]);
  const headlineScale = useTransform(scrollProgress, [0, 0.10, 0.18], [1, 1, 1.05]);
  const descY     = useTransform(scrollProgress, [0, 0.10, 0.18], [0, 0, -70]);
  const ctaY      = useTransform(scrollProgress, [0, 0.10, 0.18], [0, 0, -40]);

  // Pointer events: active when visible
  const pointerEvents = useTransform(scrollProgress, (p) => (p <= 0.16 ? 'auto' : 'none'));

  return (
    <motion.div
      style={{
        opacity,
        filter: isReducedMotion ? 'none' : blur,
        pointerEvents,
      }}
      className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10"
    >
      <div className="max-w-3xl space-y-6 sm:space-y-8">

        {/* Small eyebrow label */}
        <motion.p
          style={{ y: isReducedMotion ? 0 : eyebrowY }}
          className="text-[11px] sm:text-xs font-mono text-[#8E95A5] tracking-[0.3em] uppercase"
        >
          AI / ML ENGINEER · FULL-STACK DEVELOPER
        </motion.p>

        {/* Main headline */}
        <motion.h1
          style={{
            y: isReducedMotion ? 0 : headlineY,
            scale: isReducedMotion ? 1 : headlineScale,
          }}
          className="font-display font-extrabold text-[#F4F4F6] leading-[0.92] tracking-tighter text-[clamp(3.2rem,8.5vw,7.5rem)] origin-left"
        >
          BUILDING<br />
          INTELLIGENT<br />
          SYSTEMS.
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          style={{ y: isReducedMotion ? 0 : descY }}
          className="text-[#8E95A5] text-base sm:text-lg leading-relaxed font-light max-w-lg"
        >
          I build AI-powered products, computer vision systems, and modern full-stack applications that turn complex ideas into useful experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ y: isReducedMotion ? 0 : ctaY }}
          className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2"
        >
          <a
            id="hero-cta-work"
            href="#projects"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#F4F4F6]
                       uppercase tracking-widest border-b border-[#38BDF8] pb-1
                       hover:text-[#38BDF8] transition-colors duration-200"
          >
            VIEW MY WORK
            <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#38BDF8]">→</span>
          </a>

          <a
            id="hero-cta-connect"
            href="#contact"
            className="text-xs sm:text-sm font-mono text-[#8E95A5] hover:text-[#F4F4F6]
                       uppercase tracking-widest transition-colors duration-200"
          >
            LET'S CONNECT →
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : ctaY }}
        className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 lg:left-12 flex flex-col items-start gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#5D6473] uppercase">
          SCROLL TO EXPLORE ↓
        </span>
        <motion.div
          className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#5D6473] to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HomeStory;
