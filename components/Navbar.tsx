"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Phone, Mail, ShieldCheck, Menu, X, ChevronRight, MapPin, ArrowRight, Building2, Store, HeartPulse, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch catalog data
    const fetchCatalog = async () => {
      try {
        const res = await fetch('/api/nav-products');
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) setActiveCategory(data[0]);
        }
      } catch (err) {
        console.error('Nav catalog fetch error:', err);
      }
    };
    fetchCatalog();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top contact bar - More professional with icons */}
      <div className="brand-bar bg-maroon text-white overflow-hidden">
        <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-6 lg:pr-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="mailto:sales@hikvisionuae.ae" className="flex items-center gap-2 text-[10px] sm:text-xs hover:text-gold transition-colors">
              <Mail size={12} className="text-gold" />
              <span className="font-medium">sales@hikvisionuae.ae</span>
            </a>
            <a href="tel:+971509693134" className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs hover:text-gold transition-colors">
              <Phone size={12} className="text-gold" />
              <span className="font-bold">+971 50 969 3134</span>
            </a>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center mx-12 overflow-hidden relative h-10 items-center">
            <div className="animate-marquee whitespace-nowrap py-1 flex items-center">
                <img src="/navbar/bluetick.png" alt="Verified" className="h-4 w-4 object-contain inline-block mr-2" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  #1 CCTV DISTRIBUTER IN UAE | DUBAI | SHARJAH | AJMAN
                </span>
                
                <span className="mx-8 text-gold opacity-50">|</span>

                <img src="/navbar/greentick.png" alt="Trusted" className="h-4 w-4 object-contain inline-block mr-2" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  AUTHORIZED HIKVISION PARTNER | 24/7 TECHNICAL SUPPORT | EXPERT INSTALLATION ACROSS ALL EMIRATES
                </span>

                {/* Second copy for loop - integrated into same flow to avoid stacking */}
                <span className="mx-8 text-gold opacity-50">|</span>

                <img src="/navbar/bluetick.png" alt="Verified" className="h-4 w-4 object-contain inline-block mr-2" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  #1 CCTV DISTRIBUTER IN UAE | DUBAI | SHARJAH | AJMAN
                </span>
                
                <span className="mx-8 text-gold opacity-50">|</span>

                <img src="/navbar/greentick.png" alt="Trusted" className="h-4 w-4 object-contain inline-block mr-2" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  AUTHORIZED HIKVISION PARTNER | 24/7 TECHNICAL SUPPORT | EXPERT INSTALLATION ACROSS ALL EMIRATES
                </span>
            </div>
            {/* Subtle underline glow */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black tracking-widest uppercase text-gold">
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">Official Distributor</span>
            <span className="sm:hidden">Official</span>
          </div>
        </div>
      </div>

      {/* Main navigation - Clean and Modern */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-2' : 'bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <img src="/logo.webp" alt="Hikvision logo" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" />
              </Link>
            </div>

            {/* Desktop links - Centered typography */}
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className="px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-gray-900 hover:text-maroon transition-all duration-300 relative group"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gold origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="absolute inset-0 bg-maroon/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              {/* Products Dropdown - Mega Menu */}
              <div className="relative group/prod">
                <Link 
                  href="/products" 
                  className="px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-gray-900 hover:text-maroon transition-all duration-300 relative flex items-center gap-1"
                >
                  <span className="relative z-10">Products</span>
                  <ChevronRight size={14} className="rotate-90 group-hover/prod:rotate-[-90deg] transition-transform duration-300 text-gold" />
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gold origin-left transform scale-x-0 group-hover/prod:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>

                {/* Products Mega Menu - Redesigned to match screenshot */}
                <div className="absolute top-full left-1/2 -translate-x-[45%] pt-4 opacity-0 invisible translate-y-4 group-hover/prod:opacity-100 group-hover/prod:visible group-hover/prod:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <div className="bg-white rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.18)] border border-gray-100 p-0 w-[1000px] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="px-10 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Security Solutions</h3>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Explore our professional range of Hikvision technology</p>
                    </div>

                    {/* Sub-Categories Grid */}
                    <div className="p-10 bg-white max-h-[600px] overflow-y-auto custom-scrollbar">
                      <div className="grid grid-cols-3 gap-x-10 gap-y-12">
                        {categories.flatMap(cat => 
                          (cat.subCategories || []).map((sub: any) => ({ ...sub, catSlug: cat.slug }))
                        ).map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/products/${sub.catSlug}/${sub.slug}`}
                            className="flex items-start gap-5 group/sub-item"
                            onClick={() => setOpen(false)}
                          >
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-3 shrink-0 group-hover/sub-item:border-gold transition-colors shadow-sm">
                              {sub.image ? (
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-contain group-hover/sub-item:scale-110 transition-transform duration-500" />
                              ) : (
                                <div className="w-full h-full bg-maroon/5 flex items-center justify-center">
                                  <ShieldCheck size={24} className="text-maroon/30" />
                                </div>
                              )}
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[15px] font-black text-gray-900 uppercase tracking-tight group-hover/sub-item:text-maroon transition-colors leading-none">
                                {sub.name}
                              </h4>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">View professional solutions</p>
                              <div className="pt-1 flex items-center gap-1.5 text-maroon font-black text-[11px] uppercase tracking-[0.15em] group-hover/sub-item:gap-2.5 transition-all">
                                <span>Explore Products</span>
                                <ArrowRight size={14} />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bottom Footer/Accent */}
                    <div className="h-1 bg-gradient-to-r from-maroon via-gold to-maroon"></div>
                  </div>
                </div>
              </div>

              {/* Technologies Dropdown */}
              <div className="relative group/tech">
                <Link 
                  href="/technologies" 
                  className="px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-gray-900 hover:text-maroon transition-all duration-300 relative flex items-center gap-1"
                >
                  <span className="relative z-10">Technologies</span>
                  <ChevronRight size={14} className="rotate-90 group-hover/tech:rotate-[-90deg] transition-transform duration-300 text-gold" />
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gold origin-left transform scale-x-0 group-hover/tech:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>

                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-4 group-hover/tech:opacity-100 group-hover/tech:visible group-hover/tech:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <div className="bg-white rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.2)] border border-gray-100 p-0 w-[850px] overflow-hidden flex h-[480px]">
                    {/* Left: Featured Technology */}
                    <div className="w-[45%] relative group/img overflow-hidden border-r border-gray-50">
                      <img 
                        src="/Technologies/Core Tech.png" 
                        alt="Advanced Core Technologies" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" 
                      />
                      {/* Gradient Overlay - Maroon themed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon/95 via-maroon/20 to-transparent"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <div className="space-y-3 transform transition-all duration-500 group-hover/img:-translate-y-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/30 backdrop-blur-md">
                            <ShieldCheck size={12} className="text-gold" />
                            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Industry Leader</span>
                          </div>
                          <h4 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Core <span className="text-gold">Tech</span></h4>
                          <p className="text-white/80 text-xs font-bold uppercase tracking-[0.15em] leading-relaxed max-w-[200px]">Next-generation intelligence for a safer world</p>
                          
                          <Link href="/technologies" className="inline-flex items-center gap-2 mt-4 text-gold font-black text-[11px] uppercase tracking-[0.2em] group/btn">
                            <span>Explore Global Standards</span>
                            <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-8 left-8 w-12 h-[1px] bg-white/30"></div>
                      <div className="absolute top-8 left-8 w-[1px] h-12 bg-white/30"></div>
                    </div>

                    {/* Right: Technology List */}
                    <div className="w-[55%] flex flex-col bg-white">
                      <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Signature Technologies</span>
                         <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-maroon"></div>
                            <div className="w-1 h-1 rounded-full bg-gold"></div>
                            <div className="w-1 h-1 rounded-full bg-maroon"></div>
                         </div>
                      </div>

                      <div className="flex-1 p-6 grid grid-cols-1 gap-1 overflow-y-auto custom-scrollbar">
                        {[
                          { 
                            name: 'TandemVu', 
                            href: '/technologies/tandemvu', 
                            desc: 'Dual-lens comprehensive coverage', 
                            icon: '/Technologies/TandemVu.png',
                            accent: 'border-blue-500/20 bg-blue-50/30'
                          },
                          { 
                            name: 'AcuSense', 
                            href: '/technologies/acusense', 
                            desc: 'AI-powered accurate detection', 
                            icon: '/Technologies/AcuSense.png',
                            accent: 'border-maroon/20 bg-maroon/5'
                          },
                          { 
                            name: 'DarkFighter', 
                            href: '/technologies/darkfighter', 
                            desc: 'Ultra-low light optimization', 
                            icon: '/Technologies/DarkFighter.png',
                            accent: 'border-indigo-500/20 bg-indigo-50/30'
                          },
                          { 
                            name: 'ColorVu', 
                            href: '/technologies/colorvu', 
                            desc: '24/7 Vivid color imaging', 
                            icon: '/Technologies/ColorVu.png',
                            accent: 'border-gold/20 bg-gold/5'
                          },
                        ].map((tech) => (
                          <Link 
                            key={tech.name} 
                            href={tech.href} 
                            className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 group/item transition-all duration-300 border border-transparent hover:border-gray-100"
                          >
                            <div className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm p-1 transition-all duration-500 group-hover/item:shadow-md group-hover/item:scale-105 bg-white`}>
                               <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-[16px] font-black text-gray-900 group-hover/item:text-maroon transition-colors tracking-tight uppercase">
                                  {tech.name}
                                </h5>
                                <div className="w-6 h-6 rounded-full bg-maroon/0 flex items-center justify-center text-maroon group-hover/item:bg-maroon group-hover/item:text-white transition-all duration-500 opacity-0 group-hover/item:opacity-100">
                                   <ChevronRight size={14} />
                                </div>
                              </div>
                              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                                {tech.desc}
                              </p>
                              <div className="h-[2px] w-0 bg-gold group-hover/item:w-12 transition-all duration-500" />
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Accent */}
                      <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-center">
                         <Link href="/technologies" className="text-[10px] font-black text-maroon uppercase tracking-[0.2em] hover:text-gold transition-colors flex items-center gap-2">
                            <span>View technical documentation</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
                         </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group/sol">
                <Link 
                  href="/solutions" 
                  className="px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-gray-900 hover:text-maroon transition-all duration-300 relative flex items-center gap-1"
                >
                  <span className="relative z-10">Solutions</span>
                  <ChevronRight size={14} className="rotate-90 group-hover/sol:rotate-[-90deg] transition-transform duration-300 text-gold" />
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gold origin-left transform scale-x-0 group-hover/sol:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>

                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-4 group-hover/sol:opacity-100 group-hover/sol:visible group-hover/sol:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <div className="bg-white rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.2)] border border-gray-100 p-6 w-[1000px] overflow-hidden relative">
                    <div className="flex items-center justify-between mb-6 px-2">
                       <div className="space-y-1">
                          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Industry <span className="text-maroon">Solutions</span></h3>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Tailored security for every sector</p>
                       </div>
                       <Link href="/solutions" className="text-[10px] font-black text-maroon hover:text-gold transition-colors uppercase tracking-[0.2em] flex items-center gap-2 group/all">
                          <span>View All Solutions</span>
                          <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                       </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { name: 'Manufacturing', href: '/solutions/manufacturing', desc: 'Industrial security', img: '/Solutions/Manufacturing.png', icon: Building2 },
                        { name: 'Retail', href: '/solutions/retail', desc: 'Business intelligence', img: '/Solutions/Retail.png', icon: Store },
                        { name: 'Healthcare', href: '/solutions/healthcare', desc: 'Safety & access', img: '/Solutions/Healthcare.png', icon: HeartPulse },
                        { name: 'Education', href: '/solutions/education', desc: 'Campus security', img: '/Solutions/Education.png', icon: GraduationCap },
                      ].map((sol) => (
                        <Link 
                          key={sol.name} 
                          href={sol.href} 
                          className="group/item flex flex-col gap-4"
                        >
                          <div className="relative h-32 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                            <img src={sol.img} alt={sol.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" />
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-500"></div>
                            
                            {/* Accent Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-maroon transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left"></div>
                          </div>

                          <div className="px-1 space-y-2">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-maroon border border-gray-100 group-hover/item:bg-maroon group-hover/item:text-white transition-all duration-300">
                                  <sol.icon size={14} />
                               </div>
                               <div className="flex flex-col">
                                 <h4 className="text-[14px] font-black text-gray-900 uppercase tracking-tight group-hover/item:text-maroon transition-colors">{sol.name}</h4>
                                 <span className="text-gray-400 text-[8px] font-bold uppercase tracking-[0.2em]">{sol.desc}</span>
                               </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-1 border-t border-gray-50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                               <span className="text-[9px] font-black text-maroon uppercase tracking-widest">Explore Solution</span>
                               <ChevronRight size={12} className="text-gold" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Bottom Decorative Element */}
                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-center gap-8">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse"></div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Enterprise Ready</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Local Support</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse"></div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">UAE Compliant</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.15em] text-gray-900 hover:text-maroon transition-all duration-300 relative group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gold origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  <span className="absolute inset-0 bg-maroon/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right side - CTA Button */}
            <div className="hidden md:flex items-center">
              <a 
                href="tel:+971509693134" 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold bg-maroon text-white hover:bg-gold hover:text-maroon transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Call Us</span>
                <Phone size={14} />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setOpen(!open)} 
                className="p-2 text-maroon hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={`md:hidden fixed inset-0 top-[88px] bg-white z-40 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="px-6 py-8 space-y-4 overflow-y-auto h-full pb-32">
            {[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'Technologies', href: '/technologies' },
              { name: 'Solutions', href: '/solutions' },
              { name: 'About Us', href: '/about' },
              { name: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setOpen(false)}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 text-lg font-bold text-gray-900 active:bg-maroon active:text-white transition-all"
              >
                {link.name}
                <ChevronRight size={20} />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
