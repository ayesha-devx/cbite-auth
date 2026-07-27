import React from 'react';
import { Search, PenTool, Rocket, LineChart, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Explore the idea, problem and opportunity.',
      icon: <Search className="w-5 h-5 text-brand-blue-500" />
    },
    {
      num: '02',
      title: 'Build',
      desc: 'Transform the concept into a meaningful digital experience.',
      icon: <PenTool className="w-5 h-5 text-brand-blue-500" />
    },
    {
      num: '03',
      title: 'Launch',
      desc: 'Bring the solution into the real world.',
      icon: <Rocket className="w-5 h-5 text-brand-blue-500" />
    },
    {
      num: '04',
      title: 'Grow',
      desc: 'Learn, improve and create new opportunities.',
      icon: <LineChart className="w-5 h-5 text-brand-blue-500" />
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue-500">
            HOW CBITE WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-950 tracking-tight">
            From Idea to Impact
          </h2>
          <div className="w-12 h-1 bg-brand-blue-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Process Map Progression Row */}
        <div className="hidden lg:flex items-center justify-center space-x-4 mb-16 bg-white border border-slate-200/60 rounded-2xl p-6 max-w-4xl mx-auto shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pipeline</span>
          <span className="text-sm font-extrabold text-brand-blue-950">IDEA</span>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <span className="text-sm font-extrabold text-brand-blue-500">BUILD</span>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <span className="text-sm font-extrabold text-brand-blue-500">LAUNCH</span>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <span className="text-sm font-extrabold text-emerald-500">GROW</span>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-150/65 rounded-3xl p-8 hover:border-brand-blue-500/30 hover:shadow-[0_15px_40px_rgba(37,99,235,0.03)] hover:-translate-y-1 transition-all duration-350 relative group text-left flex flex-col justify-between h-full"
            >
              <div>
                {/* Outer Step Number Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-black text-slate-150 select-none group-hover:text-brand-blue-100 transition-colors duration-300">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-brand-blue-50 transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-brand-blue-950 mb-3 group-hover:text-brand-blue-500 transition-colors duration-300 tracking-tight">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-500 leading-relaxed pr-2">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
