import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-slate-900/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 relative scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Project Image/Visual */}
          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:hidden" />
          </div>

          {/* Project Text Content */}
          <div className="md:w-1/2 p-8 md:p-12 space-y-8">
            <div>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full">
                {project.category}
              </span>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-4 leading-tight">
                {project.title}
              </h3>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Overview</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {project.keyFeatures && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Work Done</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {project.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center font-bold rounded-2xl transition-all shadow-lg shadow-primary-500/25"
                >
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-center font-bold rounded-2xl transition-all hover:bg-slate-800 dark:hover:bg-slate-100"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onOpen }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      onClick={() => onOpen(project)}
      className="group cursor-pointer relative bg-slate-50 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl hover:border-primary-500/30 transition-all duration-400 transform-gpu will-change-transform hover:scale-105 hover:-rotate-3"
    >
      {/* Image with overlay gradient & reveal title */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h4 className="text-2xl font-bold text-white drop-shadow-md">
            {project.title}
          </h4>
          <p className="text-sm text-white/80 mt-1.5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
            {project.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-4 space-y-5">
        <div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/70 dark:bg-slate-700/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-600/60 text-slate-800 dark:text-slate-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
            View Case Study
          </span>
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-28 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-100/60 dark:bg-primary-950/40 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            All Projects
          </h2>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore every project across Web Development and AI/ML, including the latest live and research work.
          </p>
        </motion.div>

        <div className="space-y-20">
          <div>
            <div className="mb-8">
              <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">Web Development Projects</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl">
                A curated collection of full-stack and frontend projects showcasing real client work and polished web experiences.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {webProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">AI/ML Projects</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl">
                AI/ML work demonstrating NLP, predictive analytics, and intelligent automation using Python-based data science tools.
              </p>
            </div>
            {mlProjects.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-3">
                {mlProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={(p) => setSelectedProject(p)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-slate-500">More exciting AI/ML projects coming soon...</p>
            )}
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