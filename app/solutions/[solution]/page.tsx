import Link from 'next/link';
import { ChevronRight, Building2, Store, HeartPulse, GraduationCap, ArrowRight, ShieldCheck, Target, Globe, Flame, Settings, Cpu } from 'lucide-react';
import Image from 'next/image';

export default async function SolutionSubPage({ params }: { params: Promise<{ solution: string }> }) {
  const resolvedParams = await params;
  
  // High-quality Unsplash images for solutions
  const solutionsData: Record<string, any> = {
    manufacturing: {
      name: "Manufacturing Solution",
      subtitle: "Industrial security & monitoring in Dubai",
      description: "Secure your production lines, warehouses, and industrial facilities with our state-of-the-art manufacturing solutions. Ensure operational efficiency and worker safety.",
      heroImg: "/Solutions/Manufacturing.png",
      icon: Building2,
      benefits: ["Perimeter Protection", "Process Monitoring", "Thermal Detection", "Access Control"]
    },
    retail: {
      name: "Retail Solution",
      subtitle: "Smart business intelligence in Dubai",
      description: "Transform your retail space with intelligent video analytics. Loss prevention combined with customer behavior insights to drive sales and security.",
      heroImg: "/Solutions/Retail.png",
      icon: Store,
      benefits: ["People Counting", "Heat Mapping", "POS Integration", "Queue Management"]
    },
    healthcare: {
      name: "Healthcare Solution",
      subtitle: "Patient safety & access control in Dubai",
      description: "Comprehensive security solutions tailored for hospitals and clinics. Protect sensitive areas, ensure patient safety, and manage staff access seamlessly.",
      heroImg: "/Solutions/Healthcare.png",
      icon: HeartPulse,
      benefits: ["Patient Monitoring", "Restricted Area Access", "Pharmacy Security", "Emergency Response"]
    },
    education: {
      name: "Education Solution",
      subtitle: "Campus-wide security systems in Dubai",
      description: "Create a safe learning environment for students and staff. Scalable solutions from single schools to multi-campus universities.",
      heroImg: "/Solutions/Education.png",
      icon: GraduationCap,
      benefits: ["Campus Surveillance", "Visitor Management", "Emergency Alarms", "Vehicle Access"]
    },
    'thermal-imaging-cameras': {
      name: "Thermal Imaging",
      subtitle: "Precision Temperature Intelligence in UAE",
      description: "Hikvision's Thermal Imaging technology revolutionizes safety in Dubai and Abu Dhabi by visualizing heat. Beyond simple surveillance, these systems detect early-stage fires, monitor critical industrial equipment for overheating, and provide long-range perimeter protection that remains effective in complete darkness, thick smoke, or heavy fog.",
      heroImg: "no-image",
      icon: Flame,
      benefits: [
        "Proactive Fire Prevention",
        "Industrial Temperature Monitoring",
        "All-Weather Perimeter Security",
        "Non-Contact Health Screening"
      ],
      features: [
        { title: "Dual-Spectrum Imaging", desc: "Combines thermal and visible light sensors for enhanced situational awareness and accurate identification." },
        { title: "Bi-Spectrum Image Fusion", desc: "Overlays thermal details onto visible images to provide a more comprehensive view of the scene." },
        { title: "Advanced Fire Detection", desc: "Uses AI algorithms to identify fire sources and trigger immediate alerts before flames become visible." },
        { title: "High-Accuracy Thermography", desc: "Monitors surface temperatures with extreme precision, ideal for Dubai's industrial and oil & gas sectors." }
      ]
    },
    'ptz-surveillance-systems': {
      name: "PTZ Surveillance",
      subtitle: "360° High-Performance Tracking in Dubai",
      description: "Our Pan-Tilt-Zoom (PTZ) surveillance systems provide unmatched coverage for wide-area monitoring in the UAE. Featuring powerful optical zoom and rapid movement, these cameras are the backbone of security for airports, stadiums, and urban centers across Dubai. With AI-driven auto-tracking, no movement goes unobserved.",
      heroImg: "no-image",
      icon: Settings,
      benefits: [
        "Unrivaled 360° Coverage",
        "Long-Range Object Identification",
        "AI-Powered Auto Tracking",
        "Rapid Perimeter Response"
      ],
      features: [
        { title: "Powerful Optical Zoom", desc: "Capture crystal-clear details from hundreds of meters away, perfect for critical infrastructure monitoring." },
        { title: "Smart Tracking 2.0", desc: "Automatically follows moving targets (humans or vehicles) with high precision using deep learning." },
        { title: "Laser IR Illumination", desc: "Provides high-quality night vision even in the darkest environments, extending visibility up to 500 meters." },
        { title: "Rugged Desert-Ready Design", desc: "Built to withstand UAE's extreme temperatures and dust storms with IP67 and IK10 ratings." }
      ]
    },
    'ai-powered-smart-cameras': {
      name: "AI Smart Cameras",
      subtitle: "Deep Learning Security Analytics for UAE",
      description: "Step into the future of security with Hikvision AI Smart Cameras. By leveraging deep learning algorithms, these cameras go beyond recording to understanding. They can distinguish between people and vehicles, count footfall for retail intelligence in Dubai, and even identify unauthorized behavior in real-time, providing true operational intelligence.",
      heroImg: "no-image",
      icon: Cpu,
      benefits: [
        "Significant False Alarm Reduction",
        "Actionable Business Intelligence",
        "Smart Search Efficiency",
        "Automated Security Response"
      ],
      features: [
        { title: "AcuSense Technology", desc: "Focuses on human and vehicle targets, filtering out false alarms caused by animals or falling leaves." },
        { title: "Facial Recognition", desc: "High-accuracy face capture and matching for secure access control in UAE's corporate environments." },
        { title: "People Counting & Analytics", desc: "Generates valuable data for retail malls and transport hubs to optimize operations and staffing." },
        { title: "Behavioral Analysis", desc: "Detects activities like loitering, line crossing, and abandoned objects to prevent security incidents." }
      ]
    }
  };

  const solutionData = solutionsData[resolvedParams.solution] || {
    name: "Enterprise Solution",
    subtitle: "Comprehensive business security",
    description: "Tailored security solutions for your specific industry needs. Protect your assets and optimize your operations.",
    heroImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    icon: Building2,
    benefits: ["Custom Integration", "Scalable Architecture", "24/7 Monitoring", "Advanced Analytics"]
  };

  const IconComponent = solutionData.icon;

  return (
    <div className="min-h-screen bg-brand-light pb-0 font-sans">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 pt-32 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/solutions" className="hover:text-maroon transition-colors">Solutions</Link>
            <ChevronRight size={12} />
            <span className="text-maroon capitalize">{resolvedParams.solution}</span>
          </div>
        </div>
      </div>

      {/* Premium Industry Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maroon">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid grid-cols-1 ${solutionData.heroImg !== 'no-image' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-16 items-center`}>
            {/* Text Content */}
            <div className={`flex flex-col justify-center ${solutionData.heroImg === 'no-image' ? 'max-w-4xl mx-auto text-center items-center' : ''}`}>
              <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 shadow-sm border border-white/10 text-gold">
                <IconComponent size={32} strokeWidth={1.5} />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-8 w-max border border-gold/30">
                <ShieldCheck size={14} />
                <span>Hikvision Official Solution</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tight leading-[0.95] sm:leading-[0.85]">
                {solutionData.name.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gold">
                   {solutionData.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className={`text-xl text-white/60 font-medium leading-relaxed max-w-xl ${solutionData.heroImg === 'no-image' ? 'border-l-0 pl-0' : 'border-l-4 border-gold pl-8'} mb-12`}>
                {solutionData.description}
              </p>
              
              <div className="flex items-center gap-4">
                <button className="bg-white text-maroon px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-2xl active:scale-95 inline-flex items-center gap-2">
                  <span>Explore Features</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Image Content */}
            {solutionData.heroImg !== 'no-image' && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gold/10 rounded-[60px] blur-[100px] animate-pulse" />
                <div className="relative h-[450px] md:h-[550px] overflow-hidden rounded-[60px] shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-maroon/80 to-transparent z-10" />
                  <img 
                    src={solutionData.heroImg} 
                    alt={solutionData.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-80"
                  />
                  <div className="absolute bottom-10 left-10 z-20 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-l-4 border-gold max-w-xs border border-white/10">
                    <p className="text-sm font-black text-white uppercase tracking-widest mb-2">Trusted Solution</p>
                    <p className="text-xs text-white/50 font-medium leading-relaxed">Deployed across top UAE facilities for maximum security and operational excellence.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modern Benefits Grid & Form Section */}
      <section className="py-24 bg-brand-light relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Benefits Cards */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">Key Benefits</h2>
              <div className="w-20 h-1 bg-gold mb-12 rounded-full" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {solutionData.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="bg-white p-8 rounded-[30px] border border-gray-100 hover:border-maroon/20 shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-maroon mb-6 group-hover:bg-maroon group-hover:text-white transition-colors">
                      <span className="font-black text-lg">0{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{benefit}</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      Deploy advanced systems that integrate seamlessly into your daily workflow, providing maximum protection with minimum disruption.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Regional Success & Consultation Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-10 bg-gold/5 rounded-full blur-[100px]" />
              <div className="relative bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-2xl z-10 overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-maroon/5 rounded-bl-full" />
                
                <h3 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-tight">
                  Regional <span className="text-maroon">Excellence</span> <br />
                  & Consultation
                </h3>
                
                <div className="space-y-8 mb-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <Target size={28} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900 leading-none mb-1">500+</p>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">UAE Projects Delivered</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-maroon/5 flex items-center justify-center text-maroon shrink-0">
                      <Globe size={28} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900 leading-none mb-1">UAE Wide</p>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Regional Coverage</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 mb-10">
                   <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="text-gold" size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Certified Partner Support</span>
                   </div>
                   <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      Speak directly with our Dubai-based technical engineers for a comprehensive solution design tailored to your requirements.
                   </p>
                </div>

                <div className="grid grid-cols-1">
                  <Link 
                    href="/contact"
                    className="w-full bg-maroon text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                  >
                    Get Free Design Support
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Advanced Technical Features (SEO Enriched) */}
      {solutionData.features && (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">Technical <span className="text-maroon">Specifications</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-medium">Deep dive into the advanced capabilities that make these systems the preferred choice for UAE enterprises.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutionData.features.map((feature: any, i: number) => (
                <div key={i} className="p-8 rounded-[40px] bg-brand-light border border-gray-100 hover:border-gold transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-maroon text-white flex items-center justify-center font-black mb-6 shadow-lg shadow-maroon/20">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">{feature.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Full Width */}
      <section className="py-24 bg-maroon relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">Ready to <span className="text-gold">Upgrade?</span></h2>
           <p className="text-white/60 text-xl font-medium mb-12">Connect with our Dubai based technical team for a free site survey and solution design.</p>
           <Link href="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-maroon rounded-full font-black uppercase tracking-widest hover:bg-gold transition-all active:scale-95 shadow-2xl">
              Get Started Now <ArrowRight size={20} />
           </Link>
        </div>
      </section>
    </div>
  );
}
