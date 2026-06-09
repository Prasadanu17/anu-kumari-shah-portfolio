import React from 'react';
import CustomCursor from '../components/common/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Skills from '../components/Skills';
import FeaturedProjects from '../components/FeaturedProjects';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/common/BackToTop';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <FeaturedProjects />
        <Achievements />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default HomePage;
