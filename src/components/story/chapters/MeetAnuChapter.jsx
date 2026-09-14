import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Calendar, Send, Download, Github, Linkedin, Twitter, Check } from 'lucide-react';

const MeetAnuChapter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="meet-anu" className="min-h-screen flex flex-col justify-between relative px-6 py-28">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#63D8B5] tracking-widest uppercase block mb-2">
            FINAL — MEET ANU
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F7FA]">
            Let's Build Something Intelligent
          </h2>
          <p className="text-[#A5ACB8] text-base sm:text-lg max-w-2xl mt-3 font-light">
            Have a project in mind, research collaboration, or full-time opportunity? Reach out directly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Profile & Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-5 glass-card p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src="assets/profile.jpeg"
                alt="Anu Kumari Shah"
                className="w-16 h-16 rounded-2xl object-cover object-top border border-indigo-500/30"
              />
              <div>
                <h3 className="font-display text-xl font-bold text-[#F5F7FA]">
                  Anu Kumari Shah
                </h3>
                <span className="text-xs font-mono text-[#63D8B5]">
                  AI / ML & Full Stack Engineer
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-xs text-[#A5ACB8]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#11152A] flex items-center justify-center text-[#63D8B5]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#A5ACB8]/60">EMAIL</span>
                  <a href="mailto:anu705545@gmail.com" className="text-[#F5F7FA] hover:text-[#63D8B5] transition-colors">
                    anu705545@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#11152A] flex items-center justify-center text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#A5ACB8]/60">LOCATION</span>
                  <span className="text-[#F5F7FA]">Gangtok, Sikkim</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#11152A] flex items-center justify-center text-[#63D8B5]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#A5ACB8]/60">AVAILABILITY</span>
                  <span className="text-[#F5F7FA]">Freelance & Full-time Opportunities</span>
                </div>
              </div>
            </div>

            {/* Resume & Social Links */}
            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
              <a
                href="assets/profile.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#1E6F5C] hover:bg-[#63D8B5] text-[#F5F7FA] hover:text-[#050608] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD CURRICULUM VITAE</span>
              </a>

              <div className="flex gap-3 justify-center pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl bg-[#11152A] border border-white/5 flex items-center justify-center text-[#A5ACB8] hover:text-[#63D8B5] hover:border-[#63D8B5]/40 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-[#11152A] border border-white/5 flex items-center justify-center text-[#A5ACB8] hover:text-[#63D8B5] hover:border-[#63D8B5]/40 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-xl bg-[#11152A] border border-white/5 flex items-center justify-center text-[#A5ACB8] hover:text-[#63D8B5] hover:border-[#63D8B5]/40 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-7 glass-card p-8 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-[#A5ACB8] uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0D12]/80 border border-white/10 text-sm text-[#F5F7FA] placeholder-[#A5ACB8]/40 focus:border-[#63D8B5] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A5ACB8] uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0D12]/80 border border-white/10 text-sm text-[#F5F7FA] placeholder-[#A5ACB8]/40 focus:border-[#63D8B5] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A5ACB8] uppercase mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0D12]/80 border border-white/10 text-sm text-[#F5F7FA] placeholder-[#A5ACB8]/40 focus:border-[#63D8B5] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                }`}
              >
                {isSubmitting ? (
                  <span>SENDING MESSAGE...</span>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>MESSAGE TRANSMITTED</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Minimal Editorial Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#A5ACB8]/50 gap-4">
          <div>
            © {new Date().getFullYear()} ANU KUMARI SHAH. ALL RIGHTS RESERVED.
          </div>
          <div>
            CURIOSITY BECAME CODE. CODE BECAME INTELLIGENCE.
          </div>
        </footer>
      </div>
    </section>
  );
};

export default MeetAnuChapter;
