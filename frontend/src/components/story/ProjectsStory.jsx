import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ==========================================================================
   CONSTELLATION / ORBIT CANVAS BACKGROUND SVG (Matches screenshot mesh)
   ========================================================================== */
const OrbitConstellation = () => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30 z-0">
    <svg className="w-[520px] h-[520px] text-[#1e6f5c]" viewBox="0 0 500 500" fill="none">
      <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
      <circle cx="250" cy="250" r="160" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />

      {/* Network Lines */}
      <line x1="80" y1="200" x2="250" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="250" y1="100" x2="420" y2="220" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="420" y1="220" x2="350" y2="390" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="350" y1="390" x2="120" y2="350" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="120" y1="350" x2="80" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />

      <line x1="250" y1="100" x2="350" y2="390" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <line x1="80" y1="200" x2="420" y2="220" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <line x1="120" y1="350" x2="250" y2="100" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />

      {/* Nodes */}
      <circle cx="80" cy="200" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="250" cy="100" r="4" fill="currentColor" opacity="0.9" />
      <circle cx="420" cy="220" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="350" cy="390" r="3.5" fill="currentColor" opacity="0.8" />
      <circle cx="120" cy="350" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="250" cy="250" r="5" fill="currentColor" opacity="0.4" />
    </svg>
  </div>
);

/* ==========================================================================
   FANNED CARD (Individual project card in 3D arc deck)
   ========================================================================== */
