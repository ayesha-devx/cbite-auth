import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import AuthSection from './components/AuthSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-700 select-text">
      {/* Sticky Responsive Header */}
      <Navbar />

      {/* Main Page Layout Content */}
      <main className="flex-1">
        <Hero />
        <About />
        <Features />
        <AuthSection />
        <CTA />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
