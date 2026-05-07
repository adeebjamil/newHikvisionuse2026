import { Phone, MessageSquare, ShieldAlert, CheckCircle2, Search, ArrowRight } from "lucide-react";

export default function SupportSection() {
  const steps = [
    {
      number: "01",
      title: "Contact Us",
      desc: "Call, email, or chat with our support team 24/7 for instant help.",
      icon: <MessageSquare size={24} />
    },
    {
      number: "02",
      title: "Diagnosis",
      desc: "We quickly assess your issue and provide clear, step-by-step solutions.",
      icon: <Search size={24} />
    },
    {
      number: "03",
      title: "Resolution",
      desc: "Our certified engineers resolve your problem—onsite or remotely.",
      icon: <ShieldAlert size={24} />
    },
    {
      number: "04",
      title: "Follow Up",
      desc: "We check in to ensure you're satisfied and your system is secure.",
      icon: <CheckCircle2 size={24} />
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-maroon rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">Support & Maintenance</h2>
          <p className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-gray-900 dark:text-white">
            Hikvision UAE <span className="text-maroon">Support</span>
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-maroon/5 border border-maroon/10 text-maroon font-bold text-sm mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            24/7 Customer Support
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Your security is our priority. Our Dubai-based team is always ready to help you with installation, troubleshooting, and after-sales service—anytime, anywhere.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* Connector Line (Desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-gray-100 dark:bg-white/10 z-0" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-8 group-hover:bg-maroon group-hover:border-maroon transition-all duration-500 shadow-sm">
                  <div className="text-maroon group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-maroon font-black text-sm group-hover:bg-white group-hover:scale-110 transition-all">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-black mb-4 text-gray-900 dark:text-white group-hover:text-maroon transition-colors">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-maroon to-[#4a0000] rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--brand-gold)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
          
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-black mb-2 text-white">Need Immediate Assistance?</h4>
            <p className="text-white/70 font-medium">Our technical experts are standing by to assist you right now.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <a 
              href="tel:+971509893134" 
              className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white text-maroon font-black text-lg hover:bg-gold transition-all transform hover:-translate-y-1 shadow-xl w-full sm:w-auto justify-center"
            >
              <Phone fill="currentColor" size={20} />
              +971 50 989 3134
            </a>
            <button className="text-white/60 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group/btn">
              Chat Live <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
