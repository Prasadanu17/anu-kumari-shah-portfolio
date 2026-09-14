import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const FILTERS = ["ALL", "AI/ML", "WEB", "TOOLS"];

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
  exit: { opacity: 0, scale: 0.7, y: -8, transition: { duration: 0.15 } },
};

const Skills = () => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  // Determine which chips to show in the matrix based on filter
  const filteredChips = (() => {
    if (selectedFilter === "ALL") {
      return allCategories.flatMap((c) => c.skills);
    }
    const matchLabel = selectedFilter === "AI/ML" ? "AI/ML" : selectedFilter;
    return allCategories
      .filter((c) => c.label === matchLabel || (selectedFilter === "WEB" && c.label === "WEB"))
      .flatMap((c) => c.skills);
  })();

  // Remove duplicates
  const uniqueChips = [...new Set(filteredChips)];

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
            Categorized skill architecture — hover chips to interact
          </p>
        </motion.div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {allCategories.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl p-8 space-y-4 shadow-sm hover:border-[#2A2825] transition-colors"
            >
              <div className="flex items-center justify-between border-b border-[#D3CEC7] pb-3">
                <h3 className="font-bold text-[#2A2825] text-lg uppercase font-display">
                  {cat.category}
                </h3>
                <span className="text-xs font-mono text-[#66625C]">0{idx + 1}</span>
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
                    whileHover={{ scale: 1.12, backgroundColor: "#2A2825", color: "#FAF8F5" }}
                    className="px-3 py-1.5 rounded bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] text-xs font-mono font-medium transition-colors cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Interactive Filter Playground Matrix ─── */}
        <div className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D3CEC7] pb-4 mb-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-1">
                INTERACTIVE FILTER MATRIX
              </span>
              <h4 className="font-bold text-[#2A2825] text-xl uppercase font-display">
                COMPLETE TECH INDEX ({uniqueChips.length} TOOLS)
              </h4>
            </div>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  whileTap={{ scale: 0.94 }}
                  className={`px-3 py-1.5 text-xs font-mono rounded uppercase border transition-all duration-200 ${
                    selectedFilter === filter
                      ? "bg-[#2A2825] text-[#FAF8F5] border-[#2A2825]"
                      : "bg-[#E6E2DD] text-[#2A2825] border-[#D3CEC7] hover:border-[#2A2825]"
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {uniqueChips.map((sk, i) => (
                <motion.span
                  key={sk}
                  custom={i}
                  variants={chipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.12, backgroundColor: "#2A2825", color: "#FAF8F5" }}
                  className="px-3.5 py-2 rounded-lg bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] text-xs font-mono tracking-wide cursor-default transition-colors"
                >
                  {sk}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;