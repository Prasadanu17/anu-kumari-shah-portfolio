import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight } from "lucide-react";
import { projects } from "../utils/constants";

const FeaturedProjects = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  const activeProject = projects[activeProjectIndex];

  return (
    <section id="projects" className="py-24 bg-[#E6E2DD] relative border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-2">
              03 SELECTED WORK // TECHNICAL PROJECTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2825] uppercase font-display">
              SELECTED PROJECTS
            </h2>
          </div>
          <p className="text-xs font-mono text-[#66625C] max-w-xs uppercase leading-relaxed">
            CLICK ON ANY CARD TO SLIDE OPEN TECHNICAL DETAILS
          </p>
        </div>

        {/* Stacked / Fan-Out Interactive Project Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Card Stack / Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {projects.map((proj, idx) => {
              const isActive = idx === activeProjectIndex;
              return (
                <motion.div
                  key={proj.id}
                  onClick={() => setActiveProjectIndex(idx)}
                  whileHover={{ x: 6 }}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-[#FAF8F5] border-[#2A2825] shadow-md"
                      : "bg-[#ECE8E3] border-[#D3CEC7] hover:bg-[#FAF8F5]/60 hover:border-[#4A4641]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#66625C] font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#2A2825] text-sm md:text-base leading-tight">
                        {proj.title}
                      </h4>
                      <div className="flex gap-2 mt-1">
                        {proj.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono text-[#66625C] bg-[#E6E2DD] px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#2A2825] transition-transform ${isActive ? "rotate-90" : ""}`} />
                </motion.div>
              );
            })}
          </div>

          {/* Active Card Featured Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl p-8 md:p-10 shadow-lg space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D3CEC7] pb-4">
                  <span className="text-xs font-mono uppercase bg-[#2A2825] text-[#FAF8F5] px-3 py-1 rounded">
                    PROJECT 0{activeProjectIndex + 1}
                  </span>
                  <span className="text-xs font-mono text-[#66625C] uppercase">
                    {activeProject.category === "webdevelopment" ? "WEB ENGINEERING" : "MACHINE LEARNING / AI"}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#2A2825] tracking-tight font-display mb-3">
                    {activeProject.title}
                  </h3>
                  <p className="text-[#66625C] text-sm md:text-base leading-relaxed font-light">
                    {activeProject.description}
                  </p>
                </div>

                {/* Key Features */}
                {activeProject.keyFeatures && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono text-[#2A2825] uppercase tracking-wider block font-bold">
                      KEY WORK & HIGHLIGHTS
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {activeProject.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#66625C]">
                          <span className="w-1.5 h-1.5 bg-[#2A2825] rounded-full shrink-0"></span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-[#2A2825] uppercase tracking-wider block font-bold">
                    STACK & TOOLS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links / Open Action */}
                <div className="pt-6 border-t border-[#D3CEC7] flex flex-wrap items-center gap-4">
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#2A2825] text-[#FAF8F5] hover:bg-[#1A1918] text-xs font-mono font-bold tracking-wider uppercase rounded transition-colors flex items-center gap-2"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#ECE8E3] text-[#2A2825] border border-[#D3CEC7] hover:border-[#2A2825] text-xs font-mono font-bold tracking-wider uppercase rounded transition-colors flex items-center gap-2"
                    >
                      <span>REPOSITORY</span>
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedModalProject(activeProject)}
                    className="px-6 py-3 bg-transparent text-[#2A2825] border border-[#D3CEC7] hover:bg-[#E6E2DD] text-xs font-mono font-bold tracking-wider uppercase rounded transition-colors ml-auto"
                  >
                    SLIDE FULL DETAILS ↗
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

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
                    FULL PROJECT BREAKDOWN
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
                    TECHNOLOGIES USED
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
                      OPEN LIVE PREVIEW
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
