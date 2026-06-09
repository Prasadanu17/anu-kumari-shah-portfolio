import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "../utils/constants";

const categories = [
  { id: "webdevelopment", label: "Web Development" },
  { id: "ml", label: "AI/ML" },
];

const ProjectCard = ({ project }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white dark:bg-slate-800 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
    </div>
    <div className="p-6">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
        {project.category === "webdevelopment" ? "Web Development" : "AI/ML"}
      </span>
      <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const FeaturedProjects = () => {
  const [activeCategory, setActiveCategory] = useState("webdevelopment");

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

        <div className="flex flex-wrap gap-3 mb-12">
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
