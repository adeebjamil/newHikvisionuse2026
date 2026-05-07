"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  MessageSquare,
  Package,
  Calendar,
  ExternalLink,
  Trash2
} from "lucide-react";
import Link from "next/link";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setEnquiries(enquiries.map(enq => enq._id === id ? { ...enq, status: newStatus } : enq));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch("/api/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(enq => enq._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredEnquiries = enquiries.filter(enq => 
    enq.name.toLowerCase().includes(search.toLowerCase()) ||
    enq.productName.toLowerCase().includes(search.toLowerCase()) ||
    enq.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Product Enquiries</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Manage incoming quotes and professional requests</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-maroon transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-maroon/30 transition-all w-full md:w-[300px] font-bold text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-gray-50 animate-pulse rounded-[40px] border border-gray-100" />
          ))
        ) : filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enq) => (
            <div 
              key={enq._id}
              className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 hover:border-maroon/20 transition-all group relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-8 right-8">
                <select 
                  value={enq.status}
                  onChange={(e) => updateStatus(enq._id, e.target.value)}
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border outline-none cursor-pointer appearance-none ${
                    enq.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                    enq.status === 'Contacted' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-green-50 text-green-600 border-green-100'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="space-y-6">
                {/* Product Section */}
                <div className="flex items-start gap-4 pb-6 border-b border-gray-50">
                  <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 shadow-sm overflow-hidden">
                    {enq.productImage ? (
                      <img src={enq.productImage} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <ProductImageFallback slug={enq.productSlug} />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-maroon uppercase tracking-widest block mb-1">Requested Product</span>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-maroon transition-colors line-clamp-1">{enq.productName}</h3>
                    <Link href={enq.productPath || `/products`} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-maroon flex items-center gap-1 mt-1">
                       View Product <ExternalLink size={10} />
                    </Link>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <User size={16} className="text-gray-300" />
                         <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Customer Name</p>
                            <p className="text-sm font-black text-gray-900 uppercase">{enq.name}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <Mail size={16} className="text-gray-300" />
                         <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                            <p className="text-sm font-bold text-gray-600">{enq.email}</p>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <Phone size={16} className="text-gray-300" />
                         <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                            <p className="text-sm font-black text-gray-900">{enq.mobile}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <Calendar size={16} className="text-gray-300" />
                         <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Submitted On</p>
                            <p className="text-sm font-bold text-gray-600">{new Date(enq.createdAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Requirement Message */}
                <div className="bg-gray-50 rounded-[32px] p-6 relative">
                   <MessageSquare size={18} className="text-gray-200 absolute top-6 right-6" />
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Requirement Details</p>
                   <p className="text-sm font-medium text-gray-700 leading-relaxed italic">
                      "{enq.details}"
                   </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">
                        {enq.status === 'Resolved' ? 'Completed' : 'Awaiting Contact'}
                      </span>
                   </div>
                   <button 
                     onClick={() => deleteEnquiry(enq._id)}
                     className="p-3 text-gray-300 hover:text-maroon transition-colors"
                     title="Delete Enquiry"
                   >
                      <Trash2 size={18} />
                   </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
             <AlertCircle size={48} className="mx-auto text-gray-200 mb-4" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No enquiries matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductImageFallback({ slug }: { slug: string }) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.images?.[0]) setImage(data.images[0]);
      } catch (err) {
        console.error("Fallback image error:", err);
      }
    };
    if (slug) fetchImg();
  }, [slug]);

  if (image) return <img src={image} alt="" className="w-full h-full object-contain" />;
  return <Package size={24} className="text-maroon/10" />;
}
