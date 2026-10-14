import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

/* ==========================================================================
   PROJECT DETAIL PANEL (Slides out when a card is clicked)
   ========================================================================== */
const ProjectDetailPanel = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -50, rotateY: -15 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative bg-[#171717] border border-[#8E8170]/40 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#C8B99F] hover:text-[#EAD9B8] transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Category Tag */}
      <span className="inline-block text-[10px] font-mono uppercase bg-[#EAD9B8]/10 border border-[#8E8170]/30 text-[#EAD9B8] px-3 py-1 rounded font-bold">
        {project.category === "ai_ml" || project.category === "ml" ? "AI / ML" : "FULL-STACK WEB"}
      </span>

      {/* Title */}
      <h3 className="text-xl sm:text-3xl font-bold text-[#EAD9B8] mt-5 font-display leading-tight">
        {project.title}
      </h3>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-4">
        {project.technologies.slice(0, 6).map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/[0.04] border border-[#8E8170]/25 text-[#F5EBDD] uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[#F5EBDD] text-xs sm:text-sm mt-4 leading-relaxed font-light">
        {project.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-[#8E8170]/20">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#8E8170]/40 bg-white/[0.04] text-[#F5EBDD] text-xs font-mono font-medium tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>SOURCE</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EAD9B8] hover:bg-[#d6c39f] text-[#171717] text-xs font-mono font-bold tracking-wider uppercase transition-colors"
          >
            <span>LAUNCH DEMO</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   FANNED CARD (Each individual project card in the deck)
   ========================================================================== */
const FannedCard = ({ project, index, total, isActive, onSelect, isMobile }) => {
  const rotationRange = 12;
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  const baseRotate = offset * (rotationRange / total) * (isMobile ? 1.2 : 2);
  const baseX = offset * (isMobile ? 15 : 30);
  const baseY = Math.abs(offset) * 8;
  const baseZ = total - index;

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
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
      className={`absolute top-0 left-0 w-[240px] sm:w-[285px] aspect-[3/4] cursor-pointer origin-bottom transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-[#EAD9B8] rounded-2xl shadow-[0_12px_36px_rgba(234,217,184,0.18)]'
          : 'hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`w-full h-full rounded-2xl overflow-hidden border bg-[#171717] shadow-2xl flex flex-col justify-between p-4 sm:p-5 transition-colors ${
        isActive ? 'border-[#EAD9B8]' : 'border-[#8E8170]/30 hover:border-[#EAD9B8]/50'
      }`}>
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-[#8E8170]/20 mb-3">
            <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider">
              PROJECT 0{index + 1}
            </span>
            <span className="text-[9px] font-mono text-[#C8B99F] uppercase font-bold">
              {project.category === "ai_ml" || project.category === "ml" ? "AI/ML" : "WEB"}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#EAD9B8] leading-tight line-clamp-2">
            {project.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#C8B99F] mt-2 line-clamp-3 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#8E8170]/20">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[8px] sm:text-[9px] font-mono text-[#C8B99F] uppercase bg-white/[0.04] px-1.5 py-0.5 rounded border border-[#8E8170]/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN PROJECTS COMPONENT
   ========================================================================== */
const Projects = () => {
  const { projects } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = (idx) => {
    setActiveIndex(idx);
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <div className="space-y-12 relative">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeIndex === null ? 1 : 0, y: activeIndex === null ? 0 : -10 }}
          transition={{ duration: 0.4 }}
          className="text-[10px] sm:text-xs font-mono text-[#8E9793] tracking-[0.25em] sm:tracking-[0.4em] uppercase"
        >
          CLICK ON ANY CARD TO SLIDE OPEN TECHNICAL DETAILS
        </motion.p>
      </div>

      <div className="relative min-h-[520px] sm:min-h-[600px] flex items-center justify-center">
        <div className="absolute left-0 top-0 w-full lg:w-[45%] z-40">
          <AnimatePresence mode="wait">
            {activeProject && (
              <ProjectDetailPanel
                key={activeProject.id}
                project={activeProject}
                onClose={handleClose}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          layout
          animate={{
            x: activeProject ? (isMobile ? "10%" : "25%") : "0%",
            scale: activeProject ? 0.7 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative w-full lg:w-[55%] h-[420px] sm:h-[500px] flex items-center justify-center"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          <div className="relative w-[250px] sm:w-[320px] h-[370px] sm:h-[420px]">
            {projects.map((project, idx) => (
              <FannedCard
                key={project.id}
                project={project}
                index={idx}
                total={projects.length}
                isActive={activeIndex === idx}
                onSelect={handleSelect}
                isMobile={isMobile}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;