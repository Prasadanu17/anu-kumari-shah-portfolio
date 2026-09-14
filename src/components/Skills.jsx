import React from "react";
import { motion } from "framer-motion";

const allCategories = [
  {
    id: "ai",
    label: "AI / ML",
    category: "AI & Machine Learning",
    description: "Predictive Modeling, Computer Vision, & Natural Language Processing",
    skills: [
      "Python", "PyTorch", "scikit-learn", "Machine Learning",
      "Deep Learning", "NLP", "Computer Vision", "OpenCV",
      "Pandas", "NumPy",
    ],
  },
  {
    id: "frontend",
    label: "WEB",
    category: "Frontend Engineering",
    description: "Modern Responsive Web Applications & UI Interfaces",
    skills: [
      "JavaScript", "HTML", "CSS", "React.js",
      "React Router", "Tailwind CSS", "Bootstrap",
    ],
  },
  {
    id: "backend",
    label: "WEB",
    category: "Backend & Databases",
    description: "Server Architecture, APIs, & Relational/NoSQL Databases",
    skills: [
      "Node.js", "FastAPI", "PHP", "CodeIgniter",
      "MySQL", "MongoDB", "SQL", "phpMyAdmin",
    ],
  },
  {
    id: "tools",
    label: "TOOLS",
    category: "Developer Tools & Environment",
    description: "Version Control, Notebooks, & Web App Deployment Platforms",
    skills: [
      "Git", "GitHub", "Jupyter", "Google Colab", "VS Code", "Streamlit",
    ],
  },
];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
      delay: i * 0.04,
    },
  }),
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-[#ECE8E3] relative border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-2">
              04 TECHNICAL SKILLS // CORE ARCHITECTURE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2825] uppercase font-display">
              TECHNICAL STACK
            </h2>
          </div>
          <p className="text-xs font-mono text-[#66625C] max-w-xs uppercase leading-relaxed">
            Categorized skill architecture — spatial layout with interactive hover depth
          </p>
        </motion.div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allCategories.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl p-8 space-y-5 shadow-sm hover:border-[#2A2825] transition-colors"
            >
              <div className="flex items-center justify-between border-b border-[#D3CEC7] pb-3">
                <h3 className="font-bold text-[#2A2825] text-lg uppercase font-display">
                  {cat.category}
                </h3>
                <span className="text-xs font-mono text-[#66625C] bg-[#E6E2DD] px-2.5 py-0.5 rounded border border-[#D3CEC7]">
                  0{idx + 1}
                </span>
              </div>

              <p className="text-xs font-mono text-[#66625C]">{cat.description}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((item, i) => (
                  <motion.span
                    key={item}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={chipVariants}
                    whileHover={{
                      scale: 1.12,
                      backgroundColor: "#2A2825",
                      color: "#FAF8F5",
                      borderColor: "#2A2825",
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] text-xs font-mono font-medium transition-colors cursor-default select-none shadow-xs"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;