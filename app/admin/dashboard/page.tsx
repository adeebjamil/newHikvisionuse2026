"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Database,
  Mail,
  RefreshCw,
  Bell,
  Clock
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-10 animate-pulse">
        <div className="h-48 bg-white rounded-3xl border border-gray-100 shadow-sm" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-32 bg-white rounded-3xl border border-gray-100 shadow-sm" />
          ))}
        </div>
        <div className="h-[400px] bg-white rounded-3xl border border-gray-100 shadow-sm" />
      </div>
    );
  }

  const stats = [
    { name: "Total Products", value: data?.stats.totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Categories", value: data?.stats.totalCategories, icon: Layers, color: "text-maroon", bg: "bg-maroon/5" },
    { name: "Sub Categories", value: data?.stats.totalSubCategories, icon: Database, color: "text-gold", bg: "bg-gold/5" },
    { name: "Product Enquiries", value: data?.stats.totalEnquiries, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { name: "Support Messages", value: data?.stats.totalMessages, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Newsletter", value: data?.stats.totalSubscribers, icon: Mail, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Banner */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col md:flex-row items-center justify-between overflow-hidden relative group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-2xl bg-maroon/5 flex items-center justify-center text-maroon">
                <Bell size={20} className="animate-bounce" />
             </div>
             <span className="text-[10px] font-black text-maroon uppercase tracking-[0.2em]">Enterprise System Live</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">Intelligence <span className="text-maroon">Overview</span></h2>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Real-time surveillance & catalogue metrics</p>
        </div>
        
        <div className="relative z-10 flex flex-wrap justify-center gap-4 mt-8 md:mt-0">
          <div className="px-6 py-4 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-4">
             <div className="text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Unread Alerts</p>
                <p className="text-xl font-black text-maroon">{data?.stats.unreadMessages + data?.stats.pendingEnquiries}</p>
             </div>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="px-8 py-4 bg-maroon text-white rounded-3xl font-black text-sm shadow-xl shadow-maroon/20 hover:bg-gray-900 transition-all flex items-center gap-3 active:scale-95"
          >
            <RefreshCw size={18} />
            <span>Update Metrics</span>
          </button>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-maroon/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-maroon/10 transition-colors duration-1000"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all group overflow-hidden relative">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <ArrowUpRight size={14} className="text-gray-200 group-hover:text-maroon transition-colors" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
              <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
            </div>
            {/* Background decoration */}
            <div className={`absolute -bottom-4 -right-4 w-16 h-16 ${stat.bg} rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Analysis Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="flex items-center justify-between mb-10">
             <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1">Growth Analysis</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enquiries vs Messages Performance</p>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-maroon"></div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Enquiries</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Messages</span>
                </div>
             </div>
          </div>
          
          <div className="h-[350px] w-full min-w-0">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.chartData}>
                  <defs>
                    <linearGradient id="colorEnq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#800000" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#800000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                    labelStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', marginBottom: '5px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="enquiries" 
                    stroke="#800000" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorEnq)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#e5e7eb" 
                    strokeWidth={2}
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Category Distribution (Donut) */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40">
           <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1 text-center">Category Intelligence</h3>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-8">Catalogue Composition</p>
           
           <div className="h-[300px] w-full relative min-w-0">
             {isMounted && (
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={data?.categoryData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {data?.categoryData.map((entry: any, index: number) => (
                       <Cell key={`cell-${index}`} fill={[
                         '#800000', // Maroon
                         '#C5A059', // Gold
                         '#111827', // Dark
                         '#374151', // Gray
                         '#9CA3AF'  // Light Gray
                       ][index % 5]} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                   />
                   <Legend 
                     verticalAlign="bottom" 
                     iconType="circle"
                     formatter={(value) => <span className="text-[10px] font-black uppercase text-gray-500">{value}</span>}
                   />
                 </PieChart>
               </ResponsiveContainer>
             )}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 text-center pointer-events-none">
                <p className="text-2xl font-black text-gray-900">{data?.stats.totalCategories}</p>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Sectors</p>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent <span className="text-maroon">Pulse</span></h3>
              <Clock size={18} className="text-gray-200" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                {data?.recentActivity.map((activity: any, idx: number) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== data.recentActivity.length - 1 && (
                      <div className="absolute top-10 left-5 bottom-[-32px] w-0.5 bg-gray-50"></div>
                    )}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                        activity.type === 'enquiry' ? 'bg-green-50 text-green-600' : 'bg-maroon/5 text-maroon'
                    }`}>
                        {activity.type === 'enquiry' ? <Users size={16} /> : <MessageSquare size={16} />}
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900 line-clamp-1">{activity.text}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(activity.time).toLocaleDateString()}
                        </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Conversion Chart */}
              <div className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Service Distribution</p>
                 <div className="h-[150px] min-w-0">
                    {isMounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Enq', val: data?.stats.totalEnquiries },
                          { name: 'Msg', val: data?.stats.totalMessages },
                          { name: 'Subs', val: data?.stats.totalSubscribers }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                          <XAxis dataKey="name" hide />
                          <Tooltip cursor={{fill: 'transparent'}} />
                          <Bar dataKey="val" fill="#800000" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                 </div>
                 <div className="grid grid-cols-3 gap-2 mt-6">
                    <div className="text-center">
                       <p className="text-xs font-black text-gray-900">{data?.stats.totalEnquiries}</p>
                       <p className="text-[7px] font-bold text-gray-400 uppercase">Enq</p>
                    </div>
                    <div className="text-center">
                       <p className="text-xs font-black text-gray-900">{data?.stats.totalMessages}</p>
                       <p className="text-[7px] font-bold text-gray-400 uppercase">Msg</p>
                    </div>
                    <div className="text-center">
                       <p className="text-xs font-black text-gray-900">{data?.stats.totalSubscribers}</p>
                       <p className="text-[7px] font-bold text-gray-400 uppercase">Subs</p>
                    </div>
                 </div>
              </div>
           </div>

           <button className="w-full mt-12 py-4 border border-gray-100 rounded-3xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-maroon/20 hover:text-maroon transition-all">
              View All Global Activity
           </button>
        </div>

        {/* System Health / Storage Mockup */}
        <div className="bg-[#6b0000] p-8 rounded-[40px] text-white overflow-hidden relative border border-white/5 shadow-2xl">
           <h3 className="text-xl font-black uppercase tracking-tight mb-1 relative z-10">System <span className="text-white">Health</span></h3>
           <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-10 relative z-10">Performance Matrix</p>
           
           <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Database Load</span>
                    <span className="text-green-400">Stable</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[12%] bg-maroon rounded-full"></div>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Server Response</span>
                    <span className="text-green-400">24ms</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[8%] bg-gold rounded-full"></div>
                 </div>
              </div>
           </div>

           <div className="mt-12 p-6 bg-white/5 rounded-[32px] border border-white/5 relative z-10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Cluster Status</p>
              <p className="text-sm font-bold flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 Connected to Atlas Main
              </p>
           </div>

           <div className="absolute bottom-0 right-0 w-64 h-64 bg-maroon opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
