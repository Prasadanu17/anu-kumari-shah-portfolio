import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Trophy, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

// Deterministic Categories & Skills (Anu's verified skills only)
const CATEGORIES = [
  { id: "FRONTEND", label: "FRONTEND", bg: "#EBF3FD", border: "#C5DCF5", color: "#2F74C0" },
  { id: "BACKEND", label: "BACKEND", bg: "#EAF7EC", border: "#B3DEBA", color: "#2E7D32" },
  { id: "DATABASE", label: "DATABASE", bg: "#FEF0E8", border: "#F5CDB0", color: "#C94F1A" },
  { id: "TOOLS", label: "TOOLS", bg: "#F0F0EE", border: "#DDDBD8", color: "#333333" },
  { id: "AIML", label: "AI / ML", bg: "#F5EBF8", border: "#DDB8EE", color: "#7B1FA2" },
];

const SKILLS_DATA = [
  // FRONTEND
  { id: "html", name: "HTML", categoryId: "FRONTEND" },
  { id: "css", name: "CSS", categoryId: "FRONTEND" },
  { id: "js", name: "JavaScript", categoryId: "FRONTEND" },
  { id: "react", name: "React.js", categoryId: "FRONTEND" },
  { id: "router", name: "React Router", categoryId: "FRONTEND" },
  { id: "tailwind", name: "Tailwind CSS", categoryId: "FRONTEND" },
  { id: "bootstrap", name: "Bootstrap", categoryId: "FRONTEND" },

  // BACKEND
  { id: "node", name: "Node.js", categoryId: "BACKEND" },
  { id: "fastapi", name: "FastAPI", categoryId: "BACKEND" },
  { id: "php", name: "PHP", categoryId: "BACKEND" },
  { id: "ci", name: "CodeIgniter", categoryId: "BACKEND" },

  // DATABASE
  { id: "mysql", name: "MySQL", categoryId: "DATABASE" },
  { id: "mongo", name: "MongoDB", categoryId: "DATABASE" },
  { id: "sql", name: "SQL", categoryId: "DATABASE" },
  { id: "pma", name: "phpMyAdmin", categoryId: "DATABASE" },

  // TOOLS
  { id: "git", name: "Git", categoryId: "TOOLS" },
  { id: "github", name: "GitHub", categoryId: "TOOLS" },
  { id: "jupyter", name: "Jupyter", categoryId: "TOOLS" },
  { id: "colab", name: "Google Colab", categoryId: "TOOLS" },
  { id: "vscode", name: "VS Code", categoryId: "TOOLS" },
  { id: "streamlit", name: "Streamlit", categoryId: "TOOLS" },

  // AI / ML
  { id: "python", name: "Python", categoryId: "AIML" },
  { id: "ml", name: "Machine Learning", categoryId: "AIML" },
  { id: "dl", name: "Deep Learning", categoryId: "AIML" },
  { id: "nlp", name: "NLP", categoryId: "AIML" },
  { id: "cv", name: "Computer Vision", categoryId: "AIML" },
  { id: "pytorch", name: "PyTorch", categoryId: "AIML" },
  { id: "sklearn", name: "scikit-learn", categoryId: "AIML" },
  { id: "pandas", name: "Pandas", categoryId: "AIML" },
  { id: "numpy", name: "NumPy", categoryId: "AIML" },
  { id: "opencv", name: "OpenCV", categoryId: "AIML" },
];

