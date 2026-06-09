import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const isDark = savedTheme === "dark";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", to: "/projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="text-2xl font-bold text-slate-900 dark:text-white">
            Anu<span className="text-primary-500">KumariShah</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-slate-700 dark:text-slate-300 hover:text-primary-500 transition font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-primary-500 transition font-medium"
                >
                  {item.label}
                </a>
              )
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 px-6 py-4">
          {navItems.map((item) => (
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
