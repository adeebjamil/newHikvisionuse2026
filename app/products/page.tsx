"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/categories');
        const catData = await res.json();
        setCategories(catData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-[40px] overflow-hidden bg-gray-900 h-[280px] flex items-center p-8 sm:p-16 group">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
             <div className="absolute inset-0 bg-gradient-to-l from-maroon/50 to-transparent z-10" />
             <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale brightness-50" />
          </div>
          
          <div className="relative z-20 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-gold" />
              <span className="text-gold font-black uppercase tracking-[0.3em] text-xs">Hikvision UAE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-4">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-gold">Catalog</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest max-w-lg">Official Enterprise Security Solutions</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-[32px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link 
                key={cat._id}
                href={`/products/${cat.slug}`}
                className="group relative h-80 rounded-[32px] overflow-hidden bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-maroon/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center p-20">
                      <ShieldCheck size={120} className="text-maroon/5 opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent group-hover:via-maroon/20 transition-all duration-500" />
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <span className="inline-block px-3 py-1 bg-maroon/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3">
                        Hikvision Official
                     </span>
                     <h2 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-gold transition-colors">
                        {cat.name}
                     </h2>
                   </div>
                   
                   <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">View Collections</p>
                     <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
                        <ArrowRight size={18} />
                     </div>
                   </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-[32px] transition-colors duration-500" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-maroon rounded-[40px] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 relative z-10">Technical Consultation</h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10 font-bold uppercase tracking-widest text-xs">Expert support for your security requirements.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-white text-maroon rounded-full font-black uppercase tracking-widest hover:bg-gold hover:text-maroon transition-all shadow-xl active:scale-95 relative z-10">
            Request Quote <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}
