import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Rotating text
const RotatingText = () => {
  const words = ["Full-stack", "Scalable", "AI-driven"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-block text-[#38BDF8] font-serif italic font-medium">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 90 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block origin-bottom"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const HomeStory = () => {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

  const winTranslateX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const winTranslateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const imgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const imgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto z-10 pt-20 pb-12 overflow-hidden"
      style={{ perspective: 1200 }}
    >

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">

        {/* ================= LEFT: TEXT ================= */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8 z-30">
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="w-8 h-px bg-[#38BDF8]"></span>
            <p className="text-[10px] sm:text-xs font-mono text-[#38BDF8] tracking-[0.3em] uppercase font-bold">
              FULL STACK DEVELOPER — AI ENGINEER IN PROGRESS
            </p>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-sans font-extrabold text-[#F4F4F6] leading-[1.1] tracking-tight text-[clamp(2.5rem,5vw,4.5rem)]">
            Anu Kumari Shah, <br />
            Building <RotatingText /> System
          </motion.h1>

          <motion.p variants={itemVariants} className="text-[#8E95A5] text-base sm:text-lg leading-relaxed font-light max-w-lg">
            I'm a Full Stack Software Engineer passionate about building high-performance web applications. Currently exploring AI and machine learning to build smarter products.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-2">
            <a href="#resume" className="inline-flex items-center gap-3 bg-[#2F3E2E] hover:bg-[#3e5240] text-[#F4F4F6] px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              DOWNLOAD RESUME
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12">
            {[
              { value: '7th', label: 'SEMESTER, INTEGRATED MCA' },
              { value: '80K+', label: 'YOUTUBE SUBSCRIBERS' },
              { value: '8+', label: 'SHIPPED PROJECTS' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/10 backdrop-blur-md p-5 rounded-2xl flex flex-col gap-2 shadow-lg">
                <span className="font-serif italic text-3xl text-[#F4F4F6]">{stat.value}</span>
                <span className="text-[9px] font-mono tracking-wider text-[#8E95A5] uppercase font-bold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= RIGHT: 3 CARDS BEHIND CHARACTER (OVERLAPPING) ================= */}
        <div className="relative h-[650px] lg:h-[750px] w-full flex items-end justify-center z-10 hidden lg:flex">

          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full flex items-end justify-center"
          >

            {/* ============ CARD 1: TOP-RIGHT — Ezy Learn (dark) ============ */}
            {/* Sits behind the head, upper-right of character */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 10 }}
              className="absolute top-[5%] right-[10%] w-[300px] bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-5 rotate-[10deg]"
            >
              <div className="h-6 bg-white/5 flex items-center px-3 gap-1.5 border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#FF5F56]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FFBD2E]"></span>
                <span className="w-2 h-2 rounded-full bg-[#27C93F]"></span>
              </div>
              <div className="p-4 bg-[#0F1115]">
                <div className="text-[10px] font-mono text-[#38BDF8] mb-1">Ezy Learn</div>
                <div className="text-sm font-bold text-white leading-tight mb-2">
                  Easy Study,<br />Smart Success
                </div>
                <div className="h-16 bg-black/50 rounded border border-white/5 flex items-center justify-center text-[9px] font-mono text-gray-500">
                  📚 UI PREVIEW
                </div>
              </div>
            </motion.div>

            {/* ============ CARD 2: MID-LEFT — AI Interview (dark) ============ */}
            {/* Sits behind the shoulder, left side */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 15 }}
              className="absolute top-[30%] left-[-5%] w-[300px] bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 rotate-[-6deg]"
            >
              <div className="h-6 bg-white/5 flex items-center px-3 gap-1.5 border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#FF5F56]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FFBD2E]"></span>
                <span className="w-2 h-2 rounded-full bg-[#27C93F]"></span>
              </div>
              <div className="p-4 bg-black">
                <div className="text-sm font-bold text-white mb-2">Your AI Interview</div>
                <div className="text-[9px] font-mono text-gray-500 mb-3">
                  Practice with AI-powered mock interviews.
                </div>
                <button className="text-[8px] font-mono px-2 py-1 rounded-full bg-[#38BDF8] text-[#07080B] font-bold">
                  Start →
                </button>
              </div>
            </motion.div>

            {/* ============ CARD 3: BOTTOM-RIGHT — SERS AI (light) ============ */}
            {/* Sits behind the waist/chest, right side, wider card */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 20 }}
              className="absolute bottom-[15%] right-[0%] w-[340px] bg-white rounded-xl shadow-2xl overflow-hidden z-15 rotate-[4deg]"
            >
              <div className="h-6 bg-gray-100 flex items-center px-3 gap-1.5 border-b border-gray-200">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </div>
              <div className="p-5 bg-white">
                <div className="text-base font-bold text-black mb-1">SERS AI</div>
                <div className="text-[10px] text-gray-600 leading-relaxed mb-3">
                  Thousands of accidents happen daily. Every moment of delay costs lives.
                </div>
                <div className="inline-block text-[8px] font-mono px-2 py-0.5 rounded bg-red-500 text-white font-bold">
                  ● Emergency Response
                </div>
              </div>
            </motion.div>

            {/* ============ CHARACTER IMAGE — HUGE, FILLS CONTAINER, ON TOP ============ */}
            {/* The character is now MUCH larger so its silhouette covers the middle of each card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                x: imgTranslateX,
                y: imgTranslateY,
                transformZ: 50,
              }}
              className="relative z-30 h-full w-full flex items-end justify-center pointer-events-none"
            >
              <img
                src="/assets/hero_img.png"
                alt="Anu Kumari Shah"
                className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeStory;