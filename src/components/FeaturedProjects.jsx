import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, Sparkles, Layers } from "lucide-react";
import { projects } from "../utils/constants";

const FeaturedProjects = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);

  const total = projects.length;
  const currentProject = projects[activeIdx];

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + total) % total);

  return (
    <section id="projects" className="py-28 sm:py-36 relative">

      {/* ── Cinematic section divider ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="story-container">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>04 / SELECTED WORK // PROJECT STORYTELLING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
              ENGINEERED SYSTEMS
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-[#8E95A5] uppercase tracking-wider hidden sm:block">
              CHAPTER {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/25 flex items-center justify-center transition-all duration-200"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/25 flex items-center justify-center transition-all duration-200"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Project Chapter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/[0.06]">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200 border ${
                activeIdx === idx
                  ? "bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#38BDF8] font-bold"
                  : "bg-white/[0.02] border-white/[0.06] text-[#8E95A5] hover:text-[#F4F4F6] hover:border-white/15"
              }`}
            >
              <span className="text-[10px] text-[#5D6473] mr-1.5 font-normal">
                0{idx + 1}
              </span>
              {proj.title.length > 22 ? `${proj.title.substring(0, 22)}...` : proj.title}
            </button>
          ))}
        </div>

        {/* ── Large Project Storytelling Chapter Stage ── */}
        <div className="relative min-h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-2xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md shadow-2xl"
            >
              {/* Left Column: Narrative & Technical Blueprint (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-[#38BDF8]/60">
                    {String(activeIdx + 1).padStart(2, "0")}
                  </span>
                  <div className="h-4 w-px bg-white/15" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8E95A5]">
                    {currentProject.category === "ml" ? "AI / MACHINE LEARNING" : "FULL-STACK WEB"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#F4F4F6] leading-tight">
                  {currentProject.title}
                </h3>

                <p className="text-sm sm:text-base text-[#8E95A5] leading-relaxed font-light">
                  {currentProject.description}
                </p>

                {/* Key Architecture Features */}
                {currentProject.keyFeatures && (
                  <div className="space-y-2 pt-1 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-[#5D6473] tracking-wider block">
                      SYSTEM CAPABILITIES:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#E4E4E7]">
                      {currentProject.keyFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#38BDF8] mt-0.5">•</span>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technology Stack Tags */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded text-xs font-mono text-[#8E95A5] bg-white/[0.03] border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.06]">
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#38BDF8] text-[#07080B] hover:bg-[#7DD3FC] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-md shadow-[#38BDF8]/15"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/30 text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE REPOSITORY</span>
                    </a>
                  )}

                  <button
                    onClick={() => setModalProject(currentProject)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-[#8E95A5] hover:text-[#F4F4F6] transition-colors uppercase ml-auto"
                  >
                    <span>DETAILS</span>
                    <span className="text-[#38BDF8]">↗</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Clean Rectangular Project Visual Frame (6 cols) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#07080B] group shadow-2xl">
                  {/* Subtle Top Bar */}
                  <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#8E95A5]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8]/80" />
                      <span className="uppercase tracking-wider">PREVIEW // RUNTIME</span>
                    </div>
                    <span>SYS_ID: 0{activeIdx + 1}</span>
                  </div>

                  {/* Project Image Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0C11]">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="px-4 py-3 bg-[#0E1017] border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#8E95A5]">
                    <span>DEPLOYED INTERFACE</span>
                    <span className="text-[#38BDF8]">100% OPERATIONAL</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ── Deep Dive Project Modal ── */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0E1017] text-[#F4F4F6] p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-lg border border-white/10 bg-white/[0.04] text-[#8E95A5] hover:text-[#F4F4F6] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest block">
                  SYSTEM ARCHITECTURE SPECIFICATION
                </span>
                <h3 className="text-2xl font-display font-bold text-[#F4F4F6]">
                  {modalProject.title}
                </h3>
              </div>

              <p className="text-sm text-[#8E95A5] leading-relaxed font-light">
                {modalProject.description}
              </p>

              {modalProject.keyFeatures && (
                <div className="space-y-3 border-t border-white/[0.08] pt-4">
                  <h4 className="text-xs font-mono uppercase text-[#E4E4E7] tracking-wider">
                    Core Technical Deliverables
                  </h4>
                  <ul className="space-y-2 text-xs font-mono text-[#8E95A5]">
                    {modalProject.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#38BDF8]">→</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2 border-t border-white/[0.08] pt-4">
                <h4 className="text-xs font-mono uppercase text-[#E4E4E7] tracking-wider">
                  Technology Pipeline
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modalProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-[#E4E4E7]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08]">
                {modalProject.demo && (
                  <a
                    href={modalProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#38BDF8] text-[#07080B] text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#7DD3FC] transition-colors"
                  >
                    <span>EXPLORE LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {modalProject.github && (
                  <a
                    href={modalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] text-xs font-mono font-medium tracking-wider uppercase hover:bg-white/[0.08] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProjects;
