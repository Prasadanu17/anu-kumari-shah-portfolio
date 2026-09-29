import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const HomeStory = () => {
  const { personalInfo, heroHighlights } = usePortfolio();
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

  const winTranslateX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const winTranslateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

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
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col justify-start sm:justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 pt-24 sm:pt-28 pb-8 sm:pb-16 overflow-hidden sm:min-h-screen"
      style={{ perspective: 1200 }}
    >
      <div className="w-full grid grid-cols-[3fr_2fr] sm:grid-cols-[7fr_5fr] items-center relative z-10 gap-3 sm:gap-[clamp(1.5rem,4vw,3rem)]">

        {/* ================= LEFT COLUMN: HERO CONTENT ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-[clamp(0.6rem,2.5vw,1.75rem)] z-30"
        >
          {/* Status Kicker */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-[2px] bg-[#1e6f5c] shrink-0"></span>
            <p className="text-[8px] sm:text-xs font-mono text-[#1e6f5c] tracking-[0.15em] sm:tracking-[0.25em] uppercase font-bold leading-tight">
              PORTFOLIO // INTELLIGENT SYSTEMS & WEB
            </p>
          </motion.div>

          {/* Main Title & Role */}
          <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
            <h1 className="font-display font-extrabold text-[#F4F5F4] leading-[1.05] tracking-tight text-[clamp(1.4rem,5.5vw,5rem)] uppercase">
              ANU KUMARI SHAH
            </h1>
            <p className="text-[8px] sm:text-base md:text-lg font-mono text-[#1e6f5c] tracking-wider sm:tracking-widest font-semibold uppercase">
              AI/ML ENGINEER × FULL-STACK DEVELOPER
            </p>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-[#8E9793] text-[10px] sm:text-lg leading-relaxed font-light max-w-xl hidden sm:block"
          >
            "I build intelligent systems and modern web experiences using AI, machine learning, and full-stack technologies."
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-[#8E9793] text-[10px] leading-snug font-light sm:hidden"
          >
            "I build intelligent systems using AI, ML, and full-stack technologies."
          </motion.p>

          {/* 4 Identity Highlights Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-1 sm:gap-2.5 pt-1">
            {heroHighlights.map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-[8px] sm:text-xs font-mono text-[#F4F5F4] hover:border-[#1e6f5c]/50 hover:bg-[#1e6f5c]/10 transition-colors"
              >
                ● {chip}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2 sm:pt-3">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#1e6f5c] hover:bg-[#28967d] text-white px-3 sm:px-7 py-2 sm:py-3.5 rounded-lg text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(30,111,92,0.35)] hover:shadow-[0_0_35px_rgba(30,111,92,0.5)]"
            >
              <span>VIEW MY WORK</span>
              <span className="text-[10px] sm:text-sm">→</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-white/[0.04] hover:bg-white/[0.09] text-[#F4F5F4] border border-white/15 hover:border-white/30 px-3 sm:px-7 py-2 sm:py-3.5 rounded-lg text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300"
            >
              <span>LET'S CONNECT</span>
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3 pt-3 sm:pt-6 border-t border-white/[0.08] max-w-lg">
            <div className="bg-white/[0.02] border border-white/[0.08] p-1.5 sm:p-3.5 rounded-lg sm:rounded-xl">
              <span className="font-display font-bold text-sm sm:text-2xl text-[#F4F5F4] block">10.00</span>
              <span className="text-[7px] sm:text-[10px] font-mono tracking-wider text-[#8E9793] uppercase font-medium">MCA CGPA (ICFAI)</span>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.08] p-1.5 sm:p-3.5 rounded-lg sm:rounded-xl">
              <span className="font-display font-bold text-sm sm:text-2xl text-[#1e6f5c] block">AI / ML</span>
              <span className="text-[7px] sm:text-[10px] font-mono tracking-wider text-[#8E9793] uppercase font-medium">NLP & DEEP LEARNING</span>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.08] p-1.5 sm:p-3.5 rounded-lg sm:rounded-xl col-span-2 sm:col-span-1">
              <span className="font-display font-bold text-sm sm:text-2xl text-[#F4F5F4] block">FULL-STACK</span>
              <span className="text-[7px] sm:text-[10px] font-mono tracking-wider text-[#8E9793] uppercase font-medium">REACT, FASTAPI & SQL</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: 3D INTEGRATED HERO VISUAL ================= */}
        <div className="relative h-[clamp(200px,38vw,620px)] w-full flex items-center justify-center z-10">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Background Glow */}
            <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#1e6f5c]/20 blur-[80px] sm:blur-[90px] pointer-events-none" />

            {/* Floating Card 1 — AI Resume Analyzer (Top Right) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 25 }}
              className="absolute top-[2%] right-[0%] w-[clamp(120px,18vw,280px)] bg-[#0d1310] border border-[#1e6f5c]/40 rounded-xl shadow-2xl p-[clamp(0.5rem,1.2vw,1rem)] overflow-hidden z-20"
            >
              <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-white/10 mb-1.5 sm:mb-2">
                <span className="text-[9px] sm:text-[10px] font-mono text-[#1e6f5c] font-bold uppercase">AI RESUME ANALYZER</span>
                <span className="w-2 h-2 rounded-full bg-[#1e6f5c] animate-pulse" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#F4F5F4] font-medium leading-tight">SBERT & NLP Matching</p>
              <p className="text-[8px] sm:text-[9px] font-mono text-[#8E9793] mt-1">ATS score calculation, skill gap analysis & interview questions.</p>
            </motion.div>

            {/* Floating Card 2 — Heart Disease & Cancer ML (Bottom Left) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 35 }}
              className="absolute bottom-[2%] left-[0%] w-[clamp(110px,17vw,270px)] bg-[#0d1310] border border-white/15 rounded-xl shadow-2xl p-[clamp(0.5rem,1.2vw,1rem)] overflow-hidden z-20"
            >
              <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-white/10 mb-1.5 sm:mb-2">
                <span className="text-[9px] sm:text-[10px] font-mono text-[#28967d] font-bold uppercase">HEALTHCARE ML MODELS</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-[#8E9793]">Streamlit</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#F4F5F4] font-medium leading-tight">Heart Risk & Breast Cancer Neural Network</p>
              <p className="text-[8px] sm:text-[9px] font-mono text-[#8E9793] mt-1">Predictive clinical metrics & classification accuracy.</p>
            </motion.div>

            {/* Center Profile Image in Refined 3D Titanium Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                x: imgTranslateX,
                y: imgTranslateY,
                transformZ: 45,
              }}
              className="relative z-30 w-[clamp(140px,18vw,300px)] h-[clamp(180px,23vw,380px)] rounded-2xl border-2 border-white/15 bg-[#0d1310]/80 backdrop-blur-md overflow-hidden shadow-2xl group hover:border-[#1e6f5c]/60 transition-colors"
            >
              <img
                src="/assets/profile.jpeg"
                alt="Anu Kumari Shah"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "/assets/hero_img.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-2.5 sm:p-3 rounded-lg bg-[#070908]/90 border border-white/10 backdrop-blur-md">
                <p className="text-xs font-display font-bold text-[#F4F5F4]">Anu Kumari Shah</p>
                <p className="text-[10px] font-mono text-[#1e6f5c]">ICFAI MCA • AI/ML & Web Dev</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HomeStory;