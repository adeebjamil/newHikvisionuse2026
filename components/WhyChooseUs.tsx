import { Gem, Users, BadgeCheck, ArrowUpRight } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Premium Quality",
      desc: "We offer only genuine, high-quality products, ensuring you get the finest security solutions available in the market.",
      icon: <Gem size={32} />,
      color: "maroon"
    },
    {
      title: "Expert Team",
      desc: "Our certified professionals bring years of experience in security system installation and maintenance.",
      icon: <Users size={32} />,
      color: "gold"
    },
    {
      title: "Guaranteed Results",
      desc: "We stand behind our work with comprehensive warranties and guaranteed customer satisfaction.",
      icon: <BadgeCheck size={32} />,
      color: "maroon"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-maroon overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">The Hikvision Advantage</h2>
            <p className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
              Why Choose <span className="text-maroon">Our Services?</span>
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              We combine industry expertise with exceptional service to deliver the best security solutions in Dubai.
            </p>
          </div>
          <div className="hidden lg:block pb-4">
            <div className="w-24 h-1 bg-maroon rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="group relative p-10 rounded-[3rem] bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-maroon/20 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-500 shadow-sm hover:shadow-2xl">
              <div className={`w-20 h-20 rounded-2xl ${reason.color === 'maroon' ? 'bg-maroon/10 text-maroon' : 'bg-gold/10 text-gold'} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm`}>
                {reason.icon}
              </div>
              
              <h3 className="text-2xl font-black mb-6 text-gray-900 dark:text-white group-hover:text-maroon transition-colors uppercase tracking-tight">
                {reason.title}
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {reason.desc}
              </p>

              <div className="flex items-center gap-2 text-sm font-black text-gray-300 group-hover:text-gold transition-colors tracking-widest uppercase">
                Excellence Guaranteed <ArrowUpRight size={16} />
              </div>

              {/* Decorative Number */}
              <div className="absolute top-10 right-10 text-8xl font-black text-gray-900/5 dark:text-white/5 pointer-events-none group-hover:text-maroon/5 transition-colors">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Global UAE Presence Indicator */}
        <div className="mt-24 p-12 rounded-[4rem] bg-maroon relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--brand-gold)_0%,_transparent_60%)] opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-white text-center md:text-left">
            <div>
              <p className="text-gold font-black uppercase tracking-[0.3em] text-xs mb-4">Strategic Locations</p>
              <h4 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">Premier Security Partner Across UAE</h4>
              <p className="text-white/70 max-w-xl text-lg">Serving Dubai, Abu Dhabi, Sharjah, and all northern emirates with rapid deployment and localized expert support.</p>
            </div>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-maroon bg-gray-200 overflow-hidden relative group-hover:scale-110 transition-transform duration-500 shadow-xl">
                   <div className="absolute inset-0 bg-maroon/20 mix-blend-overlay" />
                   <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Expert" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-16 h-16 rounded-full border-4 border-maroon bg-gold flex items-center justify-center text-maroon font-black text-xs z-10 shadow-xl">
                +25
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
