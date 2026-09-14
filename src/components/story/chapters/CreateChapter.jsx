import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Brain, Activity } from 'lucide-react';
import { projects } from '../../../utils/constants';

const CreateChapter = () => {
  const mlProjects = projects.filter((p) => p.category === 'ml');

  return (
    <section id="create" className="min-h-screen flex items-center justify-center relative px-6 py-28">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            CHAPTER 05 — CREATE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            AI & Machine Learning Applications
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Building functional, user-facing AI applications powered by natural language processing and statistical machine learning.
          </p>
        </motion.div>

        {/* ML Projects Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {mlProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#63D8B5]/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#11152A] border border-white/10 flex items-center justify-center">
                    {idx === 0 ? (
                      <Brain className="w-5 h-5 text-[#63D8B5]" />
                    ) : (
                      <Activity className="w-5 h-5 text-indigo-400" />
                    )}
                  </div>
                  <span className="text-xs font-mono text-indigo-400">
                    INTERACTIVE AI APP
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#F5F7FA] mb-3 group-hover:text-[#63D8B5] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A5ACB8] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-6">
                  {project.keyFeatures?.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-[#F5F7FA]/80">
                      <Sparkles className="w-3.5 h-3.5 text-[#63D8B5] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-[#11152A] border border-white/5 text-[11px] font-mono text-[#A5ACB8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#63D8B5] hover:text-[#F5F7FA] transition-colors"
                  >
                    <span>APPLICATION DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#A5ACB8] hover:text-[#F5F7FA] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE CODE</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreateChapter;
