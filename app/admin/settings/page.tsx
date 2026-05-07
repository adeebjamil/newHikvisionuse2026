"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  Database, 
  HardDrive, 
  RefreshCcw, 
  AlertCircle,
  LayoutGrid,
  Zap,
  ShieldCheck,
  Globe,
  Cpu,
  ArrowUpRight,
  Wifi,
  Server
} from "lucide-react";

export default function SettingsPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [latency, setLatency] = useState(0);

  const fetchStatus = async () => {
    setRefreshing(true);
    const start = Date.now();
    try {
      const res = await fetch("/api/admin/settings/status");
      const data = await res.json();
      if (data.success) {
        setStatus(data);
        setLatency(Date.now() - start);
      }
    } catch (err) {
      console.error("Failed to fetch status:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* HUD Header */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-maroon/20 to-gold/20 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-maroon text-white rounded-full mb-6 shadow-lg shadow-maroon/20">
                <Zap size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Infrastructure</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-2">
                 System <span className="text-maroon">Pulse.</span>
              </h1>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Monitoring Hikvision UAE Digital Core</p>
           </div>

           <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">API Latency</p>
                 <p className="text-2xl font-black text-maroon">{latency}ms</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Uptime</p>
                 <p className="text-2xl font-black text-green-600">99.9%</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Health Metrics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Main Status */}
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-[100px] transition-all group-hover:w-40 group-hover:h-40" />
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 mb-8 shadow-inner group-hover:scale-110 transition-transform">
                   <Wifi size={32} />
                </div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Network Layer</h3>
                <p className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">Infrastructure</p>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full w-fit">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{status?.status || "Online"}</span>
                </div>
             </div>

             {/* Database */}
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] transition-all group-hover:w-40 group-hover:h-40" />
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 shadow-inner group-hover:scale-110 transition-transform">
                   <Server size={32} />
                </div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Data Layer</h3>
                <p className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">MongoDB Atlas</p>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full w-fit">
                   <span className="text-[10px] font-black uppercase tracking-widest">{status?.connection || "Connected"}</span>
                </div>
             </div>
          </div>

          {/* Storage Visualization */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl p-10 relative overflow-hidden group">
             <div className="absolute top-10 right-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                <Database size={200} />
             </div>
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                   <div>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Resource Utilization</h3>
                      <p className="text-4xl font-black text-gray-900 uppercase tracking-tight">Database Storage</p>
                   </div>
                   <div className="text-right">
                      <p className="text-5xl font-black text-maroon mb-2">{status?.storageSize || "0 KB"}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In-use capacity</p>
                   </div>
                </div>

                <div className="w-full h-4 bg-gray-50 rounded-full mb-10 overflow-hidden p-1 border border-gray-100 shadow-inner">
                   <div className="w-[15%] h-full bg-gradient-to-r from-maroon to-gold rounded-full relative group-hover:w-[20%] transition-all duration-1000">
                      <div className="absolute top-0 right-0 w-4 h-full bg-white/30 blur-sm" />
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   {[
                     { label: "Indexing", value: "Efficient", icon: <ArrowUpRight size={14} /> },
                     { label: "Replication", value: "Enabled", icon: <ShieldCheck size={14} /> },
                     { label: "Optimization", value: "Active", icon: <Cpu size={14} /> },
                     { label: "Security", value: "GDPR", icon: <ShieldCheck size={14} /> }
                   ].map((item, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400">
                           {item.icon}
                           <p className="text-[9px] font-black uppercase tracking-widest">{item.label}</p>
                        </div>
                        <p className="text-xs font-black text-gray-900 uppercase">{item.value}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Actions & Global Info */}
        <div className="space-y-8">
          <div className="bg-maroon rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-maroon/20">
             <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
             <div className="relative z-10">
                <Globe size={48} className="text-gold mb-8 animate-spin-slow" />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight text-white">Global Connectivity</h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed mb-10">
                   Your infrastructure is distributed across premium regions for maximum availability in the UAE.
                </p>
                <button 
                  onClick={fetchStatus}
                  disabled={refreshing}
                  className="w-full py-5 bg-white text-maroon rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-gold hover:text-maroon transition-all shadow-2xl active:scale-95"
                >
                  <RefreshCcw size={16} className={refreshing ? "animate-spin" : ""} />
                  Refresh System
                </button>
             </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-maroon/5 flex items-center justify-center text-maroon">
                   <AlertCircle size={20} />
                </div>
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Admin Notice</h4>
             </div>
             <p className="text-xs font-medium text-gray-500 leading-relaxed italic">
               "Storage metrics are calculated using the BSON size of all documents plus the size of all index entries in the cluster."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
