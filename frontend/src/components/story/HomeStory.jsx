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
      {/* Equal 2-Column Responsive Grid (50% / 50%) */}
      <div className="w-full grid grid-cols-2 items-center relative z-10 gap-2 sm:gap-6 lg:gap-12">

        {/* ================= LEFT COLUMN: HERO CONTENT (50%) ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1.5 sm:space-y-3.5 md:space-y-5 z-30 min-w-0"
        >
          {/* Status Kicker */}
          <motion.div variants={itemVariants} className="flex items-center gap-1.5 sm:gap-3">
            <span className="w-3 sm:w-8 h-[2px] bg-[#8E8170] shrink-0"></span>
            <p className="text-[7px] sm:text-xs font-mono text-[#C8B99F] tracking-[0.08em] sm:tracking-[0.25em] uppercase font-bold leading-tight truncate">
              PORTFOLIO // INTELLIGENT SYSTEMS
            </p>
          </motion.div>

          {/* Main Title & Role */}
          <motion.div variants={itemVariants} className="space-y-0.5 sm:space-y-1">
            <h1 className="font-display font-extrabold text-[#EAD9B8] leading-[1.05] tracking-tight text-[clamp(1.05rem,3.8vw,4.5rem)] uppercase truncate">
              ANU KUMARI SHAH
            </h1>
            <p className="text-[7px] sm:text-xs md:text-sm font-mono text-[#C8B99F] tracking-wide sm:tracking-widest font-semibold uppercase truncate">
              AI/ML ENGINEER × FULL-STACK
            </p>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-[#F5EBDD] text-[8px] sm:text-xs md:text-sm lg:text-base leading-snug sm:leading-relaxed font-light max-w-xl line-clamp-3 sm:line-clamp-none"
          >
            "I build intelligent systems and modern web experiences using AI, machine learning, and full-stack technologies."
          </motion.p>

          {/* Identity Highlights Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
            {heroHighlights.map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#1c1c1c] border border-[#8E8170]/30 text-[6.5px] sm:text-[11px] font-mono text-[#F5EBDD] hover:border-[#EAD9B8]/50 hover:bg-[#252525] transition-colors whitespace-nowrap"
              >
                ● {chip}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-1.5 sm:gap-3 pt-1">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-[#EAD9B8] hover:bg-[#d8c5a0] text-[#171717] px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg text-[7.5px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(234,217,184,0.2)] hover:shadow-[0_0_30px_rgba(234,217,184,0.35)] shrink-0"
            >
              <span>VIEW WORK</span>
              <span className="text-[8px] sm:text-xs">→</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-transparent hover:bg-white/[0.05] text-[#F5EBDD] border border-[#8E8170]/40 hover:border-[#EAD9B8] px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg text-[7.5px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shrink-0"
            >
              <span>CONNECT</span>
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-1 sm:gap-2 pt-1.5 sm:pt-3 border-t border-[#8E8170]/20 max-w-lg">
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-1 sm:p-2 rounded-md sm:rounded-xl">
              <span className="font-display font-bold text-[10px] sm:text-lg text-[#EAD9B8] block leading-none">10.00</span>
              <span className="text-[5.5px] sm:text-[9px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block mt-0.5">MCA CGPA</span>
            </div>
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-1 sm:p-2 rounded-md sm:rounded-xl">
              <span className="font-display font-bold text-[10px] sm:text-lg text-[#EAD9B8] block leading-none">AI / ML</span>
              <span className="text-[5.5px] sm:text-[9px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block mt-0.5">DEEP LEARNING</span>
            </div>
            <div className="bg-[#1c1c1c] border border-[#8E8170]/25 p-1 sm:p-2 rounded-md sm:rounded-xl">
              <span className="font-display font-bold text-[10px] sm:text-lg text-[#EAD9B8] block leading-none">FULL STACK</span>
              <span className="text-[5.5px] sm:text-[9px] font-mono tracking-wider text-[#C8B99F] uppercase font-medium truncate block mt-0.5">FASTAPI & SQL</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: 3D INTEGRATED HERO VISUAL (50%) ================= */}
        <div className="relative h-[clamp(210px,36vw,540px)] w-full flex items-center justify-center z-10 min-w-0">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Background Glow */}
            <div className="absolute w-[140px] h-[140px] sm:w-[280px] sm:h-[280px] rounded-full bg-[#EAD9B8]/10 blur-[40px] sm:blur-[80px] pointer-events-none" />

            {/* Floating Card 1 — AI Resume Analyzer (Top Right) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 25 }}
              className="absolute top-0 right-0 sm:top-[4%] sm:right-[2%] w-[80px] xs:w-[95px] sm:w-[clamp(110px,14vw,230px)] bg-[#1c1c1c]/95 border border-[#8E8170]/35 rounded-md sm:rounded-xl shadow-2xl p-1 sm:p-2.5 overflow-hidden z-20"
            >
              <div className="flex items-center justify-between pb-0.5 sm:pb-1.5 border-b border-[#8E8170]/20 mb-0.5 sm:mb-1">
                <span className="text-[6px] sm:text-[9.5px] font-mono text-[#EAD9B8] font-bold uppercase truncate">AI RESUME</span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10b981] animate-pulse shrink-0 ml-0.5" />
              </div>
              <p className="text-[6.5px] sm:text-[10.5px] text-[#F5EBDD] font-medium leading-tight truncate">SBERT & NLP</p>
              <p className="text-[6px] sm:text-[8.5px] font-mono text-[#C8B99F] mt-0.5 line-clamp-1 hidden sm:block">ATS skill analysis</p>
            </motion.div>

            {/* Floating Card 2 — Heart Disease & Cancer ML (Bottom Left) */}
            <motion.div
              style={{ x: winTranslateX, y: winTranslateY, transformZ: 35 }}
              className="absolute bottom-1 left-1 sm:bottom-[7%] sm:left-[2%] w-[80px] xs:w-[95px] sm:w-[clamp(110px,14vw,230px)] bg-[#1c1c1c]/95 border border-[#8E8170]/35 rounded-md sm:rounded-xl shadow-2xl p-1 sm:p-2.5 overflow-hidden z-20"
            >
              <div className="flex items-center justify-between pb-0.5 sm:pb-1.5 border-b border-[#8E8170]/20 mb-0.5 sm:mb-1">
                <span className="text-[6px] sm:text-[9.5px] font-mono text-[#EAD9B8] font-bold uppercase truncate">HEALTH ML</span>
                <span className="text-[5.5px] sm:text-[8px] font-mono text-[#C8B99F] shrink-0 ml-0.5">Streamlit</span>
              </div>
              <p className="text-[6.5px] sm:text-[10.5px] text-[#F5EBDD] font-medium leading-tight truncate">Heart & Cancer</p>
              <p className="text-[6px] sm:text-[8.5px] font-mono text-[#C8B99F] mt-0.5 line-clamp-1 hidden sm:block">Neural net accuracy</p>
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
              className="relative z-30 w-[clamp(100px,16vw,250px)] h-[clamp(140px,22vw,350px)] rounded-xl sm:rounded-2xl border-2 border-[#8E8170]/35 bg-[#1c1c1c]/90 backdrop-blur-md overflow-hidden shadow-2xl group hover:border-[#EAD9B8]/60 transition-colors"
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

              <div className="absolute bottom-1 sm:bottom-3 left-1 sm:left-3 right-1 sm:right-3 p-1 sm:p-2.5 rounded sm:rounded-lg bg-[#171717]/95 border border-[#8E8170]/30 backdrop-blur-md">
                <p className="text-[7.5px] sm:text-xs font-display font-bold text-[#EAD9B8] truncate leading-tight">Anu Kumari Shah</p>
                <p className="text-[6px] sm:text-[9.5px] font-mono text-[#C8B99F] truncate leading-tight mt-0.5">ICFAI MCA • AI/ML & Web</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HomeStory;