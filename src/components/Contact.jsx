import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatInput = ({ label, type = 'text', name, value, onChange, placeholder, required }) => (
  <div className="float-label-group">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      required={required}
      className="w-full px-4 pb-3 rounded-lg bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] placeholder-transparent focus:border-[#2A2825] outline-none text-sm transition-colors"
    />
    <label>{label}</label>
  </div>
);

const FloatTextarea = ({ label, name, value, onChange, required }) => (
  <div className="float-label-group">
    <textarea
      rows={4}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      required={required}
      className="w-full px-4 pb-3 rounded-lg bg-[#E6E2DD] border border-[#D3CEC7] text-[#2A2825] placeholder-transparent focus:border-[#2A2825] outline-none text-sm transition-colors resize-none"
    />
    <label>{label}</label>
  </div>
);

const infoCards = [
  {
    icon: '✉',
    title: 'Email',
    content: <a href="mailto:anu705545@gmail.com" className="text-[#66625C] text-xs font-mono hover:text-[#2A2825] transition-colors">anu705545@gmail.com</a>,
  },
  {
    icon: '📍',
    title: 'Location',
    content: <p className="text-[#66625C] text-xs font-mono">Gangtok, Sikkim</p>,
  },
  {
    icon: '⚡',
    title: 'Availability',
    content: <p className="text-[#66625C] text-xs font-mono">Open for Full-time & Freelance Opportunities</p>,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative bg-[#E6E2DD] border-t border-[#D3CEC7] overflow-hidden">

      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-mono text-[#66625C] uppercase tracking-widest block mb-2">
              08 LET'S TALK // GET IN TOUCH
            </span>
            <h3 className="text-4xl lg:text-5xl font-bold text-[#2A2825] font-display uppercase mb-4">
              Let's Build Something Meaningful
            </h3>
            <p className="text-[#66625C] text-sm max-w-2xl mx-auto font-light">
              Have a project in mind, research idea, or full-time opportunity? Reach out directly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {infoCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  className="flex items-start gap-4 p-4 bg-[#FAF8F5] border border-[#D3CEC7] rounded-xl hover:border-[#2A2825] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#E6E2DD] rounded-lg flex items-center justify-center shrink-0 border border-[#D3CEC7] text-[#2A2825]">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2A2825] text-sm font-display mb-1 uppercase">{card.title}</h4>
                    {card.content}
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.36 }}
                className="p-6 bg-[#FAF8F5] rounded-xl border border-[#D3CEC7] space-y-3"
              >
                <h4 className="font-bold text-[#2A2825] text-xs font-mono uppercase tracking-wider">Social Channels</h4>
                <div className="flex gap-3 text-xs font-mono flex-wrap">
                  <a
                    href="https://github.com/Prasadanu17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#E6E2DD] border border-[#D3CEC7] rounded text-[#2A2825] hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-colors"
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/anu-shah-102594348"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#E6E2DD] border border-[#D3CEC7] rounded text-[#2A2825] hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-colors"
                  >
                    LINKEDIN ↗
                  </a>
                  <a
                    href="/assets/Anu Kumari Shah-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#E6E2DD] border border-[#D3CEC7] rounded text-[#2A2825] hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-colors"
                  >
                    RESUME ↗
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#D3CEC7] shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <FloatInput
                  label="Your Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FloatInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FloatTextarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF8F5] rounded-lg transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-[#4A6B5A]'
                      : 'bg-[#2A2825] hover:bg-[#1A1918]'
                  } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting
                    ? 'SENDING MESSAGE...'
                    : isSubmitted
                    ? '✓ MESSAGE TRANSMITTED'
                    : 'SEND MESSAGE'}
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;