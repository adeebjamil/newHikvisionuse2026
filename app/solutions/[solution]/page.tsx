import Link from 'next/link';
import { ChevronRight, Building2, Store, HeartPulse, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default async function SolutionSubPage({ params }: { params: Promise<{ solution: string }> }) {
  const resolvedParams = await params;
  
  // High-quality Unsplash images for solutions
  const solutionsData: Record<string, any> = {
    manufacturing: {
      name: "Manufacturing Solution",
      subtitle: "Industrial security & monitoring in Dubai",
      description: "Secure your production lines, warehouses, and industrial facilities with our state-of-the-art manufacturing solutions. Ensure operational efficiency and worker safety.",
      heroImg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
      icon: Building2,
      benefits: ["Perimeter Protection", "Process Monitoring", "Thermal Detection", "Access Control"]
    },
    retail: {
      name: "Retail Solution",
      subtitle: "Smart business intelligence in Dubai",
      description: "Transform your retail space with intelligent video analytics. Loss prevention combined with customer behavior insights to drive sales and security.",
      heroImg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
      icon: Store,
      benefits: ["People Counting", "Heat Mapping", "POS Integration", "Queue Management"]
    },
    healthcare: {
      name: "Healthcare Solution",
      subtitle: "Patient safety & access control in Dubai",
      description: "Comprehensive security solutions tailored for hospitals and clinics. Protect sensitive areas, ensure patient safety, and manage staff access seamlessly.",
      heroImg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop",
      icon: HeartPulse,
      benefits: ["Patient Monitoring", "Restricted Area Access", "Pharmacy Security", "Emergency Response"]
    },
    education: {
      name: "Education Solution",
      subtitle: "Campus-wide security systems in Dubai",
      description: "Create a safe learning environment for students and staff. Scalable solutions from single schools to multi-campus universities.",
      heroImg: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop",
      icon: GraduationCap,
      benefits: ["Campus Surveillance", "Visitor Management", "Emergency Alarms", "Vehicle Access"]
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

      {/* Modern Split Hero Section */}
      <section className="bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
            {/* Text Content */}
            <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-16 lg:py-0 relative z-10">
              <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-gray-100 text-maroon">
                <IconComponent size={32} strokeWidth={1.5} />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold font-black text-xs uppercase tracking-[0.2em] mb-6 w-max border border-gold/20">
                <ShieldCheck size={14} />
                <span>Industry Specific</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-[1.1]">
                {solutionData.name}
              </h1>
              <p className="text-xl text-maroon font-bold mb-6 uppercase tracking-widest">
                {solutionData.subtitle}
              </p>
              <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xl border-l-4 border-gold pl-6">
                {solutionData.description}
              </p>
              
              <div className="mt-10 flex items-center gap-4">
                <button className="bg-maroon text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl active:scale-95 inline-flex items-center gap-2">
                  <span>Explore Features</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative h-[400px] lg:h-auto group overflow-hidden rounded-l-[40px] lg:rounded-l-[80px] lg:rounded-none lg:rounded-bl-[120px] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-maroon/40 to-transparent z-10 mix-blend-multiply" />
              <img 
                src={solutionData.heroImg} 
                alt={solutionData.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
              />
              {/* Floating Element */}
              <div className="absolute bottom-10 left-10 z-20 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-l-4 border-gold max-w-xs transform group-hover:-translate-y-2 transition-transform duration-500">
                <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Trusted Solution</p>
                <p className="text-xs text-gray-500 font-medium">Deployed across top UAE facilities for maximum security.</p>
              </div>
            </div>
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
            
            {/* Glassmorphism Form Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-maroon/10 to-transparent rounded-[50px] blur-2xl" />
              <div className="bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-2xl relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Ready to secure your facility?</h3>
                <p className="text-gray-600 mb-8 font-medium">Our team of experts in Dubai is ready to design a custom solution that fits your exact requirements and budget.</p>
                
                <form className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-2">Company Name</label>
                    <input type="text" placeholder="e.g. Acme Corp UAE" className="w-full px-6 py-4 rounded-2xl bg-brand-light border border-gray-200 focus:border-maroon focus:bg-white focus:ring-4 focus:ring-maroon/10 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-2">Business Email</label>
                    <input type="email" placeholder="contact@company.ae" className="w-full px-6 py-4 rounded-2xl bg-brand-light border border-gray-200 focus:border-maroon focus:bg-white focus:ring-4 focus:ring-maroon/10 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" />
                  </div>
                  <div className="pt-4">
                    <button type="button" className="w-full bg-maroon text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group">
                      <span>Get A Free Quote</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
