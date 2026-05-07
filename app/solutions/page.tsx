"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Store, 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Zap, 
  Globe,
  Building,
  Home,
  Truck,
  Hotel
} from 'lucide-react';

const industrySolutions = [
  {
    title: "Manufacturing",
    slug: "manufacturing",
    desc: "Intelligent production line monitoring, worker safety analytics, and perimeter protection for industrial complexes.",
    icon: Building2,
    image: "/Solutions/Manufacturing.png",
    features: ["Thermal Inspection", "PPE Detection", "Access Control"]
  },
  {
    title: "Retail",
    slug: "retail",
    desc: "Loss prevention, footfall analytics, and VIP recognition to optimize customer experience and business operations.",
    icon: Store,
    image: "/Solutions/Retail.png",
    features: ["Heat Mapping", "Queue Management", "POS Integration"]
  },
  {
    title: "Healthcare",
    slug: "healthcare",
    desc: "Patient safety monitoring, restricted area access, and smart hospital management systems.",
    icon: HeartPulse,
    image: "/Solutions/Healthcare.png",
    features: ["Nurse Call Integration", "Stretcher Tracking", "Lab Security"]
  },
  {
    title: "Education",
    slug: "education",
    desc: "Ensuring campus safety with intelligent perimeter guarding, automated attendance, and emergency response systems.",
    icon: GraduationCap,
    image: "/Solutions/Education.png",
    features: ["Campus Broadcast", "Parent Notifications", "AI Labs"]
  },
  {
    title: "Government",
    slug: "government",
    desc: "Critical infrastructure protection, public safety monitoring, and secure government building management.",
    icon: Building,
    image: "/Solutions/Manufacturing.png", // Reusing image if specific ones aren't available
    features: ["City Surveillance", "Traffic Management", "Data Centers"]
  },
  {
    title: "Residential",
    slug: "residential",
    desc: "Smart villa security, video intercoms, and integrated home automation for modern UAE living.",
    icon: Home,
    image: "/Solutions/Retail.png",
    features: ["Mobile Control", "Package Detection", "Smart Locks"]
  },
  {
    title: "Logistics",
    slug: "logistics",
    desc: "Fleet management, warehouse optimization, and shipment tracking with AI-powered cameras.",
    icon: Truck,
    image: "/Solutions/Healthcare.png",
    features: ["LPR Cameras", "Dock Management", "Route Optimization"]
  },
  {
    title: "Hospitality",
    slug: "hospitality",
    desc: "Guest safety, luxury hotel management, and intelligent parking solutions for premium resorts.",
    icon: Hotel,
    image: "/Solutions/Education.png",
    features: ["Face Check-in", "Pool Safety", "Energy Saving"]
  }
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pt-24">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-maroon">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/40 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-black uppercase tracking-widest mb-6">
              <ShieldCheck size={14} />
              Enterprise Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Tailored <span className="text-gold">Security</span> <br />
              For Every Industry.
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-xl font-medium">
              Hikvision UAE provides state-of-the-art intelligent solutions optimized for the specific challenges of various sectors across Dubai, Abu Dhabi, and the Northern Emirates.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">Industry Portfolio</h2>
            <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
              Our <span className="text-maroon">Expertise</span>
            </p>
            <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industrySolutions.map((solution, i) => (
              <Link 
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group relative flex flex-col bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-white/5">
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/20 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <solution.icon size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{solution.title}</h3>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {solution.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {solution.features.map(feature => (
                      <span key={feature} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200/50 dark:border-white/5">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-maroon group-hover:text-gold transition-colors">Explore Solution</span>
                    <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Solutions Section */}
      <section className="py-24 bg-gray-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">The Hikvision Advantage</h2>
              <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
                Intelligence Beyond <br />
                <span className="text-maroon">Just Surveillance.</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                We don't just provide cameras; we build intelligent ecosystems that transform data into actionable insights for your business.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "AI Integration", desc: "Native deep learning for accurate detection.", icon: Target },
                  { title: "Scalability", desc: "From small offices to smart cities.", icon: Globe },
                  { title: "Efficiency", desc: "Optimize operations and reduce costs.", icon: Zap },
                  { title: "Proven Trust", desc: "Trusted by UAE's top corporations.", icon: CheckCircle2 }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-[#050505] shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-maroon/5 flex items-center justify-center text-maroon shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-maroon to-[#4a0000] overflow-hidden shadow-2xl p-2 relative group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <img 
                  src="/Solutions/Education.png" 
                  alt="Solution Overview" 
                  className="w-full h-full object-cover rounded-[2.5rem] mix-blend-overlay opacity-50 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gold flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                         <ShieldCheck className="text-maroon w-12 h-12" />
                      </div>
                      <p className="text-white font-black text-2xl uppercase tracking-widest">Certified Security</p>
                   </div>
                </div>
              </div>
              
              {/* Decorative Floating Card */}
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 hidden md:block animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                      <CheckCircle2 size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deployment Status</p>
                      <p className="text-lg font-black text-gray-900 dark:text-white uppercase">Active Support</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto bg-maroon rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--brand-gold)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">
              Ready to Secure <br />
              Your <span className="text-gold">Industry?</span>
            </h2>
            <p className="text-white/70 mb-10 font-medium max-w-xl mx-auto">
              Our experts are ready to design a custom solution for your specific requirements.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-white text-maroon font-black text-lg hover:bg-gold transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Get Expert Advice
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
