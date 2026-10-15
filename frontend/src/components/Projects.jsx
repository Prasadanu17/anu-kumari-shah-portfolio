import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  X,
  Brain,
  Globe,
  Terminal,
  Cpu,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  ArrowUpRight,
  Eye,
  Activity,
  Code2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/* ==========================================================================
   PROJECT DETAIL INSPECTION MODAL
   ========================================================================== */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const isAi = project.category === 'ai_ml' || project.category === 'ml';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-[#171717] border-2 border-[#EAD9B8]/60 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(234,217,184,0.15)] space-y-4 my-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
          aria-label="Close Project Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-2.5 border-b border-[#8E8170]/25 pb-3 pr-8">
          <div className="p-2 rounded-xl bg-[#EAD9B8]/15 border border-[#EAD9B8]/40 text-[#EAD9B8]">
            {isAi ? <Brain className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#EAD9B8]/10 text-[#EAD9B8] border border-[#8E8170]/30 font-bold">
                {project.tag || (isAi ? 'AI / ML PROJECT' : 'FULL-STACK WEB')}
              </span>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED PRODUCTION
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-display font-extrabold text-[#EAD9B8] mt-1">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Screenshot Banner if available */}
        {project.image && (
          <div className="relative rounded-xl overflow-hidden border border-[#8E8170]/40 max-h-[260px] bg-black/50 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full max-h-[260px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Description */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block font-semibold">
            SYSTEM ARCHITECTURE & OVERVIEW
          </span>
          <p className="text-[#F5EBDD] text-xs sm:text-sm leading-relaxed font-light bg-black/25 p-3 rounded-xl border border-white/5">
            {project.description}
          </p>
        </div>

        {/* Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block font-semibold">
              CORE TECHNICAL HIGHLIGHTS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-[#8E8170]/20 text-[11px] text-[#C8B99F]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-[#C8B99F] uppercase tracking-wider block font-semibold">
            ENGINEERING STACK
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/[0.04] border border-[#8E8170]/30 text-[#EAD9B8]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-[#8E8170]/25 gap-3">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#8E8170]/40 bg-white/[0.04] text-[#F5EBDD] text-xs font-mono font-medium hover:bg-white/[0.08] hover:border-[#EAD9B8]/50 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE CODE</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EAD9B8] hover:bg-[#d6c39f] text-[#171717] text-xs font-mono font-bold transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <span>LAUNCH PLATFORM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#C8B99F] hover:text-[#EAD9B8] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ==========================================================================
   PREMIUM PROJECT CARD
   ========================================================================== */
const ProjectCard = ({ project, index, onInspect }) => {
  const isAi = project.category === 'ai_ml' || project.category === 'ml';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-2xl bg-[#181818]/80 border border-white/[0.08] hover:border-[#EAD9B8]/50 transition-all duration-300 shadow-xl hover:shadow-[0_16px_40px_rgba(234,217,184,0.10)] flex flex-col justify-between overflow-hidden backdrop-blur-xl"
    >
      {/* Top Image Preview Banner */}
      <div
        onClick={() => onInspect(project)}
        className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/60 cursor-pointer border-b border-white/[0.06]"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#131313]">
            {isAi ? (
              <Brain className="w-12 h-12 text-[#8E8170]/40" />
            ) : (
              <Globe className="w-12 h-12 text-[#8E8170]/40" />
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-85" />

        {/* Hover Inspect Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-[#EAD9B8] text-[#171717] font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>INSPECT SPECS</span>
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[9px] font-mono uppercase bg-[#171717]/85 border border-[#8E8170]/40 text-[#EAD9B8] font-semibold backdrop-blur-md">
            {project.tag || (isAi ? 'AI/ML' : 'FULL-STACK')}
          </span>

          <span className="px-2 py-0.5 rounded-md text-[8.5px] font-mono bg-black/75 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            DEPLOYED
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Title */}
          <h3
            onClick={() => onInspect(project)}
            className="text-base sm:text-lg font-display font-bold text-[#EAD9B8] group-hover:text-[#F5EBDD] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-[#C8B99F] font-light leading-relaxed mt-1.5 line-clamp-3">
            {project.description}
          </p>

          {/* Key Features Bullet Points */}
          {project.keyFeatures && (
            <div className="mt-3 pt-3 border-t border-white/[0.05] space-y-1">
              {project.keyFeatures.slice(0, 2).map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono text-[#8E8170]">
                  <span className="text-[#EAD9B8]">•</span>
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1 pt-2 pb-3">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[8.5px] font-mono bg-white/[0.03] border border-white/[0.08] text-[#C8B99F]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono text-[#8E8170] bg-white/[0.02]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] gap-2">
            <button
              onClick={() => onInspect(project)}
              className="text-[10px] font-mono text-[#C8B99F] hover:text-[#EAD9B8] flex items-center gap-1 transition-colors"
            >
              <Eye className="w-3 h-3" />
              <span>DETAILS</span>
            </button>

            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/[0.04] border border-[#8E8170]/30 text-[#C8B99F] hover:text-[#EAD9B8] hover:border-[#EAD9B8]/50 transition-colors"
                  aria-label={`Source code for ${project.title}`}
                  title="Source Code"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-[#EAD9B8]/10 hover:bg-[#EAD9B8] text-[#EAD9B8] hover:text-[#171717] border border-[#EAD9B8]/30 text-[10px] font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <span>DEMO</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN REDESIGNED PROJECTS COMPONENT
   ========================================================================== */
const Projects = () => {
  const { projects } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'ai' | 'web'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Split into AI and Full-Stack Web
  const aiProjects = useMemo(() => {
    return projects.filter((p) => p.category === 'ai_ml' || p.category === 'ml');
  }, [projects]);

  const webProjects = useMemo(() => {
    return projects.filter((p) => p.category === 'web' || p.category === 'fullstack');
  }, [projects]);

  // Filtered lists
  const filteredAi = useMemo(() => {
    if (!searchQuery.trim()) return aiProjects;
    const q = searchQuery.toLowerCase();
    return aiProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [aiProjects, searchQuery]);

  const filteredWeb = useMemo(() => {
    if (!searchQuery.trim()) return webProjects;
    const q = searchQuery.toLowerCase();
    return webProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }, [webProjects, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* ── Filter & Search Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl bg-[#141414]/90 border border-white/[0.08] backdrop-blur-xl">
        {/* Navigation Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[#EAD9B8] text-[#171717] shadow-md'
                : 'text-[#C8B99F] hover:text-[#F5EBDD] hover:bg-white/5'
            }`}
          >
            ALL PROJECTS ({projects.length})
          </button>

          <button
            onClick={() => setActiveFilter('ai')}
            className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'ai'
                ? 'bg-[#EAD9B8] text-[#171717] shadow-md'
                : 'text-[#C8B99F] hover:text-[#F5EBDD] hover:bg-white/5'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI & ML ({aiProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('web')}
            className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'web'
                ? 'bg-[#EAD9B8] text-[#171717] shadow-md'
                : 'text-[#C8B99F] hover:text-[#F5EBDD] hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>FULL-STACK WEB ({webProjects.length})</span>
          </button>
        </div>

        {/* Instant Search Bar */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8E8170] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech, model, keyword..."
            className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-[#F5EBDD] placeholder-[#8E8170] focus:outline-none focus:border-[#EAD9B8]/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8170] hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ── SECTION 01: AI & MACHINE LEARNING PROJECTS ── */}
      {(activeFilter === 'all' || activeFilter === 'ai') && (
        <section id="ai-projects" className="space-y-5">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#8E8170]/25 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-[#EAD9B8]" />
                  01 // INTELLIGENT SYSTEMS & RESEARCH
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#EAD9B8] uppercase tracking-tight mt-0.5">
                AI & MACHINE LEARNING PROJECTS
              </h2>
              <p className="text-[11px] sm:text-xs text-[#C8B99F] font-light max-w-xl mt-0.5">
                NLP semantic resume matching, cardiovascular clinical risk modeling, and TensorFlow deep neural classification systems.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-lg text-[9px] font-mono bg-[#EAD9B8]/10 border border-[#EAD9B8]/30 text-[#EAD9B8] font-bold">
                {filteredAi.length} SYSTEMS
              </span>
            </div>
          </div>

          {/* AI Projects Grid */}
          {filteredAi.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAi.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onInspect={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono text-[#8E8170]">
              No AI projects found matching "{searchQuery}"
            </div>
          )}
        </section>
      )}

      {/* ── SECTION 02: FULL-STACK WEBSITE PROJECTS ── */}
      {(activeFilter === 'all' || activeFilter === 'web') && (
        <section id="fullstack-projects" className="space-y-5 pt-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#8E8170]/25 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#EAD9B8]" />
                  02 // FULL-STACK WEB ARCHITECTURE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#EAD9B8] uppercase tracking-tight mt-0.5">
                FULL-STACK WEBSITE PROJECTS
              </h2>
              <p className="text-[11px] sm:text-xs text-[#C8B99F] font-light max-w-xl mt-0.5">
                Commercial enterprise client platforms, homestay tourism booking portals, and luxury interior design portfolio architectures.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-lg text-[9px] font-mono bg-[#EAD9B8]/10 border border-[#EAD9B8]/30 text-[#EAD9B8] font-bold">
                {filteredWeb.length} PLATFORMS
              </span>
            </div>
          </div>

          {/* Web Projects Grid */}
          {filteredWeb.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWeb.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onInspect={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono text-[#8E8170]">
              No full-stack website projects found matching "{searchQuery}"
            </div>
          )}
        </section>
      )}

      {/* ── Summary Metrics Strip ── */}
      <div className="rounded-2xl bg-[#141414]/75 border border-white/[0.07] px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[9.5px] sm:text-[10px] font-mono text-[#C8B99F] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#EAD9B8] font-bold">TECHNICAL PORTFOLIO VERIFIED:</span>
          <span>SBERT • TensorFlow • Scikit-Learn • React.js • PHP MVC • MySQL</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-semibold">6 Shipped Projects</span>
          <span className="text-[#8E8170]">•</span>
          <span className="text-[#EAD9B8]">100% Production Code</span>
        </div>
      </div>

      {/* ── Interactive Project Detail Modal ── */}
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