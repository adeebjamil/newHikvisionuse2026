"use client";

import AdminTable from "@/components/admin/AdminTable";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Package, Star, Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter State
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  async function fetchData() {
    setIsLoading(true);
    try {
      const [prodRes, catRes, subRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/sub-categories')
      ]);
      const prodJson = await prodRes.json();
      const catJson = await catRes.json();
      const subJson = await subRes.json();

      if (catJson.success) setCategories(catJson.data);
      if (subJson.success) setSubCategories(subJson.data);
      if (prodJson.success) {
        const formattedData = prodJson.data.map((prod: any) => ({
          _id: prod._id,
          image: prod.images?.[0] || "",
          images: prod.images || [],
          name: prod.name,
          slug: prod.slug,
          subTitle: prod.subTitle || "",
          description: prod.description || "",
          features: prod.features?.join("\n") || "",
          keyFeatures: prod.keyFeatures?.join("\n") || "",
          isFeatured: prod.isFeatured || false,
          categoryId: prod.category?._id || "",
          category: prod.category?.name || "N/A",
          subCategoryId: prod.subCategory?._id || "",
          subCategory: prod.subCategory?.name || "N/A",
          date: new Date(prod.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Apply Filters
  const filteredProducts = data.filter(prod => {
    const matchesCat = !filterCategory || prod.categoryId === filterCategory;
    const matchesSub = !filterSubCategory || prod.subCategoryId === filterSubCategory;
    return matchesCat && matchesSub;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setName("");
    setSlug("");
    setSubTitle("");
    setCategoryId("");
    setSubCategoryId("");
    setDescription("");
    setFeatures("");
    setKeyFeatures("");
    setIsFeatured(false);
    setImageFiles(null);
    setImagePreviews([]);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setSlug(item.slug);
    setSubTitle(item.subTitle);
    setCategoryId(item.categoryId);
    setSubCategoryId(item.subCategoryId);
    setDescription(item.description);
    setFeatures(item.features);
    setKeyFeatures(item.keyFeatures);
    setIsFeatured(item.isFeatured);
    setImageFiles(null);
    setImagePreviews([]);
    setIsModalOpen(true);
  };
  const handleNameChange = (newName: string) => {
    setName(newName);
    // Auto-generate slug from name
    const generatedSlug = newName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  };

  const handleImageChange = (files: FileList | null) => {
    setImageFiles(files);
    if (files) {
      const previews: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setImagePreviews([]);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;
    try {
      const res = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item._id })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("subTitle", subTitle);
    formData.append("category", categoryId);
    formData.append("subCategory", subCategoryId);
    formData.append("description", description);
    formData.append("features", features);
    formData.append("keyFeatures", keyFeatures);
    formData.append("isFeatured", String(isFeatured));
    
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("images", imageFiles[i]);
      }
    }
    if (editingItem) formData.append("id", editingItem._id);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: editingItem ? 'PUT' : 'POST',
        body: formData
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { 
      header: "Product", 
      key: "name",
      render: (val: string, item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
             {item.image ? <Image src={item.image} alt={val} width={32} height={32} className="object-contain" /> : <Package className="text-gray-200" />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900 flex items-center gap-2">
              {val}
              {item.isFeatured && <Star size={12} className="text-yellow-400 fill-yellow-400" />}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.subTitle || 'No Tagline'}</span>
          </div>
        </div>
      )
    },
    { header: "Category", key: "category" },
    { header: "Sub Category", key: "subCategory" },
    { header: "Date Added", key: "date" },
  ];

  return (
    <>
      <AdminTable
        title="Products"
        subtitle="Manage your inventory and product catalogue"
        addButtonText="Add Product"
        columns={columns}
        data={filteredProducts}
        isLoading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterActions={
          <div className="flex items-center gap-2">
            <select 
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterSubCategory(""); // Reset sub when cat changes
              }}
              className="bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl text-[11px] font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-maroon/20"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <select 
              value={filterSubCategory}
              onChange={(e) => setFilterSubCategory(e.target.value)}
              className="bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl text-[11px] font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-maroon/20"
            >
              <option value="">All Sub Categories</option>
              {subCategories
                .filter(sub => !filterCategory || sub.category?._id === filterCategory)
                .map(sub => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>
        }
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-6 flex items-center justify-between border-b border-gray-50 shrink-0">
              <h3 className="text-xl font-black text-gray-900">{editingItem ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-6">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Hikvision DS-2CD..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                      required 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">URL Slug</label>
                    <input 
                      type="text" 
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. hikvision-ds-2cd"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sub Title (Short Tagline)</label>
                  <input 
                    type="text" 
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="e.g. 2 MP Fixed Bullet Network Camera"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                    <select 
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all bg-white"
                      required
                    >
                      <option value="" disabled>Select...</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sub Category</label>
                    <select 
                      value={subCategoryId}
                      onChange={(e) => setSubCategoryId(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all bg-white"
                      required
                    >
                      <option value="" disabled>Select...</option>
                      {subCategories
                        .filter(sub => !categoryId || sub.category?._id === categoryId)
                        .map((sub) => (
                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the product..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all resize-y"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Technical Features (One per line)</label>
                  <textarea 
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="High quality imaging... IP67-rated water and dust resistance..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Key Highlights (One per line)</label>
                  <textarea 
                    value={keyFeatures}
                    onChange={(e) => setKeyFeatures(e.target.value)}
                    placeholder="2 MP HD... Smart Hybrid Light..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Images</label>
                  <div className="flex gap-4 items-start overflow-x-auto pb-2">
                    {editingItem?.images?.length > 0 && imagePreviews.length === 0 && (
                      <div className="shrink-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Current Images</p>
                        <div className="flex gap-2">
                          {editingItem.images.map((img: string, idx: number) => (
                            <div key={idx} className="w-16 h-16 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                              <Image src={img} alt={`current-${idx}`} width={48} height={48} className="object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {imagePreviews.length > 0 && (
                      <div className="shrink-0">
                        <p className="text-[10px] font-bold text-maroon uppercase mb-2">New Previews ({imagePreviews.length})</p>
                        <div className="flex gap-2">
                          {imagePreviews.map((prev, idx) => (
                            <div key={idx} className="w-16 h-16 border-2 border-maroon rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                              <img src={prev} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(e.target.files)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl">
                  <input 
                    type="checkbox" 
                    id="featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-maroon rounded border-gray-300 focus:ring-maroon"
                  />
                  <label htmlFor="featured" className="text-sm font-bold text-gray-700 flex items-center gap-2 cursor-pointer">
                    Mark as Featured Product
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-50 bg-white flex items-center justify-end gap-3 shrink-0">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
                <button 
                  type="submit" 
                  form="productForm"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-maroon hover:bg-[#500000] rounded-xl shadow-lg shadow-maroon/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{editingItem ? "Updating..." : "Saving..."}</span>
                    </>
                  ) : (
                    editingItem ? "Update Product" : "Save Product"
                  )}
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
