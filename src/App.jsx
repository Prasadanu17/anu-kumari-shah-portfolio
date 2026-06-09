import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/common/LoadingScreen';
import feather from 'feather-icons';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;