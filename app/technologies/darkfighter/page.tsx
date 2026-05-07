"use client";

import { Eye, Moon, ShieldCheck, Zap, ChevronRight, ArrowRight, Camera, Globe, Info } from 'lucide-react';
import Link from 'next/link';

export default function DarkFighterTechPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden">
      {/* Hero Section - Cinematic Dark Aesthetic */}
      <section className="relative min-h-[90vh] flex items-center p-4">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-30"
             alt="Night Cityscape"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-3xl">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8">
               <Moon size={14} className="text-gold" />
               <span className="text-gold font-black uppercase tracking-[0.25em] text-[10px]">Elite Night Vision Tech</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-8 leading-[0.9]">
               Dark<span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">Fighter.</span>
             </h1>
             <p className="text-gray-400 text-xl font-bold uppercase tracking-[0.1em] mb-12 leading-relaxed max-w-xl">
               Official Distributor of Hikvision DarkFighter Night Vision Cameras in Dubai & Across UAE. 
               Clear, full-color images in near total darkness.
             </p>
             <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-gold text-black rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-gold/20 active:scale-95">
                  Explore Features
                </button>
                <div className="flex items-center gap-4 px-6 border-l border-white/10">
                   <ShieldCheck size={28} className="text-gold" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Trusted by UAE <br />Gov & Enterprise</p>
                </div>
             </div>
          </div>
        </div>

        {/* Floating Product Preview */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 hidden lg:block opacity-40 hover:opacity-100 transition-opacity duration-1000">
           <img 
             src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop" 
             className="w-full h-auto rounded-[60px] border border-white/10 shadow-2xl scale-125 translate-x-20"
             alt="DarkFighter Camera"
           />
        </div>
      </section>

      {/* Technology Detail */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-32">
             <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-10 leading-tight">
                  DarkFighter Solutions <br /> <span className="text-gold">for UAE Environments</span>
                </h2>
                <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8">
                  Discover next-generation night vision security. Hikvision DarkFighter cameras are engineered for the UAE, delivering full-color images in near darkness. Trusted by businesses across Dubai, Abu Dhabi, and the Emirates.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   {[
                     { icon: <Zap className="text-gold" />, title: "Low Light" },
                     { icon: <Camera className="text-gold" />, title: "Full Color" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
                        {item.icon}
                        <span className="font-black uppercase tracking-widest text-xs text-white">{item.title}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <div className="aspect-[3/4] bg-white/5 rounded-3xl overflow-hidden border border-white/10">
                      <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Low light" />
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="aspect-[3/4] bg-white/5 rounded-3xl overflow-hidden border border-white/10">
                      <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Night vision" />
                   </div>
                </div>
             </div>
          </div>

          {/* Features Grid */}
          <div className="mb-32">
             <div className="flex items-center justify-between mb-16">
                <h2 className="text-3xl font-black uppercase tracking-tight">Features & <span className="text-gold">Benefits</span></h2>
                <div className="h-px flex-1 bg-white/10 mx-10 hidden md:block" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Certified Night Vision", desc: "DarkFighter cameras deliver full-color images in extremely low-light conditions, ensuring round-the-clock security for UAE businesses and homes." },
                  { title: "Low-Light Performance", desc: "Engineered for the Gulf's challenging environments, these cameras excel in dusty, low-light, and nighttime scenarios." },
                  { title: "Smart City Ready", desc: "Seamlessly integrates with urban surveillance and smart city platforms, supporting Dubai and UAE's security vision." },
                  { title: "Professional Installation", desc: "Expert setup and maintenance by certified Hikvision partners across the Emirates for maximum reliability." },
                  { title: "24/7 Monitoring", desc: "Continuous surveillance with advanced motion detection and instant alerts, ideal for critical infrastructure." },
                  { title: "Versatile Applications", desc: "From ports to residential compounds, DarkFighter adapts to diverse UAE security needs with superior clarity." }
                ].map((feat, i) => (
                  <div key={i} className="group p-10 bg-white/5 border border-white/10 rounded-[32px] hover:bg-gold/5 hover:border-gold/30 transition-all duration-500">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-black transition-all">
                       <Info size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">{feat.title}</h3>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">{feat.desc}</p>
                    <button className="flex items-center gap-2 text-gold font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                       Learn More <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* CTA Dark */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">Experience True <br /> <span className="text-gold">Night Vision</span></h2>
           <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-12 max-w-xl mx-auto">Get a free demonstration of DarkFighter technology at your premises in the UAE.</p>
           <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-gold text-black rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-gold/20 active:scale-95">
              Contact Expert <ArrowRight size={20} />
           </Link>
        </div>
      </section>
    </main>
  );
}
