"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Search,
  Calendar,
  Trash2,
  AlertCircle,
  Users,
  Download,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      setSubscribers(data);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setSubscribers(subscribers.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const csv = [
      ["Email", "Subscribed Date"],
      ...filteredSubscribers.map(s => [s.email, new Date(s.createdAt).toLocaleDateString()])
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Newsletter Subscribers</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Manage your email marketing audience</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-maroon transition-all"
          >
            <Download size={16} /> Export CSV
          </button>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-maroon transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search subscribers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-maroon/30 transition-all w-full md:w-[300px] font-bold text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
               <Users size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Audience</p>
               <h4 className="text-2xl font-black text-gray-900">{subscribers.length}</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Status</p>
               <h4 className="text-2xl font-black text-gray-900">100%</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-maroon/5 text-maroon flex items-center justify-center">
               <Calendar size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Growth Rate</p>
               <h4 className="text-2xl font-black text-gray-900">Steady</h4>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Subscriber Email</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Subscription Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-6 h-16 bg-gray-50/20" />
                  </tr>
                ))
              ) : filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((s) => (
                  <tr key={s._id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-maroon/5 flex items-center justify-center text-maroon">
                             <Mail size={14} />
                          </div>
                          <span className="text-sm font-black text-gray-900">{s.email}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                          {new Date(s.createdAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full w-fit text-[9px] font-black uppercase tracking-widest">
                          <CheckCircle2 size={10} /> Active
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button 
                         onClick={() => deleteSubscriber(s._id)}
                         className="p-2 text-gray-300 hover:text-maroon transition-colors"
                         title="Delete Subscriber"
                       >
                          <Trash2 size={18} />
                       </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                     <AlertCircle size={40} className="mx-auto text-gray-200 mb-4" />
                     <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No subscribers found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
