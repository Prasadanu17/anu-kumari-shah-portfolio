import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Send, Check, Mail, Github, Linkedin, FileText, AlertCircle } from 'lucide-react';
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
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative p-3 sm:p-3.5 rounded-xl bg-[#1c1c1c] border border-[#8E8170]/30 hover:border-[#EAD9B8] hover:bg-[#222222] transition-all duration-300 min-w-0"
    >
      <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#EAD9B8] group-hover:shadow-[0_0_8px_rgba(234,217,184,0.6)] transition-all duration-300" />

      <div className="relative z-10 flex items-center gap-2.5 sm:gap-3" style={{ transform: 'translateZ(15px)' }}>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-[#8E8170]/30 flex items-center justify-center text-[#EAD9B8] group-hover:bg-[#EAD9B8] group-hover:text-[#171717] transition-colors shrink-0">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[9px] sm:text-[10px] font-mono text-[#C8B99F] uppercase tracking-[0.12em] font-bold block truncate">
            {label}
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-medium text-[#F5EBDD] group-hover:text-[#EAD9B8] transition-colors truncate block">
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
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setFeedbackMsg('');

    try {
      await submitContactForm(formData);
      setStatus('sent');
      setFeedbackMsg('Thank you! Your message was delivered successfully.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        setFeedbackMsg('');
      }, 4000);
    } catch (error) {
      console.warn('Web3Forms submission notice:', error.message || error);
      // Fallback: open mail client
      window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setStatus('fallback');
      setFeedbackMsg('Redirecting to your mail client...');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        setFeedbackMsg('');
      }, 4000);
    }
  };

  const inputClass = 'w-full bg-white/[0.03] border border-[#8E8170]/30 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-mono text-[#F5EBDD] placeholder-[#C8B99F]/60 focus:outline-none focus:border-[#EAD9B8] focus:bg-white/[0.05] transition-all duration-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="relative p-4 sm:p-5 rounded-2xl bg-[#171717] border border-[#8E8170]/30 shadow-2xl space-y-3 min-w-0"
    >
      <div>
        <h3 className="text-sm sm:text-base font-display font-bold text-[#EAD9B8] leading-tight">
          Send a direct message
        </h3>
        <p className="text-[10px] sm:text-xs font-mono text-[#C8B99F] mt-0.5 leading-tight">
          I respond to all inquiries within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-2.5">
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
          rows={2}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none sm:rows-3`}
        />

        {feedbackMsg && (
          <p className="text-[8px] sm:text-[10px] font-mono text-[#EAD9B8] bg-white/[0.04] p-1.5 rounded border border-[#8E8170]/30">
            {feedbackMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#EAD9B8] text-[#171717] text-[8.5px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest px-3 py-1.5 sm:py-2.5 rounded-lg hover:bg-[#d6c39f] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_20px_rgba(234,217,184,0.2)]"
        >
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5 sm:gap-2"
              >
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                SEND MESSAGE
              </motion.span>
            )}
            {status === 'sending' && (
              <motion.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5 sm:gap-2"
              >
                <motion.span
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 border-[#171717]/40 border-t-[#171717] rounded-full"
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
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[#171717]"
              >
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700" />
                MESSAGE SENT
              </motion.span>
            )}
            {status === 'fallback' && (
              <motion.span
                key="fallback"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[#171717]"
              >
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
                OPENING MAIL CLIENT
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
    { label: 'RESUME', value: 'Resume.pdf', href: personalInfo.resume, external: true, icon: FileText },
  ];

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center px-3 sm:px-6 lg:px-12 max-w-5xl mx-auto z-10 pt-2 pb-14 sm:pt-4 sm:pb-4 w-full"
    >
      <div className="space-y-3 sm:space-y-5">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="h-px w-6 sm:w-10 bg-[#8E8170]/40" />
            <span className="text-xs font-mono text-[#C8B99F] tracking-widest uppercase font-bold">
              10 / CONTACT
            </span>
            <div className="h-px w-6 sm:w-10 bg-[#8E8170]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="font-display font-extrabold text-[#EAD9B8] text-xl sm:text-3xl tracking-tight uppercase"
          >
            LET'S BUILD SOMETHING MEANINGFUL.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-[#F5EBDD] text-xs sm:text-sm font-light max-w-lg leading-relaxed px-2"
          >
            Open to opportunities, engineering collaborations, and impactful AI/ML & full-stack roles.
          </motion.p>
        </div>

        {/* Two Columns: Links + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-3 sm:pt-4 border-t border-[#8E8170]/25 gap-4 sm:gap-6 items-start">

          {/* Left: Contact links in 2x2 grid on mobile & tablet */}
          <div className="space-y-2 sm:space-y-3 min-w-0">
            <span className="text-[9px] sm:text-xs font-mono text-[#C8B99F] uppercase tracking-[0.2em] font-bold block">
              // DIRECT CHANNELS & PROFILES
            </span>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {contacts.map((contact, idx) => (
                <ContactCard key={contact.label} {...contact} index={idx} />
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <ContactForm />
        </div>

        {/* Minimal Footer Credits */}
        <div className="pt-3 border-t border-[#8E8170]/20 flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[11px] font-mono text-[#C8B99F] gap-1 text-center sm:text-left">
          <span>© {new Date().getFullYear()} ANU KUMARI SHAH • ALL RIGHTS RESERVED</span>
          <span className="text-[#EAD9B8]">GANGTOK, SIKKIM • AI/ML & FULL-STACK</span>
        </div>

      </div>
    </section>
  );
};

export default ContactStory;