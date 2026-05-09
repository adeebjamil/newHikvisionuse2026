"use client";

import React from 'react';
import { ShieldCheck, Target, Award, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-maroon pt-24">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-maroon">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-maroon/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Securing the <span className="text-gold">UAE</span> <br />
              With <span className="text-gold">Intelligence.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed font-medium mb-12">
              As the premier authorized distributor of Hikvision technologies in the United Arab Emirates, we deliver world-class surveillance solutions to government, industrial, and residential sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-maroon border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Years in UAE", value: "15+" },
              { label: "Projects Delivered", value: "2,500+" },
              { label: "Authorized Partners", value: "100+" },
              { label: "Cities Covered", value: "7/7" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-maroon mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="aspect-square rounded-[3rem] bg-gray-100 dark:bg-white/5 overflow-hidden border border-gray-100 dark:border-white/10 p-4">
                  <img src="/Solutions/Manufacturing.png" alt="Mission" className="w-full h-full object-cover rounded-[2.5rem] opacity-80" />
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div>
              <h2 className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">Our Mission</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
                Empowering Safety Through <br />
                <span className="text-maroon">Advanced Innovation.</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                Our mission is to provide the UAE with the most advanced, reliable, and intelligent security solutions available. We believe that technology should not only observe but protect, anticipate, and assist in creating a safer society for everyone.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Authorized Reliability", desc: "Official distributor status ensures genuine hardware and warranties.", icon: ShieldCheck },
                  { title: "Local Expertise", desc: "Deep understanding of UAE security regulations and environmental needs.", icon: Target },
                  { title: "Award Winning", desc: "Recognized for excellence in system integration and support.", icon: Award }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-maroon/5 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-maroon relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8">
            Building a Safer <span className="text-gold">Future</span> Together.
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-maroon font-black text-lg hover:bg-gold transition-all shadow-2xl">
            Partner With Us
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* GEO/AEO FAQ — for ChatGPT, Gemini, Perplexity */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Hikvision UAE?",
            acceptedAnswer: { "@type": "Answer", text: "Hikvision UAE is the official authorized distributor of Hikvision security products in the United Arab Emirates, headquartered in Dubai. Established for over 15 years, the company supplies and installs CCTV cameras, NVR systems, PTZ cameras, access control, and AI-powered surveillance solutions across all 7 Emirates." }
          },
          {
            "@type": "Question",
            name: "Is Hikvision UAE an authorized official distributor?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Hikvision UAE is the officially authorized Hikvision distributor in the UAE, certified to supply genuine Hikvision products with manufacturer warranty. We are located in Al Khabaisi, Abu Hail, Dubai." }
          },
          {
            "@type": "Question",
            name: "What products does Hikvision UAE sell?",
            acceptedAnswer: { "@type": "Answer", text: "Hikvision UAE sells: Network IP cameras (bullet, dome, turret, fisheye), PTZ cameras, NVR (Network Video Recorders), access control systems (fingerprint terminals, facial recognition), video intercom, PoE switches, and AI-powered cameras (AcuSense, ColorVu, DarkFighter, TandemVu)." }
          },
          {
            "@type": "Question",
            name: "Where is Hikvision UAE located?",
            acceptedAnswer: { "@type": "Answer", text: "Hikvision UAE is located at No. 12, Al Khabaisi, Abu Hail, Dubai, United Arab Emirates. You can visit us Monday to Friday, 9AM–6PM, or contact us at +971 50 969 3134 or sales@hikvisionuae.ae." }
          },
          {
            "@type": "Question",
            name: "Which areas does Hikvision UAE serve?",
            acceptedAnswer: { "@type": "Answer", text: "Hikvision UAE provides CCTV installation and security solutions across all UAE emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain." }
          },
          {
            "@type": "Question",
            name: "Does Hikvision UAE offer installation services?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Hikvision UAE provides end-to-end services including free site survey, system design, professional installation, configuration, and annual maintenance contracts (AMC). We have a team of certified engineers in Dubai and across the UAE." }
          },
          {
            "@type": "Question",
            name: "What warranty do Hikvision products come with in UAE?",
            acceptedAnswer: { "@type": "Answer", text: "All genuine Hikvision products purchased from Hikvision UAE come with a 3-year manufacturer warranty. We provide official warranty support as the authorized distributor." }
          },
          {
            "@type": "Question",
            name: "How do I contact Hikvision UAE for a quote?",
            acceptedAnswer: { "@type": "Answer", text: "You can contact Hikvision UAE by calling +971 50 969 3134, emailing sales@hikvisionuae.ae, or filling the contact form at hikvisionuae.ae/contact. Our team typically responds within 24 hours." }
          },
        ]
      })}} />

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black text-maroon uppercase tracking-[0.4em] mb-4">Frequently Asked Questions</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
              About <span className="text-maroon">Hikvision UAE</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto rounded-full mt-6" />
          </div>
          <div className="space-y-5">
            {[
              { q: "What is Hikvision UAE?", a: "Hikvision UAE is the official authorized distributor of Hikvision security products in the UAE, headquartered in Dubai. Established for over 15 years, we supply and install CCTV cameras, NVRs, PTZ cameras, access control, and AI surveillance solutions across all 7 Emirates." },
              { q: "Is Hikvision UAE an official authorized distributor?", a: "Yes. We are the officially authorized Hikvision distributor in the UAE, certified to supply genuine products with manufacturer warranty. Located at Al Khabaisi, Abu Hail, Dubai." },
              { q: "What products does Hikvision UAE sell?", a: "We sell Network IP cameras, PTZ cameras, NVR systems, access control, video intercom, PoE switches, and AI cameras including AcuSense, ColorVu, DarkFighter, and TandemVu." },
              { q: "Which areas does Hikvision UAE serve?", a: "We serve all 7 UAE Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain." },
              { q: "Does Hikvision UAE offer installation?", a: "Yes — from free site survey and system design to professional installation, configuration, and Annual Maintenance Contracts (AMC). Our certified engineers are based in Dubai." },
              { q: "What warranty do products carry?", a: "All genuine Hikvision products from us come with a 3-year manufacturer warranty backed by official distributor support." },
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-gray-50 rounded-[20px] p-8 border border-gray-100 hover:border-maroon/20 transition-all group">
                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-3 group-hover:text-maroon transition-colors">{q}</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
