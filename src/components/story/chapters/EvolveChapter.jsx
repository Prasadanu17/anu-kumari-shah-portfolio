import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { achievements, certifications, experience } from '../../../utils/constants';

const EvolveChapter = () => {
  const currentInternship = experience.find((e) => e.company.includes('Sheld Tech'));

  return (
    <section id="evolve" className="min-h-screen flex items-center justify-center relative px-6 py-28">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            CHAPTER 07 — EVOLVE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            Industry Immersion & Recognition
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Testing technical limits through security projects, coding challenges, design hackathons, and industry certifications.
          </p>
        </motion.div>

        {/* Current Experience Spotlight */}
        {currentInternship && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl mb-12 border border-[#63D8B5]/20 flex flex-col md:flex-row gap-6 items-start justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#11152A] border border-[#63D8B5]/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#63D8B5]" />
              </div>
              <div>
                <span className="text-xs font-mono text-indigo-400 block mb-1">
                  CURRENT ROLE — {currentInternship.period}
                </span>
                <h3 className="font-display text-2xl font-bold text-[#F5F7FA]">
                  {currentInternship.title}
                </h3>
                <div className="text-sm font-semibold text-[#63D8B5] mb-2">
                  {currentInternship.company}
                </div>
                <p className="text-xs sm:text-sm text-[#A5ACB8] leading-relaxed max-w-2xl">
                  {currentInternship.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements & Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Achievements */}
          <div>
            <h3 className="font-display text-xl font-bold text-[#F5F7FA] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#63D8B5]" />
              <span>Competitions & Awards</span>
            </h3>
            <div className="space-y-4">
              {achievements.map((item) => (
                <div key={item.id} className="glass-card p-5 rounded-xl">
                  <h4 className="font-display text-base font-bold text-[#F5F7FA] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A5ACB8]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-display text-xl font-bold text-[#F5F7FA] mb-4 flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-indigo-400" />
              <span>Verified Certifications</span>
            </h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="glass-card p-5 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-display text-base font-bold text-[#F5F7FA]">
                      {cert.title}
                    </h4>
                    <span className="text-xs text-[#A5ACB8]">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#63D8B5] px-2.5 py-1 rounded bg-[#11152A]">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvolveChapter;
