"use client";

import { Shield, Settings, Zap, Flame, Monitor, Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ManufacturingSolutionPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale"
            alt="Manufacturing Background"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold font-black uppercase tracking-[0.3em] text-xs">Industry Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
            Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gold">Security</span>
          </h1>
          <p className="text-gray-400 text-xl font-bold uppercase tracking-widest max-w-2xl mb-10 leading-relaxed">
            Hikvision Solutions for Manufacturing in UAE. Secure your factory with advanced surveillance, access control, and AI-powered monitoring.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-5 bg-maroon text-white rounded-full font-black uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-xl active:scale-95">
              Explore Features
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-maroon transition-all active:scale-95">
              Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-8">
                Security for Modern Manufacturing
              </h2>
              <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                Hikvision delivers robust, scalable security solutions tailored for manufacturing environments in the UAE. Our systems combine high-definition cameras, AI analytics, and integrated access control to protect assets, ensure safety, and optimize operations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Shield className="text-maroon" />, title: "Asset Protection" },
                  { icon: <Zap className="text-maroon" />, title: "Operational Safety" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    {item.icon}
                    <span className="font-black uppercase tracking-widest text-[10px] text-gray-900">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1565173553180-681e1ddb2eaf?q=80&w=2000&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  alt="Industrial Security"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-maroon p-10 rounded-[32px] shadow-2xl hidden md:block">
                <p className="text-white text-4xl font-black mb-1">24/7</p>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Active Monitoring</p>
              </div>
            </div>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              {
                title: "Thermal Imaging Cameras",
                desc: "24/7 temperature monitoring and early fire detection for industrial safety and asset protection.",
                icon: <Flame size={32} />,
                img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800"
              },
              {
                title: "PTZ Surveillance Systems",
                desc: "Pan-Tilt-Zoom cameras for 360° coverage, advanced zoom, and auto-tracking for perimeter security.",
                icon: <Settings size={32} />,
                img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800"
              },
              {
                title: "AI-Powered Smart Cameras",
                desc: "Deep learning cameras for intelligent monitoring, PPE compliance, and advanced analytics.",
                icon: <Cpu size={32} />,
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"
              }
            ].map((sol, i) => (
              <div key={i} className="group bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="h-64 relative overflow-hidden">
                  <img src={sol.img} alt={sol.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8">
                  <div className="text-maroon mb-4">{sol.icon}</div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">{sol.title}</h3>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed">{sol.desc}</p>
                  <button className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="bg-gray-900 rounded-[60px] p-12 md:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-16">
                Features & <span className="text-gold">Benefits</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                  { title: "Enhanced Security Monitoring", desc: "Advanced CCTV and AI-powered surveillance for 24/7 monitoring, real-time threat detection, and comprehensive coverage across manufacturing facilities." },
                  { title: "Smart Video Analytics", desc: "Deep learning analytics for automated incident detection, people counting, and behavioral analysis to improve operational intelligence." },
                  { title: "Integrated Access Control", desc: "Seamless integration of access control with CCTV to ensure only authorized personnel access sensitive areas." },
                  { title: "Remote Monitoring", desc: "Access real-time footage and alerts from anywhere via mobile apps and cloud solutions for proactive management." },
                  { title: "Operational Insights", desc: "Gain actionable insights into facility operations, safety compliance, and workflow optimization through intelligent analytics." },
                  { title: "Early Fire & Hazard Detection", desc: "Thermal imaging and smart sensors for early fire, smoke, and hazard detection to protect assets and personnel." }
                ].map((feat, i) => (
                  <div key={i} className="group border-l-2 border-gold/30 pl-8 hover:border-gold transition-colors">
                    <h4 className="text-white text-xl font-black uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">{feat.title}</h4>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed mb-6">{feat.desc}</p>
                    <button className="text-gold font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:gap-3 transition-all">
                      Learn More <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-maroon relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">
            Secure Your <span className="text-gold">Facility Today</span>
          </h2>
          <p className="text-white/70 text-lg font-bold uppercase tracking-widest mb-12 max-w-2xl mx-auto">
            Expert consultation for industrial security requirements in the UAE.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-maroon rounded-full font-black uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-2xl active:scale-95">
            Get Started Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
