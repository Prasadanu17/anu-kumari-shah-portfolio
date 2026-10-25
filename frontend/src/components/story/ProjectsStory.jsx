import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, X, Terminal, Cpu, Globe, ArrowRight, Brain } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ==========================================================================
   FANNED CARD (Sleek Tech Card without heavy stock image design)
   ========================================================================== */
const FannedCard = ({ project, index, total, isActive, onSelect, isMobile }) => {
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  // Fan rotation & offset geometry
  const baseRotate = offset * (isMobile ? 3 : 5.5);
  const baseX = offset * (isMobile ? 18 : 34);
  const baseY = Math.abs(offset) * (isMobile ? 4 : 7);
  const baseZ = total - Math.abs(offset);

  const isAi = project.category === 'ai_ml' || project.category === 'ml';

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
      className={`absolute top-0 left-0 w-[220px] sm:w-[260px] md:w-[280px] h-[310px] sm:h-[360px] md:h-[380px] cursor-pointer origin-bottom transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-[#EAD9B8] rounded-2xl shadow-[0_12px_36px_rgba(234,217,184,0.18)]'
          : 'hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className={`w-full h-full rounded-2xl overflow-hidden border bg-[#171717] shadow-2xl flex flex-col justify-between transition-colors group p-4 sm:p-5 ${
          isActive ? 'border-[#EAD9B8]' : 'border-[#8E8170]/30 hover:border-[#EAD9B8]/50'
        }`}
      >
        {/* Top telemetry bar */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#8E8170]/20">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#C8B99F] uppercase tracking-[0.2em]">
              PROJECT 0{index + 1}
            </span>
            <div className="flex items-center gap-1.5">
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              )}
              <span className="text-[9px] sm:text-[10px] font-mono text-[#C8B99F] uppercase tracking-[0.2em] font-bold">
                {isAi ? 'AI/ML' : 'WEB'}
              </span>
            </div>
          </div>

          {/* Project Preview Thumbnail */}
          {project.image ? (
            <div className="relative w-full h-24 sm:h-28 mt-2.5 rounded-xl overflow-hidden border border-[#8E8170]/30 bg-black/40 group/img shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-60 pointer-events-none" />
              {project.tag && (
                <span className="absolute bottom-1.5 left-2 text-[7.5px] sm:text-[8.5px] font-mono px-2 py-0.5 rounded bg-[#171717]/90 text-[#EAD9B8] border border-[#8E8170]/30 uppercase font-semibold backdrop-blur-md">
                  {project.tag}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-[#8E8170]/30 flex items-center justify-center text-[#EAD9B8] group-hover:scale-105 transition-transform">
                {isAi ? <Cpu className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              </div>
              {project.tag && (
                <span className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded bg-[#EAD9B8]/10 text-[#EAD9B8] border border-[#8E8170]/30 uppercase font-semibold">
                  {project.tag}
                </span>
              )}
            </div>
          )}

          {/* Project Title */}
          <h3 className="text-sm sm:text-base font-display font-bold text-[#EAD9B8] leading-snug mt-2 line-clamp-1 group-hover:text-[#F5EBDD] transition-colors">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-[11px] sm:text-xs text-[#C8B99F] mt-1 line-clamp-2 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Technologies & View Action footer */}
        <div className="pt-3 border-t border-[#8E8170]/20 space-y-2.5">
          <div className="flex flex-wrap gap-1 sm:gap-1.5 overflow-hidden">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[8px] sm:text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider bg-white/[0.04] px-1.5 py-0.5 rounded border border-[#8E8170]/20"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#EAD9B8] font-semibold pt-1">
            <span className="tracking-wider">INSPECT SPECS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   PROJECT DETAIL PANEL (Clean technical view without image design)
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
      className="relative w-full bg-[#171717] backdrop-blur-xl border border-[#8E8170]/40 rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[75vh] overflow-y-auto"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Top Header: Badge & Close Button */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-block text-[11px] font-mono uppercase bg-[#EAD9B8]/10 border border-[#8E8170]/40 text-[#EAD9B8] px-3 py-1 rounded-md font-bold tracking-wider">
          {project.category === 'ai_ml' || project.category === 'ml' ? 'AI / ML' : 'FULL-STACK WEB'}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-[#C8B99F] hover:text-[#EAD9B8] transition-all border border-[#8E8170]/30"
          aria-label="Close project detail"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Featured Project Image */}
      {project.image && (
        <div className="relative w-full h-44 sm:h-56 mt-4 rounded-2xl overflow-hidden border border-[#8E8170]/35 bg-black/50 shadow-2xl group shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-60 pointer-events-none" />
          {project.tag && (
            <span className="absolute bottom-2.5 left-3 text-[9px] font-mono font-semibold uppercase px-2.5 py-1 rounded bg-[#171717]/90 border border-[#8E8170]/40 text-[#EAD9B8] backdrop-blur-md">
              {project.tag}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#EAD9B8] mt-4 font-display leading-tight tracking-tight">
        {project.title}
      </h3>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-white/[0.04] border border-[#8E8170]/30 text-[#F5EBDD] uppercase tracking-wider font-semibold"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[#F5EBDD] text-xs sm:text-sm mt-3 leading-relaxed font-light">
        {project.description}
      </p>

      {/* Key Architectural Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#8E8170]/20">
          <span className="text-[10px] font-mono uppercase text-[#EAD9B8] tracking-wider font-bold block mb-2">
            KEY ARCHITECTURAL HIGHLIGHTS
          </span>
          <ul className="space-y-1.5">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#F5EBDD]">
                <span className="text-[#EAD9B8] mt-0.5">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-[#8E8170]/20">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#8E8170]/40 bg-white/[0.04] text-[#F5EBDD] text-xs font-mono font-bold tracking-wider uppercase hover:bg-white/[0.08] hover:border-[#EAD9B8] transition-all"
          >
            <Github className="w-4 h-4 text-[#EAD9B8]" />
            <span>SOURCE CODE</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EAD9B8] hover:bg-[#d6c39f] text-[#171717] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg"
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
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'ai_ml' | 'web'
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

  const topProjects = useMemo(() => {
    return projects.filter((p) => p.isProminent);
  }, [projects]);

  const topAiList = useMemo(() => {
    return topProjects.filter((p) => p.category === 'ai_ml' || p.category === 'ml');
  }, [topProjects]);

  const topWebList = useMemo(() => {
    return topProjects.filter((p) => p.category === 'web' || p.category === 'fullstack');
  }, [topProjects]);

  const featuredList = useMemo(() => {
    if (activeCategory === 'ai_ml') {
      return topAiList;
    }
    if (activeCategory === 'web') {
      return topWebList;
    }
    return topProjects;
  }, [topProjects, topAiList, topWebList, activeCategory]);

  const currentProject = activeProjIndex !== null ? featuredList[activeProjIndex] : null;

  return (
    <section
      id="projects"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 py-4 sm:py-6 w-full min-h-[calc(100vh-6rem)]"
    >
      <div className="space-y-4 sm:space-y-6 relative z-10">

        {/* CHAPTER HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold">
                05 / PROJECTS
              </span>
              <div className="h-px w-12 bg-[#8E8170]/40" />
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-4xl text-[#EAD9B8] tracking-tight uppercase">
              SELECTED WORK
            </h2>
          </div>

          {/* Category Tabs: AI Projects & Full-Stack Websites */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveProjIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all border ${
                activeCategory === 'all'
                  ? 'bg-[#EAD9B8] text-[#171717] border-[#EAD9B8] shadow-md'
                  : 'bg-[#181818]/90 text-[#C8B99F] border-[#8E8170]/30 hover:border-[#EAD9B8]/40 hover:text-[#F5EBDD]'
              }`}
            >
              TOP ({topProjects.length})
            </button>

            <button
              onClick={() => {
                setActiveCategory('ai_ml');
                setActiveProjIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
                activeCategory === 'ai_ml'
                  ? 'bg-[#EAD9B8] text-[#171717] border-[#EAD9B8] shadow-md'
                  : 'bg-[#181818]/90 text-[#C8B99F] border-[#8E8170]/30 hover:border-[#EAD9B8]/40 hover:text-[#F5EBDD]'
              }`}
            >
              <Brain className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>AI PROJECTS ({topAiList.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory('web');
                setActiveProjIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
                activeCategory === 'web'
                  ? 'bg-[#EAD9B8] text-[#171717] border-[#EAD9B8] shadow-md'
                  : 'bg-[#181818]/90 text-[#C8B99F] border-[#8E8170]/30 hover:border-[#EAD9B8]/40 hover:text-[#F5EBDD]'
              }`}
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>FULL-STACK WEB ({topWebList.length})</span>
            </button>

            <Link
              to="/projects"
              className="px-3 py-1.5 rounded-lg bg-[#1c1c1c] border border-[#8E8170]/40 text-[#EAD9B8] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#EAD9B8] hover:text-[#171717] transition-all shadow-md ml-0 sm:ml-1"
            >
              INDEX (ALL WORK) →
            </Link>
          </div>
        </motion.div>

        {/* SUBTITLE & HINT TEXT */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[9.5px] sm:text-xs font-mono text-[#C8B99F] pb-1 border-b border-white/[0.05]">
          <span className="text-[#EAD9B8] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            {activeCategory === 'ai_ml' && '01 // FEATURED AI & MACHINE LEARNING HIGHLIGHTS'}
            {activeCategory === 'web' && '02 // FEATURED FULL-STACK WEB APPLICATION'}
            {activeCategory === 'all' && 'SELECTED ARCHIVE // TOP FLAGSHIP SYSTEMS'}
          </span>
          <span className="tracking-[0.16em] uppercase text-[#8E8170] text-[9px] sm:text-[10px]">
            {currentProject
              ? 'CLICK ON ANY CARD TO INSPECT // CLOSE TO RETURN TO CENTER'
              : 'CLICK ON ANY CARD TO SLIDE OPEN TECHNICAL SPECS'}
          </span>
        </div>

        {/* ================= MAIN STAGE ================= */}
        <div
          className={`relative w-full min-h-[380px] sm:min-h-[440px] flex flex-col lg:flex-row items-center transition-all duration-500 ${
            currentProject ? "justify-between gap-6 sm:gap-10" : "justify-center"
          }`}
        >
          {/* ---- DETAIL PANEL: Modal overlay on mobile, side-by-side on desktop ---- */}
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                className={
                  isMobile
                    ? "fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
                    : "w-full lg:w-[48%] xl:w-[46%] z-30 flex items-center justify-center"
                }
                onClick={isMobile ? () => setActiveProjIndex(null) : undefined}
              >
                <div
                  className="w-full max-w-xl"
                  onClick={isMobile ? (e) => e.stopPropagation() : undefined}
                >
                  <ProjectDetailPanel
                    project={currentProject}
                    onClose={() => setActiveProjIndex(null)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- 3D FANNED CARD DECK ---- */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className={`flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[400px] z-20 ${
              currentProject && !isMobile ? "w-full lg:w-[50%]" : "w-full max-w-2xl mx-auto"
            }`}
          >
            <div
              className="relative w-[220px] sm:w-[260px] md:w-[280px] h-[310px] sm:h-[360px] md:h-[380px]"
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
            <div className="flex items-center justify-center gap-2 mt-6 z-30">
              {featuredList.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProjIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeProjIndex === idx
                      ? 'w-6 bg-[#EAD9B8]'
                      : 'w-2 bg-white/20 hover:bg-[#EAD9B8]/40'
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