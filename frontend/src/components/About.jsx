import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading and Label */}
          <div className="lg:col-span-5 text-left space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue-500">
              ABOUT CBITE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-950 tracking-tight leading-tight">
              Ideas Built for <br className="hidden sm:inline" />
              What's Next
            </h2>
            <div className="w-12 h-1 bg-brand-blue-500 rounded-full mt-2"></div>
          </div>

          {/* Right Column: Copy & Tagline Statement */}
          <div className="lg:col-span-7 text-left space-y-6">
            <p className="text-base sm:text-lg text-slate-650 leading-relaxed font-light">
              CBite is driven by ideas, innovation and the ambition to turn possibilities into meaningful opportunities.
            </p>

            <p className="text-sm sm:text-base text-slate-550 leading-relaxed">
              Guided by the philosophy 'C the Idea, Bite the Market.', CBite represents a forward-looking approach to ideas and growth.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
