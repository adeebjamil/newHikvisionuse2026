"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Newsletter error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      {success ? (
        <div className="bg-green-500 text-white rounded-2xl py-4 px-6 text-sm font-black uppercase tracking-widest flex items-center gap-3 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 size={18} />
          Subscribed!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="email" 
            required
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-maroon transition-colors font-medium"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl bg-maroon text-white flex items-center justify-center hover:bg-gold hover:text-maroon transition-all disabled:opacity-50"
          >
            <Send size={18} className={loading ? "animate-pulse" : ""} />
          </button>
        </form>
      )}
    </div>
  );
}
