import React, { useState, useEffect } from 'react';
import { Menu, X, Layers } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky navbar
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          {/* CBite Official Logo */}
          <div className="h-9 w-9 overflow-hidden flex items-center justify-center rounded-lg bg-white border border-slate-100/80 shadow-2xs transition-transform group-hover:scale-105 shrink-0">
            <img 
              src="/assets/logo.png" 
              alt="CBite logo mark" 
              className="h-14 w-14 max-w-none object-contain -translate-y-[6px]" 
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-brand-blue-950 transition-colors group-hover:text-brand-blue-500">
            CBite
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-sm font-medium text-slate-600 hover:text-brand-blue-500 cursor-pointer transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-slate-600 hover:text-brand-blue-500 cursor-pointer transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('what-we-do')}
            className="text-sm font-medium text-slate-600 hover:text-brand-blue-500 cursor-pointer transition-colors"
          >
            What We Do
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="text-sm font-medium text-slate-600 hover:text-brand-blue-500 cursor-pointer transition-colors"
          >
            Why CBite
          </button>
          <button
            onClick={() => scrollToSection('auth')}
            className="text-sm font-medium text-slate-600 hover:text-brand-blue-500 cursor-pointer transition-colors"
          >
            Sign In
          </button>
          
          <button
            onClick={() => scrollToSection('auth')}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-blue-500 rounded-lg shadow-sm hover:bg-brand-blue-600 hover:shadow-md transition-all active:scale-98 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-brand-blue-500 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg px-6 py-6 space-y-4 flex flex-col animate-fade-in">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-left py-2 text-base font-medium text-slate-600 hover:text-brand-blue-500 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left py-2 text-base font-medium text-slate-600 hover:text-brand-blue-500 transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('what-we-do')}
            className="text-left py-2 text-base font-medium text-slate-600 hover:text-brand-blue-500 transition-colors cursor-pointer"
          >
            What We Do
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="text-left py-2 text-base font-medium text-slate-600 hover:text-brand-blue-500 transition-colors cursor-pointer"
          >
            Why CBite
          </button>
          <button
            onClick={() => scrollToSection('auth')}
            className="text-left py-2 text-base font-medium text-slate-600 hover:text-brand-blue-500 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => scrollToSection('auth')}
            className="w-full text-center px-5 py-3 text-base font-semibold text-white bg-brand-blue-500 rounded-lg hover:bg-brand-blue-600 shadow-sm transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
