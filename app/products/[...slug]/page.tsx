"use client";

import { useState, useEffect, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft, 
  ShoppingBag, 
  Eye,
  CheckCircle2,
  FileText,
  Star,
  Info,
  X,
  Send,
  Download
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ProductsCatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Enquiry Form State
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    details: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        if (slug.length === 1) {
          // Category Page
          const res = await fetch(`/api/nav-products`);
          const allData = await res.json();
          const cat = allData.find((c: any) => c.slug === slug[0]);
          if (cat) setData({ type: 'category', ...cat });
          else setError(true);
        } 
        else if (slug.length === 2) {
          // Sub-category Page
          const res = await fetch(`/api/products?subcategory=${slug[1]}`);
          const prodData = await res.json();
          
          const navRes = await fetch(`/api/nav-products`);
          const navData = await navRes.json();
          const cat = navData.find((c: any) => c.slug === slug[0]);
          const sub = cat?.subCategories?.find((s: any) => s.slug === slug[1]);
          
          if (sub) setData({ type: 'subcategory', sub, products: prodData, category: cat });
          else setError(true);
        }
        else if (slug.length === 3) {
          // Product Detail Page
          const res = await fetch(`/api/products/${slug[2]}`);
          const product = await res.json();
          
          const navRes = await fetch(`/api/nav-products`);
          const navData = await navRes.json();
          const cat = navData.find((c: any) => c.slug === slug[0]);
          const sub = cat?.subCategories?.find((s: any) => s.slug === slug[1]);

          if (product) setData({ type: 'product', product, sub, category: cat });
          else setError(true);
        }
        else {
          setError(true);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productName: data.product.name,
          productSlug: data.product.slug,
          productImage: data.product.images?.[0] || null,
          productPath: `/products/${slug[0]}/${slug[1]}/${data.product.slug}`
        })
      });
      if (res.ok) {
        setFormSuccess(true);
        setTimeout(() => {
          setShowEnquiryModal(false);
          setFormSuccess(false);
          setFormData({ name: '', email: '', mobile: '', details: '' });
        }, 3000);
      }
    } catch (err) {
      console.error('Enquiry error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const generatePDF = async () => {
    if (!data?.product) return;
    const { product, sub, category } = data;
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(139, 0, 0); // Maroon
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('HIKVISION UAE', 20, 25);
    doc.setFontSize(10);
    doc.text('Official Product Data Sheet', 20, 32);

    // Product Image (if available)
    let nextY = 55;
    if (product.images?.[0]) {
      try {
        // We'll use the image as is, but if it fails (CORS), we skip it
        doc.addImage(product.images[0], 'JPEG', 140, 50, 50, 50);
      } catch (e) {
        console.warn('Could not add image to PDF:', e);
      }
    }

    // Product Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(product.name, 20, nextY);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(product.subTitle || '', 20, nextY + 7);

    // Details Table
    const tableData = [
      ['Category', category?.name || 'N/A'],
      ['Sub Category', sub?.name || 'N/A'],
      ['Model', product.name],
    ];

    autoTable(doc, {
      startY: nextY + 15,
      head: [['Field', 'Details']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [139, 0, 0] },
      margin: { left: 20 },
      tableWidth: 100
    });

    // Description
    const currentY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text('Product Description', 20, currentY);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    const splitDesc = doc.splitTextToSize(product.description || '', 170);
    doc.text(splitDesc, 20, currentY + 10);

    // Key Highlights
    const highlightY = currentY + 10 + (splitDesc.length * 5) + 10;
    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text('Key Highlights', 20, highlightY);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    product.keyFeatures?.forEach((feat: string, i: number) => {
      doc.text(`• ${feat}`, 25, highlightY + 10 + (i * 7));
    });

    // Technical Features
    const featuresY = highlightY + 10 + ((product.keyFeatures?.length || 0) * 7) + 15;
    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text('Technical Features', 20, featuresY);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    product.features?.forEach((feat: string, i: number) => {
      doc.text(`- ${feat}`, 25, featuresY + 10 + (i * 7));
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated from hikvisionuae.ae - Professional Security Solutions', 105, 285, { align: 'center' });

    doc.save(`${product.slug}-data-sheet.pdf`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
           <div className="w-12 h-12 border-4 border-maroon border-t-transparent rounded-full animate-spin mb-4" />
           <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Synchronizing Products...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <ShieldCheck size={40} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-4 uppercase">Resource Not Found</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">The requested path does not match our current catalog.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-maroon text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-maroon/20 active:scale-95 transition-all">
            <ChevronLeft size={16} /> Return to Products
          </Link>
        </div>
      </main>
    );
  }

  // CATEGORY VIEW
  if (data.type === 'category') {
    return (
      <main className="min-h-screen bg-gray-50 pb-20">
        {/* Category Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-maroon">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-gold font-black uppercase tracking-widest text-[10px] mb-8 hover:gap-4 transition-all"
            >
              <ChevronLeft size={14} /> Back to Catalog
            </Link>
            
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold font-black uppercase tracking-[0.3em] text-xs">Official Category</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6 leading-none">
                {data.name}
              </h1>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-2xl">
                Explore our professional range of {data.name} solutions, engineered for the UAE's most demanding security environments.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.subCategories?.map((sub: any) => (
              <div 
                key={sub._id}
                className="group bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-maroon/10 transition-all duration-500 flex flex-col h-full"
              >
                <div className="w-24 h-24 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-maroon/20 transition-all duration-500 overflow-hidden p-4">
                  {sub.image ? (
                    <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" />
                  ) : (
                    <ShieldCheck size={40} className="text-maroon/10" />
                  )}
                </div>
                
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 group-hover:text-maroon transition-colors">
                  {sub.name}
                </h2>
                
                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                  <Link 
                    href={`/products/${slug[0]}/${sub.slug}`}
                    className="inline-flex items-center gap-2 text-maroon font-black uppercase tracking-widest text-[10px] hover:gap-3 transition-all"
                  >
                    Explore Products <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // SUBCATEGORY VIEW
  if (data.type === 'subcategory') {
    return (
      <main className="min-h-screen bg-gray-50 pb-20">
        {/* Subcategory Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-maroon">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/20 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-2 text-gold font-black uppercase tracking-widest text-[10px] mb-8 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
              <ChevronRight size={10} className="text-white/30" />
              <Link href={`/products/${slug[0]}`} className="hover:text-white transition-colors">{data.category?.name || slug[0]}</Link>
              <ChevronRight size={10} className="text-white/30" />
              <span className="text-white/40">{data.sub?.name || slug[1]}</span>
            </div>
            
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-none">
                {data.sub?.name || slug[1].replace(/-/g, ' ')}
              </h1>
              <div className="flex items-center gap-6">
                <p className="text-gold font-bold uppercase tracking-widest text-xs">
                   {data.products.length} Professional Products
                </p>
                <div className="h-4 w-px bg-white/20" />
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Hikvision Pro Series</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {data.products.length > 0 ? data.products.map((prod: any) => (
              <Link 
                key={prod._id}
                href={`/products/${slug[0]}/${slug[1]}/${prod.slug}`}
                className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-maroon/10 transition-all duration-500 flex flex-col"
              >
                <div className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center mb-6 relative overflow-hidden p-8">
                  {prod.images?.[0] ? (
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <ShieldCheck size={48} className="text-maroon/5" />
                  )}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={16} className="text-maroon" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <span className="text-[9px] font-black text-maroon uppercase tracking-widest block mb-1">{data.category?.name}</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-2 line-clamp-1">{prod.subTitle}</p>
                  <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-tight group-hover:text-maroon transition-colors mb-4 line-clamp-2 leading-snug">
                    {prod.name}
                  </h3>
                </div>
                
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= (prod.rating || 5) ? 'bg-gold' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Pro Series
                  </span>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No products found in this collection yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // PRODUCT DETAIL VIEW
  if (data.type === 'product') {
    const { product } = data;
    const SITE_URL = "https://hikvisionuae.ae";
    const productUrl = `${SITE_URL}/products/${slug[0]}/${slug[1]}/${product.slug}`;

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.images?.[0] ? [product.images[0]] : [],
      brand: { "@type": "Brand", name: "Hikvision" },
      category: data.category?.name ?? "",
      manufacturer: {
        "@type": "Organization",
        name: "Hikvision",
        url: "https://www.hikvision.com",
      },
      distributor: {
        "@type": "Organization",
        name: "Hikvision UAE",
        url: "https://hikvisionuae.ae",
        telephone: "+971509693134",
        email: "sales@hikvisionuae.ae",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
        { "@type": "ListItem", position: 3, name: data.category?.name ?? slug[0], item: `${SITE_URL}/products/${slug[0]}` },
        { "@type": "ListItem", position: 4, name: data.sub?.name ?? slug[1], item: `${SITE_URL}/products/${slug[0]}/${slug[1]}` },
        { "@type": "ListItem", position: 5, name: product.name, item: productUrl },
      ],
    };

    return (
      <main className="min-h-screen bg-white pb-20 relative">
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* Enquiry Modal */}
        {showEnquiryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-maroon/60 backdrop-blur-md" onClick={() => !formLoading && setShowEnquiryModal(false)} />
            <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
               {/* Modal Header */}
               <div className="p-6 sm:p-10 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center p-3 shadow-sm">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <ShieldCheck size={24} className="text-maroon" />
                        )}
                     </div>
                     <div>
                        <span className="text-[10px] font-black text-maroon uppercase tracking-widest block mb-1">Product Enquiry</span>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{product.name}</h3>
                     </div>
                  </div>
                  <button 
                    onClick={() => setShowEnquiryModal(false)}
                    className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-maroon transition-colors"
                  >
                    <X size={20} />
                  </button>
               </div>

               {/* Modal Body */}
               <div className="p-6 sm:p-10">
                  {formSuccess ? (
                    <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                          <CheckCircle2 size={40} />
                       </div>
                       <h4 className="text-2xl font-black text-gray-900 uppercase mb-2">Enquiry Sent!</h4>
                       <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Thank you for reaching out. Our team will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Name</label>
                             <input 
                               required
                               type="text" 
                               placeholder="John Doe"
                               value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                               className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-maroon/30 transition-colors font-bold text-sm"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                             <input 
                               required
                               type="email" 
                               placeholder="john@example.com"
                               value={formData.email}
                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                               className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-maroon/30 transition-colors font-bold text-sm"
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</label>
                          <input 
                            required
                            type="tel" 
                            placeholder="+971 XX XXX XXXX"
                            value={formData.mobile}
                            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-maroon/30 transition-colors font-bold text-sm"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Requirement Details</label>
                          <textarea 
                            required
                            rows={4}
                            placeholder="Please describe your requirements..."
                            value={formData.details}
                            onChange={(e) => setFormData({...formData, details: e.target.value})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-maroon/30 transition-colors font-bold text-sm resize-none"
                          />
                       </div>
                       <button 
                         disabled={formLoading}
                         className="w-full py-5 bg-maroon text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-maroon/20 active:scale-[0.98] disabled:opacity-50"
                       >
                         {formLoading ? 'Processing...' : (
                           <>
                             Send Enquiry
                             <Send size={16} />
                           </>
                         )}
                       </button>
                    </form>
                  )}
               </div>
            </div>
          </div>
        )}

        {/* Product Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-maroon">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-gold/5 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-gold font-black uppercase tracking-widest text-[10px] mb-12 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
              <ChevronRight size={10} className="text-white/30" />
              <Link href={`/products/${slug[0]}`} className="hover:text-white transition-colors">{data.category?.name || slug[0]}</Link>
              <ChevronRight size={10} className="text-white/30" />
              <Link href={`/products/${slug[0]}/${slug[1]}`} className="hover:text-white transition-colors">{data.sub?.name || slug[1]}</Link>
              <ChevronRight size={10} className="text-white/30" />
              <span className="text-white/40 truncate max-w-[150px]">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-gold" />
                  <span className="text-gold font-black uppercase tracking-[0.3em] text-xs">Product Details</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-4 leading-none">
                  {product.name}
                </h1>
                <p className="text-xl font-bold text-gold/80 uppercase tracking-tight mb-8">
                  {product.subTitle}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowEnquiryModal(true)}
                    className="px-8 py-4 bg-white text-maroon rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-gold transition-all shadow-xl active:scale-95"
                  >
                    Enquire Now
                  </button>
                  <button 
                    onClick={generatePDF}
                    className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:border-gold hover:text-gold transition-all"
                  >
                    Datasheet
                  </button>
                </div>
              </div>

              {/* Floating product visual in hero */}
              <div className="hidden lg:block relative">
                 <div className="absolute inset-0 bg-gold/10 rounded-full blur-[100px] animate-pulse" />
                 <div className="relative aspect-square bg-white/5 backdrop-blur-sm rounded-[40px] border border-white/10 p-12 flex items-center justify-center">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="w-full h-full object-contain drop-shadow-2xl" />
                    ) : (
                      <ShieldCheck size={100} className="text-white/10" />
                    )}
                 </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-square rounded-[40px] bg-gray-50 border border-gray-100 flex items-center justify-center p-12 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-maroon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <ShieldCheck size={120} className="text-maroon/5" />
                )}
                
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                   <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-xl flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Official Product</span>
                   </div>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: ShieldCheck, text: 'Genuine UAE' },
                  { icon: CheckCircle2, text: 'Auth. Dealer' },
                  { icon: FileText, text: 'Tech Sheet' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100">
                    <item.icon size={20} className="text-maroon mb-2" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-maroon text-white rounded-full text-[9px] font-black uppercase tracking-widest">Enterprise Range</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className={s <= (product.rating || 5) ? 'fill-gold text-gold' : 'text-gray-200'} />
                    ))}
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xl font-bold text-maroon uppercase tracking-tight mb-6">
                  {product.subTitle}
                </p>
                <div className="h-1 w-20 bg-gold rounded-full mb-8" />
                
                <p className="text-gray-500 leading-relaxed font-medium text-sm">
                  {product.description}
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {product.keyFeatures?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-maroon mt-0.5 shrink-0" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-4">
                <button 
                  onClick={() => setShowEnquiryModal(true)}
                  className="w-full py-5 bg-maroon text-white rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-maroon transition-all shadow-2xl shadow-maroon/20 active:scale-95"
                >
                  <ShoppingBag size={18} />
                  Request Professional Quote
                </button>
                <button 
                  onClick={generatePDF}
                  className="w-full py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:border-maroon hover:text-maroon transition-all"
                >
                  <Download size={18} />
                  Download Data Sheet
                </button>
              </div>
            </div>
          </div>

          {/* Full Specifications Section */}
          <div className="mt-32 border-t border-gray-100 pt-20">
             <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-gray-50 rounded-2xl text-maroon">
                   <Info size={24} />
                </div>
                <div>
                   <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Full Specifications</h2>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deep Technical Analysis</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                {product.features?.map((feat: string, i: number) => (
                  <div key={i} className="flex gap-6 items-start group">
                     <span className="text-3xl font-black text-gray-100 group-hover:text-maroon/10 transition-colors">{(i + 1).toString().padStart(2, '0')}</span>
                     <p className="text-sm font-bold text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                        {feat}
                     </p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
}

const AlertCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
