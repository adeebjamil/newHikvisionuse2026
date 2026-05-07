import Image from "next/image";
import { Phone, ShieldCheck, Truck, HeadphonesIcon } from "lucide-react";

export default function SecuritySolutions() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="flex-1 relative order-2 lg:order-1">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image 
                src="/solutions_bg.png" 
                alt="Authorized Hikvision Distributor Showroom" 
                width={800} 
                height={600} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="text-gold" size={24} />
                  <span className="font-bold tracking-widest uppercase text-xs">Official Partner</span>
                </div>
                <p className="text-sm opacity-90">Visit our professional showroom in Dubai for a live demonstration.</p>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 -right-10 bg-maroon text-white p-8 rounded-3xl shadow-2xl hidden md:block z-20">
              <p className="text-4xl font-black mb-1 leading-none tracking-tighter text-gold">24/7</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Technical <br />Support</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold font-bold text-xs uppercase tracking-widest mb-6">
              <ShieldCheck size={14} />
              Authorized Hikvision Distributor - UAE
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-8">
              Professional Hikvision <br />
              <span className="text-maroon">Security Solutions</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                As a trusted <span className="font-bold text-gray-900">Hikvision distributor in UAE</span>, we offer comprehensive security solutions and professional-grade surveillance equipment. Our extensive inventory includes the latest Hikvision products at competitive prices.
              </p>
              
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
                <p className="mb-6 font-medium">
                  For detailed product information and pricing, please contact our technical sales team:
                </p>
                
                <a 
                  href="tel:+971509893134" 
                  className="inline-flex items-center gap-4 text-2xl md:text-3xl font-black text-maroon hover:text-gold transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center text-maroon">
                    <Phone size={24} fill="currentColor" />
                  </div>
                  +971 50 989 3134
                </a>
                
                <p className="mt-6 text-sm text-gray-500 italic">
                  Our experts will assist you in selecting the right security solutions tailored to your requirements.
                </p>
              </div>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-maroon">
                  <Truck size={20} />
                </div>
                <span className="font-bold text-sm text-gray-900 uppercase tracking-wide">Rapid UAE Delivery</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-maroon">
                  <HeadphonesIcon size={20} />
                </div>
                <span className="font-bold text-sm text-gray-900 uppercase tracking-wide">Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
