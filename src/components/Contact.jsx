import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { personalInfo } from '../utils/constants';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-28 sm:py-36 relative">

      {/* ── Cinematic section divider ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="story-container">

        {/* Section Header */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>05 / CONTACT // THE FINAL CHAPTER</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: High-Impact Editorial Statement & Channels (6 cols) ── */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-[#F4F4F6] leading-[1.08]">
                LET'S BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#F4F4F6]">
                  SOMETHING
                </span> <br />
                MEANINGFUL.
              </h2>
              <p className="text-sm sm:text-base text-[#8E95A5] leading-relaxed font-light max-w-md">
                Have a machine learning project, research collaboration, or looking for an AI/ML and Full-Stack engineer? Let's connect.
              </p>
            </div>

            {/* Quick Contact Links Matrix */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono text-[#5D6473] uppercase tracking-wider block">
                DIRECT CHANNELS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-[#38BDF8]/40 transition-all duration-200 flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8]/10 group-hover:border-[#38BDF8]/30 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5D6473] uppercase block">EMAIL</span>
                    <span className="text-xs font-mono text-[#E4E4E7] group-hover:text-white transition-colors truncate max-w-[160px] block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#38BDF8]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5D6473] uppercase block">LOCATION</span>
                    <span className="text-xs font-mono text-[#E4E4E7]">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-white/25 transition-all duration-200 flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#8E95A5] group-hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5D6473] uppercase block">GITHUB</span>
                    <span className="text-xs font-mono text-[#E4E4E7] group-hover:text-white transition-colors">
                      @Prasadanu17 ↗
                    </span>
                  </div>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#0E1017]/75 backdrop-blur-md hover:border-white/25 transition-all duration-200 flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#8E95A5] group-hover:text-[#38BDF8] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5D6473] uppercase block">LINKEDIN</span>
                    <span className="text-xs font-mono text-[#E4E4E7] group-hover:text-white transition-colors">
                      Anu Shah ↗
                    </span>
                  </div>
                </a>
              </div>

              {/* Resume Direct Action */}
              <div className="pt-3">
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border border-white/15 bg-white/[0.04] text-[#F4F4F6] hover:bg-white/[0.08] hover:border-white/30 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200"
                >
                  <FileText className="w-4 h-4 text-[#38BDF8]" />
                  <span>VIEW CURRICULUM VITAE (PDF) ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Minimal Dark Glass Inquiry Form (6 cols) ── */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-[#0E1017]/85 backdrop-blur-md shadow-2xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-[#F4F4F6]">
                  DIRECT TRANSMISSION
                </h3>
                <p className="text-xs font-mono text-[#8E95A5]">
                  Leave a message and I'll respond within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] text-center space-y-3"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-display font-bold text-[#F4F4F6]">
                    TRANSMISSION RECEIVED
                  </h4>
                  <p className="text-xs font-mono text-[#8E95A5] leading-relaxed">
                    Thank you for reaching out. I have received your note and will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider block">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-[#F4F4F6] placeholder-[#5D6473] focus:border-[#38BDF8] focus:bg-white/[0.06] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider block">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@organization.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-[#F4F4F6] placeholder-[#5D6473] focus:border-[#38BDF8] focus:bg-white/[0.06] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider block">
                      SUBJECT / ROLE
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. AI/ML Engineering Collaboration"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-[#F4F4F6] placeholder-[#5D6473] focus:border-[#38BDF8] focus:bg-white/[0.06] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider block">
                      MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, team, or opportunity..."
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-[#F4F4F6] placeholder-[#5D6473] focus:border-[#38BDF8] focus:bg-white/[0.06] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-[#38BDF8] text-[#07080B] hover:bg-[#7DD3FC] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#38BDF8]/15 flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>SEND INQUIRY</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;