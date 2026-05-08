import { Moon, Eye, Palette, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

const technologies = [
  {
    id: "darkfighter",
    title: "DarkFighter Technology",
    subtitle: "DarkFighter Technology UAE",
    description: "Advanced low-light imaging technology optimized for UAE's challenging lighting conditions. Perfect for 24/7 surveillance in Dubai's diverse environments.",
    icon: <Moon className="w-8 h-8" />,
    color: "from-blue-600/20 to-indigo-600/20",
    border: "group-hover:border-blue-500/50",
    textShadow: "shadow-blue-500/20"
  },
  {
    id: "tandemvu",
    title: "TandemVu Technology",
    subtitle: "TandemVu Technology UAE",
    description: "Dual-lens security solution designed for UAE's commercial spaces. Combines thermal and optical imaging for comprehensive surveillance coverage.",
    icon: <Eye className="w-8 h-8" />,
    color: "from-maroon/20 to-red-600/20",
    border: "group-hover:border-maroon/50",
    textShadow: "shadow-maroon/20"
  },
  {
    id: "colorvu",
    title: "ColorVu Technology",
    subtitle: "ColorVu Technology UAE",
    description: "Full-color night vision technology adapted for UAE conditions. Delivers crystal-clear color imaging even in complete darkness.",
    icon: <Palette className="w-8 h-8" />,
    color: "from-gold/20 to-yellow-600/20",
    border: "group-hover:border-gold/50",
    textShadow: "shadow-gold/20"
  },
  {
    id: "acusense",
    title: "AcuSense Technology",
    subtitle: "AcuSense Technology UAE",
    description: "AI-powered security detection optimized for UAE businesses. Reduces false alarms while ensuring accurate threat detection.",
    icon: <Brain className="w-8 h-8" />,
    color: "from-emerald-600/20 to-teal-600/20",
    border: "group-hover:border-emerald-500/50",
    textShadow: "shadow-emerald-500/20"
  }
];

export default function TechnologySection() {
  return (
    <section className="py-24 bg-[#fcfcfc] dark:bg-maroon overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">Innovation & Excellence</h2>
          <p className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
            Our <span className="text-maroon">Technologies</span>
          </p>
          <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Central Crossing Lines - Solid Brand Maroon (#6b0000) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[3px] bg-maroon/40 -translate-y-1/2 z-0" />
          <div className="hidden lg:block absolute top-0 left-1/2 w-[3px] h-full bg-maroon/40 -translate-x-1/2 z-0" />
          
          {/* Central Octagon - Brand Secondary (Gold) with Continuous Rotation */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold z-10 items-center justify-center shadow-xl animate-[spin_10s_linear_infinite]" 
               style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
            <div className="w-12 h-12 bg-white/20 animate-[spin_15s_linear_infinite_reverse]" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            {technologies.map((tech) => (
              <div 
                key={tech.id}
                className={`group relative p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl ${tech.border} hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-white dark:group-hover:bg-white group-hover:text-maroon transition-all duration-500 shadow-sm ${tech.textShadow} group-hover:scale-110`}>
                      {tech.icon}
                    </div>
                    <div className="flex-1">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        {tech.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white group-hover:text-maroon transition-colors duration-300">
                        {tech.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {tech.description}
                  </p>

                  <Link 
                    href={`/technologies/${tech.id}`}
                    className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-maroon hover:text-gold transition-colors group/btn"
                  >
                    Learn More 
                    <span className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center group-hover/btn:bg-maroon group-hover/btn:text-white transition-all duration-300">
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-50 dark:bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
