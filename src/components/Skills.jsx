import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Layout, Database, Wrench } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    id: "ai_ml",
    title: "AI / MACHINE LEARNING",
    icon: Cpu,
    description: "Deep learning models, sequence modeling, computer vision, and explainable AI.",
    skills: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "OpenCV",
      "Sentence Transformers (SBERT)",
      "Explainable AI (LIME / SHAP)",
    ],
  },
  {
    id: "fullstack",
    title: "FULL STACK ENGINEERING",
    icon: Layout,
    description: "Responsive frontend interfaces and scalable server-side REST architectures.",
    skills: [
      "React.js",
      "JavaScript (ES6+)",
      "Node.js",
      "FastAPI",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "PHP",
      "CodeIgniter",
      "RESTful APIs",
    ],
  },
  {
    id: "data",
    title: "DATA SCIENCE & ANALYTICS",
    icon: Database,
    description: "Exploratory data analysis, mathematical vector operations, and visualization.",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "NetworkX",
      "Exploratory Data Analysis (EDA)",
      "Feature Engineering",
      "Data Cleaning",
      "Model Evaluation",
    ],
  },
  {
    id: "tools",
    title: "DATABASES & TOOLING",
    icon: Wrench,
    description: "Relational/NoSQL database management, version control, and deployment.",
    skills: [
      "MySQL",
      "MongoDB",
      "SQL",
      "phpMyAdmin",
      "Git & GitHub",
      "Streamlit",
      "Jupyter Notebooks",
      "Google Colab",
      "VS Code",
      "Linux / Shell",
    ],
  },
];

/* ── Reusable reveal preset ── */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const Skills = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section id="skills" className="py-28 sm:py-36 relative">

      {/* ── Cinematic section divider ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="story-container">

        {/* Section Header */}
        <motion.div
          {...reveal()}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>03 / EXPERTISE // TECHNICAL ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
              SKILLS & CAPABILITIES
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8E95A5] max-w-sm leading-relaxed uppercase">
            A structured matrix of specialized AI/ML algorithms, modern web technologies, and data engineering tools.
          </p>
        </motion.div>

        {/* Modern 2x2 Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            const isHovered = hoveredCategory === category.id;

            return (
              <motion.div
                key={category.id}
                {...reveal(idx * 0.08)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-7 sm:p-8 rounded-2xl border transition-all duration-300 bg-[#0E1017]/75 backdrop-blur-md space-y-6 ${
                  isHovered
                    ? "border-[#38BDF8]/50 shadow-2xl shadow-[#38BDF8]/5 bg-[#121520]/85"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors duration-300 ${
                        isHovered
                          ? "bg-[#38BDF8]/10 border-[#38BDF8]/30 text-[#38BDF8]"
                          : "bg-white/[0.03] border-white/10 text-[#8E95A5]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-display font-bold text-[#F4F4F6] tracking-wide">
                        {category.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#5D6473] uppercase">
                        DOMAIN 0{idx + 1}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#5D6473]">
                    {category.skills.length} TECHNOLOGIES
                  </span>
                </div>

                <p className="text-xs text-[#8E95A5] leading-relaxed font-light">
                  {category.description}
                </p>

                {/* Skills Architecture List with Subtle Illumination */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default select-none border ${
                        isHovered
                          ? "bg-[#38BDF8]/10 border-[#38BDF8]/30 text-[#F4F4F6] shadow-sm shadow-[#38BDF8]/10"
                          : "bg-white/[0.02] border-white/[0.07] text-[#8E95A5] hover:text-[#F4F4F6] hover:border-white/20"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;