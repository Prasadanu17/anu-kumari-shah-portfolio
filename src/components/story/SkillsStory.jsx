import React from 'react';
import { motion, useTransform } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    num: "01",
    title: "AI / MACHINE LEARNING",
    skills: [
      "Python", "PyTorch", "scikit-learn", "Machine Learning",
      "Deep Learning", "Computer Vision", "NLP", "OpenCV",
      "Pandas", "NumPy", "Streamlit", "Explainable AI (XAI)"
    ]
  },
  {
    num: "02",
    title: "FULL-STACK",
    skills: [
      "React.js", "JavaScript", "HTML5", "CSS3", "Node.js",
      "Express", "FastAPI", "PHP", "CodeIgniter", "Tailwind CSS"
    ]
  },
  {
    num: "03",
    title: "DATABASE / TOOLS",
    skills: [
      "MySQL", "MongoDB", "SQL", "phpMyAdmin", "Git",
      "GitHub", "Jupyter Notebooks", "Google Colab", "VS Code"
    ]
  }
];

const SkillsStory = ({ scrollProgress, isReducedMotion }) => {
  // Chapter active from 0.50 to 0.70
  const opacity = useTransform(scrollProgress, [0.50, 0.56, 0.65, 0.70], [0, 1, 1, 0]);
  const blur = useTransform(scrollProgress, [0.50, 0.56, 0.65, 0.70], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']);

  const pointerEvents = useTransform(scrollProgress, (p) => (p >= 0.50 && p <= 0.69 ? 'auto' : 'none'));

  // Header parallax
  const headerY = useTransform(scrollProgress, [0.50, 0.56, 0.65, 0.70], [50, 0, 0, -60]);

  // Restrained, staggered category transitions as scroll advances
  const cat1Y = useTransform(scrollProgress, [0.50, 0.56, 0.65, 0.70], [60, 0, 0, -50]);
  const cat1Opacity = useTransform(scrollProgress, [0.50, 0.55, 0.65, 0.70], [0, 1, 1, 0]);

  const cat2Y = useTransform(scrollProgress, [0.52, 0.58, 0.65, 0.70], [75, 0, 0, -60]);
  const cat2Opacity = useTransform(scrollProgress, [0.52, 0.57, 0.65, 0.70], [0, 1, 1, 0]);

  const cat3Y = useTransform(scrollProgress, [0.54, 0.60, 0.65, 0.70], [90, 0, 0, -70]);
  const cat3Opacity = useTransform(scrollProgress, [0.54, 0.59, 0.65, 0.70], [0, 1, 1, 0]);

  const catTransforms = [
    { y: cat1Y, opacity: cat1Opacity },
    { y: cat2Y, opacity: cat2Opacity },
    { y: cat3Y, opacity: cat3Opacity },
  ];

  return (
    <motion.div
      style={{
        opacity,
        filter: isReducedMotion ? 'none' : blur,
        pointerEvents,
      }}
      className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10"
    >
      <div className="space-y-8">

        {/* Chapter marker */}
        <motion.div
          style={{ y: isReducedMotion ? 0 : headerY }}
          className="space-y-1"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase">03 / SKILLS</span>
            <div className="h-px w-12 bg-[#38BDF8]/40" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F4F6] tracking-tight uppercase">
            TOOLS I BUILD WITH
          </h2>
        </motion.div>

        {/* Typography-Based Editorial Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.num}
              style={{
                y: isReducedMotion ? 0 : catTransforms[idx].y,
                opacity: catTransforms[idx].opacity,
              }}
              className="space-y-4 p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono text-[#38BDF8]">{cat.num}</span>
                <h3 className="font-mono text-xs sm:text-sm font-bold text-[#F4F4F6] uppercase tracking-wider">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-[#8E95A5] hover:text-[#F4F4F6] transition-colors"
                  >
                    {skill} <span className="text-[#5D6473] font-normal">/</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default SkillsStory;
