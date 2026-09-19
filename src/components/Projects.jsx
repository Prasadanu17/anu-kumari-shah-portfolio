import React, { useState } from "react";
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
      className="relative bg-[#0E1017] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#8E95A5] hover:text-[#F4F4F6] transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Category Tag */}
      <span className="inline-block text-[10px] font-mono uppercase bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] px-3 py-1 rounded font-bold">
        {project.category === "webdevelopment" ? "FULL-STACK WEB" : "AI / ML"}
      </span>

      {/* Project Image */}
      {project.image && (
        <div className="mt-5 rounded-xl overflow-hidden border border-white/10 bg-[#0A0C11] aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F4F6] mt-5 font-display leading-tight">
        {project.title}
      </h3>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-4">
        {project.technologies.slice(0, 5).map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-[#E4E4E7] uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[#8E95A5] text-sm mt-4 leading-relaxed font-light">
        {project.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-white/[0.08]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] text-xs font-mono font-medium tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] text-xs font-mono font-medium tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
          >
            <span>LAUNCH</span>
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
const FannedCard = ({ project, index, total, isActive, onSelect }) => {
  // Calculate the fan rotation and offset based on position in stack
  const rotationRange = 12; // degrees
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;

  // When active, this card is hidden (it's shown in the detail panel)
  // When another card is active, this card is pushed to the right stack
  
  // Base positions (fanned out)
  const baseRotate = offset * (rotationRange / total) * 2;
  const baseX = offset * 30;
  const baseY = Math.abs(offset) * 8;
  const baseZ = total - index;

  return (
    <motion.div
      layout
      onClick={() => onSelect(index)}
      initial={false}
      animate={{
        // If this card is selected, hide it (moved to detail panel)
        // If another card is selected, stack them tighter to the right
        // Otherwise, show the fanned deck
        opacity: isActive ? 0 : 1,
        scale: isActive ? 0.8 : 1,
        rotate: isActive ? 0 : baseRotate,
        x: isActive ? 0 : baseX,
        y: isActive ? 0 : baseY,
        zIndex: baseZ,
      }}
      whileHover={{
        scale: 1.05,
        y: baseY - 20,
        rotate: baseRotate * 0.5,
        transition: { duration: 0.3 },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="absolute top-0 left-0 w-[280px] sm:w-[320px] aspect-[3/4] cursor-pointer origin-bottom"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-[#0E1017] shadow-2xl flex flex-col">
        {/* Project Image (top portion) */}
        <div className="relative flex-1 overflow-hidden bg-[#0A0C11]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017]/90 via-transparent to-transparent" />
        </div>

        {/* Project Info (bottom portion) */}
        <div className="p-4 bg-[#0E1017] border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono text-[#5D6473] uppercase tracking-wider">
              CHAPTER 0{index + 1}
            </span>
            <span className="text-[9px] font-mono text-[#38BDF8] uppercase">
              {project.category === "ml" ? "AI/ML" : "WEB"}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#F4F4F6] leading-tight line-clamp-2">
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

  const handleSelect = (idx) => {
    setActiveIndex(idx);
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <div className="space-y-12 relative">
      {/* Header Line with instruction text */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: activeIndex === null ? 1 : 0, y: activeIndex === null ? 0 : -10 }}
          transition={{ duration: 0.4 }}
          className="text-[10px] sm:text-xs font-mono text-[#8E95A5] tracking-[0.4em] uppercase"
        >
          CLICK ON ANY CARD TO SLIDE OPEN TECHNICAL DETAILS
        </motion.p>
      </div>

      {/* Main Layout: Detail Panel (Left) + Card Deck (Right) */}
      <div className="relative min-h-[600px] flex items-center justify-center">

        {/* Detail Panel - Slides in from left */}
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

        {/* Card Deck - Fanned layout on the right */}
        <motion.div
          layout
          animate={{
            // Move deck to the right when a project is selected
            x: activeProject ? "25%" : "25%",
            scale: activeProject ? 0.7 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative w-full lg:w-[55%] h-[500px] flex items-center justify-center"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          {/* The deck container - positioned in the center */}
          <div className="relative w-[320px] h-[420px]">
            {projects.map((project, idx) => (
              <FannedCard
                key={project.id}
                project={project}
                index={idx}
                total={projects.length}
                isActive={activeIndex === idx}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Projects;