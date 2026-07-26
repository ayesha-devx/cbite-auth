import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  const scrollToAuth = () => {
    const element = document.getElementById('auth');
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
    <section className="relative py-20 bg-brand-navy-900 overflow-hidden text-center">
      {/* Subtle Blue Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.18),transparent_70%)] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to Get Started?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Access CBite through a simple and secure sign-in experience.
        </p>

        <div className="pt-4">
          <button
            onClick={scrollToAuth}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-brand-blue-950 bg-white rounded-lg shadow-sm hover:bg-brand-blue-50 hover:shadow-md transition-all active:scale-98 cursor-pointer"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2 text-brand-blue-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
