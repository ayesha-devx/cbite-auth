import React from 'react';
import { Lightbulb, Layers, TrendingUp } from 'lucide-react';

export default function WhatWeDo() {
  const services = [
    {
      title: 'IDEA VALIDATION',
      desc: 'Shape early concepts, understand their potential and create a clearer direction before moving forward.',
      icon: <Lightbulb className="w-6 h-6 text-brand-blue-500" />
    },
    {
      title: 'PRODUCT DEVELOPMENT',
      desc: 'Turn promising ideas into thoughtful, modern and user-focused digital products.',
      icon: <Layers className="w-6 h-6 text-brand-blue-500" />
    },
    {
      title: 'LAUNCH & GROWTH',
      desc: 'Prepare ideas for the market and create a foundation for continuous improvement and growth.',
      icon: <TrendingUp className="w-6 h-6 text-brand-blue-500" />
    }
  ];

  return (
    <section id="what-we-do" className="py-20 md:py-28 bg-white border-b border-slate-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue-500">
            WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-950 tracking-tight">
            From Ideas to Digital Experiences
          </h2>
          <div className="w-12 h-1 bg-brand-blue-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-3xl p-8 md:p-10 hover:border-brand-blue-500/40 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] hover:-translate-y-1.5 transition-all duration-350 group text-left flex flex-col justify-between h-full relative overflow-hidden"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-blue-50 group-hover:scale-105 mb-8">
                  {service.icon}
                </div>

                <h3 className="text-lg font-bold text-brand-blue-950 mb-3 group-hover:text-brand-blue-500 transition-colors tracking-tight">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="w-0 group-hover:w-full h-0.5 bg-brand-blue-500 rounded-full mt-6 transition-all duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
