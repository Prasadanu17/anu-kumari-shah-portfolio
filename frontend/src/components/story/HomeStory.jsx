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
      className="relative flex flex-col justify-center px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 py-2 sm:py-4 w-full"
      style={{ perspective: 1200 }}
    >
      {/* Equal 2-Column Responsive Grid */}
      <div className="w-full grid grid-cols-2 items-center relative z-10 gap-2.5 sm:gap-6 lg:gap-12">

        {/* ================= LEFT COLUMN: HERO CONTENT (50%) ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2 sm:space-y-4 md:space-y-5 z-30"
        >
          {/* Status Kicker */}
          <motion.div variants={itemVariants} className="flex items-center gap-1.5 sm:gap-3">
            <span className="w-3.5 sm:w-8 h-[2px] bg-[#8E8170] shrink-0"></span>
            <p className="text-[7px] sm:text-xs font-mono text-[#C8B99F] tracking-[0.08em] sm:tracking-[0.25em] uppercase font-bold leading-tight truncate">
              PORTFOLIO // INTELLIGENT SYSTEMS
            </p>
          </motion.div>

          {/* Main Title & Role */}
          <motion.div variants={itemVariants} className="space-y-0.5 sm:space-y-1.5">
            <h1 className="font-display font-extrabold text-[#EAD9B8] leading-[1.05] tracking-tight text-[clamp(1.15rem,4.2vw,4.5rem)] uppercase">
              ANU KUMARI SHAH
            </h1>
            <p className="text-[7px] sm:text-sm md:text-base font-mono text-[#C8B99F] tracking-wide sm:tracking-widest font-semibold uppercase">
              AI/ML ENGINEER × FULL-STACK
            </p>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-[#F5EBDD] text-[8.5px] sm:text-sm md:text-base leading-relaxed font-light max-w-xl"
          >
            "I build intelligent systems and modern web experiences using AI, machine learning, and full-stack technologies."
          </motion.p>

          {/* 4 Identity Highlights Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-1 sm:gap-2 pt-0.5">
            {heroHighlights.map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded bg-[#1c1c1c] border border-[#8E8170]/30 text-[7px] sm:text-xs font-mono text-[#F5EBDD] hover:border-[#EAD9B8]/50 hover:bg-[#252525] transition-colors"
              >
                ● {chip}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-1.5 sm:gap-3 pt-1 sm:pt-2">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-[#EAD9B8] hover:bg-[#d8c5a0] text-[#171717] px-2.5 sm:px-6 py-1.5 sm:py-3 rounded-lg text-[8px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(234,217,184,0.25)] hover:shadow-[0_0_35px_rgba(234,217,184,0.4)]"
            >
              <span>VIEW WORK</span>
              <span className="text-[9px] sm:text-xs">→</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-transparent hover:bg-white/[0.05] text-[#F5EBDD] border border-[#8E8170]/40 hover:border-[#EAD9B8] px-2.5 sm:px-6 py-1.5 sm:py-3 rounded-lg text-[8px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300"
            >
              <span>CONNECT</span>
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-1 sm:gap-2.5 pt-2 sm:pt-4 border-t border-[#8E8170]/20 max-w-lg">
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-1 sm:p-2.5 rounded-md sm:rounded-xl">
              <span className="font-display font-bold text-[11px] sm:text-xl text-[#EAD9B8] block">10.00</span>
              <span className="text-[6px] sm:text-[9px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block">MCA CGPA</span>
            </div>
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-1 sm:p-2.5 rounded-md sm:rounded-xl">
              <span className="font-display font-bold text-[11px] sm:text-xl text-[#EAD9B8] block">AI / ML</span>
              <span className="text-[6px] sm:text-[9px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block">DEEP LEARNING</span>
            </div>
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-1 sm:p-2.5 rounded-md sm:rounded-xl">
              <span className="font-display font-bold text-[11px] sm:text-xl text-[#EAD9B8] block">FULL-STACK</span>
              <span className="text-[6px] sm:text-[9px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block">FASTAPI & SQL</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: 3D INTEGRATED HERO VISUAL (50%) ================= */}
        <div className="relative h-[clamp(210px,38vw,560px)] w-full flex items-center justify-center z-10">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Background Glow */}
            <div className="absolute w-[160px] h-[160px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#EAD9B8]/10 blur-[50px] sm:blur-[90px] pointer-events-none" />

            {/* Floating Card 1 — AI Resume Analyzer (Top Right) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 25 }}
              className="absolute -top-1 sm:top-[2%] -right-1 sm:right-[0%] w-[clamp(90px,15vw,250px)] bg-[#1c1c1c]/95 border border-[#8E8170]/30 rounded-lg sm:rounded-xl shadow-2xl p-1.5 sm:p-3 overflow-hidden z-20"
            >
              <div className="flex items-center justify-between pb-1 sm:pb-2 border-b border-[#8E8170]/20 mb-1 sm:mb-2">
                <span className="text-[6.5px] sm:text-[10px] font-mono text-[#EAD9B8] font-bold uppercase truncate">AI RESUME</span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EAD9B8] animate-pulse shrink-0 ml-1" />
              </div>
              <p className="text-[7.5px] sm:text-[11px] text-[#F5EBDD] font-medium leading-tight truncate">SBERT & NLP Matching</p>
              <p className="text-[6.5px] sm:text-[9px] font-mono text-[#C8B99F] mt-0.5 sm:mt-1 line-clamp-2 hidden xs:block">ATS score & skill gap analysis.</p>
            </motion.div>

            {/* Floating Card 2 — Heart Disease & Cancer ML (Bottom Left) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 35 }}
              className="absolute -bottom-1 sm:bottom-[2%] -left-1 sm:left-[0%] w-[clamp(85px,14vw,240px)] bg-[#1c1c1c]/95 border border-[#8E8170]/30 rounded-lg sm:rounded-xl shadow-2xl p-1.5 sm:p-3 overflow-hidden z-20"
            >
              <div className="flex items-center justify-between pb-1 sm:pb-2 border-b border-[#8E8170]/20 mb-1 sm:mb-2">
                <span className="text-[6.5px] sm:text-[10px] font-mono text-[#EAD9B8] font-bold uppercase truncate">HEALTHCARE ML</span>
                <span className="text-[6px] sm:text-[9px] font-mono text-[#C8B99F] shrink-0 ml-1">Streamlit</span>
              </div>
              <p className="text-[7.5px] sm:text-[11px] text-[#F5EBDD] font-medium leading-tight truncate">Heart & Cancer Models</p>
              <p className="text-[6.5px] sm:text-[9px] font-mono text-[#C8B99F] mt-0.5 sm:mt-1 line-clamp-2 hidden xs:block">Neural network accuracy metrics.</p>
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
              className="relative z-30 w-[clamp(110px,18vw,270px)] h-[clamp(155px,24vw,370px)] rounded-xl sm:rounded-2xl border-2 border-[#8E8170]/30 bg-[#1c1c1c]/90 backdrop-blur-md overflow-hidden shadow-2xl group hover:border-[#EAD9B8]/60 transition-colors"
            >
              <img
                src="/assets/profile.jpeg"
                alt="Anu Kumari Shah"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "/assets/hero_img.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-1.5 sm:bottom-4 left-1.5 sm:left-4 right-1.5 sm:right-4 p-1.5 sm:p-3 rounded-md sm:rounded-lg bg-[#171717]/90 border border-[#8E8170]/25 backdrop-blur-md">
                <p className="text-[8.5px] sm:text-xs font-display font-bold text-[#EAD9B8] truncate">Anu Kumari Shah</p>
                <p className="text-[7px] sm:text-[10px] font-mono text-[#C8B99F] truncate">ICFAI MCA • AI/ML & Web Dev</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HomeStory;