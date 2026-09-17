import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { projects } from '../../utils/constants';

const ProjectItem = ({ project, index, total, scrollProgress, range, isReducedMotion }) => {
  const [enterStart, activeStart, activeEnd, exitEnd] = range;

  const opacity = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [0, 1, 1, 0]);
  const blur = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Parallax elements within the project stage
  const imgY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [40, 0, 0, -40]);
  const imgScale = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [0.96, 1, 1, 1.02]);
  const innerImgScale = useTransform(scrollProgress, [enterStart, activeEnd], [1.10, 1.0]);

  const titleY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [60, 0, 0, -60]);
  const descY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [75, 0, 0, -75]);
  const ctaY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [85, 0, 0, -85]);

  return (
    <motion.div
      style={{
        opacity,
        filter: isReducedMotion ? 'none' : blur,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-5xl">

        {/* Project Image Card with parallax scale */}
        <motion.div
          style={{
            y: isReducedMotion ? 0 : imgY,
            scale: isReducedMotion ? 1 : imgScale,
          }}
          className="lg:col-span-6 relative overflow-hidden rounded-xl border border-white/10 bg-black/40 group aspect-video sm:aspect-[16/10] shadow-2xl"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ scale: isReducedMotion ? 1 : innerImgScale }}
            className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-100 transition-all duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent opacity-80" />

          <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#07080B]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
            PROJECT 0{index + 1} // {project.category.toUpperCase()}
          </div>
        </motion.div>

        {/* Project Details Editorial Block */}
        <div className="lg:col-span-6 space-y-5">
          <motion.div
            style={{ y: isReducedMotion ? 0 : titleY }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono font-extrabold text-[#38BDF8]">0{index + 1}</span>
              <span className="text-xs font-mono text-[#5D6473]">/ 0{total}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#F4F4F6] tracking-tight leading-tight">
              {project.title}
            </h3>
          </motion.div>

          <motion.p
            style={{ y: isReducedMotion ? 0 : descY }}
            className="text-[#8E95A5] text-sm sm:text-base font-light leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Tech stack & CTAs */}
          <motion.div
            style={{ y: isReducedMotion ? 0 : ctaY }}
            className="space-y-4 pt-1"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5D6473]">TECHNOLOGIES</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[#F4F4F6]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F4F4F6] uppercase tracking-widest border-b border-[#38BDF8] pb-0.5 hover:text-[#38BDF8] transition-colors"
                >
                  <span>VIEW PROJECT</span>
                  <span className="group-hover:translate-x-1 transition-transform text-[#38BDF8]">→</span>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#8E95A5] hover:text-[#F4F4F6] uppercase tracking-widest transition-colors"
                >
                  GITHUB REPO →
                </a>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

const ProjectsStory = ({ scrollProgress, isReducedMotion }) => {
  // Overall chapter container opacity across 0.66 to 0.92
  const headerOpacity = useTransform(scrollProgress, [0.66, 0.70, 0.88, 0.92], [0, 1, 1, 0]);
  const headerY = useTransform(scrollProgress, [0.66, 0.70, 0.88, 0.92], [40, 0, 0, -40]);
  const pointerEvents = useTransform(scrollProgress, (p) => (p >= 0.66 && p <= 0.91 ? 'auto' : 'none'));

  // Select 3 top featured projects
  const featuredList = projects.slice(0, 3);

  // Sub-step ranges for the 3 projects with continuous smooth overlap
  const projRanges = [
    [0.66, 0.70, 0.76, 0.79], // Project 1
    [0.76, 0.79, 0.83, 0.86], // Project 2
    [0.83, 0.86, 0.90, 0.93], // Project 3
  ];

  return (
    <motion.div
      style={{ opacity: headerOpacity, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10"
    >
      {/* Chapter Title */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : headerY }}
        className="absolute top-12 sm:top-20 left-4 sm:left-6 lg:left-12 space-y-1"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase">04 / PROJECTS</span>
          <div className="h-px w-12 bg-[#38BDF8]/40" />
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F4F6] tracking-tight uppercase">
          SELECTED PROJECTS
        </h2>
      </motion.div>

      {/* Pinned Stage for switching projects */}
      <div className="relative w-full h-[65vh] flex items-center justify-center">
        {featuredList.map((proj, idx) => (
          <ProjectItem
            key={proj.id}
            project={proj}
            index={idx}
            total={featuredList.length}
            scrollProgress={scrollProgress}
            range={projRanges[idx] || projRanges[0]}
            isReducedMotion={isReducedMotion}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsStory;
