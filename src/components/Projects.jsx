import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Sparkles } from "lucide-react";
import { projects } from "../utils/constants";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-[#0E1017] border border-white/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#8E95A5] hover:text-[#F4F4F6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[11px] font-mono uppercase bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] px-3 py-1 rounded font-bold">
            {project.category === "webdevelopment" ? "FULL-STACK WEB ENGINEERING" : "AI / MACHINE LEARNING"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F4F6] mt-4 font-display">
            {project.title}
          </h3>
        </div>

        <p className="text-[#8E95A5] text-sm sm:text-base leading-relaxed font-light">
          {project.description}
        </p>

        {project.keyFeatures && (
          <div className="border-t border-white/[0.08] pt-4 space-y-3">
            <h4 className="text-xs font-mono text-[#E4E4E7] uppercase tracking-wider font-bold">
              SYSTEM CAPABILITIES & ARCHITECTURE:
            </h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-mono text-[#8E95A5]">
                  <span className="text-[#38BDF8] mt-0.5">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-white/[0.08] pt-4 space-y-2">
          <h4 className="text-xs font-mono text-[#E4E4E7] uppercase tracking-wider font-bold">
            TECHNOLOGY STACK:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono rounded bg-white/[0.03] border border-white/[0.08] text-[#E4E4E7]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-4 flex items-center gap-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#38BDF8] text-[#07080B] text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#7DD3FC] transition-colors"
            >
              <span>EXPLORE LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
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
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-4">
        {[
          { id: "all", label: "ALL WORK" },
          { id: "ml", label: "AI & MACHINE LEARNING" },
          { id: "webdevelopment", label: "FULL-STACK WEB" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
              filter === tab.id
                ? "bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#38BDF8] font-bold"
                : "bg-white/[0.02] border-white/[0.06] text-[#8E95A5] hover:text-[#F4F4F6]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-2xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md overflow-hidden hover:border-[#38BDF8]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Project Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0C11]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#5D6473]">
                  <span>CHAPTER 0{idx + 1}</span>
                  <span className="text-[#38BDF8] uppercase">
                    {project.category === "ml" ? "AI/ML" : "WEB"}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-[#F4F4F6] group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-[#8E95A5] leading-relaxed font-light line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#8E95A5]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#5D6473]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(project)}
                className="text-xs font-mono text-[#38BDF8] hover:underline uppercase"
              >
                SPECIFICATIONS →
              </button>

              <div className="flex items-center gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8E95A5] hover:text-[#F4F4F6] transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8E95A5] hover:text-[#F4F4F6] transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;