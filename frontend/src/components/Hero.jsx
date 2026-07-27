import React from 'react';
import { ArrowRight, Sparkles, Compass, Rocket, TrendingUp } from 'lucide-react';

export default function Hero() {
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
    <section id="hero" className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 border-b border-slate-100">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-60 pointer-events-none hidden md:block">
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-brand-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-brand-blue-600/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="md:col-span-7 flex flex-col items-start space-y-6 text-left animate-fade-in">
            {/* Eyebrow Label */}
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-brand-blue-50/60 border border-brand-blue-100/80 text-[10px] font-extrabold text-brand-blue-600 uppercase tracking-widest shadow-[0_2px_10px_rgba(37,99,235,0.03)]">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue-500 animate-pulse" />
              <span>FROM IDEA TO IMPACT</span>
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-blue-950 tracking-tight leading-[1.1]">
              Turning Ideas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-650 via-indigo-600 to-brand-blue-500">Into Possibilities.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light">
              Transform ideas into meaningful digital experiences with a platform built for innovation, simplicity and growth.
            </p>

            {/* Company Tagline */}
            <div className="border-l-3 border-brand-blue-500 pl-4 py-1.5 text-sm italic text-slate-500 font-semibold tracking-wide">
              "C the Idea, Bite the Market."
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection('auth')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-brand-blue-500 rounded-lg shadow-sm hover:bg-brand-blue-600 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-xs hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 cursor-pointer"
              >
                Explore CBite
              </button>
            </div>

            {/* Trust Line */}
            <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/60 w-full text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              <span>Idea</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-350"></span>
              <span>Build</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-350"></span>
              <span>Launch</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-350"></span>
              <span>Grow</span>
            </div>
          </div>

          {/* Right Column Premium Visual Graphic */}
          <div className="md:col-span-5 relative w-full flex items-center justify-center animate-fade-in-delayed">
            {/* Background Accent Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-15"></div>
            
            {/* Startup Pipeline Visual Stack */}
            <div className="relative w-full max-w-[360px] flex flex-col space-y-4 py-8 relative z-10">
              {[
                { label: 'IDEA', desc: 'Explore and validate possibilities', color: 'bg-brand-blue-50 border-brand-blue-100 text-brand-blue-600', icon: <Compass className="w-4 h-4" /> },
                { label: 'BUILD', desc: 'Craft meaningful digital experiences', color: 'bg-indigo-50 border-indigo-100 text-indigo-600', icon: <Sparkles className="w-4 h-4" /> },
                { label: 'LAUNCH', desc: 'Deploy digital products to the market', color: 'bg-violet-50 border-violet-100 text-violet-600', icon: <Rocket className="w-4 h-4" /> },
                { label: 'GROW', desc: 'Scale, optimize, and bite the market', color: 'bg-emerald-50 border-emerald-100 text-emerald-600', icon: <TrendingUp className="w-4 h-4" /> }
              ].map((card, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center space-x-4 p-4 border border-slate-150/80 rounded-2xl shadow-xs transition-all duration-300 hover:scale-103 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-brand-blue-300 bg-white/95 backdrop-blur-xs relative overflow-hidden group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${card.color.split(' ')[0]} ${card.color.split(' ')[2]} border border-white`}>
                    {card.icon}
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase">{card.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">{card.desc}</p>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-100/70 font-black text-3xl select-none pointer-events-none tracking-widest font-sans group-hover:text-brand-blue-50 transition-colors duration-300">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
