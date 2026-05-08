import Link from 'next/link';
import { ChevronRight, ShieldCheck, Sun, Cpu, Wrench, Eye, MapPin, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default async function TechnologySubPage({ params }: { params: Promise<{ tech: string }> }) {
  const resolvedParams = await params;
  
  // Define specific content for various technologies
  const techMap: Record<string, any> = {
    tandemvu: {
      layoutType: 'default',
      metaTitle: "Hikvision UAE – TandemVu Advanced Surveillance Solutions",
      subtitle: "Authorized Hikvision Partner in Dubai & Across UAE",
      description1: "Discover next-generation security with Hikvision TandemVu Cameras in UAE, designed to deliver unmatched surveillance performance for Dubai, Abu Dhabi, Sharjah, and the entire UAE. As a trusted Hikvision partner in Dubai, we provide cutting-edge dual-lens security systems that combine thermal imaging and visible-light technology in one powerful solution.",
      description2: "Whether you need security for commercial buildings, industrial zones, smart cities, or residential communities, our TandemVu solutions in UAE are engineered to meet the region’s demanding environmental and security standards.",
      heroImg: "/Technologies/TandemVu.png",
      whyChooseTitle: "Why Choose Hikvision TandemVu in UAE?",
      whyChooseText: "TandemVu technology integrates AI-powered analytics, thermal detection, and high-resolution imaging, making it ideal for 24/7 surveillance in UAE conditions. Built specifically for Gulf climates, these systems ensure reliable monitoring even in extreme heat, dust, and low-visibility environments.",
      features: [
        {
          title: "1. UAE-Compliant Security Systems",
          desc: "Our Hikvision TandemVu cameras in Dubai are fully aligned with UAE security regulations and standards, making them suitable for:",
          points: ["Government projects", "Corporate offices", "Critical infrastructure", "Commercial facilities"],
          footer: "Trusted by leading organizations across the UAE, these systems ensure legal compliance and high-performance security deployment.",
          icon: ShieldCheck
        },
        {
          title: "2. Desert-Ready & Climate-Resistant",
          desc: "Designed for UAE weather conditions, TandemVu cameras deliver:",
          points: ["Reliable operation in high temperatures (up to 50°C+)", "Protection against dust and sandstorms", "Consistent performance in outdoor and industrial environments"],
          footer: "Perfect for Dubai construction sites, oil & gas facilities, and remote areas.",
          icon: Sun
        },
        {
          title: "3. Smart City & AI Integration",
          desc: "Aligned with Dubai Smart City initiatives, TandemVu offers:",
          points: ["AI-powered detection and tracking", "Seamless integration with existing CCTV and urban security systems", "Real-time alerts and intelligent analytics"],
          footer: "Ideal for smart surveillance projects in Dubai and Abu Dhabi.",
          icon: Cpu
        },
        {
          title: "4. Local Installation, Support & AMC",
          desc: "As an authorized Hikvision distributor in UAE, we provide:",
          points: ["Professional CCTV installation in Dubai & across UAE", "Annual Maintenance Contracts (AMC)", "Fast on-site technical support", "System upgrades and troubleshooting"],
          footer: "Ensuring maximum uptime and long-term reliability.",
          icon: Wrench
        },
        {
          title: "5. 24/7 Dual-Lens Monitoring",
          desc: "TandemVu combines thermal imaging for night and low-visibility detection, and high-definition visible cameras for detailed monitoring.",
          points: ["Airports & ports", "Warehouses & logistics hubs", "Residential communities", "Retail and commercial spaces"],
          footer: "Best suited for wide-area coverage.",
          icon: Eye
        },
        {
          title: "6. UAE-Specific Security Applications",
          desc: "Optimized for real-world UAE use cases, including:",
          points: ["Port security in Dubai", "Oil & gas site monitoring in Abu Dhabi", "Smart buildings & high-rise surveillance", "Perimeter protection for villas and gated communities"],
          footer: "Delivering accurate detection, reduced false alarms, and enhanced situational awareness.",
          icon: MapPin
        }
      ],
      ctaTitle: "Get the Best Hikvision TandemVu Solutions in Dubai, UAE",
      ctaText: "Upgrade your security infrastructure with Hikvision TandemVu cameras in UAE and experience advanced surveillance powered by AI and thermal technology.",
      locations: "Serving: Dubai | Abu Dhabi | Sharjah | Ajman | Ras Al Khaimah | Fujairah | Umm Al Quwain"
    },
    acusense: {
      layoutType: 'default',
      metaTitle: "Hikvision AcuSense UAE – AI-Powered Smart Security Solutions",
      subtitle: "Authorized Hikvision Partner in Dubai & Across UAE",
      description1: "Upgrade your surveillance with Hikvision AcuSense Cameras in UAE, designed with advanced AI-powered human and vehicle detection to deliver accurate, reliable, and intelligent security. Perfectly suited for Dubai, Abu Dhabi, Sharjah, and across the UAE, AcuSense minimizes false alarms while maximizing protection for residential, commercial, and industrial properties.",
      description2: "Whether you're securing villas, offices, warehouses, or public infrastructure, AcuSense offers next-generation CCTV solutions tailored for UAE environments.",
      heroImg: "/Technologies/AcuSense.png", 
      whyChooseTitle: "Why Choose Hikvision AcuSense in UAE?",
      whyChooseText: "AcuSense technology leverages deep learning AI algorithms to distinguish between humans, vehicles, and irrelevant motion, making it one of the most efficient smart surveillance systems in UAE. Built to perform in harsh Gulf conditions, it ensures accurate monitoring, reduced alerts, and enhanced operational efficiency.",
      features: [
        {
          title: "1. Advanced AI Security for UAE Properties",
          desc: "Hikvision AcuSense cameras provide accurate human and vehicle detection with reduced false alarms from irrelevant motion.",
          points: ["Villas & gated communities", "Corporate offices", "Warehouses & logistics hubs", "Retail outlets and malls"],
          footer: "Enhanced protection for high-value assets and properties.",
          icon: ShieldCheck
        },
        {
          title: "2. Desert-Optimized Performance for UAE Climate",
          desc: "Engineered for UAE’s demanding environment, AcuSense delivers reliable performance in extreme heat and dusty conditions.",
          points: ["Reduced false alerts caused by sandstorms, animals, and environmental noise", "Stable operation in outdoor and industrial locations", "Hardware built to withstand Gulf weather"],
          footer: "Perfect for Dubai outdoor surveillance and remote site monitoring.",
          icon: Sun
        },
        {
          title: "3. Smart Event Detection & Real-Time Alerts",
          desc: "AcuSense enables intelligent detection of perimeter intrusions, unauthorized access, and suspicious activities.",
          points: ["Commercial complexes", "Industrial zones", "Residential communities", "Government and public infrastructure"],
          footer: "Making it ideal for highly sensitive access areas.",
          icon: Cpu
        },
        {
          title: "4. Efficient Monitoring & Smart Playback",
          desc: "Optimize your security operations with advanced event-based recording features.",
          points: ["Event-based recording (human/vehicle filtering)", "Quick video search and playback", "Reduced storage usage and monitoring workload"],
          footer: "Best suited for high-traffic areas like malls, airports, and business districts in UAE.",
          icon: Eye
        },
        {
          title: "5. Customizable & UAE-Compliant",
          desc: "Our AcuSense systems are fully customizable based on project requirements and UAE security regulations.",
          points: ["Aligned with local compliance standards", "Scalable for small to large deployments", "Flexible integration options"],
          footer: "Ensuring legal compliance and flexible implementation across all emirates.",
          icon: Wrench
        },
        {
          title: "6. Seamless Integration with UAE Security Systems",
          desc: "AcuSense integrates effortlessly with your existing security infrastructure and video management systems.",
          points: ["Existing CCTV systems", "Video Management Systems (VMS)", "Smart city infrastructure in Dubai and Abu Dhabi"],
          footer: "Supporting advanced automation, centralized monitoring, and smart analytics.",
          icon: MapPin
        }
      ],
      ctaTitle: "Get Hikvision AcuSense Installation in Dubai & UAE",
      ctaText: "Enhance your security with Hikvision AcuSense cameras in UAE and experience AI-driven surveillance with unmatched accuracy.",
      locations: "Serving: Dubai | Abu Dhabi | Sharjah | Ajman | Ras Al Khaimah | Fujairah | Umm Al Quwain"
    },
    darkfighter: {
      layoutType: 'default',
      metaTitle: "Hikvision DarkFighter UAE – Advanced Night Vision",
      subtitle: "Official Hikvision Distributor in Dubai & Across UAE",
      description1: "Experience superior night surveillance with Hikvision DarkFighter Cameras in UAE, designed to deliver full-color imaging even in near-total darkness. As a trusted Hikvision distributor in Dubai, we provide cutting-edge low-light CCTV solutions for Dubai, Abu Dhabi, Sharjah, and across the UAE.",
      description2: "Whether you need security for commercial properties, industrial sites, residential communities, or government infrastructure, DarkFighter ensures clear, detailed monitoring 24/7, even in the most challenging lighting conditions.",
      heroImg: "/Technologies/DarkFighter.png", 
      whyChooseTitle: "Why Choose Hikvision DarkFighter in UAE?",
      whyChooseText: "DarkFighter technology uses ultra-low-light sensors and AI enhancements to capture vivid color images at night, making it one of the most powerful night vision CCTV solutions in UAE. Built for Gulf environments, it ensures reliable performance in dust, humidity, and extreme temperatures.",
      features: [
        {
          title: "1. Certified Full-Color Night Vision",
          desc: "Hikvision DarkFighter cameras deliver full-color video in extremely low-light environments.",
          points: ["Enhanced visibility compared to traditional IR cameras", "Accurate identification of people, vehicles, and objects"],
          footer: "Perfect for UAE businesses, villas, and high-security zones.",
          icon: Eye
        },
        {
          title: "2. Optimized Low-Light Performance",
          desc: "Engineered for UAE’s challenging climate, DarkFighter offers superior performance in nighttime and dimly lit areas.",
          points: ["Reliable operation in dusty and outdoor environments", "Clear imaging in warehouses, parking areas, and remote locations"],
          footer: "Ideal for Dubai outdoor CCTV and industrial security applications.",
          icon: Sun
        },
        {
          title: "3. Smart City & AI-Enabled Integration",
          desc: "Aligned with Dubai Smart City initiatives, DarkFighter supports advanced urban security.",
          points: ["AI-powered motion detection and analytics", "Integration with existing CCTV and VMS platforms", "Real-time monitoring and intelligent alerts"],
          footer: "Suitable for urban surveillance projects in Dubai and Abu Dhabi.",
          icon: Cpu
        },
        {
          title: "4. Professional Installation & Support",
          desc: "As an authorized Hikvision partner in UAE, we provide end-to-end service.",
          points: ["Expert CCTV installation in Dubai & all emirates", "System configuration and optimization", "Annual Maintenance Contracts (AMC)"],
          footer: "Ensuring maximum uptime and long-term system reliability.",
          icon: Wrench
        },
        {
          title: "5. 24/7 Intelligent Monitoring",
          desc: "DarkFighter enables continuous day & night surveillance with smart motion detection.",
          points: ["Airports & ports", "Logistics hubs", "Commercial buildings", "Residential communities"],
          footer: "Improved security response time with instant alerts.",
          icon: ShieldCheck
        },
        {
          title: "6. Versatile Industry Applications",
          desc: "Delivering high-definition clarity and enhanced situational awareness in every environment.",
          points: ["Port and perimeter security in Dubai", "Oil & gas facilities in Abu Dhabi", "Retail, malls, and hospitality sectors", "Villas and gated communities"],
          footer: "Widely used across multiple sectors in the UAE.",
          icon: MapPin
        }
      ],
      ctaTitle: "Get Hikvision DarkFighter Cameras in Dubai, UAE",
      ctaText: "Upgrade your security system with Hikvision DarkFighter night vision cameras in UAE and achieve unmatched visibility in low-light conditions.",
      locations: "Serving: Dubai | Abu Dhabi | Sharjah | Ajman | Ras Al Khaimah | Fujairah | Umm Al Quwain"
    },
    colorvu: {
      layoutType: 'default',
      metaTitle: "Hikvision ColorVu UAE – 24/7 Full-Color Security Cameras",
      subtitle: "Official Hikvision ColorVu Partner in Dubai & Across UAE",
      description1: "Enhance your surveillance with Hikvision ColorVu Cameras in UAE, delivering true full-color video 24/7—even in complete darkness. As a trusted Hikvision partner in Dubai, we provide advanced color night vision CCTV solutions tailored for Dubai, Abu Dhabi, Sharjah, and across the UAE.",
      description2: "Whether securing residential villas, commercial properties, retail outlets, or smart city infrastructure, ColorVu ensures clear, detailed footage with accurate color reproduction at all times.",
      heroImg: "/Technologies/ColorVu.png", 
      whyChooseTitle: "Why Choose Hikvision ColorVu in UAE?",
      whyChooseText: "Hikvision ColorVu technology uses advanced sensors, large aperture lenses, and smart lighting to deliver bright, full-color images day and night. Built specifically for UAE environments, it guarantees consistent performance in extreme heat, strong sunlight, and low-light conditions.",
      features: [
        {
          title: "1. 24/7 Full-Color Surveillance",
          desc: "Hikvision ColorVu cameras provide continuous full-color video, even at night.",
          points: ["Enhanced identification of people, vehicles, and objects", "Better evidence capture compared to traditional infrared cameras"],
          footer: "Perfect for Dubai businesses, villas, and high-security areas requiring round-the-clock clarity.",
          icon: Eye
        },
        {
          title: "2. Desert-Optimized Performance for UAE Climate",
          desc: "Designed for harsh UAE conditions, ColorVu delivers reliable performance in extreme sunlight and high temperatures.",
          points: ["Clear imaging in low-light and nighttime environments", "Stability in dusty outdoor conditions"],
          footer: "Ideal for construction sites, industrial zones, and outdoor surveillance in Dubai.",
          icon: Sun
        },
        {
          title: "3. Smart Environmental Lighting Technology",
          desc: "ColorVu features intelligent lighting that automatically adjusts to ambient light conditions.",
          points: ["Provides soft, non-intrusive illumination", "Enhances visibility without affecting surroundings"],
          footer: "Blending seamlessly with modern UAE architecture and smart buildings.",
          icon: Zap
        },
        {
          title: "4. Easy Installation & Local Support in UAE",
          desc: "As an authorized Hikvision distributor in UAE, we offer complete deployment services.",
          points: ["Professional CCTV installation in Dubai & across UAE", "System setup and optimization", "Annual Maintenance Contracts (AMC)"],
          footer: "Fast local support and maintenance services ensuring long-term reliability.",
          icon: Wrench
        },
        {
          title: "5. Continuous Monitoring for 24/7 Security",
          desc: "ColorVu ensures uninterrupted day & night surveillance with high-resolution recording.",
          points: ["Retail stores & malls", "Hotels & hospitality sector", "Residential communities", "Offices and warehouses"],
          footer: "Reliable monitoring for businesses operating 24/7.",
          icon: ShieldCheck
        },
        {
          title: "6. Versatile Applications Across UAE",
          desc: "Delivering high-quality color imaging for better decision-making and security response.",
          points: ["Shopping malls and retail outlets in Dubai", "Hotels and hospitality projects in Abu Dhabi", "Residential compounds and villas", "Smart city and urban surveillance systems"],
          footer: "Widely used in high-profile applications across all emirates.",
          icon: MapPin
        }
      ],
      ctaTitle: "Get Hikvision ColorVu Cameras in Dubai, UAE",
      ctaText: "Upgrade to Hikvision ColorVu full-color cameras in UAE and experience superior visibility with advanced surveillance technology.",
      locations: "Serving: Dubai | Abu Dhabi | Sharjah | Ajman | Ras Al Khaimah | Fujairah | Umm Al Quwain"
    }
  };

  const techData = techMap[resolvedParams.tech] || {
    layoutType: 'default',
    metaTitle: `${resolvedParams.tech.charAt(0).toUpperCase() + resolvedParams.tech.slice(1)} Advanced Technology`,
    subtitle: "Authorized Hikvision Partner in Dubai & Across UAE",
    description1: "Explore our cutting-edge security technologies. We provide top-tier Hikvision solutions across the UAE.",
    description2: "Engineered to meet the highest standards of security and reliability for modern infrastructure.",
    heroImg: "/camera.png",
    whyChooseTitle: "Why Choose Our Advanced Technology?",
    whyChooseText: "Our systems integrate the latest innovations in surveillance to guarantee optimal security and peace of mind.",
    features: [
      {
        title: "Innovative Design",
        desc: "State-of-the-art engineering.",
        points: ["High Reliability", "Smart Analytics", "Seamless Integration", "24/7 Operations"],
        footer: "Trusted by leading organizations.",
        icon: ShieldCheck
      }
    ],
    ctaTitle: "Upgrade Your Security",
    ctaText: "Contact our experts to find out how we can protect your assets effectively.",
    locations: "Serving: Dubai | Abu Dhabi | Sharjah | Ajman | Ras Al Khaimah | Fujairah | Umm Al Quwain"
  };

  // -------------------------------------------------------------
  // ALTERNATE LAYOUT (Specifically for DarkFighter to look completely different)
  // -------------------------------------------------------------
  if (techData.layoutType === 'alternate') {
    return (
      <div className="min-h-screen bg-white pb-0">
        {/* Breadcrumbs */}
        <div className="bg-brand-light border-b border-gray-100 pt-32 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/technologies" className="hover:text-maroon transition-colors">Technologies</Link>
              <ChevronRight size={12} />
              <span className="text-maroon capitalize">{resolvedParams.tech}</span>
            </div>
          </div>
        </div>

        {/* Premium DarkFighter Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-maroon">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold font-black text-xs uppercase tracking-[0.2em] mb-8">
                  <Eye size={14} />
                  <span>{techData.subtitle}</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tight uppercase">
                  {techData.metaTitle.includes(' – ') ? techData.metaTitle.split(' – ')[0] : techData.metaTitle} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gold">
                    {techData.metaTitle.includes(' – ') ? techData.metaTitle.split(' – ')[1] : ''}
                  </span>
                </h1>
                
                <div className="text-lg text-white/60 font-medium space-y-6 mb-12 max-w-xl border-l-4 border-gold pl-8">
                  <p>{techData.description1}</p>
                  <p>{techData.description2}</p>
                </div>

                <button className="bg-gold text-maroon px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95 flex items-center gap-3">
                  <span>Discover More</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="relative group">
                <div className="absolute -inset-10 bg-gold/10 rounded-full blur-[120px] animate-pulse" />
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 group h-[500px] bg-white/5 backdrop-blur-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-transparent to-transparent z-10" />
                  <img src={techData.heroImg} alt="Technology Hero" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                    <h3 className="text-white font-black text-2xl mb-4 uppercase tracking-tight">{techData.whyChooseTitle}</h3>
                    <p className="text-white/60 font-medium text-sm leading-relaxed">{techData.whyChooseText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternate Features: Zig-Zag Layout */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16 lg:space-y-24">
              {techData.features.map((feature: any, index: number) => {
                const Icon = feature.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex flex-col gap-12 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Visual Side */}
                    <div className="w-full lg:w-1/2">
                      <div className="aspect-[4/3] rounded-[40px] bg-brand-light border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/Technologies/TandemVu.png')] bg-cover opacity-5 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-all duration-700" />
                        <div className="relative z-10 w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-brand-light text-maroon group-hover:scale-110 transition-transform duration-500">
                          <Icon size={40} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 lg:px-12">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold font-black text-xl mb-6">
                        0{index + 1}
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                        {feature.title.replace(/^\d+\.\s*/, '')} {/* Remove the number prefix since we use the badge */}
                      </h3>
                      <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                        {feature.desc}
                      </p>
                      
                      <div className="space-y-4 mb-8">
                        {feature.points.map((point: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 bg-brand-light p-4 rounded-2xl border border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-maroon shrink-0 shadow-sm">
                              <CheckCircle2 size={16} />
                            </div>
                            <span className="font-bold text-gray-800">{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-l-4 border-gold pl-4 py-1">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
                          {feature.footer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Alternate CTA: Full width banner */}
        <section className="bg-maroon py-24 relative overflow-hidden border-t-[8px] border-gold">
          <div className="absolute inset-0 bg-[url('/Technologies/DarkFighter.png')] bg-cover opacity-10 mix-blend-overlay object-cover" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[100px] mix-blend-screen" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 uppercase tracking-tight leading-tight">
              {techData.ctaTitle}
            </h2>
            <p className="text-gold font-bold text-xl md:text-2xl max-w-3xl mx-auto mb-12">
              {techData.ctaText}
            </p>
            
            <button className="bg-white text-maroon px-12 py-5 rounded-full font-black text-base uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-2xl active:scale-95 inline-flex items-center gap-3">
              <span>Contact Us Today</span>
              <ChevronRight size={20} />
            </button>

            <div className="mt-16 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/20 border border-white/10 backdrop-blur-sm text-white font-bold uppercase tracking-widest text-sm">
              <MapPin size={18} className="text-gold" />
              <p>{techData.locations.replace('Serving: ', '')}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIBRANT LAYOUT (Specifically for ColorVu)
  // -------------------------------------------------------------
  if (techData.layoutType === 'vibrant') {
    return (
      <div className="min-h-screen bg-brand-light pb-0">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-100 pt-32 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/technologies" className="hover:text-maroon transition-colors">Technologies</Link>
              <ChevronRight size={12} />
              <span className="text-maroon capitalize">{resolvedParams.tech}</span>
            </div>
          </div>
        </div>

        {/* Premium ColorVu Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-maroon">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold font-black text-xs uppercase tracking-[0.2em] mb-6">
                  <Sun size={14} />
                  <span>{techData.subtitle}</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tight uppercase">
                   {techData.metaTitle.includes(' – ') ? techData.metaTitle.split(' – ')[0] : techData.metaTitle} <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gold">
                    {techData.metaTitle.includes(' – ') ? techData.metaTitle.split(' – ')[1] : ''}
                   </span>
                </h1>
                <p className="text-xl text-white/60 font-medium mb-12 max-w-xl leading-relaxed border-l-4 border-gold pl-8">
                  {techData.description1}
                </p>
                
                <div className="flex items-center gap-6">
                  <button className="bg-white text-maroon px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gold transition-all active:scale-95 shadow-2xl flex items-center gap-3">
                    <span>Explore Technology</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gold/10 rounded-[60px] blur-[100px] animate-pulse" />
                <div className="relative bg-white/5 backdrop-blur-xl rounded-[60px] p-8 border border-white/10 overflow-hidden shadow-2xl">
                   <img 
                     src={techData.heroImg} 
                     alt="ColorVu Technology" 
                     className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(255,215,0,0.3)] transition-transform duration-[2s] group-hover:scale-110" 
                   />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section: Minimalist */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-6">{techData.whyChooseTitle}</h2>
            <div className="w-20 h-1 bg-maroon mx-auto rounded-full mb-8" />
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {techData.whyChooseText}
            </p>
          </div>
        </section>

        {/* Features: Staggered Masonry Layout */}
        <section className="py-12 bg-white pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
              <div className="space-y-12 lg:mt-0">
                {techData.features.filter((_: any, i: number) => i % 2 === 0).map((feature: any, index: number) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-brand-light rounded-[30px] p-10 border border-gray-100 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px] group-hover:bg-gold/10 transition-colors" />
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-maroon mb-6 shadow-sm border border-gray-100">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{feature.title}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed mb-8">{feature.desc}</p>
                      <ul className="space-y-4 mb-8">
                        {feature.points.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                            <span className="text-sm font-bold text-gray-800">{point}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs font-bold text-maroon uppercase tracking-wider">{feature.footer}</p>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-12 lg:mt-24">
                {techData.features.filter((_: any, i: number) => i % 2 !== 0).map((feature: any, index: number) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-brand-light rounded-[30px] p-10 border border-gray-100 hover:shadow-2xl hover:shadow-maroon/10 transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-maroon/5 rounded-bl-[100px] group-hover:bg-maroon/10 transition-colors" />
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gold mb-6 shadow-sm border border-gray-100">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{feature.title}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed mb-8">{feature.desc}</p>
                      <ul className="space-y-4 mb-8">
                        {feature.points.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <CheckCircle2 size={18} className="text-maroon shrink-0 mt-0.5" />
                            <span className="text-sm font-bold text-gray-800">{point}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs font-bold text-gold uppercase tracking-wider">{feature.footer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA: Floating Suspended Card */}
        <section className="bg-white py-12 relative z-20 -mb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-maroon via-[#5a0000] to-maroon rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(107,0,0,0.3)]">
              <div className="absolute inset-0 bg-[url('/Technologies/ColorVu.png')] bg-cover opacity-10 mix-blend-overlay object-cover" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/10 blur-[100px] mix-blend-screen" />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                  {techData.ctaTitle}
                </h2>
                <p className="text-gold font-bold text-lg md:text-xl max-w-3xl mx-auto mb-10">
                  {techData.ctaText}
                </p>
                
                <button className="bg-white text-maroon px-12 py-5 rounded-full font-black text-sm md:text-base uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl active:scale-95 inline-flex items-center gap-3">
                  <span>Get In Touch</span>
                  <ChevronRight size={20} />
                </button>
  
                <div className="mt-12 flex items-center justify-center gap-3 px-6 py-3 text-white/90 font-bold uppercase tracking-widest text-xs md:text-sm">
                  <MapPin size={18} className="text-gold" />
                  <p>{techData.locations.replace('Serving: ', '')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Adds padding to compensate for negative margin */}
        <div className="h-40 bg-brand-light"></div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DEFAULT LAYOUT (TandemVu, AcuSense)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-brand-light pb-0">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 pt-32 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/technologies" className="hover:text-maroon transition-colors">Technologies</Link>
            <ChevronRight size={12} />
            <span className="text-maroon capitalize">{resolvedParams.tech}</span>
          </div>
        </div>
      </div>

      {/* Premium Tech Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maroon">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold font-bold text-xs uppercase tracking-widest mb-8">
                <Zap size={14} />
                <span>{techData.subtitle}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight uppercase">
                {techData.metaTitle.includes(' – ') ? techData.metaTitle.split(' – ')[0] : techData.metaTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gold">
                  {techData.metaTitle.includes(' – ') ? techData.metaTitle.split(' – ')[1] : ''}
                </span>
              </h1>
              <div className="space-y-6 text-lg text-white/60 font-medium border-l-4 border-gold pl-6 mb-12">
                <p className="leading-relaxed">{techData.description1}</p>
                <p className="leading-relaxed">{techData.description2}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-white text-maroon px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-xl active:scale-95">
                  Request A Quote
                </button>
                <a 
                  href="/Download%20Pdf.pdf" 
                  download 
                  className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 inline-block"
                >
                  Download Pdf
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative group mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gold/20 rounded-[40px] blur-3xl group-hover:bg-gold/30 transition-all duration-700" />
              <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-6 border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 via-gold to-white/20" />
                <div className="relative h-[400px] rounded-[30px] overflow-hidden bg-white/5 flex items-center justify-center p-8">
                  <img src={techData.heroImg} alt="Technology Visual" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(255,215,0,0.2)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-brand-light border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-6">{techData.whyChooseTitle}</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            {techData.whyChooseText}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
              Key Features & Benefits
            </h2>
            <div className="w-24 h-1 bg-maroon mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techData.features.map((feature: any, index: number) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-brand-light rounded-[30px] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gold/30 transition-all duration-300 group flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-maroon mb-6 shadow-sm border border-gray-100 group-hover:bg-maroon group-hover:text-white transition-colors shrink-0">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-maroon transition-colors">{feature.title}</h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
                    {feature.desc}
                  </p>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {feature.points.map((point: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
                      {feature.footer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-maroon rounded-[40px] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background glowing effects - using gold and white to avoid black */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/30 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl mix-blend-screen" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                {techData.ctaTitle}
              </h2>
              <p className="text-gold font-bold text-lg md:text-xl max-w-3xl mx-auto mb-10">
                {techData.ctaText}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <button className="bg-white text-maroon px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl hover:shadow-2xl active:scale-95 w-full sm:w-auto">
                  Contact Us Today
                </button>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-2 text-white/80 text-xs md:text-sm font-bold uppercase tracking-widest">
                <MapPin size={16} className="text-gold" />
                <p>{techData.locations}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
