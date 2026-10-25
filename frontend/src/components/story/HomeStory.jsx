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
      {/* Responsive Grid: Stacks naturally on mobile with legible hierarchy, elegant 50/50 on laptop/desktop */}
      <div className="w-full flex flex-col md:grid md:grid-cols-2 items-center relative z-10 gap-6 sm:gap-8 lg:gap-12">

        {/* ================= LEFT COLUMN: HERO CONTENT ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full space-y-3 sm:space-y-4 md:space-y-5 z-30 min-w-0"
        >
          {/* Status Kicker */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3">
            <span className="w-4 sm:w-8 h-[2px] bg-[#8E8170] shrink-0"></span>
            <p className="text-[10px] sm:text-xs font-mono text-[#C8B99F] tracking-[0.15em] sm:tracking-[0.25em] uppercase font-bold leading-tight truncate">
              PORTFOLIO // INTELLIGENT SYSTEMS
            </p>
          </motion.div>

          {/* Main Title & Role */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="font-display font-extrabold text-[#EAD9B8] leading-[1.08] tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
              ANU KUMARI SHAH
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-mono text-[#C8B99F] tracking-wider font-semibold uppercase">
              AI/ML ENGINEER × FULL-STACK
            </p>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-[#F5EBDD] text-xs sm:text-sm md:text-base leading-relaxed font-light max-w-xl"
          >
            "I build intelligent systems and modern web experiences using AI, machine learning, and full-stack technologies."
          </motion.p>

          {/* Identity Highlights Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
            {heroHighlights.map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 rounded-md sm:rounded-lg bg-[#1c1c1c] border border-[#8E8170]/30 text-[10px] sm:text-xs font-mono text-[#F5EBDD] hover:border-[#EAD9B8]/50 hover:bg-[#252525] transition-colors whitespace-nowrap"
              >
                ● {chip}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 bg-[#EAD9B8] hover:bg-[#d8c5a0] text-[#171717] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(234,217,184,0.2)] hover:shadow-[0_0_30px_rgba(234,217,184,0.35)] shrink-0 active:scale-95"
            >
              <span>VIEW WORK</span>
              <span className="text-xs">→</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.05] text-[#F5EBDD] border border-[#8E8170]/40 hover:border-[#EAD9B8] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shrink-0 active:scale-95"
            >
              <span>CONNECT</span>
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-[#8E8170]/20 max-w-lg">
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-2 sm:p-2.5 rounded-xl">
              <span className="font-display font-bold text-sm sm:text-lg text-[#EAD9B8] block leading-none">10.00</span>
              <span className="text-[8px] sm:text-[9.5px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block mt-1">MCA CGPA</span>
            </div>
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-2 sm:p-2.5 rounded-xl">
              <span className="font-display font-bold text-sm sm:text-lg text-[#EAD9B8] block leading-none">AI / ML</span>
              <span className="text-[8px] sm:text-[9.5px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block mt-1">DEEP LEARNING</span>
            </div>
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-2 sm:p-2.5 rounded-xl">
              <span className="font-display font-bold text-sm sm:text-lg text-[#EAD9B8] block leading-none">FULL STACK</span>
              <span className="text-[8px] sm:text-[9.5px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block mt-1">FASTAPI & SQL</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: 3D INTEGRATED HERO VISUAL ================= */}
        <div className="relative h-[280px] sm:h-[340px] md:h-[clamp(320px,36vw,520px)] w-full flex items-center justify-center z-10 min-w-0">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Background Glow */}
            <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full bg-[#EAD9B8]/10 blur-[50px] sm:blur-[80px] pointer-events-none" />

            {/* Floating Card 1 — AI Resume Analyzer (Top Right) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 25 }}
              className="absolute top-2 right-2 sm:top-[6%] sm:right-[4%] w-[120px] sm:w-[150px] md:w-[clamp(130px,15vw,220px)] bg-[#1c1c1c]/95 border border-[#8E8170]/35 rounded-xl shadow-2xl p-2 sm:p-2.5 overflow-hidden z-20 backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#8E8170]/20 mb-1">
                <span className="text-[8px] sm:text-[9.5px] font-mono text-[#EAD9B8] font-bold uppercase truncate">AI RESUME</span>
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0 ml-1" />
              </div>
              <p className="text-[9.5px] sm:text-[11px] text-[#F5EBDD] font-medium leading-tight truncate">SBERT & NLP</p>
              <p className="text-[8px] sm:text-[9px] font-mono text-[#C8B99F] mt-0.5 line-clamp-1">ATS skill analysis</p>
            </motion.div>

            {/* Floating Card 2 — Heart Disease & Cancer ML (Bottom Left) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 35 }}
              className="absolute bottom-2 left-2 sm:bottom-[8%] sm:left-[4%] w-[120px] sm:w-[150px] md:w-[clamp(130px,15vw,220px)] bg-[#1c1c1c]/95 border border-[#8E8170]/35 rounded-xl shadow-2xl p-2 sm:p-2.5 overflow-hidden z-20 backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#8E8170]/20 mb-1">
                <span className="text-[8px] sm:text-[9.5px] font-mono text-[#EAD9B8] font-bold uppercase truncate">HEALTH ML</span>
                <span className="text-[8px] font-mono text-[#C8B99F] shrink-0 ml-1">Streamlit</span>
              </div>
              <p className="text-[9.5px] sm:text-[11px] text-[#F5EBDD] font-medium leading-tight truncate">Heart & Cancer</p>
              <p className="text-[8px] sm:text-[9px] font-mono text-[#C8B99F] mt-0.5 line-clamp-1">Neural net accuracy</p>
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
              className="relative z-30 w-[150px] h-[210px] sm:w-[190px] sm:h-[265px] md:w-[clamp(180px,20vw,260px)] md:h-[clamp(250px,28vw,360px)] rounded-2xl border-2 border-[#8E8170]/35 bg-[#1c1c1c]/90 backdrop-blur-md overflow-hidden shadow-2xl group hover:border-[#EAD9B8]/60 transition-colors"
            >
              <img
                src="/assets/profile.jpeg"
                alt="Anu Kumari Shah"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "/assets/hero_img.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-2 left-2 right-2 p-1.5 sm:p-2.5 rounded-lg bg-[#171717]/95 border border-[#8E8170]/30 backdrop-blur-md">
                <p className="text-[10px] sm:text-xs font-display font-bold text-[#EAD9B8] truncate leading-tight">Anu Kumari Shah</p>
                <p className="text-[8px] sm:text-[9.5px] font-mono text-[#C8B99F] truncate leading-tight mt-0.5">ICFAI MCA • AI/ML & Web</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeStory;