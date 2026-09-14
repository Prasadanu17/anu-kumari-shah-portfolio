import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF8F5] text-[#66625C] py-12 border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-[#2A2825] font-display uppercase tracking-tight">
              ANU KUMARI SHAH
            </div>
            <p className="text-xs font-mono text-[#66625C] mt-1">AI / ML Engineer & Full Stack Developer</p>
          </div>
          
          <div className="flex flex-wrap gap-6 text-xs font-mono">
            <a href="#home" className="hover:text-[#2A2825] transition-colors">01 Intro</a>
            <a href="#about" className="hover:text-[#2A2825] transition-colors">02 Focus</a>
            <a href="#projects" className="hover:text-[#2A2825] transition-colors">03 Selected Work</a>
            <a href="#skills" className="hover:text-[#2A2825] transition-colors">04 Skills</a>
            <a href="#achievements" className="hover:text-[#2A2825] transition-colors">05 Playground</a>
            <a href="#contact" className="hover:text-[#2A2825] transition-colors">06 Contact</a>
          </div>
          
          <div className="flex gap-3 text-xs font-mono">
            <a
              href="https://github.com/Prasadanu17"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#E6E2DD] border border-[#D3CEC7] rounded text-[#2A2825] hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-colors"
            >
              GITHUB ↗
            </a>
            <a
              href="https://linkedin.com/in/anu-shah-102594348"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#E6E2DD] border border-[#D3CEC7] rounded text-[#2A2825] hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-colors"
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>
        
        <div className="border-t border-[#D3CEC7] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#66625C] gap-4">
          <p>&copy; {currentYear} ANU KUMARI SHAH. ALL RIGHTS RESERVED.</p>
          <p>BUILT WITH INTENT & PERFORMANCE.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;