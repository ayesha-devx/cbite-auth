import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import AuthSection from './components/AuthSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Check auth session status on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data.data?.user);
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        console.error('Session sync error:', err);
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-700 select-text">
      {/* Sticky Responsive Header */}
      <Navbar isAuthenticated={isAuthenticated} />

      {/* Main Page Layout Content */}
      <main className="flex-1">
        <Hero />
        <About />
        <WhatWeDo />
        <HowItWorks />
        <Features />
        <AuthSection 
          user={user} 
          setUser={setUser} 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
          isInitialLoading={isInitialLoading}
          setIsInitialLoading={setIsInitialLoading}
        />
        <CTA />
      </main>

      {/* Site Footer */}
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
