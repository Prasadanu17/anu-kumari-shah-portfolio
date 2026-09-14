import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TECH_CHIPS = [
  { label: "Python",         cat: "AI/ML",    color: "#E8E4DF" },
  { label: "PyTorch",        cat: "AI/ML",    color: "#E8E4DF" },
  { label: "scikit-learn",   cat: "AI/ML",    color: "#E8E4DF" },
  { label: "NLP",            cat: "AI/ML",    color: "#E8E4DF" },
  { label: "Deep Learning",  cat: "AI/ML",    color: "#E8E4DF" },
  { label: "OpenCV",         cat: "AI/ML",    color: "#E8E4DF" },
  { label: "React.js",       cat: "WEB",      color: "#ECE8E3" },
  { label: "JavaScript",     cat: "WEB",      color: "#ECE8E3" },
  { label: "Tailwind CSS",   cat: "WEB",      color: "#ECE8E3" },
  { label: "Node.js",        cat: "WEB",      color: "#ECE8E3" },
  { label: "FastAPI",        cat: "WEB",      color: "#ECE8E3" },
  { label: "MySQL",          cat: "DATA",     color: "#E6E1DA" },
  { label: "MongoDB",        cat: "DATA",     color: "#E6E1DA" },
  { label: "Pandas",         cat: "DATA",     color: "#E6E1DA" },
  { label: "NumPy",          cat: "DATA",     color: "#E6E1DA" },
  { label: "Git",            cat: "TOOLS",    color: "#E3DFD9" },
  { label: "GitHub",         cat: "TOOLS",    color: "#E3DFD9" },
  { label: "Streamlit",      cat: "TOOLS",    color: "#E3DFD9" },
  { label: "Jupyter",        cat: "TOOLS",    color: "#E3DFD9" },
  { label: "VS Code",        cat: "TOOLS",    color: "#E3DFD9" },
  { label: "Colab",          cat: "TOOLS",    color: "#E3DFD9" },
  { label: "Bootstrap",      cat: "WEB",      color: "#ECE8E3" },
  { label: "PHP",            cat: "WEB",      color: "#ECE8E3" },
  { label: "Computer Vision",cat: "AI/ML",   color: "#E8E4DF" },
];

/* Deterministic pseudo-random so positions are stable on mount */
function pseudoRandom(seed) {
  let s = seed * 9301 + 49297;
  return (s % 233280) / 233280;
}

function DraggableChip({ chip, index, arenaRef }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring bounce back: each chip floats to a deterministic resting spot
  const restX = (pseudoRandom(index * 3 + 1) - 0.5) * 520;
  const restY = (pseudoRandom(index * 3 + 2) - 0.5) * 240;

  const [isDragging, setIsDragging] = useState(false);
  const [isThrown, setIsThrown] = useState(false);

  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    // After releasing, spring-animate back to rest position
    setIsThrown(true);
    setTimeout(() => setIsThrown(false), 600);
  }, []);

  return (
    <motion.div
      drag
      dragConstraints={arenaRef}
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 280, bounceDamping: 22 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{
        x: restX,
        y: restY,
        opacity: 0,
        scale: 0.4,
        rotate: (pseudoRandom(index * 7 + 3) - 0.5) * 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isDragging ? (pseudoRandom(index * 5) - 0.5) * 10 : 0,
        transition: {
          delay: index * 0.045,
          type: "spring",
          stiffness: 200,
          damping: 18,
        },
      }}
      whileHover={{
        scale: 1.15,
        boxShadow: "0 8px 24px rgba(42,40,37,0.15)",
        zIndex: 20,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{
        scale: 1.2,
        zIndex: 30,
      }}
      style={{
        x,
        y,
        position: "absolute",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        zIndex: isDragging ? 50 : 10,
      }}
      className="px-4 py-2 rounded-full border border-[#D3CEC7] text-[#2A2825] text-xs font-mono font-semibold tracking-wide shadow-sm select-none"
      title={`${chip.cat} — ${chip.label}`}
    >
      <span className="opacity-40 text-[9px] mr-1.5 font-mono uppercase">{chip.cat}</span>
      {chip.label}
    </motion.div>
  );
}

const Playground = () => {
  const arenaRef = useRef(null);

  return (
    <section id="playground" className="py-24 bg-[#E6E2DD] relative border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-2">
              05 PLAYGROUND // INTERACTIVE TECH ARENA
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2825] uppercase font-display">
              DRAG THE STACK
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-[#66625C] uppercase leading-relaxed max-w-xs">
              Grab and throw any chip.<br />
              Spring physics. Elastic walls.<br />
              {TECH_CHIPS.length} technologies.
            </p>
          </div>
        </motion.div>

        {/* Arena */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          ref={arenaRef}
          className="playground-arena dot-grid-bg"
          style={{
            height: "420px",
            background: "#FAF8F5",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Instructional overlay — fades out */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3.5, duration: 1.2 }}
            className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
          >
            <div className="text-center">
              <p className="text-xs font-mono text-[#D3CEC7] uppercase tracking-widest">
                ↖ GRAB & THROW THE CHIPS ↗
              </p>
            </div>
          </motion.div>

          {TECH_CHIPS.map((chip, i) => (
            <DraggableChip
              key={chip.label}
              chip={chip}
              index={i}
              arenaRef={arenaRef}
            />
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-6"
        >
          <span className="text-[10px] font-mono text-[#B0AAA3] uppercase tracking-widest">
            Spring physics via Framer Motion
          </span>
          <span className="text-[10px] font-mono text-[#B0AAA3] uppercase tracking-widest">
            {TECH_CHIPS.length} SKILLS TOTAL
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Playground;
