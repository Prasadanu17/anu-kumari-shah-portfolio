import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { education } from '../../utils/constants';

const AboutStory = ({ scrollProgress, isReducedMotion }) => {
  // Enter 0.10 -> 0.16, Active 0.16 -> 0.26, Exit 0.26 -> 0.33
  const containerOpacity = useTransform(scrollProgress, [0.10, 0.16, 0.26, 0.33], [0, 1, 1, 0]);
  const blur = useTransform(scrollProgress, [0.10, 0.16, 0.26, 0.33], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Distinct parallax movement rates for spatial composition depth
  // 1. Chapter marker: subtle horizontal & vertical drift
  const markerX = useTransform(scrollProgress, [0.10, 0.16, 0.26, 0.33], [-24, 0, 0, -20]);
  const markerY = useTransform(scrollProgress, [0.10, 0.16, 0.26, 0.33], [40, 0, 0, -40]);

  // 2. Main heading (1.0 rate)
  const headingY = useTransform(scrollProgress, [0.10, 0.16, 0.26, 0.33], [80, 0, 0, -90]);

  // 3. Identity badges (0.8 rate)
  const badgesY = useTransform(scrollProgress, [0.10, 0.17, 0.26, 0.33], [90, 0, 0, -75]);

  // 4. Narrative text (0.7 rate, slightly delayed)
  const narrativeY = useTransform(scrollProgress, [0.11, 0.18, 0.26, 0.33], [100, 0, 0, -60]);

  // 5. Education block (0.5 rate + subtle scale)
  const eduY = useTransform(scrollProgress, [0.12, 0.19, 0.26, 0.33], [110, 0, 0, -45]);
  const eduScale = useTransform(scrollProgress, [0.12, 0.19, 0.26, 0.33], [0.96, 1, 1, 1.02]);

  const pointerEvents = useTransform(scrollProgress, (p) => (p >= 0.10 && p <= 0.32 ? 'auto' : 'none'));

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
