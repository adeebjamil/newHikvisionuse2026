"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PhoneCall, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const posters = [
  {
    id: 1,
    image: '/hero.png',
    tag: 'Official Platinum Distributor',
    title: 'LEADING UAE IN',
    subtitle: 'SECURITY.',
    desc: 'The region\'s most trusted provider of Hikvision solutions, delivering cutting-edge surveillance for government and private sectors.',
    cta1: 'Our Solutions',
    cta2: 'Contact Sales',
    accent: 'gold'
  },
  {
    id: 2,
    image: '/poster1.png',
    tag: 'AI-Driven Intelligence',
    title: 'SMARTER CITIES',
    subtitle: 'SAFER LIVES.',
    desc: 'Pioneering AI surveillance with DeepinView and AcuSense technology, optimized for the UAE\'s dynamic urban infrastructure.',
    cta1: 'Explore AI',
    cta2: 'Support',
    accent: 'maroon'
  },
  {
    id: 3,
    image: '/poster2.png',
    tag: 'Premium Access Control',
    title: 'UNCOMPROMISED',
    subtitle: 'PROTECTION.',
    desc: 'State-of-the-art biometric and facial recognition systems designed for the unique security needs of Dubai and Abu Dhabi.',
    cta1: 'View Products',
    cta2: 'Get Quote',
    accent: 'gold'
  },
  {
    id: 4,
    image: '/poster3.png',
    tag: 'Thermal Innovation',
    title: 'THERMAL VISION',
    subtitle: 'REINVENTED.',
    desc: 'Advanced heat-detection and fire prevention systems, engineered to perform in the Middle East\'s extreme environmental conditions.',
    cta1: 'Thermal Range',
    cta2: 'Expert Advice',
    accent: 'maroon'
  },
  {
    id: 5,
    image: '/poster4.png',
    tag: 'Intelligent Living',
    title: 'SMART HOMES',
    subtitle: 'FUTURE-READY.',
    desc: 'Seamlessly integrating Hik-Connect ecosystems into modern UAE residences for ultimate control and peace of mind.',
    cta1: 'Smart Home',
    cta2: 'Visit Store',
    accent: 'gold'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % posters.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + posters.length) % posters.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-maroon">
      {/* Slides */}
      {posters.map((poster, index) => (
        <div 
          key={poster.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current 
              ? 'opacity-100 scale-100 translate-x-0 z-10' 
              : index < current 
                ? 'opacity-0 scale-110 -translate-x-full z-0' 
                : 'opacity-0 scale-110 translate-x-full z-0'
          }`}
        >
          {/* Background Image with Parallax-ish feel */}
          <Image
            src={poster.image}
            alt={poster.title}
            fill
            quality={100}
            sizes="100vw"
            className="object-cover transition-opacity duration-1000"
            priority
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pt-24 sm:pt-32 lg:pt-24">
            <div className={`max-w-3xl text-white transition-all duration-700 delay-300 ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 ${poster.accent === 'gold' ? 'bg-gold/20 border-gold/30 text-gold' : 'bg-maroon/20 border-maroon/30 text-maroon'}`}>
                <Shield size={16} />
                <span>{poster.tag}</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.95] sm:leading-[0.9]">
                {poster.title} <br />
                <span className={poster.accent === 'gold' ? 'text-gold' : 'text-maroon'}>{poster.subtitle}</span>
              </h1>
              
              <p className="text-base md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-xl opacity-90">
                {poster.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link 
                  href="/products" 
                  className={`inline-flex justify-center items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold transition-all shadow-2xl ${
                    poster.accent === 'gold' 
                      ? 'bg-gold text-maroon hover:bg-white' 
                      : 'bg-maroon text-white hover:bg-gold hover:text-maroon'
                  }`}
                >
                  {poster.cta1}
                  <ArrowRight size={20} />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex justify-center items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold border-2 border-white/20 backdrop-blur-xl text-white hover:bg-white/10 transition-all"
                >
                  {poster.cta2}
                  <PhoneCall size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Responsive positioning */}
      <div className="absolute bottom-12 right-6 sm:right-12 z-30 flex items-center gap-2 sm:gap-4">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicators - Hidden on extra small devices to avoid clutter */}
      <div className="absolute bottom-12 left-6 sm:left-12 z-30 hidden sm:flex gap-3">
        {posters.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-gold' : 'w-4 bg-white/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
