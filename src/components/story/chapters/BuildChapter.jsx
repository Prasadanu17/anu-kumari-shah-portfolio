import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import { projects } from '../../../utils/constants';

const BuildChapter = () => {
  const webProjects = projects.filter((p) => p.category === 'webdevelopment');

  return (
    <section id="build" className="min-h-screen flex items-center justify-center relative px-6 py-28">
      <div className="max-w-6xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            CHAPTER 03 — BUILD
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            Web Engineering & Live Applications
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Turning visual ideas into responsive, battle-tested web experiences during my internship at Groveus Informatics Pvt. Ltd. and production client builds.
          </p>
        </motion.div>

        {/* Web Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {webProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#F5F7FA] mb-2 group-hover:text-[#63D8B5] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#A5ACB8] leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#11152A] text-[11px] font-mono text-[#A5ACB8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {project.demo && (
                <div className="p-6 pt-0">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#63D8B5] hover:text-[#F5F7FA] transition-colors"
                  >
                    <span>VISIT LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildChapter;
