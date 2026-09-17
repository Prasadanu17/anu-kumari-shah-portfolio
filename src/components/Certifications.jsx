import React from "react";
import { motion } from "framer-motion";
import { certifications } from "../utils/constants";
import { FileCheck, ShieldCheck } from "lucide-react";

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 sm:py-24 relative border-t border-white/[0.08]">
      <div className="story-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Heading & Telemetry (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>06.2 // CREDENTIALS & AUDIT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#F4F4F6]">
              VERIFIED CERTIFICATIONS
            </h2>
            <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed font-light">
              Formal verification of software engineering skills earned through corporate internships, code hackathons, and academic technical symposiums.
            </p>

            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-display font-bold text-[#F4F4F6]">3+ Audited Credentials</div>
                <div className="text-[11px] font-mono text-[#8E95A5] uppercase">Validated Industry Records</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Certification Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-[#38BDF8]/40 transition-all duration-300 flex items-center justify-between gap-4 group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8]/10 group-hover:border-[#38BDF8]/30 transition-colors">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-display font-bold text-[#F4F4F6] group-hover:text-white transition-colors">
                      {cert.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8E95A5] mt-1">
                      <span>{cert.issuer}</span>
                      <span className="text-[#5D6473]">•</span>
                      <span className="text-[#5D6473]">Issued: {cert.date}</span>
                    </div>
                  </div>
                </div>

                <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase font-bold tracking-wider shrink-0">
                  VERIFIED
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Certifications;
