import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Send, Check, Mail, Github, Linkedin, Download } from 'lucide-react';
import { personalInfo } from '../../utils/constants';

/* ==========================================================================
   CONTACT CARD (3D Hover Tilt)
   ========================================================================== */
const ContactCard = ({ label, value, href, external, icon: Icon, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

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
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38BDF8]/60 hover:bg-white/[0.06] transition-colors duration-300"
    >
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#38BDF8] group-hover:shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all duration-300" />

      <div className="relative z-10 flex items-center gap-3" style={{ transform: 'translateZ(20px)' }}>
        <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8]/20 transition-colors shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[9px] font-mono text-[#38BDF8] uppercase tracking-[0.2em] font-bold block">
            {label}
          </span>
          <span className="text-xs font-mono font-medium text-[#F4F4F6] group-hover:text-[#38BDF8] transition-colors truncate block">
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('idle');
      }
    } catch (error) {
      console.error('Form error:', error);
      setStatus('idle');
    }
  };

  const inputClass = 'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-[#F4F4F6] placeholder-[#5D6473] focus:outline-none focus:border-[#38BDF8]/60 focus:bg-white/[0.05] transition-all duration-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl"
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#38BDF8]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-5">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#F4F4F6]">
            Send a message
          </h3>
          <p className="text-xs font-mono text-[#8E95A5] mt-1">
            I'll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#07080B] text-xs font-mono font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#7DD3FC] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
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
                    className="w-3.5 h-3.5 border-2 border-[#07080B]/40 border-t-[#07080B] rounded-full"
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
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
const ContactStory = () => {
  const contacts = [
    { label: 'EMAIL', value: 'DIRECT MAIL', href: `mailto:${personalInfo.email}`, external: false, icon: Mail },
    { label: 'GITHUB', value: 'PRASADANU17', href: personalInfo.github, external: true, icon: Github },
    { label: 'LINKEDIN', value: 'ANU SHAH', href: personalInfo.linkedin, external: true, icon: Linkedin },
    { label: 'RESUME', value: 'DOWNLOAD PDF', href: personalInfo.resume, external: true, icon: Download },
  ];

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto z-10 py-24"
    >
      <div className="space-y-12 sm:space-y-14">

        {/* ============ CENTERED HEADER BLOCK ============ */}
        <div className="flex flex-col items-center text-center space-y-5">

          {/* Chapter marker (centered) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="h-px w-10 bg-[#38BDF8]/40 origin-right"
            />
            <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase font-bold">
              05 / CONTACT
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="h-px w-10 bg-[#38BDF8]/40 origin-left"
            />
          </motion.div>

          {/* Headline — single line, smaller, mixed style */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-[#F4F4F6] text-2xl sm:text-3xl md:text-4xl tracking-tight leading-[1.15]"
          >
            <span className="font-light">Let's build something</span>{' '}
            <span className="font-serif italic text-[#38BDF8] relative inline-block">
              intelligent.
              <motion.span
                className="absolute inset-0 bg-[#38BDF8]/20 blur-3xl -z-10 rounded-full"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </motion.h2>

          {/* Description — single line, centered */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#8E95A5] text-sm sm:text-base font-light leading-relaxed"
          >
            Open to AI/ML engineering, research, and full-stack opportunities.
          </motion.p>

        </div>

        {/* ============ TWO COLUMN: Links + Form ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 pt-6 border-t border-white/[0.08]">

          {/* LEFT: Contact links */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-mono text-[#5D6473] uppercase tracking-[0.3em]"
            >
              OR REACH OUT DIRECTLY
            </motion.p>

            <div className="space-y-3">
              {contacts.map((contact, idx) => (
                <ContactCard key={contact.label} {...contact} index={idx} />
              ))}
            </div>
          </div>

          {/* RIGHT: Contact form */}
          <ContactForm />
        </div>

        {/* ============ ENDING CREDIT ============ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-3 pt-8"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p className="text-[11px] font-mono text-[#5D6473] uppercase tracking-wider text-center">
            © {new Date().getFullYear()} ANU KUMARI SHAH. CRAFTED WITH INTELLIGENT PRECISION.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactStory;