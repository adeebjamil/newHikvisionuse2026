"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  User, 
  Clock, 
  Search,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Trash2,
  AlertCircle
} from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: string, field: string, value: boolean) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, statusField: field, value })
      });
      if (res.ok) {
        setMessages(messages.map(m => m._id === id ? { ...m, [field]: value } : m));
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.service?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Contact Messages</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Manage customer inquiries and support requests</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-maroon transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-maroon/30 transition-all w-full md:w-[300px] font-bold text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-20">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-gray-50 animate-pulse rounded-[40px] border border-gray-100" />
          ))
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div 
              key={msg._id}
              className={`bg-white rounded-[40px] border transition-all p-8 relative group overflow-hidden ${
                msg.isRead ? 'border-gray-100 opacity-80' : 'border-maroon/20 shadow-xl shadow-maroon/5'
              }`}
            >
              {!msg.isRead && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-maroon" />
              )}

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left side: Contact Info */}
                <div className="lg:w-1/3 space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                         <User size={20} />
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Customer</p>
                         <h3 className="text-lg font-black text-gray-900 uppercase">{msg.name}</h3>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-3 ml-16">
                      <div className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                         <Mail size={14} className="text-gray-300" />
                         {msg.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                         <Phone size={14} className="text-gray-300" />
                         {msg.phone}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 font-bold">
                         <Calendar size={14} className="text-gray-300" />
                         {new Date(msg.createdAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                   </div>
                </div>

                {/* Middle side: Message */}
                <div className="lg:w-1/2">
                   <div className="bg-gray-50 rounded-[32px] p-6 relative h-full">
                      <div className="flex items-center justify-between mb-4">
                         <span className="px-3 py-1 bg-maroon/10 text-maroon rounded-full text-[9px] font-black uppercase tracking-widest">
                            {msg.service || 'General Inquiry'}
                         </span>
                         <MessageSquare size={16} className="text-gray-200" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
                         "{msg.message}"
                      </p>
                   </div>
                </div>

                {/* Right side: Actions */}
                <div className="lg:w-1/6 flex flex-col justify-center gap-3">
                   {!msg.isRead && (
                     <button 
                       onClick={() => updateStatus(msg._id, 'isRead', true)}
                       className="w-full py-3 bg-maroon text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-maroon transition-all"
                     >
                        Mark Read
                     </button>
                   )}
                   <button 
                     onClick={() => updateStatus(msg._id, 'isResolved', !msg.isResolved)}
                     className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                       msg.isResolved ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-white border border-gray-100 text-gray-400 hover:border-maroon/20 hover:text-maroon'
                     }`}
                   >
                      {msg.isResolved ? <><CheckCircle2 size={12} /> Resolved</> : 'Mark Resolved'}
                   </button>
                   <button 
                     onClick={() => deleteMessage(msg._id)}
                     className="w-full py-3 bg-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                   >
                      <Trash2 size={12} /> Delete
                   </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
             <AlertCircle size={48} className="mx-auto text-gray-200 mb-4" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No messages matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
