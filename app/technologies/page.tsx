import Link from 'next/link';
import { ChevronRight, ArrowRight, ShieldCheck, Cpu, Zap, Eye, BarChart3, CloudLightning } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: "Technologies | Hikvision Official Distributor UAE",
  description: "Explore the cutting-edge security technologies from Hikvision, including TandemVu, AcuSense, DarkFighter, and ColorVu. Authorized distributor in Dubai, UAE.",
};

const technologies = [
  {
    name: "TandemVu",
    slug: "tandemvu",
    description: "Dual-lens technology that combines a large area overview with detailed PTZ tracking, ensuring you never miss a moment.",
    image: "/Technologies/TandemVu.png",
    accent: "bg-blue-500/10 text-blue-600",
    features: ["Broad Area Coverage", "Detail PTZ Tracking", "AI Detection"]
  },
  {
    name: "AcuSense",
    slug: "acusense",
    description: "AI-powered detection that accurately distinguishes humans and vehicles from other moving objects, reducing false alarms by up to 90%.",
    image: "/Technologies/AcuSense.png",
    accent: "bg-maroon/10 text-maroon",
    features: ["Human Detection", "Vehicle Identification", "Real-time Alerts"]
  },
  {
    name: "DarkFighter",
    slug: "darkfighter",
    description: "Industry-leading low-light technology that captures high-quality, full-color images in near-total darkness.",
    image: "/Technologies/DarkFighter.png",
    accent: "bg-indigo-500/10 text-indigo-600",
    features: ["Ultra-low Light", "High Sensitivity", "Crystal Clear Night Vision"]
  },
  {
    name: "ColorVu",
    slug: "colorvu",
    description: "Provides 24/7 vivid color imaging with high-performance sensors and advanced lenses for accurate details in darkness.",
    image: "/Technologies/ColorVu.png",
    accent: "bg-gold/10 text-gold",
    features: ["24/7 Color", "Large Aperture", "Soft Supplemental Light"]
  }
];

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Technologies Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maroon">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold font-black text-xs uppercase tracking-[0.2em]">
                <ShieldCheck size={14} />
                <span>Next-Gen Security Standards</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tight">
                THE FUTURE OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gold">INTELLIGENCE</span>
              </h1>
              <p className="text-xl text-white/60 font-medium leading-relaxed max-w-lg">
                Explore the groundbreaking core technologies that power the world's most advanced surveillance systems. From AI-driven detection to vivid color night vision.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="/Download%20Pdf.pdf" 
                  download 
                  className="bg-white text-maroon px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gold transition-all active:scale-95 shadow-2xl inline-block"
                >
                  Download Catalog
                </a>
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-maroon bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                     </div>
                   ))}
                   <div className="w-10 h-10 rounded-full border-2 border-maroon bg-gold flex items-center justify-center text-maroon text-[10px] font-black">
                      +1k
                   </div>
                </div>
                <span className="text-xs font-black text-white/40 uppercase tracking-widest">Trusted by Experts</span>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gold/10 rounded-[60px] blur-3xl transform rotate-6 transition-transform group-hover:rotate-12 duration-1000" />
              <div className="relative bg-white/5 backdrop-blur-md rounded-[60px] p-6 border border-white/10 overflow-hidden">
                 <img 
                   src="/Technologies/Core Tech.png" 
                   alt="Core Tech" 
                   className="w-full h-auto object-cover rounded-[50px] transition-transform duration-[2s] group-hover:scale-110 drop-shadow-2xl" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 to-transparent" />
                 <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-5xl font-black uppercase tracking-tight leading-none mb-2">Core <span className="text-gold">Tech</span></p>
                    <div className="flex items-center gap-3">
                       <div className="h-px w-8 bg-gold" />
                       <p className="text-xs font-black uppercase tracking-[0.3em] text-gold/80">Empowering Security</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Accuracy", value: "98.5%", icon: BarChart3 },
              { label: "Response", value: "24ms", icon: Zap },
              { label: "AI Models", value: "500+", icon: Cpu },
              { label: "Deployment", value: "Global", icon: CloudLightning },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-maroon mb-2">
                  <stat.icon size={20} />
                </div>
                <p className="text-3xl font-black text-gray-900 leading-none">{stat.value}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Listing */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-[10px] font-black text-maroon uppercase tracking-[0.5em]">The Toolkit</h2>
            <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tight">SIGNATURE <span className="text-maroon">TECHNOLOGIES</span></h3>
            <p className="text-gray-500 font-medium">From low-light environments to advanced AI-driven detection, explore our specialized technologies designed for maximum security.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {technologies.map((tech) => (
              <Link 
                key={tech.slug} 
                href={`/technologies/${tech.slug}`}
                className="group relative bg-white rounded-[40px] p-8 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col lg:flex-row gap-8 items-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-maroon/10"
              >
                <div className="w-full lg:w-[180px] h-[180px] rounded-3xl overflow-hidden bg-gray-50 p-2 shrink-0 border border-gray-50">
                  <img 
                    src={tech.image} 
                    alt={tech.name} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight group-hover:text-maroon transition-colors">{tech.name}</h4>
                    <div className="w-10 h-10 rounded-full bg-maroon/0 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-500">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                    {tech.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tech.features.map(f => (
                      <span key={f} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-gray-100 rounded-full text-gray-500">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Decorative bottom bar */}
                <div className="absolute bottom-0 left-10 right-10 h-1 bg-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-maroon rounded-[50px] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
               <div className="w-full md:w-1/2 space-y-6 relative z-10">
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                     ADVANCED <span className="text-gold">SURVEILLANCE</span> FOR EVERY ENVIRONMENT
                  </h3>
                  <p className="text-white/70 text-lg font-medium">
                     Our technologies are engineered to perform in the toughest conditions, from the intense desert heat of the UAE to near-total darkness.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                     <div className="space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gold">
                           <ShieldCheck size={18} />
                        </div>
                        <p className="text-sm font-black text-white uppercase tracking-widest">Reliable</p>
                        <p className="text-xs text-white/50">24/7 Uninterrupted performance</p>
                     </div>
                     <div className="space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gold">
                           <Eye size={18} />
                        </div>
                        <p className="text-sm font-black text-white uppercase tracking-widest">Precise</p>
                        <p className="text-xs text-white/50">High-fidelity detailed imaging</p>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-1/2 relative">
                  <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-[40px] shadow-2xl">
                     <img 
                       src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop" 
                       alt="Technology Visual" 
                       className="w-full h-auto rounded-[30px] opacity-90"
                     />
                     <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gold p-6 rounded-[30px] flex items-center justify-center shadow-2xl">
                        <Cpu size={40} className="text-maroon" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-[10px] font-black text-maroon uppercase tracking-[1em]">Ready to Upgrade?</h2>
          <h3 className="text-5xl font-black text-gray-900 uppercase tracking-tight">EXPERIENCE THE <span className="text-maroon">DIFFERENCE</span></h3>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Contact our technical team today for a free consultation and find the perfect technology for your security needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact" 
              className="px-12 py-5 bg-maroon text-white rounded-full font-black uppercase tracking-widest text-sm shadow-2xl shadow-maroon/20 hover:bg-maroon transition-all flex items-center gap-3 active:scale-95"
            >
              Contact Sales Team
              <ArrowRight size={18} />
            </Link>
            <Link 
              href="/products" 
              className="px-12 py-5 border-2 border-gray-100 text-gray-900 rounded-full font-black uppercase tracking-widest text-sm hover:border-maroon transition-all flex items-center gap-3 active:scale-95"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
