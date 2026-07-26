import React from 'react';
import { ArrowRight, ShieldCheck, KeyRound, Cpu, Sparkles } from 'lucide-react';

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
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-60 pointer-events-none hidden md:block">
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-brand-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-brand-blue-600/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="md:col-span-7 flex flex-col items-start space-y-6 text-left animate-fade-in">

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-blue-950 tracking-tight leading-[1.1]">
              Turning Ideas <br />
              <span className="text-brand-blue-500">Into Possibilities.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Discover a modern digital experience built around simplicity, accessibility and seamless interaction.
            </p>

            {/* Company Tagline */}
            <div className="border-l-2 border-brand-blue-200 pl-4 py-1.5 text-sm italic text-slate-500 font-medium">
              "C the Idea, Bite the Market."
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection('auth')}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-brand-blue-500 rounded-lg shadow-sm hover:bg-brand-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-xs hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer"
              >
                Learn More
              </button>
            </div>

            {/* Trust Line */}
            <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/60 w-full text-xs font-semibold text-slate-400 tracking-wider uppercase">
              <span>Simple</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span>Modern</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span>Secure</span>
            </div>
          </div>

          {/* Right Column Abstract Visual Graphic */}
          <div className="md:col-span-5 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center animate-fade-in-delayed">
            {/* Background Accent Grid or Circles */}
            <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-15"></div>
            
            {/* Core CSS Graphic Layout */}
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
              
              {/* Outer Glow Ring */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-brand-blue-200/50 animate-[spin_20s_linear_infinite] pointer-events-none">
                <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-brand-blue-400 shadow-md shadow-brand-blue-500"></div>
              </div>

              {/* Main Visual Board / Mock Console */}
              <div className="w-[85%] h-[85%] bg-white rounded-2xl border border-slate-200 shadow-xl p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-500/5 rounded-bl-full pointer-events-none"></div>

                {/* Console Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Console v1.0</span>
                </div>

                {/* Simulated Security Card */}
                <div className="flex items-center space-x-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-xs mt-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue-50 flex items-center justify-center text-brand-blue-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="h-2 w-24 bg-brand-blue-500/80 rounded-sm mb-1.5"></div>
                    <div className="h-1.5 w-16 bg-slate-200 rounded-sm"></div>
                  </div>
                </div>

                {/* Simulated Key Card */}
                <div className="flex items-center space-x-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="h-2 w-20 bg-slate-300 rounded-sm mb-1.5"></div>
                    <div className="h-1.5 w-28 bg-slate-200/80 rounded-sm"></div>
                  </div>
                </div>

                {/* Mini Metric Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[10px] font-semibold text-slate-400">
                  <span className="flex items-center">
                    <Cpu className="w-3.5 h-3.5 mr-1 text-brand-blue-400" /> API Gateway
                  </span>
                  <span className="text-emerald-500 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping"></span> Active
                  </span>
                </div>
              </div>

              {/* Float badge 1 */}
              <div className="absolute -top-3 -right-2 p-3 bg-white rounded-lg border border-slate-200 shadow-md flex items-center space-x-2 animate-[bounce_5s_infinite]">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-blue-500"></div>
                <span className="text-[10px] font-bold text-brand-blue-950">OAuth 2.0 Ready</span>
              </div>

              {/* Float badge 2 */}
              <div className="absolute -bottom-2 -left-3 p-3 bg-white rounded-lg border border-slate-200 shadow-md flex items-center space-x-2 animate-[bounce_6s_infinite_delayed]">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-brand-blue-950">OTP Secure</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
