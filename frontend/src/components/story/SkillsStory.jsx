import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
// Importing logos from react-icons (you can replace these with your own SVGs)
import {
  SiPython, SiNumpy, SiPandas, SiScikitlearn, SiPytorch, SiTensorflow, SiKeras,
  SiReact, SiJavascript, SiNodedotjs, SiFastapi, SiTailwindcss, SiHtml5, SiCss,
  SiBootstrap, SiPhp, SiCodeigniter, SiMysql, SiMongodb, SiGit, SiGithub,
  SiJupyter, SiGooglecolab
} from 'react-icons/si';
import { FaBrain, FaEye, FaChartBar, FaDatabase, FaCode, FaServer, FaPalette } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

// --- Icon Mapper with Brand Colors ---
// Maps skill names to their respective logo components and brand colors
const getSkillIcon = (skillName) => {
  const icons = {
    'Python': { icon: <SiPython />, color: '#3776AB' },
    'NumPy': { icon: <SiNumpy />, color: '#013243' },
    'Pandas': { icon: <SiPandas />, color: '#150458' },
    'scikit-learn': { icon: <SiScikitlearn />, color: '#F7931E' },
    'PyTorch': { icon: <SiPytorch />, color: '#EE4C2C' },
    'TensorFlow/Keras': { icon: <SiTensorflow />, color: '#FF6F00' },
    'NLP': { icon: <FaBrain />, color: '#9B59B6' },
    'Deep Learning': { icon: <FaBrain />, color: '#8E44AD' },
    'Computer Vision': { icon: <FaEye />, color: '#3498DB' },
    'EDA': { icon: <FaChartBar />, color: '#E67E22' },
    'Explainable AI': { icon: <FaBrain />, color: '#1ABC9C' },
    'React.js': { icon: <SiReact />, color: '#61DAFB' },
    'JavaScript': { icon: <SiJavascript />, color: '#F7DF1E' },
    'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
    'FastAPI': { icon: <SiFastapi />, color: '#009688' },
    'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
    'HTML': { icon: <SiHtml5 />, color: '#E34F26' },
    'CSS': { icon: <SiCss />, color: '#1572B6' },
    'Bootstrap': { icon: <SiBootstrap />, color: '#7952B3' },
    'PHP': { icon: <SiPhp />, color: '#777BB4' },
    'CodeIgniter': { icon: <SiCodeigniter />, color: '#EF4223' },
    'MySQL': { icon: <SiMysql />, color: '#4479A1' },
    'MongoDB': { icon: <SiMongodb />, color: '#47A248' },
    'Git': { icon: <SiGit />, color: '#F05032' },
    'GitHub': { icon: <SiGithub />, color: '#ffffff' },
    'VS Code': { icon: <VscCode />, color: '#007ACC' },
    'Jupyter': { icon: <SiJupyter />, color: '#F37626' },
    'Google Colab': { icon: <SiGooglecolab />, color: '#F9AB00' },
    'Canva': { icon: <FaPalette />, color: '#00C4CC' },
  };
  return icons[skillName] || { icon: <FaCode />, color: '#F4F5F4' }; // Default icon if not found
};

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
  const {
    skillsCategorized,
    hoveredCategory,
    setHoveredCategory,
    selectedSkill,
    setSelectedSkill,
  } = usePortfolio();

  return (
    <section
      id="skills"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-2 sm:py-4 max-w-7xl mx-auto z-10 w-full"
      style={{ perspective: '1000px' }} // Essential for 3D effect
    >
      <div className="w-full space-y-4 sm:space-y-6">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD9B8]/15 border border-[#EAD9B8]/40 shadow-[0_0_15px_rgba(234,217,184,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-[#EAD9B8] tracking-[0.2em] uppercase font-bold">
              04 // TECHNICAL SKILLS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F5EBDD] tracking-tight uppercase"
          >
            TECHNICAL CAPABILITIES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-[#EAD9B8]/90 text-xs sm:text-sm font-light max-w-lg leading-relaxed"
          >
            Categorized technical stack focused on building intelligent algorithms, scalable frontend architectures, and reliable database backends.
          </motion.p>
        </div>

        {/* Categorized Layout Grid: 1 col on mobile, 2 on tablet, 3 on laptop/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-3 sm:pt-4 gap-4 sm:gap-6">
          {skillsCategorized.map((cat, idx) => {
            const isHovered = hoveredCategory === cat.category;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredCategory(cat.category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <TiltCard className={`p-4 sm:p-6 md:p-7 rounded-2xl bg-[#1c1c1c] border transition-all duration-300 shadow-xl flex flex-col justify-between space-y-3 sm:space-y-5 group h-full ${
                  isHovered
                    ? 'border-[#EAD9B8]/80 shadow-[0_0_30px_rgba(234,217,184,0.15)] bg-[#1e1e1e]'
                    : 'border-[#8E8170]/25 hover:border-[#EAD9B8]/40'
                }`}>
                  <div className="space-y-1.5 sm:space-y-2.5" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#C8B99F] font-bold uppercase tracking-widest">
                        CATEGORY 0{idx + 1}
                      </span>
                      <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isHovered ? 'bg-[#EAD9B8] scale-125 shadow-[0_0_8px_#EAD9B8]' : 'bg-[#EAD9B8]/60 group-hover:bg-[#EAD9B8]'
                      }`} />
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-[#EAD9B8] tracking-tight group-hover:text-[#F5EBDD] transition-colors">
                      {cat.category}
                    </h3>

                    <p className="text-[11px] sm:text-xs font-mono text-[#C8B99F] font-light">
                      {cat.description}
                    </p>

                    <div className="h-px w-full bg-[#8E8170]/20 pt-1" />
                  </div>

                  {/* Assembled Skill Items with Staggered 3D Flight Arrival & Name Labels */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2" style={{ transform: 'translateZ(20px)' }}>
                    {cat.skills.map((skill, skillIdx) => {
                      const { icon, color } = getSkillIcon(skill);
                      const isSelected = selectedSkill === skill || selectedSkill?.name === skill;
                      return (
                        <motion.div
                          key={skill}
                          data-skill-name={skill}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.05 + skillIdx * 0.02,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          whileHover={{ scale: 1.06, y: -2 }}
                          className={`group/skill relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer shadow-md min-w-0 ${
                            isSelected
                              ? 'bg-[#2a2a2a] border-[#EAD9B8] ring-1 ring-[#EAD9B8]/50 shadow-[0_0_12px_rgba(234,217,184,0.3)]'
                              : 'bg-white/[0.04] border-[#8E8170]/30 hover:border-[#EAD9B8] hover:bg-[#222222]'
                          }`}
                        >
                          {/* Dynamic Brand Color Glow */}
                          <div
                            className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${
                              isSelected ? 'opacity-100' : 'opacity-0 group-hover/skill:opacity-100'
                            }`}
                            style={{
                              boxShadow: `0 0 16px ${color}55`,
                            }}
                          />

                          {/* Official Brand Logo */}
                          <span className="text-sm sm:text-base shrink-0 transition-transform duration-200 group-hover/skill:scale-110" style={{ color }}>
                            {icon}
                          </span>

                          {/* Skill Name Label */}
                          <span className="text-[10px] sm:text-xs font-mono font-medium text-[#F5EBDD] group-hover/skill:text-[#EAD9B8] transition-colors whitespace-nowrap">
                            {skill}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </TiltCard>
              </motion.div>
            );
        })}
      </div>

      </div>
    </section>
  );
};

export default SkillsStory;