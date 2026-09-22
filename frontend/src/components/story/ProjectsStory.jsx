import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, X } from 'lucide-react';
import { projects } from '../../utils/constants';

/* ==========================================================================
   FANNED CARD (Each individual project card in the deck)
   ========================================================================== */
const FannedCard = ({ project, index, total, isActive, onSelect, activeExists, isMobile }) => {
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  // Fan out from bottom-center (scaled down on mobile screens)
  const baseRotate = offset * (isMobile ? 3 : 5);
  const baseX = offset * (isMobile ? 22 : 55);
  const baseY = Math.abs(offset) * (isMobile ? 6 : 10);

  // When a card is selected → tight stack on the right
  const stackRotate = offset * 1.5;
  const stackX = offset * (isMobile ? 35 : 90);
  const stackY = Math.abs(offset) * 2;

  return (
    <motion.div
      layout
      onClick={() => !isActive && onSelect(index)}
      initial={false}
      animate={{
        opacity: isActive ? 0 : 1,
        scale: isActive ? 0.85 : 1,
        rotate: activeExists ? stackRotate : baseRotate,
        x: activeExists ? stackX : baseX,
        y: activeExists ? stackY : baseY,
        zIndex: activeExists ? index : total - index,
      }}
      whileHover={!isActive && !activeExists ? {
        scale: 1.04,
        y: baseY - 15,
        transition: { duration: 0.25 },
      } : {}}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      className="absolute top-0 left-0 w-[260px] sm:w-[320px] md:w-[360px] h-[380px] sm:h-[440px] md:h-[480px] cursor-pointer origin-bottom"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-[#0d1310] shadow-2xl flex flex-col hover:border-[#1e6f5c]/60 transition-colors">
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0d1310] border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-mono text-[#8E9793] uppercase tracking-[0.2em]">
            CHAPTER 0{index + 1}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono text-[#1e6f5c] uppercase tracking-[0.2em] font-bold">
            {project.category === 'ai_ml' || project.category === 'ml' ? 'AI/ML' : 'WEB'}
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden bg-black">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1310] via-transparent to-transparent" />
        </div>

        <div className="px-4 sm:px-5 py-4 sm:py-5 bg-[#0d1310] border-t border-white/[0.06]">
          <h3 className="text-sm sm:text-lg font-display font-bold text-[#F4F5F4] leading-tight line-clamp-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            {project.technologies.slice(0, 2).map((t) => (
              <span key={t} className="text-[9px] sm:text-[10px] font-mono text-[#8E9793] uppercase tracking-wider">
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
   MAIN COMPONENT (Restored Fanned Deck + Slide-Out Detail Drawer)
   ========================================================================== */
const ProjectsStory = () => {
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
  const hasActive = activeProjIndex !== null;

  return (
    <section
      id="projects"
      className="relative flex flex-col px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 pt-16 pb-24"
    >
      <div className="space-y-6">

        {/* CHAPTER HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#1e6f5c] tracking-widest uppercase font-bold">
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
            className="self-start sm:self-auto px-4.5 py-2.5 rounded-lg bg-[#1e6f5c] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#28967d] transition-colors shadow-md"
          >
            INDEX (ALL WORK) →
          </Link>
        </motion.div>

        {/* HINT TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: hasActive ? 0 : 1, y: hasActive ? -8 : 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-[10px] sm:text-xs font-mono text-[#8E9793] tracking-[0.25em] sm:tracking-[0.35em] uppercase pointer-events-none pt-2"
        >
          CLICK ON ANY CARD TO SLIDE OPEN TECHNICAL DETAILS
        </motion.p>

        {/* ================= MAIN STAGE ================= */}
        <div className="relative w-full h-[520px] sm:h-[600px] pt-4 flex items-center justify-center">

          {/* ---- DETAIL PANEL (LEFT / FULL ON MOBILE) ---- */}
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: -60, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: -15 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="absolute left-0 top-0 w-full lg:w-[44%] h-full z-40 bg-[#0d1310] border border-[#1e6f5c]/50 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-4 overflow-y-auto"
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <div className="flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-mono uppercase bg-[#1e6f5c]/15 border border-[#1e6f5c]/30 text-[#1e6f5c] px-2.5 py-1 rounded font-bold">
                    {currentProject.category === 'ai_ml' || currentProject.category === 'ml' ? 'AI / ML' : 'FULL-STACK WEB'}
                  </span>
                  <button
                    onClick={() => setActiveProjIndex(null)}
                    className="text-[10px] font-mono text-[#8E9793] hover:text-[#F4F5F4] transition-colors uppercase tracking-wider p-1 font-bold"
                  >
                    CLOSE ✕
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video shrink-0">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-3xl text-[#F4F5F4] leading-tight shrink-0">
                  {currentProject.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {currentProject.technologies.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-[#F4F5F4] uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-[#8E9793] text-xs sm:text-sm leading-relaxed font-light">
                  {currentProject.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 mt-auto border-t border-white/[0.08] shrink-0">
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F5F4] text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-[#1e6f5c]" />
                      SOURCE
                    </a>
                  )}
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e6f5c] hover:bg-[#28967d] text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors shadow-md"
                    >
                      LAUNCH DEMO
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- CARD DECK (CENTERED) ---- */}
          <motion.div
            animate={{
              x: hasActive ? (isMobile ? '10%' : '55%') : '0%',
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="relative w-[260px] sm:w-[320px] md:w-[360px] h-[380px] sm:h-[440px] md:h-[480px]"
            style={{ perspective: 1600, transformStyle: 'preserve-3d' }}
          >
            {featuredList.map((project, idx) => (
              <FannedCard
                key={project.id}
                project={project}
                index={idx}
                total={featuredList.length}
                isActive={activeProjIndex === idx}
                activeExists={hasActive}
                onSelect={setActiveProjIndex}
                isMobile={isMobile}
              />
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProjectsStory;