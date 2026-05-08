"use client";

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: formData.subject // Map subject to service field in model
        })
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Failed to submit:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-[60px] overflow-hidden bg-maroon py-24 px-8 md:px-20 flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8">
              <MessageSquare size={14} className="text-gold" />
              <span className="text-gold font-black uppercase tracking-[0.25em] text-[10px]">Contact Hikvision Support</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-8">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gold">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg font-bold uppercase tracking-widest max-w-2xl mb-12">
               We're here to help with your security camera needs. Expert consultation for the UAE's leading surveillance technology.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 group hover:border-maroon/20 transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-maroon/5 flex items-center justify-center text-maroon mb-6 group-hover:bg-maroon group-hover:text-white transition-all">
                  <Phone size={24} />
               </div>
               <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Phone Support</h3>
               <p className="text-maroon font-black text-lg mb-4">+971 50 969 3134</p>
               <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  <Clock size={12} />
                  <span>Mon-Fri: 9AM-6PM</span>
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 group hover:border-gold/20 transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all">
                  <Mail size={24} />
               </div>
               <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Email Support</h3>
               <p className="text-gray-900 font-bold text-lg mb-4 break-all">sales@hikvisionuae.ae</p>
               <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  <Clock size={12} />
                  <span>24/7 Response</span>
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 group hover:border-blue-100 transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
               </div>
               <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Office Location</h3>
               <p className="text-gray-600 font-medium leading-relaxed mb-4">
                  No. 12, Al khabaisi, Abu hail <br />
                  Dubai, United Arab Emirates
               </p>
               <a 
                 href="https://maps.app.goo.gl/QdQNJUYQ8TeMtAC66" 
                 target="_blank" 
                 className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:gap-3 transition-all"
               >
                 View on Maps <ArrowRight size={14} />
               </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-gray-200/50">
               <div className="mb-10">
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">Send Us a <span className="text-maroon">Message</span></h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">All fields marked with * are required</p>
               </div>

                {success ? (
                   <div className="mb-8 p-6 bg-green-50 border border-green-100 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                         <ShieldCheck size={24} />
                      </div>
                      <div>
                         <h4 className="text-lg font-black text-gray-900 uppercase">Message Sent!</h4>
                         <p className="text-green-600 font-bold uppercase tracking-widest text-[9px]">Thank you for reaching out. We will contact you shortly.</p>
                      </div>
                   </div>
                 ) : (
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name *</label>
                          <input 
                            type="text" 
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-maroon outline-none transition-all font-bold"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address *</label>
                          <input 
                            type="email" 
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-maroon outline-none transition-all font-bold"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number *</label>
                          <input 
                            type="tel" 
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-maroon outline-none transition-all font-bold"
                            placeholder="+971 50 XXX XXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Subject *</label>
                          <input 
                            type="text" 
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-maroon outline-none transition-all font-bold"
                            placeholder="Project Enquiry"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Your Message *</label>
                        <textarea 
                          required
                          rows={6}
                          className="w-full px-6 py-4 rounded-[32px] bg-gray-50 border border-transparent focus:bg-white focus:border-maroon outline-none transition-all font-bold resize-none"
                          placeholder="Tell us about your security requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-maroon text-white rounded-full font-black uppercase tracking-widest hover:bg-maroon transition-all shadow-xl shadow-maroon/20 active:scale-95 disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : (
                          <>
                            Send Message <Send size={18} />
                          </>
                        )}
                      </button>
                   </form>
                 )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="bg-white rounded-[60px] p-4 border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
             <div className="p-8 text-center">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">Our <span className="text-maroon">Location</span></h2>
                <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
             </div>
             <div className="h-[500px] w-full rounded-[40px] overflow-hidden grayscale brightness-90 hover:grayscale-0 transition-all duration-1000 border border-gray-100">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2662662491294!2d55.32598557538202!3d25.2858735281489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ca49a4520a5%3A0xbaed472d137799a8!2sAbu%2BHail%20-%20Deira%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1715064233762!5m2!1sen!2sae" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
             </div>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-20 py-12 border-t border-gray-100 flex flex-wrap justify-center gap-12 grayscale opacity-40">
           <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
              <ShieldCheck size={24} className="text-maroon" />
              <span>Official Distributor</span>
           </div>
           <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
              <ShieldCheck size={24} className="text-maroon" />
              <span>3 Year Warranty</span>
           </div>
           <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
              <ShieldCheck size={24} className="text-maroon" />
              <span>24/7 Tech Support</span>
           </div>
        </div>
      </div>
    </main>
  );
}
