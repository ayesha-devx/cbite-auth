import React from 'react';
import { Eye, Cpu, Sparkles, TrendingUp } from 'lucide-react';

export default function Features() {
  const cards = [
    {
      num: '01',
      title: 'Simple',
      desc: 'Clear and thoughtful experiences designed around what actually matters.',
      icon: <Eye className="w-6 h-6 text-brand-blue-500" />
    },
    {
      num: '02',
      title: 'Modern',
      desc: 'A contemporary approach to building digital experiences for today\'s users.',
      icon: <Cpu className="w-6 h-6 text-brand-blue-500" />
    },
    {
      num: '03',
      title: 'Innovative',
      desc: 'An idea-first mindset focused on exploring better possibilities.',
      icon: <Sparkles className="w-6 h-6 text-brand-blue-500" />
    },
    {
      num: '04',
      title: 'Growth-Focused',
      desc: 'Built with the ambition to move ideas forward and create lasting opportunities.',
      icon: <TrendingUp className="w-6 h-6 text-brand-blue-500" />
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue-500">
            WHY CBITE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-950 tracking-tight">
            Built Around Better Experiences
          </h2>
          <div className="w-12 h-1 bg-brand-blue-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-slate-200/80 rounded-2xl p-8 hover:border-brand-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-left flex flex-col justify-between h-full"
            >
              <div>
                {/* Numbering Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-brand-blue-50">
                    {card.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 select-none group-hover:text-brand-blue-100 transition-colors">
                    {card.num}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-brand-blue-950 mb-3 group-hover:text-brand-blue-500 transition-colors tracking-tight">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Decorative Subtle Line */}
              <div className="w-0 group-hover:w-full h-0.5 bg-brand-blue-500 rounded-full mt-6 transition-all duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
