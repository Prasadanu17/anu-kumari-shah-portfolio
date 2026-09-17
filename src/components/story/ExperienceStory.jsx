import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { experience } from '../../utils/constants';

const ExperienceItem = ({ exp, index, total, scrollProgress, range, isReducedMotion }) => {
  const [enterStart, activeStart, activeEnd, exitEnd] = range;

  const opacity = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [0, 1, 1, 0]);
  const blur = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Subtle depth parallax within the entry
  const metaY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [30, 0, 0, -30]);
  const titleY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [50, 0, 0, -50]);
  const descY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [65, 0, 0, -65]);
  const tagsY = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [75, 0, 0, -75]);
  const scale = useTransform(scrollProgress, [enterStart, activeStart, activeEnd, exitEnd], [0.96, 1, 1, 1.02]);

  return (
    <motion.div
      style={{
        opacity,
        scale: isReducedMotion ? 1 : scale,
        filter: isReducedMotion ? 'none' : blur,
      }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 space-y-4 max-w-2xl pl-6 sm:pl-8"
    >
      {/* Step counter & Timeline Year */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : metaY }}
        className="flex items-center gap-3 text-xs font-mono text-[#38BDF8]"
      >
        <span className="font-bold tracking-widest uppercase">PHASE 0{index + 1} // 0{total}</span>
        <span className="text-white/20">—</span>
        <span className="text-[#E4E4E7] font-semibold">{exp.period}</span>
      </motion.div>

      {/* Role & Company */}
      <motion.div style={{ y: isReducedMotion ? 0 : titleY }} className="space-y-1">
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#F4F4F6] tracking-tight">
          {exp.title}
        </h3>
        <p className="text-base sm:text-lg font-mono text-[#38BDF8]">
          {exp.company} <span className="text-xs text-[#8E95A5]">({exp.location})</span>
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        style={{ y: isReducedMotion ? 0 : descY }}
        className="text-[#8E95A5] text-sm sm:text-base leading-relaxed font-light"
      >
        {exp.description}
      </motion.p>

      {/* Tech Tags */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : tagsY }}
        className="flex flex-wrap gap-2 pt-1"
      >
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[#F4F4F6]"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
};

const ExperienceStory = ({ scrollProgress, isReducedMotion }) => {
  // Overall container visibility across 0.30 to 0.56 (with smooth overlap)
  const containerOpacity = useTransform(scrollProgress, [0.30, 0.35, 0.50, 0.56], [0, 1, 1, 0]);
  const pointerEvents = useTransform(scrollProgress, (p) => (p >= 0.30 && p <= 0.55 ? 'auto' : 'none'));

  // Header motion
  const headerY = useTransform(scrollProgress, [0.30, 0.35, 0.50, 0.56], [40, 0, 0, -40]);

  // Ranges for the 3 experiences with smooth continuous overlap
  const expRanges = [
    [0.30, 0.34, 0.40, 0.44], // Experience 1 (Deloitte)
    [0.40, 0.43, 0.47, 0.50], // Experience 2 (Freelance)
    [0.47, 0.50, 0.54, 0.57], // Experience 3 (Academic & Open Source)
  ];

  // Continuous timeline progress indicator line
  const timelineHeight = useTransform(scrollProgress, [0.30, 0.54], ['0%', '100%']);

  return (
    <motion.div
      style={{ opacity: containerOpacity, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10"
    >
      {/* Chapter Title */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : headerY }}
        className="absolute top-14 sm:top-20 left-4 sm:left-6 lg:left-12 space-y-1"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase">02 / EXPERIENCE</span>
          <div className="h-px w-12 bg-[#38BDF8]/40" />
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F4F6] tracking-tight uppercase">
          EXPERIENCE
        </h2>
      </motion.div>

      {/* Pinned Stage for switching experiences */}
      <div className="relative w-full h-[60vh] flex items-center">

        {/* Timeline Visual Anchor Rail */}
        <div className="absolute left-0 top-12 bottom-12 w-px bg-white/[0.08] hidden sm:block">
          <motion.div
            style={{ height: timelineHeight }}
            className="w-full bg-[#38BDF8] origin-top"
          />
        </div>

        {experience.map((exp, idx) => (
          <ExperienceItem
            key={exp.id}
            exp={exp}
            index={idx}
            total={experience.length}
            scrollProgress={scrollProgress}
            range={expRanges[idx] || expRanges[0]}
            isReducedMotion={isReducedMotion}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceStory;
