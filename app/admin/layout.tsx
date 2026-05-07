"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  Layers, 
  Box, 
  Database, 
  MessageSquare, 
  Mail, 
  Users, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchingLoading, setIsSearchingLoading] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearchingLoading(true);
        try {
          const res = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`);
          const data = await res.json();
          if (data.success) {
            setSearchResults(data.results);
          }
        } catch (err) {
          console.error("Search failed:", err);
        } finally {
          setIsSearchingLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6f8]">
        <div className="w-10 h-10 border-4 border-maroon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session && pathname !== "/admin/login") return null;
  if (pathname === "/admin/login") return <>{children}</>;

  const menuItems: { group: string; items: { name: string; icon: any; href: string }[] }[] = [
    {
      group: "MAIN",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
      ]
    },
    {
      group: "CATALOGUE",
      items: [
        { name: "Categories", icon: Layers, href: "/admin/categories" },
        { name: "Sub Categories", icon: Database, href: "/admin/sub-categories" },
        { name: "Products", icon: Box, href: "/admin/products" },
      ]
    },
    {
      group: "CUSTOMER",
      items: [
        { name: "Enquiries", icon: Users, href: "/admin/enquiries" },
        { name: "Messages", icon: MessageSquare, href: "/admin/messages" },
        { name: "Newsletter", icon: Mail, href: "/admin/newsletter" },
      ]
    },
    {
      group: "SYSTEM",
      items: [
        { name: "Settings", icon: Settings, href: "/admin/settings" },
      ]
    }
  ];

  return (
    <div className="h-screen bg-[#f5f6f8] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#6b0000] text-white flex flex-col relative overflow-hidden shadow-2xl z-20 h-full shrink-0">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="p-6 flex justify-center items-center h-24 border-b border-white/5 relative z-10 shrink-0">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
            <Image 
              src="/logo.webp" 
              alt="Hikvision Logo" 
              width={180} 
              height={60} 
              className="w-32 h-auto object-contain" 
              priority 
              loading="eager"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 relative z-10 custom-scrollbar">
          {menuItems.map((group, idx) => (
            <div key={idx} className="mb-8 px-4">
              <p className="text-[10px] font-black tracking-[0.2em] text-white/40 mb-4 px-2 uppercase">{group.group}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                        isActive 
                          ? "bg-white/10 text-white shadow-inner" 
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon size={18} className={`${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`} />
                      <span className="flex-1 text-left">{item.name}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-white/80 uppercase tracking-tighter">Secure System</p>
              <p className="text-[9px] font-bold text-white/30 tracking-widest">v2.0.26-ENTERPRISE</p>
            </div>
          </div>

          <button 
            onClick={() => {
              if(confirm("Are you sure you want to log out?")) {
                signOut({ callbackUrl: "/admin/login" });
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut size={18} className="text-white/40 group-hover:text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-24 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0 z-10 shadow-sm">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-gray-900 tracking-tight capitalize">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin / Management Console</p>
          </div>

          <div className="flex items-center gap-8">
            {/* Search Section */}
            <div className="relative group">
              <div className="hidden lg:flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl w-80 focus-within:bg-white focus-within:border-maroon/20 focus-within:ring-4 focus-within:ring-maroon/5 transition-all">
                <Search size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="bg-transparent border-none outline-none text-xs w-full font-medium text-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearching(true)}
                />
              </div>

              {/* Search Results Dropdown */}
              {isSearching && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] max-h-[400px] overflow-y-auto custom-scrollbar">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result: any, idx: number) => (
                        <Link 
                          key={`${result.type}-${result.id}`}
                          href={result.link}
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearching(false);
                          }}
                          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              result.type === 'Product' ? 'bg-blue-50 text-blue-600' : 
                              result.type === 'Category' ? 'bg-maroon/5 text-maroon' : 
                              'bg-gold/10 text-gold'
                            }`}>
                              {result.type === 'Product' ? <Box size={14} /> : 
                               result.type === 'Category' ? <Layers size={14} /> : 
                               <Database size={14} />}
                            </div>
                            <div>
                              <p className="text-[11px] font-black text-gray-900 line-clamp-1">{result.name}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{result.type}</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-gray-300" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      {isSearchingLoading ? (
                        <div className="w-6 h-6 border-2 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      ) : (
                        <Search size={24} className="mx-auto text-gray-200 mb-3" />
                      )}
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {isSearchingLoading ? 'Searching...' : `No results found for "${searchQuery}"`}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Click outside to close */}
              {isSearching && (
                <div 
                  className="fixed inset-0 z-[-1]" 
                  onClick={() => setIsSearching(false)}
                />
              )}
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => window.location.reload()}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-400 hover:bg-white hover:text-maroon hover:border-maroon/20 hover:rotate-180 transition-all duration-500 shadow-sm group"
                title="Refresh Page"
              >
                <RefreshCw size={18} className="group-active:animate-spin" />
              </button>

              <div className="flex items-center gap-4 bg-gray-50 p-1.5 pr-4 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-maroon text-white flex items-center justify-center font-black text-sm shadow-lg shadow-maroon/20">
                  AD
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-black text-gray-900">Administrator</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Super Admin</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  if(confirm("Are you sure you want to log out?")) {
                    signOut({ callbackUrl: "/admin/login" });
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 hover:text-maroon transition-all shadow-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-10 flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
