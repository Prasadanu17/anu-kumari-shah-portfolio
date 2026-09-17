import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const sectionRef = useRef(null);

  // Scroll-exit animation for the content layer.
  // As the user scrolls past the home section, content fades up and out.
  // The fixed 3D background behind it continues uninterrupted.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.65], [0, -80]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Home — Anu Kumari Shah"
    >
      {/* Subtle left-side vignette so text stays readable over the 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 20% 50%, rgba(7,8,11,0.65) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── CONTENT — exits smoothly on scroll ── */}
      <motion.div
        className="story-container relative z-10 pt-36 pb-28"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl space-y-10">

          {/* Eyebrow label */}
          <motion.p
            className="text-[11px] sm:text-xs font-mono text-[#8E95A5] tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            AI / ML ENGINEER · FULL-STACK DEVELOPER
          </motion.p>

          {/* Primary headline */}
          <motion.h1
            className="font-display font-extrabold text-[#F4F4F6] leading-[0.92] tracking-tighter
                       text-[clamp(3.5rem,10vw,7.5rem)]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            BUILDING<br />
            INTELLIGENT<br />
            SYSTEMS.
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            className="text-[#8E95A5] text-base sm:text-lg leading-relaxed font-light max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: 'easeOut' }}
          >
            I build AI-powered products, computer vision systems, and
            modern full-stack applications that turn complex ideas into
            useful experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-8 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: 'easeOut' }}
          >
            <a
              id="hero-cta-work"
              href="#projects"
              className="group inline-flex items-center gap-2 text-sm font-mono font-bold text-[#F4F4F6]
                         uppercase tracking-widest border-b border-[#38BDF8] pb-0.5
                         hover:text-[#38BDF8] transition-colors duration-200"
            >
              VIEW MY WORK
              <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#38BDF8]">→</span>
            </a>

            <a
              id="hero-cta-connect"
              href="#contact"
              className="text-sm font-mono text-[#8E95A5] hover:text-[#F4F4F6]
                         uppercase tracking-widest transition-colors duration-200"
            >
              LET'S CONNECT →
            </a>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-0 flex flex-col items-start gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#5D6473] uppercase">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#5D6473] to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
