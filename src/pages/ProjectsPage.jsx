import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CustomCursor from '../components/common/CustomCursor';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#E6E2DD] text-[#2A2825] py-16 selection:bg-[#2A2825] selection:text-[#FAF8F5]">
      <CustomCursor />
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#D3CEC7] text-xs font-mono text-[#2A2825] hover:bg-[#2A2825] hover:text-[#FAF8F5] transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>
        </div>
        <Projects />
      </div>
    </div>
  );
};

export default ProjectsPage;
