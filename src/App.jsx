import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/common/LoadingScreen';
import CustomCursor from './components/common/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';         // fixed capitalization
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/common/BackToTop';

// If you're using feather-icons somewhere in components
import feather from 'feather-icons';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    // Load from localStorage or system preference
    if (localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark';
    }
    return 'light';
  });

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // slightly longer feels more premium

    return () => clearTimeout(timer);
  }, []);

  // Theme handling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Feather icons replacement (run once after mount)
  useEffect(() => {
    feather.replace();
  }, []);

  // Optional: smooth scroll for anchor links (if not using CSS scroll-behavior)
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      <CustomCursor />

      {/* Pass theme and toggle function to Navbar */}
      <Navbar 
        theme={theme} 
        toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      />

      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Experience />
        <Contact />
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
}

export default App;