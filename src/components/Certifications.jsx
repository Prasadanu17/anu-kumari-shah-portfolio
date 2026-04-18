import React from "react";
import { motion } from "framer-motion";
import { certifications } from "../utils/constants";
import { FileCheck } from "lucide-react";

const CertificationCard = ({ cert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-8 p-8 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-all group relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      
      <div className="w-14 h-14 shrink-0 rounded-2xl bg-secondary-100 dark:bg-secondary-950/40 flex items-center justify-center group-hover:bg-secondary-500 transition-colors duration-300">
        <FileCheck className="w-7 h-7 text-secondary-600 dark:text-secondary-400 group-hover:text-white transition-colors duration-300" />
      </div>
      
      <div className="flex-1">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-secondary-500 transition-colors">
          {cert.title}
        </h4>
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              {cert.issuer}
            </span>
          </div>
          <span className="text-sm text-slate-400 font-medium">
            Issued: {cert.date}
          </span>
        </div>
      </div>

      <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="px-4 py-2 rounded-xl border border-secondary-500/50 text-secondary-500 text-xs font-bold uppercase tracking-wider">
          Verified
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-28 bg-white dark:bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 flex flex-col justify-center"
          >
            <span className="text-xs font-extrabold text-secondary-500 uppercase tracking-[0.3em] mb-6 block">
              Credentials
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8">
              Professional <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-amber-500">
                Certifications
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Formal verification of my technical expertise and commitment to industry standards, earned through rigorous training and competitions.
            </p>
            
            <div className="p-8 rounded-3xl bg-secondary-50 dark:bg-secondary-900/10 border border-secondary-100 dark:border-secondary-900/30">
              <div className="text-3xl font-black text-secondary-600 dark:text-secondary-400 mb-2">3+</div>
              <div className="text-sm text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold">Industry Verified Certificates</div>
            </div>
          </motion.div>

          <div className="lg:w-3/5 space-y-2">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
