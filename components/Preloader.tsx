"use client";

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Wait for a bit at 100%
          return 100;
        }
        // Random increment for more realistic feel
        const next = prev + Math.floor(Math.random() * 15) + 5;
        return next > 100 ? 100 : next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${progress === 100 ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
      
      {/* Background Decorative Elements - Stronger Brand Colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-maroon/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-maroon/5 via-transparent to-gold/5"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        {/* Branding */}
        <div className="mb-12 animate-bounce">
            <img 
              src="/logo.webp" 
              alt="Hikvision Logo" 
              className="h-16 w-auto brightness-0 invert" 
            />
        </div>

        {/* Percentage Display - Gold Gradient */}
        <div className="relative mb-8">
            <span className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gold to-gold/50 select-none tracking-tighter">
                {progress.toString().padStart(2, '0')}
            </span>
            <span className="absolute -right-8 top-4 text-2xl font-black text-gold animate-pulse">%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative border border-white/5">
            {/* Animated Progress Fill - Maroon to Gold */}
            <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-maroon via-gold to-white transition-all duration-300 ease-out shadow-[0_0_20px_rgba(107,0,0,0.8)]"
                style={{ width: `${progress}%` }}
            ></div>
            
            {/* Shimmer Effect on bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '1.5s' }}></div>
        </div>

        {/* Status Text */}
        <div className="mt-6 flex flex-col items-center">
            <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">
                {progress < 100 ? 'Initialising Systems...' : 'Access Granted'}
            </p>
        </div>
      </div>

      {/* Modern Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
    </div>
  );
}
