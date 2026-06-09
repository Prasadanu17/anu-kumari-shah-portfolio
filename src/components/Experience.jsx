import React from "react";
import { motion } from "framer-motion";
import { experience } from "../utils/constants";

const ExperienceItem = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  const dotColor =
    exp.color === "primary"
      ? "bg-primary-500"
      : exp.color === "secondary"
      ? "bg-secondary-500"
      : "bg-emerald-500";

  const textColor =
    exp.color === "primary"
      ? "text-primary-500"
      : exp.color === "secondary"
      ? "text-secondary-500"
      : "text-emerald-500";

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mb-16"
    >
      <div className="grid md:grid-cols-2 items-center">
        
        {/* LEFT COLUMN */}
        <div className={`px-8 ${isEven ? "md:text-right" : ""}`}>
          {isEven && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {exp.title}
              </h4>

              <p className={`font-semibold mb-2 ${textColor}`}>
                {exp.company}
              </p>

              <p className="text-slate-500 text-sm mb-3">
                {exp.period}
              </p>

              <p className="text-slate-600 dark:text-slate-400">
                {exp.description}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="px-8">
          {!isEven && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {exp.title}
              </h4>

              <p className={`font-semibold mb-2 ${textColor}`}>
                {exp.company}
              </p>

              <p className="text-slate-500 text-sm mb-3">
                {exp.period}
              </p>

              <p className="text-slate-600 dark:text-slate-400">
                {exp.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CENTER DOT */}
      <div className="absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
        <div
          className={`w-4 h-4 ${dotColor} rounded-full border-4 border-white dark:border-slate-900`}
        ></div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-slate-100 dark:bg-slate-800/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold text-primary-500 uppercase tracking-wider mb-4">
            Experience
          </h2>

          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Professional Journey
          </h3>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-emerald-600"></div>

          {experience.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
