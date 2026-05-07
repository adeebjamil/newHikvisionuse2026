"use client";

import { ShoppingBag, ShieldCheck, BarChart3, Lock, ChevronRight, ArrowRight, Eye, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function RetailSolutionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
           <img 
             src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
             className="w-full h-full object-cover"
             alt="Retail Security"
           />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-maroon/5 border border-maroon/10 rounded-full mb-8">
              <ShoppingBag size={14} className="text-maroon" />
              <span className="text-maroon font-black uppercase tracking-[0.2em] text-[10px]">Retail Sector Solutions</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter mb-8 leading-[0.9]">
              Retail <br /> <span className="text-maroon">Excellence.</span>
            </h1>
            <p className="text-gray-500 text-lg font-bold uppercase tracking-widest mb-12 leading-relaxed">
              Secure and Optimize Your Retail Space with Advanced Video Surveillance. AI-powered analytics and smart retail solutions for the UAE.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-maroon text-white rounded-full font-black uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-xl shadow-maroon/20 active:scale-95">
                Explore Features
              </button>
              <div className="flex items-center gap-4 px-6 border-l-2 border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                   <ShieldCheck size={24} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Official <br />Hikvision UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">
              Advanced Retail Surveillance
            </h2>
            <div className="h-1.5 w-24 bg-maroon mx-auto rounded-full mb-8" />
            <p className="text-gray-500 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
              Modern retail security demands have evolved. Our comprehensive range of security cameras and surveillance systems provide cutting-edge protection, featuring AI-powered analytics and high-resolution monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
             {[
               {
                 title: "Advanced Video Surveillance",
                 desc: "Deploy state-of-the-art HD cameras and NVR systems to monitor store activities, protect assets, and ensure customer safety across all retail locations.",
                 icon: <Eye size={32} />,
                 color: "bg-blue-500"
               },
               {
                 title: "Smart Loss Prevention",
                 desc: "Utilize AI-powered cameras with behavior analysis to detect suspicious activities, prevent theft, and reduce shrinkage in real-time.",
                 icon: <Lock size={32} />,
                 color: "bg-maroon"
               },
               {
                 title: "Business Intelligence",
                 desc: "Leverage built-in analytics to track customer flow, analyze shopping patterns, and generate heat maps for optimized store layouts.",
                 icon: <BarChart3 size={32} />,
                 color: "bg-gold"
               },
               {
                 title: "Integrated Security Solution",
                 desc: "Implement comprehensive security with integrated cameras, access control, POS integration, and remote monitoring capabilities.",
                 icon: <LayoutGrid size={32} />,
                 color: "bg-gray-900"
               }
             ].map((feat, i) => (
               <div key={i} className="group bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-maroon/10 transition-all duration-500 relative overflow-hidden">
                 <div className={`absolute top-0 right-0 w-32 h-32 ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-bl-[100px]`} />
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 ${feat.color} shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                   {feat.icon}
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 group-hover:text-maroon transition-colors">{feat.title}</h3>
                 <p className="text-gray-500 font-medium leading-relaxed mb-8">{feat.desc}</p>
                 <button className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                   Learn More <ArrowRight size={14} />
                 </button>
               </div>
             ))}
          </div>

          {/* Business Insights Section */}
          <div className="relative rounded-[60px] overflow-hidden bg-gray-900 p-12 md:p-24">
             <div className="absolute inset-0 opacity-30">
               <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Analytics" />
             </div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">
                     Data Driven <br /> <span className="text-gold">Operations</span>
                   </h2>
                   <p className="text-gray-400 text-lg font-medium leading-relaxed mb-12">
                     Beyond security, our retail solutions provide actionable business intelligence. Understand your customers better with advanced footfall analysis and heatmapping.
                   </p>
                   <div className="space-y-6">
                      {["Heat Mapping", "People Counting", "Queue Management", "Store Traffic Analysis"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-white">
                           <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                              <ChevronRight size={14} />
                           </div>
                           <span className="font-black uppercase tracking-widest text-xs">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px]">
                   <div className="flex items-center justify-between mb-8">
                      <p className="text-white font-black uppercase tracking-widest text-xs">AI Performance</p>
                      <span className="text-gold font-black">99.8%</span>
                   </div>
                   <div className="w-full h-3 bg-white/10 rounded-full mb-10 overflow-hidden">
                      <div className="w-[99.8%] h-full bg-gold rounded-full" />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Accuracy</p>
                        <p className="text-white text-2xl font-black uppercase">Extreme</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Response</p>
                        <p className="text-white text-2xl font-black uppercase">Instant</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
             <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tight mb-8">Ready to Optimize Your <span className="text-maroon">Retail Space?</span></h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-12">Expert retail security and analytics solutions across the UAE.</p>
             <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-maroon text-white rounded-full font-black uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-2xl active:scale-95">
               Request Free Consultation <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
