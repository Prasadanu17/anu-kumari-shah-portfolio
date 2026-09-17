import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { personalInfo } from '../../utils/constants';

const ContactStory = ({ scrollProgress, isReducedMotion }) => {
  // Enter 0.86 -> 0.92, Active & Calm Settle 0.92 -> 1.00
  const opacity = useTransform(scrollProgress, [0.86, 0.92, 1.00], [0, 1, 1]);
  const blur = useTransform(scrollProgress, [0.86, 0.92, 1.00], ['blur(8px)', 'blur(0px)', 'blur(0px)']);

  // Settled, weighted parallax entry
  const markerX = useTransform(scrollProgress, [0.86, 0.92, 1.00], [-20, 0, 0]);
  const markerY = useTransform(scrollProgress, [0.86, 0.92, 1.00], [40, 0, 0]);
  const titleY = useTransform(scrollProgress, [0.86, 0.92, 1.00], [60, 0, 0]);
  const descY = useTransform(scrollProgress, [0.86, 0.93, 1.00], [75, 0, 0]);
  const linksY = useTransform(scrollProgress, [0.87, 0.94, 1.00], [90, 0, 0]);
  const linksScale = useTransform(scrollProgress, [0.87, 0.94, 1.00], [0.97, 1, 1]);

  const pointerEvents = useTransform(scrollProgress, (p) => (p >= 0.86 ? 'auto' : 'none'));

  return (
    <motion.div
      style={{
        opacity,
        filter: isReducedMotion ? 'none' : blur,
        pointerEvents,
      }}
      className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10"
    >
      <div className="space-y-8 sm:space-y-10">

        {/* Chapter marker */}
        <motion.div
          style={{
            x: isReducedMotion ? 0 : markerX,
            y: isReducedMotion ? 0 : markerY,
          }}
          className="flex items-center gap-3"
        >
          <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase">05 / CONTACT</span>
          <div className="h-px w-12 bg-[#38BDF8]/40" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          style={{ y: isReducedMotion ? 0 : titleY }}
          className="font-display font-extrabold text-[#F4F4F6] text-4xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.95] max-w-3xl uppercase"
        >
          LET'S BUILD<br />
          SOMETHING<br />
          INTELLIGENT.
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          style={{ y: isReducedMotion ? 0 : descY }}
          className="text-[#8E95A5] text-base sm:text-xl font-light leading-relaxed max-w-xl"
        >
          I am actively seeking AI/ML engineering, research intern, and full-stack development opportunities. If you are building innovative products or research initiatives, let's connect.
        </motion.p>

        {/* Real Links Grid */}
        <motion.div
          style={{
            y: isReducedMotion ? 0 : linksY,
            scale: isReducedMotion ? 1 : linksScale,
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08] max-w-3xl origin-left"
        >
          <a
            id="contact-link-email"
            href={`mailto:${personalInfo.email}`}
            className="p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#38BDF8]/50 hover:bg-white/[0.06] transition-all group"
          >
            <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider block">EMAIL</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-[#38BDF8] truncate block pt-1">
              DIRECT MAIL →
            </span>
          </a>

          <a
            id="contact-link-github"
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#38BDF8]/50 hover:bg-white/[0.06] transition-all group"
          >
            <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider block">GITHUB</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-[#38BDF8] truncate block pt-1">
              PRASADANU17 →
            </span>
          </a>

          <a
            id="contact-link-linkedin"
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#38BDF8]/50 hover:bg-white/[0.06] transition-all group"
          >
            <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider block">LINKEDIN</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-[#38BDF8] truncate block pt-1">
              ANU SHAH →
            </span>
          </a>

          <a
            id="contact-link-resume"
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#38BDF8]/50 hover:bg-white/[0.06] transition-all group"
          >
            <span className="text-[10px] font-mono text-[#5D6473] uppercase tracking-wider block">RESUME</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-[#38BDF8] truncate block pt-1">
              DOWNLOAD PDF →
            </span>
          </a>
        </motion.div>

        {/* Calm ending credit */}
        <p className="text-[11px] font-mono text-[#5D6473] pt-4">
          © {new Date().getFullYear()} ANU KUMARI SHAH. DESIGNED WITH CINEMATIC PRECISION.
        </p>

      </div>
    </motion.div>
  );
};

export default ContactStory;
