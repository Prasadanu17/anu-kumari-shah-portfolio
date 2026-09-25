import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Send, Check, Mail, Github, Linkedin, FileText } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

/* ==========================================================================
   CONTACT CARD (3D Hover Tilt)
   ========================================================================== */
const ContactCard = ({ label, value, href, external, icon: Icon, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0d1310] border border-white/10 hover:border-[#1e6f5c] hover:bg-[#0d1310]/90 transition-all duration-300"
    >
      <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#1e6f5c] group-hover:shadow-[0_0_8px_rgba(30,111,92,0.8)] transition-all duration-300" />

      <div className="relative z-10 flex items-center gap-3.5" style={{ transform: 'translateZ(15px)' }}>
        <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#1e6f5c]/15 border border-[#1e6f5c]/30 flex items-center justify-center text-[#1e6f5c] group-hover:bg-[#1e6f5c] group-hover:text-white transition-colors shrink-0">
          <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[7px] sm:text-[9px] font-mono text-[#1e6f5c] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold block">
            {label}
          </span>
          <span className="text-[9px] sm:text-xs font-mono font-medium text-[#F4F5F4] group-hover:text-[#1e6f5c] transition-colors truncate block">
            {value}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

/* ==========================================================================
   CONTACT FORM
   ========================================================================== */
const ContactForm = () => {
  const { personalInfo, submitContactForm } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await submitContactForm(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('API submission fallback to mailto:', error);
      window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputClass = 'w-full bg-white/[0.03] border border-white/10 rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-mono text-[#F4F5F4] placeholder-[#8E9793] focus:outline-none focus:border-[#1e6f5c] focus:bg-white/[0.05] transition-all duration-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative p-3 sm:p-8 rounded-xl sm:rounded-3xl bg-[#0d1310] border border-white/10 shadow-2xl space-y-3 sm:space-y-5"
    >
      <div>
        <h3 className="text-sm sm:text-xl font-display font-bold text-[#F4F5F4]">
          Send a direct message
        </h3>
        <p className="text-[9px] sm:text-xs font-mono text-[#8E9793] mt-0.5">
          I respond to all inquiries within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
        <input
          type="text"
          name="name"
          placeholder="YOUR NAME"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="email"
          name="email"
          placeholder="YOUR EMAIL"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />

        <textarea
          name="message"
          placeholder="YOUR MESSAGE"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />

        <button
          type="submit"
          disabled={status !== 'idle'}
          className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#1e6f5c] text-white text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-[#28967d] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_20px_rgba(30,111,92,0.3)]"
        >
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                SEND MESSAGE
              </motion.span>
            )}
            {status === 'sending' && (
              <motion.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <motion.span
                  className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                SENDING...
              </motion.span>
            )}
            {status === 'sent' && (
              <motion.span
                key="sent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5" />
                MESSAGE SENT
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </form>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
const ContactStory = () => {
  const { personalInfo } = usePortfolio();

  const contacts = [
    { label: 'EMAIL', value: personalInfo.email, href: `mailto:${personalInfo.email}`, external: false, icon: Mail },
    { label: 'LINKEDIN', value: 'Anu Shah', href: personalInfo.linkedin, external: true, icon: Linkedin },
    { label: 'GITHUB', value: 'Prasadanu17', href: personalInfo.github, external: true, icon: Github },
    { label: 'RESUME', value: 'Anu Kumari Shah-Resume.pdf', href: personalInfo.resume, external: true, icon: FileText },
  ];

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 pt-24 sm:pt-28 pb-12 sm:pb-20"
    >
      <div className="space-y-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
            <span className="text-xs font-mono text-[#1e6f5c] tracking-widest uppercase font-bold">
              08 / CONTACT
            </span>
            <div className="h-px w-10 bg-[#1e6f5c]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-[#F4F5F4] text-xl sm:text-5xl tracking-tight uppercase"
          >
            LET'S BUILD SOMETHING MEANINGFUL.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8E9793] text-[10px] sm:text-base font-light max-w-xl leading-relaxed"
          >
            "I'm open to opportunities, collaborations, and projects involving AI/ML and modern web development."
          </motion.p>
        </div>

        {/* Two Columns: Links + Form */}
        <div className="grid grid-cols-[1fr_1fr] pt-4 border-t border-white/[0.08] gap-2 sm:gap-[clamp(1.5rem,4vw,2.5rem)]">

          {/* Left: Contact links */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#1e6f5c] uppercase tracking-[0.25em] font-bold block">
              // DIRECT CHANNELS & PROFILES
            </span>

            <div className="space-y-3">
              {contacts.map((contact, idx) => (
                <ContactCard key={contact.label} {...contact} index={idx} />
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <ContactForm />
        </div>

      </div>
    </section>
  );
};

export default ContactStory;