const FannedCard = ({ project, index, total, isActive, onSelect, isMobile }) => {
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  // Fan rotation & offset geometry
  const baseRotate = offset * (isMobile ? 3 : 5.5);
  const baseX = offset * (isMobile ? 18 : 34);
  const baseY = Math.abs(offset) * (isMobile ? 4 : 7);
  const baseZ = total - Math.abs(offset);

  return (
    <motion.div
      layout
      onClick={() => onSelect(index)}
      initial={false}
      animate={{
        opacity: 1,
        scale: isActive ? 1.05 : 1,
        rotate: isActive ? baseRotate * 0.4 : baseRotate,
        x: baseX,
        y: isActive ? baseY - 24 : baseY,
        zIndex: isActive ? 50 : baseZ,
      }}
      whileHover={{
        scale: isActive ? 1.07 : 1.04,
        y: (isActive ? baseY - 24 : baseY) - 12,
        rotate: baseRotate * 0.3,
        zIndex: 60,
        transition: { duration: 0.2 },
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      className={`absolute top-0 left-0 w-[220px] sm:w-[260px] md:w-[285px] h-[310px] sm:h-[370px] md:h-[400px] cursor-pointer origin-bottom transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-[#10b981] rounded-2xl shadow-[0_12px_36px_rgba(16,185,129,0.35)]'
          : 'hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`w-full h-full rounded-2xl overflow-hidden border bg-[#0d1310] shadow-2xl flex flex-col transition-colors group ${
        isActive ? 'border-[#10b981]' : 'border-white/15 hover:border-[#10b981]/70'
      }`}>
        <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#0d1310] border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-mono text-[#8E9793] uppercase tracking-[0.2em]">
            PROJECT 0{index + 1}
          </span>
          <div className="flex items-center gap-1.5">
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            )}
            <span className="text-[9px] sm:text-[10px] font-mono text-[#10b981] uppercase tracking-[0.2em] font-bold">
              {project.category === 'ai_ml' || project.category === 'ml' ? 'AI/ML' : 'WEB'}
            </span>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-[#050706]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1310] via-transparent to-transparent" />
        </div>

        <div className="px-3.5 sm:px-4 py-3 sm:py-3.5 bg-[#0d1310] border-t border-white/[0.06]">
          <h3 className="text-xs sm:text-sm font-display font-bold text-[#F4F5F4] leading-tight line-clamp-2 group-hover:text-[#10b981] transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 overflow-hidden">
            {project.technologies.slice(0, 2).map((t) => (
              <span key={t} className="text-[8px] sm:text-[9px] font-mono text-[#8E9793] uppercase tracking-wider bg-white/[0.04] px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   PROJECT DETAIL PANEL (Left panel matching user screenshot)
   ========================================================================== */
const ProjectDetailPanel = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      className="relative w-full bg-[#0d1310]/95 backdrop-blur-xl border border-[#1e6f5c]/50 rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Top Header: Badge & Close Button */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-block text-[11px] font-mono uppercase bg-[#1e6f5c]/20 border border-[#1e6f5c]/40 text-[#10b981] px-3 py-1 rounded-md font-bold tracking-wider">
          {project.category === 'ai_ml' || project.category === 'ml' ? 'AI / ML' : 'FULL-STACK WEB'}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-[#8E9793] hover:text-[#F4F5F4] transition-all border border-white/10"
          aria-label="Close project detail"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Project Cover Image */}
      {project.image && (
        <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video shadow-md">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl sm:text-3xl font-extrabold text-[#F4F5F4] mt-4 font-display leading-tight tracking-tight">
        {project.title}
      </h3>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-white/[0.04] border border-white/[0.08] text-[#F4F5F4] uppercase tracking-wider font-semibold"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[#8E9793] text-xs sm:text-sm mt-3 leading-relaxed font-light">
        {project.description}
      </p>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/[0.08]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-[#F4F5F4] text-xs font-mono font-bold tracking-wider uppercase hover:bg-white/[0.08] transition-all"
          >
            <Github className="w-4 h-4 text-[#10b981]" />
            <span>SOURCE</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e6f5c] hover:bg-[#28967d] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#1e6f5c]/25"
          >
            <span>LAUNCH DEMO</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN PROJECTS STORY COMPONENT
   ========================================================================== */
const ProjectsStory = () => {
  const { projects } = usePortfolio();
  // Centered by default (null = closed state)
  const [activeProjIndex, setActiveProjIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const featuredList = projects.slice(0, 6);
  const currentProject = activeProjIndex !== null ? featuredList[activeProjIndex] : null;

  return (
    <section
      id="projects"
      className="relative flex flex-col px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 pt-20 sm:pt-28 pb-12 sm:pb-20"
    >
      <div className="space-y-6 relative z-10">

        {/* CHAPTER HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#10b981] tracking-widest uppercase font-bold">
                04 / PROJECTS
              </span>
              <div className="h-px w-12 bg-[#1e6f5c]/40" />
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-5xl text-[#F4F5F4] tracking-tight uppercase">
              SELECTED WORK
            </h2>
          </div>

          <Link
            to="/projects"
            className="self-start sm:self-auto px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-lg bg-[#1e6f5c] text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#28967d] transition-colors shadow-md"
          >
            INDEX (ALL WORK) →
          </Link>
        </motion.div>

        {/* HINT TEXT */}
        <p className="text-center text-[9px] sm:text-xs font-mono text-[#8E9793] tracking-[0.18em] sm:tracking-[0.35em] uppercase pointer-events-none pt-1 transition-opacity duration-300">
          {currentProject
            ? "CLICK ON ANY CARD TO INSPECT // CLOSE TO RETURN TO CENTER"
            : "CLICK ON ANY CARD TO SLIDE OPEN TECHNICAL DETAILS"}
        </p>

        {/* ================= MAIN STAGE ================= */}
        <div className={`relative w-full min-h-[540px] sm:min-h-[580px] pt-4 flex flex-col lg:flex-row items-center transition-all duration-500 ${
          currentProject ? "justify-between gap-8 sm:gap-12" : "justify-center"
        }`}>

          {/* Orbital Constellation SVG Grid behind cards */}
          <OrbitConstellation />

          {/* ---- LEFT SIDE: DETAIL PANEL (Only rendered when a project is selected) ---- */}
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: -60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                className="w-full lg:w-[48%] xl:w-[46%] z-30 flex items-center justify-center"
              >
                <ProjectDetailPanel
                  project={currentProject}
                  onClose={() => setActiveProjIndex(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- RIGHT SIDE: 3D FANNED CARD DECK (Centered by default, moves to right when card clicked) ---- */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className={`flex flex-col items-center justify-center relative min-h-[360px] sm:min-h-[440px] z-20 ${
              currentProject ? "w-full lg:w-[50%]" : "w-full max-w-2xl mx-auto"
            }`}
          >
            <div
              className="relative w-[220px] sm:w-[260px] md:w-[285px] h-[310px] sm:h-[370px] md:h-[400px]"
              style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
            >
              {featuredList.map((project, idx) => (
                <FannedCard
                  key={project.id}
                  project={project}
                  index={idx}
                  total={featuredList.length}
                  isActive={activeProjIndex === idx}
                  onSelect={setActiveProjIndex}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* Quick Switcher Dots */}
            <div className="flex items-center justify-center gap-2 mt-8 z-30">
              {featuredList.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProjIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeProjIndex === idx
                      ? 'w-6 bg-[#10b981]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Select project ${p.title}`}
                />
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProjectsStory;