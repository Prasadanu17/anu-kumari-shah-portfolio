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
   CONTACT FORM (Web3Forms + Env Secure Configuration)
   ========================================================================== */
const ContactForm = () => {
  const { personalInfo, submitContactForm } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [lastSubmittedName, setLastSubmittedName] = useState('');

  const isKeyConfigured = Boolean(
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY &&
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY.trim() !== '' &&
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.botcheck) {
      // Spam honeypot triggered by automated bot
      return;
    }

    setStatus('sending');
    setFeedbackMsg('');

    try {
      await submitContactForm(formData);
      setLastSubmittedName(formData.name || 'Friend');
      setStatus('sent');
      setFormData({ name: '', email: '', message: '', botcheck: '' });
    } catch (error) {
      console.warn('Web3Forms submission error:', error.message || error);
      setStatus('error');
      setFeedbackMsg(
        error.message || 'Unable to submit via Web3Forms. Please check your setup or use direct email.'
      );
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

      {/* Prominent Success View */}
      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 sm:p-6 rounded-xl bg-[#1c241c] border border-emerald-500/40 text-center space-y-3 my-2"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-emerald-300 font-display">
              Message Successfully Sent!
            </h4>
            <p className="text-[11px] sm:text-xs text-[#EAD9B8] font-mono leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="text-white font-semibold">{lastSubmittedName}</span>! Your message has been safely delivered to Anu's inbox ({personalInfo.email}).
            </p>
          </div>
          <p className="text-[10px] text-emerald-400/80 font-mono">
            ✓ Status 200: Web3Forms delivery confirmed
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-[#171717] bg-[#EAD9B8] px-4 py-2 rounded-lg hover:bg-[#d6c39f] transition-all shadow-md"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
          {/* Anti-spam Honeypot field (hidden from humans) */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            checked={Boolean(formData.botcheck)}
            onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked ? 'spam' : '' })}
            style={{ display: 'none' }}
          />

          {/* Configuration Hint Banner if key is missing */}
          {!isKeyConfigured && (
            <div className="text-[9.5px] sm:text-[10.5px] font-mono p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200/90 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Web3Forms setup pending: </span>
                Add your free access key to <code className="text-[#EAD9B8] bg-black/40 px-1 py-0.5 rounded">frontend/.env</code> to send directly, or use direct email client below.
              </div>
            </div>
          )}

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

          {/* Error Banner with 1-click fallback */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] sm:text-xs font-mono p-2.5 rounded-lg border text-rose-300 bg-rose-950/50 border-rose-500/40 space-y-2"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-semibold">{feedbackMsg}</span>
              </div>
              <div className="pt-1 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`mailto:${personalInfo.email}?subject=Portfolio Contact from ${encodeURIComponent(
                    formData.name || 'Visitor'
                  )}&body=${encodeURIComponent(formData.message || '')}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EAD9B8] text-[#171717] font-bold text-[10px] hover:bg-white transition-colors"
                >
                  <Mail className="w-3 h-3" /> Send via Email Client ({personalInfo.email})
                </a>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-[10px] text-rose-300 underline hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
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
                  SENDING MESSAGE...
                </motion.span>
              )}
              {status === 'error' && (
                <motion.span
                  key="error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-[#171717]"
                >
                  <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-700" />
                  RETRY SEND
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
      )}
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