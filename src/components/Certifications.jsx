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
      className="bg-[#FAF8F5] flex items-center gap-6 p-6 rounded-2xl border border-[#D3CEC7] shadow-sm hover:border-[#2A2825] transition-colors mb-4"
    >
      <div className="w-12 h-12 shrink-0 rounded-xl bg-[#E6E2DD] border border-[#D3CEC7] flex items-center justify-center text-[#2A2825]">
        <FileCheck className="w-6 h-6 text-[#2A2825]" />
      </div>
      
      <div className="flex-1">
        <h4 className="text-lg font-bold text-[#2A2825] font-display mb-1">
          {cert.title}
        </h4>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs text-[#66625C] font-mono">
            {cert.issuer}
          </span>
          <span className="text-xs font-mono text-[#66625C]">
            Issued: {cert.date}
          </span>
        </div>
      </div>

      <div className="hidden sm:flex">
        <div className="px-3 py-1 rounded-full border border-[#2A2825] text-[#2A2825] text-[10px] font-mono uppercase tracking-wider font-bold">
          VERIFIED
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-[#ECE8E3] border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 flex flex-col justify-center"
          >
            <span className="text-xs font-mono text-[#66625C] uppercase tracking-widest mb-2 block">
              05 PLAYGROUND // CREDENTIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A2825] uppercase font-display mb-4">
              Verified Certifications
            </h2>
            <p className="text-[#66625C] text-sm leading-relaxed font-light mb-8">
              Formal verification of technical expertise earned through web development internships, university programming events, and regional competitions.
            </p>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#D3CEC7] shadow-sm">
              <div className="text-3xl font-bold text-[#2A2825] font-display mb-1">3+</div>
              <div className="text-xs font-mono text-[#66625C] uppercase tracking-wider">Verified Credentials</div>
            </div>
          </motion.div>

          <div className="lg:w-3/5 w-full">
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
