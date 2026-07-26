import React from 'react';

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
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
    <footer className="bg-white border-t border-slate-200/60 py-12 md:py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-100">
          
          {/* Left Column: Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 overflow-hidden flex items-center justify-center rounded-lg bg-white border border-slate-100/80 shadow-3xs shrink-0">
                <img 
                  src="/assets/logo.png" 
                  alt="CBite logo mark" 
                  className="h-12 w-12 max-w-none object-contain -translate-y-[5.2px]" 
                />
              </div>
              <span className="font-bold text-lg text-brand-blue-950">CBite</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
              "C the Idea, Bite the Market."
            </p>
          </div>

          {/* Right Column: Links Grid */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8">
            {/* Sitemap Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-brand-blue-950 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => scrollToSection('hero')} 
                    className="text-slate-500 hover:text-brand-blue-500 transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="text-slate-500 hover:text-brand-blue-500 transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('what-we-do')} 
                    className="text-slate-500 hover:text-brand-blue-500 transition-colors cursor-pointer"
                  >
                    What We Do
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="text-slate-500 hover:text-brand-blue-500 transition-colors cursor-pointer"
                  >
                    Why CBite
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('auth')} 
                    className="text-slate-500 hover:text-brand-blue-500 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-brand-blue-950 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#auth" className="text-slate-500 hover:text-brand-blue-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#auth" className="text-slate-500 hover:text-brand-blue-500 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium">
          <p>© 2026 CBite Pvt. Ltd. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
