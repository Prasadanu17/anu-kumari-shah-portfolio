import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { getSkillIcon } from '../../context/skillIcons';
import MagneticLogo from '../MagneticLogo';

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SkillsStory = () => {
  const { skillsCategorized } = usePortfolio();

  return (
    <section
      id="skills"
      className="relative flex flex-col px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 pb-12 sm:pb-20 max-w-7xl mx-auto z-10"
      style={{ perspective: '1200px' }}
    >
      <div className="w-full space-y-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
            <span className="text-xs font-mono text-[#1e6f5c] tracking-widest uppercase font-bold">
              03 / WHAT I BUILD
            </span>
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-xl sm:text-5xl text-[#F4F5F4] tracking-tight uppercase"
          >
            TECHNICAL CAPABILITIES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8E9793] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
          >
            Categorized technical stack focused on building intelligent algorithms, scalable frontend architectures, and reliable database backends.
          </motion.p>
        </div>

        {/* 3 Categorized Layout Columns */}
        <div className="grid grid-cols-3 pt-4 gap-2 sm:gap-[clamp(0.75rem,2vw,1.5rem)]" style={{ transformStyle: 'preserve-3d' }}>
          {skillsCategorized.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <TiltCard className="p-2.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#0d1310] border border-white/10 hover:border-[#1e6f5c]/60 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-2 sm:space-y-6 group h-full">
                <div className="space-y-1.5 sm:space-y-3" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] sm:text-[10px] font-mono text-[#1e6f5c] font-bold uppercase tracking-wider sm:tracking-widest">
                      CATEGORY 0{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#1e6f5c]/60 group-hover:bg-[#1e6f5c] transition-colors" />
                  </div>

                  <h3 className="text-xs sm:text-xl font-display font-bold text-[#F4F5F4] tracking-tight group-hover:text-[#1e6f5c] transition-colors">
                    {cat.category}
                  </h3>

                  <p className="text-[8px] sm:text-xs font-mono text-[#8E9793] font-light hidden sm:block">
                    {cat.description}
                  </p>

                  <div className="h-px w-full bg-white/[0.06] pt-2" />
                </div>

                {/* Skill Items - Now with Original Brand Colors & Magnetic Logos */}
                <div className="flex flex-wrap gap-1 sm:gap-2 pt-1 sm:pt-2" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
                  {cat.skills.map((skill) => {
                    const { icon, color } = getSkillIcon(skill);
                    return (
                      <MagneticLogo
                        key={skill}
                        icon={icon}
                        color={color}
                        label={skill}
                      />
                    );
                  })}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsStory;