"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-[60] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-50 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-14 h-14 bg-maroon text-white rounded-2xl shadow-[0_10px_30px_rgba(107,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(107,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        aria-label="Scroll to top"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ animationDuration: '2s' }}></div>
        
        {/* Border Glow */}
        <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-gold/50 transition-colors"></div>

        {/* Arrow Icon */}
        <div className="relative z-10 flex flex-col items-center">
            <ChevronUp className="w-6 h-6 transition-transform duration-500 group-hover:-translate-y-1" />
            <div className="w-1 h-1 bg-gold rounded-full mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-maroon text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
            Back to Top
        </div>
      </button>
    </div>
  );
}