const Playground = () => {
  const [gameState, setGameState] = useState("IDLE"); // IDLE, PLAYING, COMPLETED
  const [seconds, setSeconds] = useState(0);
  const [sortedSkills, setSortedSkills] = useState({}); // { skillId: categoryId }
  const [availableSkills, setAvailableSkills] = useState(SKILLS_DATA);
  const [shakeSkillId, setShakeSkillId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const dropZoneRefs = useRef({});

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === "PLAYING") {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  // Check completion
  useEffect(() => {
    if (gameState === "PLAYING" && Object.keys(sortedSkills).length === SKILLS_DATA.length) {
      setGameState("COMPLETED");
    }
  }, [sortedSkills, gameState]);

  const startGame = () => {
    setSortedSkills({});
    setAvailableSkills([...SKILLS_DATA].sort(() => Math.random() - 0.5));
    setSeconds(0);
    setGameState("PLAYING");
    setFeedbackMsg("Game started! Drag skills into their correct categories.");
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const resetGame = () => {
    setSortedSkills({});
    setAvailableSkills(SKILLS_DATA);
    setSeconds(0);
    setGameState("IDLE");
  };

  const handleDragEnd = (skill, event, info) => {
    if (gameState !== "PLAYING") return;

    const pointX = info.point.x;
    const pointY = info.point.y;

    let targetCatId = null;

    // Check collision with drop zones
    Object.entries(dropZoneRefs.current).forEach(([catId, el]) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (
          pointX >= rect.left &&
          pointX <= rect.right &&
          pointY >= rect.top &&
          pointY <= rect.bottom
        ) {
          targetCatId = catId;
        }
      }
    });

    if (targetCatId) {
      if (targetCatId === skill.categoryId) {
        // Correct drop!
        setSortedSkills((prev) => ({ ...prev, [skill.id]: targetCatId }));
        setAvailableSkills((prev) => prev.filter((s) => s.id !== skill.id));
        setFeedbackMsg(`✓ Correct! ${skill.name} sorted under ${targetCatId}.`);
        setTimeout(() => setFeedbackMsg(null), 2000);
      } else {
        // Incorrect drop! Trigger shake
        setShakeSkillId(skill.id);
        setFeedbackMsg(`✗ ${skill.name} belongs to another category!`);
        setTimeout(() => {
          setShakeSkillId(null);
          setFeedbackMsg(null);
        }, 1200);
      }
    }
  };

  const progressPercent = Math.round((Object.keys(sortedSkills).length / SKILLS_DATA.length) * 100);

  return (
    <section id="playground" className="py-24 bg-[#E6E2DD] relative border-t border-[#D3CEC7] overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#66625C] uppercase block mb-2">
              05 PLAYGROUND // INTERACTIVE SKILL SORTING GAME
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2825] uppercase font-display">
              SKILL SORTING GAME
            </h2>
          </div>

          <p className="text-xs font-mono text-[#66625C] uppercase max-w-xs leading-relaxed">
            Drag each technology chip into its correct architectural category!
          </p>
        </div>

        {/* ── GAME HEADER BAR ── */}
        <div className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            
            {/* Timer */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#66625C] uppercase font-semibold">TIME:</span>
              <span className="text-2xl font-mono font-bold text-[#2A2825] bg-[#E6E2DD] px-3 py-1 rounded border border-[#D3CEC7]">
                {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}s
              </span>
            </div>

            {/* Progress Bar & Counter */}
            <div className="flex-1 max-w-md space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono text-[#66625C] uppercase font-semibold">
                <span>PROGRESS</span>
                <span>{Object.keys(sortedSkills).length} / {SKILLS_DATA.length} SKILLS ({progressPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-[#E6E2DD] rounded-full overflow-hidden border border-[#D3CEC7]">
                <motion.div
                  className="h-full bg-[#2A2825]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {gameState === "IDLE" ? (
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-[#2A2825] text-[#FAF8F5] font-mono text-xs font-bold uppercase rounded-lg hover:bg-[#1A1918] transition-colors flex items-center gap-2 shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>START GAME</span>
                </button>
              ) : (
                <button
                  onClick={resetGame}
                  className="px-5 py-2.5 bg-[#E6E2DD] text-[#2A2825] font-mono text-xs font-bold uppercase rounded-lg border border-[#D3CEC7] hover:bg-[#FAF8F5] transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>GIVE UP</span>
                </button>
              )}
            </div>

          </div>

          {/* Feedback banner */}
          <AnimatePresence>
            {feedbackMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 pt-3 border-t border-[#D3CEC7] text-xs font-mono text-[#2A2825] font-semibold flex items-center gap-2"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#C94F1A]" />
                <span>{feedbackMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── GAME PLAYGROUND AREA ── */}
        <div className="relative">

          {/* Start Screen Overlay */}
          {gameState === "IDLE" && (
            <div className="absolute inset-0 z-30 bg-[#2A2825]/40 backdrop-blur-sm rounded-2xl flex items-center justify-center p-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl p-8 max-w-md text-center space-y-4 shadow-2xl"
              >
                <Trophy className="w-12 h-12 text-[#2A2825] mx-auto" />
                <h3 className="text-2xl font-bold font-display text-[#2A2825] uppercase">
                  READY TO TEST YOUR TECH KNOWLEDGE?
                </h3>
                <p className="text-xs font-mono text-[#66625C] leading-relaxed">
                  Drag 28 technologies into 5 categories: FRONTEND, BACKEND, DATABASE, TOOLS, and AI / ML.
                </p>
                <button
                  onClick={startGame}
                  className="w-full py-3.5 bg-[#2A2825] text-[#FAF8F5] font-mono text-xs font-bold uppercase rounded-lg hover:bg-[#1A1918] transition-colors shadow-lg"
                >
                  START GAME NOW →
                </button>
              </motion.div>
            </div>
          )}

          {/* 5 CATEGORY DROP ZONES */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {CATEGORIES.map((cat) => {
              const catSkills = SKILLS_DATA.filter((s) => sortedSkills[s.id] === cat.id);

              return (
                <div
                  key={cat.id}
                  ref={(el) => (dropZoneRefs.current[cat.id] = el)}
                  style={{ backgroundColor: cat.bg, borderColor: cat.border }}
                  className="border-2 border-dashed rounded-2xl p-4 min-h-[220px] flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div className="border-b pb-2 mb-3 border-black/10 flex items-center justify-between">
                    <span
                      style={{ color: cat.color }}
                      className="font-mono text-xs font-bold tracking-wider uppercase"
                    >
                      {cat.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#66625C]">
                      ({catSkills.length})
                    </span>
                  </div>

                  {/* Settled chips inside category */}
                  <div className="flex flex-wrap gap-1.5 flex-1 items-start content-start">
                    {catSkills.map((skill) => (
                      <motion.span
                        key={skill.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#D3CEC7] text-[#2A2825] text-[11px] font-mono font-semibold shadow-xs flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-600 shrink-0" />
                        <span>{skill.name}</span>
                      </motion.span>
                    ))}
                  </div>

                  <div className="text-[9px] font-mono text-[#66625C] uppercase text-center mt-3 pt-2 border-t border-black/5">
                    DROP {cat.label} HERE
                  </div>
                </div>
              );
            })}
          </div>

          {/* UNSORTED AVAILABLE SKILLS POOL */}
          <div className="bg-[#FAF8F5] border border-[#D3CEC7] rounded-2xl p-6 shadow-sm min-h-[160px]">
            <div className="text-xs font-mono text-[#66625C] uppercase tracking-wider font-semibold mb-4 border-b border-[#D3CEC7] pb-2 flex justify-between">
              <span>UNSORTED SKILLS POOL ({availableSkills.length} REMAINING)</span>
              <span>DRAG CHIPS UPWARD INTO CATEGORIES ⬆</span>
            </div>

            <div className="flex flex-wrap gap-2.5 min-h-[80px] items-center">
              {availableSkills.map((skill) => {
                const isShaking = shakeSkillId === skill.id;

                return (
                  <motion.div
                    key={skill.id}
                    drag={gameState === "PLAYING"}
                    dragSnapToOrigin={true}
                    onDragEnd={(e, info) => handleDragEnd(skill, e, info)}
                    animate={
                      isShaking
                        ? { x: [-10, 10, -8, 8, -4, 4, 0] }
                        : { x: 0, y: 0 }
                    }
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.08, zIndex: 50 }}
                    whileTap={{ scale: 1.15, cursor: "grabbing" }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold cursor-grab select-none shadow-sm transition-colors ${
                      isShaking
                        ? "bg-red-100 border-red-400 text-red-700"
                        : "bg-[#E6E2DD] border-[#D3CEC7] text-[#2A2825] hover:bg-[#FAF8F5] hover:border-[#2A2825]"
                    }`}
                  >
                    {skill.name}
                  </motion.div>
                );
              })}

              {availableSkills.length === 0 && gameState === "PLAYING" && (
                <div className="w-full text-center py-6 text-xs font-mono text-[#66625C] uppercase">
                  🎉 ALL SKILLS SORTED PERFECTLY!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── COMPLETION MODAL ── */}
        <AnimatePresence>
          {gameState === "COMPLETED" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2825]/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-[#FAF8F5] border border-[#D3CEC7] w-full max-w-md rounded-2xl p-8 shadow-2xl text-center space-y-6"
              >
                <div className="w-16 h-16 bg-[#2A2825] text-[#FAF8F5] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Trophy className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase bg-[#2A2825] text-[#FAF8F5] px-3 py-1 rounded font-bold">
                    GAME COMPLETED!
                  </span>
                  <h3 className="text-3xl font-bold text-[#2A2825] mt-3 font-display">
                    PERFECT 100% SCORE!
                  </h3>
                  <p className="text-xs font-mono text-[#66625C] mt-2">
                    You accurately sorted all 28 skills into their architectural categories in:
                  </p>
                  <div className="text-4xl font-mono font-bold text-[#2A2825] mt-3">
                    {seconds} seconds
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3.5 bg-[#2A2825] text-[#FAF8F5] font-mono text-xs font-bold uppercase rounded-lg hover:bg-[#1A1918] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>PLAY AGAIN →</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Playground;
