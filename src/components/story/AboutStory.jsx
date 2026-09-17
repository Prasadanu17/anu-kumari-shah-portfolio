import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { education } from '../../utils/constants';

const AboutStory = ({ scrollProgress, isReducedMotion }) => {
  // Enter 0.12 -> 0.18, Active 0.18 -> 0.30, Exit 0.30 -> 0.36
  const containerOpacity = useTransform(scrollProgress, [0.12, 0.18, 0.30, 0.36], [0, 1, 1, 0]);
  const blur = useTransform(scrollProgress, [0.12, 0.18, 0.30, 0.36], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Distinct parallax movement rates for spatial composition depth
  const markerX = useTransform(scrollProgress, [0.12, 0.18, 0.30, 0.36], [-24, 0, 0, -20]);
  const markerY = useTransform(scrollProgress, [0.12, 0.18, 0.30, 0.36], [40, 0, 0, -40]);

  // Heading & content transforms
  const headingY = useTransform(scrollProgress, [0.12, 0.18, 0.30, 0.36], [80, 0, 0, -90]);
  const badgesY = useTransform(scrollProgress, [0.12, 0.19, 0.30, 0.36], [90, 0, 0, -75]);
  const narrativeY = useTransform(scrollProgress, [0.13, 0.20, 0.30, 0.36], [100, 0, 0, -60]);
  const eduY = useTransform(scrollProgress, [0.14, 0.21, 0.30, 0.36], [110, 0, 0, -45]);
  const eduScale = useTransform(scrollProgress, [0.14, 0.21, 0.30, 0.36], [0.96, 1, 1, 1.02]);

  const pointerEvents = useTransform(scrollProgress, (p) => (p >= 0.12 && p <= 0.35 ? 'auto' : 'none'));

  return (
    <motion.div
      style={{
        opacity: containerOpacity,
        filter: isReducedMotion ? 'none' : blur,
        pointerEvents,
      }}
      className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10"
    >
      <div className="space-y-6 sm:space-y-8">

        {/* Chapter marker */}
        <motion.div
          style={{
            x: isReducedMotion ? 0 : markerX,
            y: isReducedMotion ? 0 : markerY,
          }}
          className="flex items-center gap-3"
        >
          <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase">01 / ABOUT</span>
          <div className="h-px w-12 bg-[#38BDF8]/40" />
        </motion.div>

        {/* Title */}
        <motion.h2
          style={{ y: isReducedMotion ? 0 : headingY }}
          className="font-display font-extrabold text-[#F4F4F6] text-4xl sm:text-6xl tracking-tight uppercase"
        >
          WHO I AM
        </motion.h2>

        {/* Primary identity badges */}
        <motion.div
          style={{ y: isReducedMotion ? 0 : badgesY }}
          className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider"
        >
          <span className="px-3 py-1 rounded bg-white/[0.05] border border-white/10 text-[#F4F4F6]">
            MCA STUDENT
          </span>
          <span className="px-3 py-1 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8]">
            AI / ML ENGINEER
          </span>
          <span className="px-3 py-1 rounded bg-white/[0.05] border border-white/10 text-[#F4F4F6]">
            FULL-STACK DEVELOPER
          </span>
        </motion.div>

        {/* Editorial Narrative */}
        <motion.p
          style={{ y: isReducedMotion ? 0 : narrativeY }}
          className="text-[#8E95A5] text-base sm:text-xl font-light leading-relaxed max-w-2xl"
        >
          I specialize in building intelligent systems at the intersection of Machine Learning, Deep Learning, and modern Web Architecture. Based in Gangtok, Sikkim, I combine rigorous theoretical foundations with practical full-stack execution.
        </motion.p>

        {/* Education & Detail Editorial Block */}
        <motion.div
          style={{
            y: isReducedMotion ? 0 : eduY,
            scale: isReducedMotion ? 1 : eduScale,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] max-w-3xl origin-left"
        >
          {education.map((edu) => (
            <div key={edu.id} className="space-y-1">
              <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider block">
                {edu.period} • {edu.cgpa}
              </span>
              <h3 className="text-sm font-semibold text-[#F4F4F6]">
                {edu.degree}
              </h3>
              <p className="text-xs font-mono text-[#8E95A5]">
                {edu.institution}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default AboutStory;
