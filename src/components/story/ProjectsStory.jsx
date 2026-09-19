import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../utils/constants';

/* ==========================================================================
   FANNED CARD
   ========================================================================== */
const FannedCard = ({ project, index, total, isActive, onSelect, activeExists }) => {
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  // Fan out from bottom-center (matches reference image)
  const baseRotate = offset * 5;
  const baseX = offset * 55;
  const baseY = Math.abs(offset) * 10;

  // When a card is selected → tight stack on the right
  const stackRotate = offset * 1.5;
  const stackX = offset * 90;
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
        scale: 1.05,
        y: baseY - 20,
        transition: { duration: 0.25 },
      } : {}}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      className="absolute top-0 left-0 w-[320px] sm:w-[360px] h-[440px] sm:h-[480px] cursor-pointer origin-bottom"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-[#0E1017] shadow-2xl flex flex-col hover:border-[#38BDF8]/60 transition-colors">
        <div className="px-5 py-3.5 bg-[#0E1017] border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-[0.2em]">
            CHAPTER 0{index + 1}
          </span>
          <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-[0.2em] font-bold">
            {project.category === 'ml' ? 'AI/ML' : 'WEB'}
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden bg-[#0A0C11]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent" />
        </div>

        <div className="px-5 py-5 bg-[#0E1017] border-t border-white/[0.06]">
          <h3 className="text-base sm:text-lg font-display font-bold text-[#F4F4F6] leading-tight line-clamp-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            {project.technologies.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider">
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
   MAIN COMPONENT
   ========================================================================== */
const ProjectsStory = () => {
  const [activeProjIndex, setActiveProjIndex] = useState(null);

  const featuredList = projects.slice(0, 5);
  const currentProject = activeProjIndex !== null ? featuredList[activeProjIndex] : null;
  const hasActive = activeProjIndex !== null;

  return (
    <section
      id="projects"
      className="relative flex flex-col px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 pt-8 pb-24"
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
              <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase font-bold">
                04 / PROJECTS
              </span>
              <div className="h-px w-12 bg-[#38BDF8]/40" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F4F6] tracking-tight uppercase">
              SELECTED WORK
            </h2>
          </div>

          <Link
            to="/projects"
            className="self-start sm:self-auto px-4 py-2 rounded-lg bg-[#38BDF8] text-[#07080B] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#7DD3FC] transition-colors shadow-md"
          >
            INDEX (ALL WORK) →
          </Link>
        </motion.div>

        {/* HINT TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: hasActive ? 0 : 1, y: hasActive ? -8 : 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-[10px] sm:text-xs font-mono text-[#8E95A5] tracking-[0.35em] uppercase pointer-events-none pt-2"
        >
          CLICK ON ANY CARD TO SLIDE OPEN TECHNICAL DETAILS
        </motion.p>

        {/* ================= MAIN STAGE ================= */}
        <div className="relative w-full h-[560px] sm:h-[600px] pt-4 flex items-center justify-center">

          {/* ---- DETAIL PANEL (LEFT) ---- */}
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: -60, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: -15 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="absolute left-0 top-0 w-full lg:w-[42%] h-full z-40 bg-[#0E1017] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col gap-4 overflow-y-auto"
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <div className="flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-mono uppercase bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] px-2.5 py-1 rounded font-bold">
                    {currentProject.category === 'ml' ? 'AI / ML' : 'FULL-STACK WEB'}
                  </span>
                  <button
                    onClick={() => setActiveProjIndex(null)}
                    className="text-[10px] font-mono text-[#8E95A5] hover:text-[#F4F4F6] transition-colors uppercase tracking-wider"
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

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4F4F6] leading-tight shrink-0">
                  {currentProject.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {currentProject.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-[#E4E4E7] uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-[#8E95A5] text-xs sm:text-sm leading-relaxed font-light">
                  {currentProject.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 mt-auto border-t border-white/[0.08] shrink-0">
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      SOURCE
                    </a>
                  )}
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
                    >
                      LAUNCH
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- CARD DECK (CENTERED) ---- */}
          <motion.div
            animate={{
              x: hasActive ? '55%' : '0%',
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="relative w-[360px] h-[480px]"
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
              />
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProjectsStory;