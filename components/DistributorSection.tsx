import Image from "next/image";
import { Star } from "lucide-react";

export default function DistributorSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          {/* Left Content */}
          <div className="flex-1 text-left">
            <div className="inline-block px-6 py-2 rounded-full bg-maroon text-white font-bold text-sm mb-8 shadow-lg shadow-maroon/20">
              #1 Hikvision Distributor in UAE
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
              Professional Security <br />
              <span className="text-maroon">Solutions for UAE</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl">
              Empowering your safety with <span className="text-maroon font-bold">cutting-edge surveillance</span> and <span className="text-maroon font-bold">trusted support</span>. Your peace of mind is our priority.
            </p>
            
            {/* Trust Section */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Avatars */}
              <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
                ].map((src, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-md">
                    <img src={src} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-xs font-black text-gray-400 shadow-md">
                  +1k
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900 uppercase tracking-widest">1000+ Businesses Trust Us</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-gold">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-500">4.8/5 (156 Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-maroon/5 rounded-full blur-3xl scale-125 group-hover:bg-gold/5 transition-colors duration-700" />
            <div className="relative z-10 p-4 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
              <Image 
                src="/ecosystem.png" 
                alt="Hikvision Security Ecosystem" 
                width={800} 
                height={800} 
                priority
                unoptimized
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
