"use client";

import React from 'react';
import { ShieldCheck, Target, Award, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pt-24">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-maroon/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Securing the <span className="text-maroon">UAE</span> <br />
              With <span className="text-gold">Intelligence.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed font-medium mb-12">
              As the premier authorized distributor of Hikvision technologies in the United Arab Emirates, we deliver world-class surveillance solutions to government, industrial, and residential sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-[#050505] border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Years in UAE", value: "15+" },
              { label: "Projects Delivered", value: "2,500+" },
              { label: "Authorized Partners", value: "100+" },
              { label: "Cities Covered", value: "7/7" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-maroon mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="aspect-square rounded-[3rem] bg-gray-100 dark:bg-white/5 overflow-hidden border border-gray-100 dark:border-white/10 p-4">
                  <img src="/Solutions/Manufacturing.png" alt="Mission" className="w-full h-full object-cover rounded-[2.5rem] opacity-80" />
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div>
              <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">Our Mission</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
                Empowering Safety Through <br />
                <span className="text-maroon">Advanced Innovation.</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                Our mission is to provide the UAE with the most advanced, reliable, and intelligent security solutions available. We believe that technology should not only observe but protect, anticipate, and assist in creating a safer society for everyone.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Authorized Reliability", desc: "Official distributor status ensures genuine hardware and warranties.", icon: ShieldCheck },
                  { title: "Local Expertise", desc: "Deep understanding of UAE security regulations and environmental needs.", icon: Target },
                  { title: "Award Winning", desc: "Recognized for excellence in system integration and support.", icon: Award }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-maroon/5 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-maroon relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8">
            Building a Safer <span className="text-gold">Future</span> Together.
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-maroon font-black text-lg hover:bg-gold transition-all shadow-2xl">
            Partner With Us
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
