"use client";

import { GraduationCap, ShieldCheck, Users, School, ChevronRight, ArrowRight, BookOpen, MapPin, Bus, Zap } from 'lucide-react';
import Link from 'next/link';

export default function EducationSolutionPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      {/* Hero Section - Clean Academic Aesthetic */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="relative rounded-[60px] overflow-hidden bg-white shadow-2xl shadow-gray-200/50 p-12 md:p-24 flex flex-col items-center text-center">
           <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
           </div>
           
           <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-maroon/5 border border-maroon/10 rounded-full mb-10">
                <GraduationCap size={14} className="text-maroon" />
                <span className="text-maroon font-black uppercase tracking-[0.25em] text-[10px]">Education & Campus Solutions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tight mb-8 leading-[1.1]">
                 Hikvision Solutions for <br /> <span className="text-maroon">Education in UAE</span>
              </h1>
              <p className="text-gray-500 text-lg font-bold uppercase tracking-widest max-w-3xl mb-12 leading-relaxed">
                 Empowering educational environments with cutting-edge security and tech-driven operational excellence. Trusted by schools and universities across the Emirates.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-10 py-5 bg-maroon text-white rounded-full font-black uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-xl shadow-maroon/20 active:scale-95">
                   Explore Features
                </button>
                <button className="px-10 py-5 bg-gray-50 text-gray-900 border border-gray-100 rounded-full font-black uppercase tracking-widest hover:bg-white hover:border-maroon transition-all active:scale-95">
                   Download Brochure
                </button>
              </div>
           </div>
        </div>
      </section>

      {/* Modern Education Section */}
      <section className="py-24 bg-white border-y border-gray-100">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="relative">
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Campus" />
                  </div>
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 space-y-4 hidden md:block">
                     {[
                       { icon: <ShieldCheck />, label: "Safety First" },
                       { icon: <Users />, label: "Smart ID" },
                       { icon: <Bus />, label: "Secure Transport" }
                     ].map((item, i) => (
                       <div key={i} className="p-4 bg-white shadow-xl rounded-2xl flex items-center gap-4 border border-gray-50 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">{item.icon}</div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{item.label}</span>
                       </div>
                     ))}
                  </div>
               </div>
               <div>
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-8">Security for <br />Modern Education</h2>
                  <p className="text-gray-500 font-medium leading-relaxed mb-12 text-lg">
                    Hikvision delivers robust, scalable security solutions tailored for educational institutions in the UAE. Our systems combine high-definition cameras, AI analytics, and integrated access control to protect students, staff, and assets while enabling smart learning environments.
                  </p>
                  
                  <div className="space-y-8">
                     <div className="flex gap-6">
                        <div className="w-14 h-14 bg-maroon/5 rounded-2xl flex items-center justify-center text-maroon shrink-0 border border-maroon/10">
                           <School size={24} />
                        </div>
                        <div>
                           <h4 className="text-xl font-black uppercase tracking-tight mb-2">Intelligent Applications</h4>
                           <p className="text-gray-500 font-medium text-sm">State-of-the-art applications designed to create digital campuses with enhanced automation and comprehensive security features.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-14 h-14 bg-gold/5 rounded-2xl flex items-center justify-center text-gold shrink-0 border border-gold/10">
                           <Zap size={24} />
                        </div>
                        <div>
                           <h4 className="text-xl font-black uppercase tracking-tight mb-2">Easy Integration</h4>
                           <p className="text-gray-500 font-medium text-sm">Easily integrates with external information management systems or other third-party systems, adding to the diversity of educational resources.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Comprehensive Campus Security */}
      <section className="py-24">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-6">Comprehensive Campus Security</h2>
               <p className="text-gray-500 max-w-4xl mx-auto font-medium text-lg leading-relaxed">
                  Our solutions provide end-to-end security coverage for educational institutions, encompassing school transportation, entry points, perimeter security, building access, and internal monitoring.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "Advanced Security", desc: "State-of-the-art surveillance systems with AI-powered threat detection and immediate response capabilities.", icon: <ShieldCheck size={32} /> },
                 { title: "Smart Attendance", desc: "Automated attendance tracking using facial recognition and mobile check-in systems for students and staff.", icon: <Users size={32} /> },
                 { title: "Smart Classrooms", desc: "Interactive learning environments with integrated AV systems and automated environmental controls.", icon: <BookOpen size={32} /> }
               ].map((feat, i) => (
                 <div key={i} className="group bg-white p-12 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-maroon/10 transition-all duration-500">
                    <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-maroon mb-10 group-hover:scale-110 group-hover:bg-maroon group-hover:text-white transition-all duration-500">
                       {feat.icon}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">{feat.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-10">{feat.desc}</p>
                    <button className="flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                       Learn More <ArrowRight size={14} />
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Locations Banner */}
      <section className="max-w-7xl mx-auto px-4">
         <div className="bg-maroon rounded-[40px] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute inset-0 opacity-10">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>
            <div className="relative z-10 text-center md:text-left">
               <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Protecting Future <span className="text-gold">Leaders</span></h3>
               <p className="text-white/70 font-bold uppercase tracking-widest text-xs">Available for schools & universities across Dubai, Abu Dhabi & Sharjah.</p>
            </div>
            <Link href="/contact" className="relative z-10 inline-flex items-center gap-4 px-10 py-5 bg-white text-maroon rounded-full font-black uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-2xl active:scale-95">
               Contact Specialist <MapPin size={20} />
            </Link>
         </div>
      </section>
    </main>
  );
}
