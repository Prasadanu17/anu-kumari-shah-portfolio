import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { projects } from "../utils/constants";

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
      className="relative bg-[#0d1310] border border-[#1e6f5c]/40 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#8E9793] hover:text-[#F4F5F4] transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Category Tag */}
      <span className="inline-block text-[10px] font-mono uppercase bg-[#1e6f5c]/15 border border-[#1e6f5c]/30 text-[#1e6f5c] px-3 py-1 rounded font-bold">
        {project.category === "ai_ml" || project.category === "ml" ? "AI / ML" : "FULL-STACK WEB"}
      </span>

      {/* Project Image */}
      {project.image && (
        <div className="mt-5 rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
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
      <h3 className="text-xl sm:text-3xl font-bold text-[#F4F5F4] mt-5 font-display leading-tight">
        {project.title}
      </h3>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-4">
        {project.technologies.slice(0, 6).map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-[#F4F5F4] uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[#8E9793] text-xs sm:text-sm mt-4 leading-relaxed font-light">
        {project.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-white/[0.08]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F5F4] text-xs font-mono font-medium tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e6f5c] hover:bg-[#28967d] text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors"
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
        opacity: isActive ? 0 : 1,
        scale: isActive ? 0.8 : 1,
        rotate: isActive ? 0 : baseRotate,
        x: isActive ? 0 : baseX,
        y: isActive ? 0 : baseY,
        zIndex: baseZ,
      }}
      whileHover={{
        scale: 1.04,
        y: baseY - 15,
        rotate: baseRotate * 0.5,
        transition: { duration: 0.3 },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="absolute top-0 left-0 w-[250px] sm:w-[320px] aspect-[3/4] cursor-pointer origin-bottom"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-[#0d1310] shadow-2xl flex flex-col hover:border-[#1e6f5c]/60 transition-colors">
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

        <div className="p-4 bg-[#0d1310] border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono text-[#8E9793] uppercase tracking-wider">
              PROJECT 0{index + 1}
            </span>
            <span className="text-[9px] font-mono text-[#1e6f5c] uppercase font-bold">
              {project.category === "ai_ml" || project.category === "ml" ? "AI/ML" : "WEB"}
            </span>
          </div>
          <h3 className="text-xs sm:text-base font-bold text-[#F4F5F4] leading-tight line-clamp-2">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN PROJECTS COMPONENT
   ========================================================================== */
const Projects = () => {
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