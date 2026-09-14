import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { projects } from "../utils/constants";

const FeaturedProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  const total = projects.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section id="projects" className="py-24 bg-[#E6E2DD] relative border-t border-[#D3CEC7] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-2">
              03 SELECTED WORK // TECHNICAL PROJECTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2825] uppercase font-display">
              STACKED PROJECT DECK
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs font-mono text-[#66625C] uppercase leading-relaxed hidden sm:block">
              FAN-OUT DECK INTERACTION • CLICK CARDS TO BRING FORWARD
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#2A2825] text-[#2A2825] flex items-center justify-center hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-colors"
                title="Previous Card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#2A2825] text-[#FAF8F5] flex items-center justify-center hover:bg-[#1A1918] transition-colors shadow-md"
                title="Next Card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Stacked / Fan-Out Physical Card Deck ── */}
        <div className="relative min-h-[580px] flex items-center justify-center py-8">
          <div className="relative w-full max-w-3xl h-[520px] flex items-center justify-center">
            {projects.map((proj, idx) => {
              // Calculate index relative to active card
              const offset = (idx - activeIndex + total) % total;
              const isActive = offset === 0;

              // Fan out rotation offsets: active=0deg, back cards rotate -4deg, -8deg, 4deg, etc.
              let rotate = 0;
              let translateY = 0;
              let scale = 1;
              let zIndex = total - offset;
              let opacity = 1;

              if (offset === 0) {
                rotate = 0;
                translateY = 0;
                scale = 1;
              } else if (offset === 1) {
                rotate = 4;
                translateY = 16;
                scale = 0.95;
              } else if (offset === 2) {
                rotate = -5;
                translateY = 32;
                scale = 0.9;
              } else if (offset === total - 1) {
                rotate = -4;
                translateY = 12;
                scale = 0.96;
              } else {
                rotate = (offset % 2 === 0 ? 1 : -1) * (offset * 3);
                translateY = offset * 18;
                scale = Math.max(0.8, 1 - offset * 0.05);
                if (offset > 3) opacity = 0; // Hide deep stack items
              }

              return (
                <motion.div
                  key={proj.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    rotate,
                    y: translateY,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    transformOrigin: "center center",
                  }}
                  className={`bg-[#FAF8F5] border rounded-2xl p-8 md:p-10 shadow-xl cursor-pointer transition-shadow duration-300 select-none ${
                    isActive
                      ? "border-[#2A2825] shadow-2xl ring-1 ring-[#2A2825]/10"
                      : "border-[#D3CEC7] hover:border-[#4A4641] hover:shadow-2xl"
                  }`}
                >
                  <div className="flex flex-col h-full justify-between space-y-6">

                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D3CEC7] pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono uppercase bg-[#2A2825] text-[#FAF8F5] px-3 py-1 rounded font-bold">
                          0{idx + 1} / 0{total}
                        </span>
                        <span className="text-xs font-mono text-[#66625C] uppercase tracking-wider font-semibold">
                          {proj.category === "webdevelopment" ? "WEB ENGINEERING" : "MACHINE LEARNING / AI"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#66625C]" />
                        <span className="text-[11px] font-mono text-[#66625C] uppercase">
                          {isActive ? "ACTIVE CARD" : "STACKED DECK"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#2A2825] font-display">
                        {proj.title}
                      </h3>
                      <p className="text-[#66625C] text-xs md:text-sm leading-relaxed font-light line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    {proj.keyFeatures && (
                      <div className="space-y-2 hidden sm:block">
                        <span className="text-[11px] font-mono text-[#2A2825] uppercase tracking-wider font-bold block">
                          KEY ARCHITECTURE
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {proj.keyFeatures.slice(0, 4).map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#66625C]">
                              <span className="w-1.5 h-1.5 bg-[#2A2825] rounded-full shrink-0"></span>
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] text-[11px] font-mono font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-[#D3CEC7] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex gap-3">
                        {proj.demo && (
                          <a
                            href={proj.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2.5 bg-[#2A2825] text-[#FAF8F5] text-xs font-mono font-bold tracking-wider uppercase rounded hover:bg-[#1A1918] transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>LIVE DEMO</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2.5 bg-[#E6E2DD] text-[#2A2825] text-xs font-mono font-bold tracking-wider uppercase rounded border border-[#D3CEC7] hover:border-[#2A2825] transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>REPO</span>
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModalProject(proj);
                        }}
                        className="px-4 py-2.5 bg-transparent text-[#2A2825] text-xs font-mono font-bold uppercase rounded border border-[#D3CEC7] hover:bg-[#E6E2DD] transition-colors ml-auto"
                      >
                        SLIDE DETAILS ↗
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Deck Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-[#2A2825]" : "w-2 bg-[#D3CEC7] hover:bg-[#66625C]"
              }`}
              title={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Detailed Modal Slide Reveal */}
        <AnimatePresence>
          {selectedModalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2825]/60 backdrop-blur-md"
              onClick={() => setSelectedModalProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-[#FAF8F5] border border-[#D3CEC7] w-full max-w-3xl rounded-2xl p-8 shadow-2xl relative space-y-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[#E6E2DD] hover:bg-[#D3CEC7] text-[#2A2825] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <span className="text-xs font-mono uppercase bg-[#2A2825] text-[#FAF8F5] px-3 py-1 rounded">
                    FULL TECHNICAL BREAKDOWN
                  </span>
                  <h3 className="text-3xl font-bold text-[#2A2825] mt-4 font-display">
                    {selectedModalProject.title}
                  </h3>
                </div>

                <p className="text-[#66625C] text-base leading-relaxed font-light">
                  {selectedModalProject.description}
                </p>

                {selectedModalProject.keyFeatures && (
                  <div>
                    <h4 className="text-xs font-mono text-[#2A2825] uppercase tracking-wider font-bold mb-3">
                      KEY ARCHITECTURE & FEATURES
                    </h4>
                    <ul className="space-y-2">
                      {selectedModalProject.keyFeatures.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#66625C]">
                          <span className="w-1.5 h-1.5 bg-[#2A2825] rounded-full"></span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono text-[#2A2825] uppercase tracking-wider font-bold mb-3">
                    STACK & TOOLS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModalProject.technologies.map((t) => (
                      <span key={t} className="px-3 py-1 bg-[#E6E2DD] text-[#2A2825] text-xs font-mono rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#D3CEC7]">
                  {selectedModalProject.demo && (
                    <a
                      href={selectedModalProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#2A2825] text-[#FAF8F5] text-xs font-mono font-bold uppercase rounded"
                    >
                      OPEN LIVE DEMO
                    </a>
                  )}
                  {selectedModalProject.github && (
                    <a
                      href={selectedModalProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#E6E2DD] text-[#2A2825] text-xs font-mono font-bold uppercase rounded border border-[#D3CEC7]"
                    >
                      VIEW REPOSITORY
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default FeaturedProjects;
