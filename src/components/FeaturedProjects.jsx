import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "../utils/constants";

const categories = [
  { id: "webdevelopment", label: "Web Development" },
  { id: "ml", label: "AI/ML" },
];

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
                {project.category === "webdevelopment" ? "Web Development" : "AI/ML"}
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

const ProjectCard = ({ project, onOpen }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="group relative overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Top */}
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
            {project.category === "webdevelopment" ? "Web Development" : "AI/ML"}
          </span>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white leading-tight">{project.title}</h3>
            <p className="mt-3 text-sm text-slate-200 line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex items-end justify-between">
            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs text-slate-400 pl-1">+{project.technologies.length - 3} more</span>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onOpen(project)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition group/btn"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const FeaturedProjects = () => {
  const [activeCategory, setActiveCategory] = useState("webdevelopment");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.category === activeCategory).slice(0, 3);
  }, [activeCategory]);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950" id="projects">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-2">Featured Projects</h2>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400">
              Browse the top 3 projects in Web Development or AI/ML. Click "View All Projects" to see the full library.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 hover:bg-primary-700 transition-all"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition border-2 ${
                activeCategory === category.id
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-primary-500 hover:text-primary-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-primary-400"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
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
    </section>
  );
};

export default FeaturedProjects;
