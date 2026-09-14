import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { projects } from "../utils/constants";

const webProjects = projects.filter((project) => project.category === "webdevelopment");
const mlProjects = projects.filter((project) => project.category === "ml");

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2A2825]/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#FAF8F5] border border-[#D3CEC7] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-2xl relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#E6E2DD] hover:bg-[#D3CEC7] text-[#2A2825] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-mono uppercase bg-[#2A2825] text-[#FAF8F5] px-3 py-1 rounded font-bold">
            {project.category === "webdevelopment" ? "WEB ENGINEERING" : "MACHINE LEARNING / AI"}
          </span>
          <h3 className="text-3xl font-bold text-[#2A2825] mt-4 font-display">
            {project.title}
          </h3>
        </div>

        <p className="text-[#66625C] text-base leading-relaxed font-light">
          {project.description}
        </p>

        {project.keyFeatures && (
          <div>
            <h4 className="text-xs font-mono text-[#2A2825] uppercase tracking-wider font-bold mb-3">
              KEY ARCHITECTURE & FEATURES
            </h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((f, i) => (
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
            {project.technologies.map((t) => (
              <span key={t} className="px-3 py-1 bg-[#E6E2DD] text-[#2A2825] text-xs font-mono rounded">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-[#D3CEC7]">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#2A2825] text-[#FAF8F5] text-xs font-mono font-bold uppercase rounded flex items-center gap-2"
            >
              <span>OPEN LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#E6E2DD] text-[#2A2825] text-xs font-mono font-bold uppercase rounded border border-[#D3CEC7] flex items-center gap-2"
            >
              <span>VIEW REPOSITORY</span>
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onOpen }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => onOpen(project)}
      className="bg-[#FAF8F5] border border-[#D3CEC7] hover:border-[#2A2825] rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-300 flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase bg-[#2A2825] text-[#FAF8F5] px-2.5 py-0.5 rounded font-bold">
            {project.category === "webdevelopment" ? "WEB ENGINEERING" : "AI / ML"}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#2A2825] font-display">
          {project.title}
        </h3>

        <p className="text-[#66625C] text-xs leading-relaxed font-light line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E6E2DD] text-[#2A2825]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-6 border-t border-[#D3CEC7] flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-[#2A2825]">DETAILS ↗</span>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-12 bg-[#E6E2DD]">
      <div className="container mx-auto px-6 max-w-7xl space-y-16">
        <div>
          <span className="text-xs font-mono text-[#66625C] uppercase tracking-widest block mb-2">
            03 SELECTED WORK // ALL PROJECTS
          </span>
          <h2 className="text-4xl font-bold text-[#2A2825] uppercase font-display">
            ALL ENGINEERING PROJECTS
          </h2>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-[#2A2825] font-display uppercase mb-6 border-b border-[#D3CEC7] pb-3">
              Web Engineering Projects
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {webProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#2A2825] font-display uppercase mb-6 border-b border-[#D3CEC7] pb-3">
              Artificial Intelligence & ML Projects
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {mlProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;