"use client";

import AdminTable from "@/components/admin/AdminTable";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

export default function SubCategoriesPage() {
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const [subRes, catRes] = await Promise.all([
        fetch('/api/admin/sub-categories'),
        fetch('/api/admin/categories')
      ]);
      const subJson = await subRes.json();
      const catJson = await catRes.json();

      if (catJson.success) setCategories(catJson.data);
      if (subJson.success) {
        const formattedData = subJson.data.map((sub: any) => ({
          _id: sub._id,
          image: sub.image || "",
          name: sub.name,
          slug: sub.slug,
          categoryId: sub.category?._id || "",
          parent: sub.category?.name || "N/A",
          date: new Date(sub.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setName("");
    setSlug("");
    setCategoryId("");
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setSlug(item.slug);
    setCategoryId(item.categoryId);
    setImageFile(null);
    setImagePreview(null);
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

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;
    try {
      const res = await fetch('/api/admin/sub-categories', {
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
    formData.append("category", categoryId);
    if (imageFile) formData.append("image", imageFile);
    if (editingItem) formData.append("id", editingItem._id);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/sub-categories', {
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
      header: "Image", 
      key: "image",
      render: (val: string) => (
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
          {val ? <Image src={val} alt="subcat" width={40} height={40} className="object-contain" /> : <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />}
        </div>
      )
    },
    { header: "Name", key: "name" },
    { header: "URL Slug", key: "slug" },
    { header: "Parent Category", key: "parent" },
    { header: "Date Added", key: "date" },
  ];

  return (
    <>
      <AdminTable
        title="Sub Categories"
        subtitle="Manage product sub-categories grouped by parent"
        addButtonText="Add Sub Category"
        columns={columns}
        data={data}
        isLoading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 flex items-center justify-between border-b border-gray-50">
              <h3 className="text-xl font-black text-gray-900">{editingItem ? "Edit Sub Category" : "Add Sub Category"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. IP Cameras"
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
                  placeholder="e.g. ip-cameras"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Parent Category</label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all bg-white"
                  required
                >
                  <option value="" disabled>Select a category...</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Image (Optional)</label>
                <div className="flex gap-4 items-start">
                  {editingItem?.image && !imagePreview && (
                    <div className="shrink-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Current</p>
                      <div className="w-16 h-16 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                        <Image src={editingItem.image} alt="current" width={48} height={48} className="object-contain" />
                      </div>
                    </div>
                  )}
                  {imagePreview && (
                    <div className="shrink-0">
                      <p className="text-[10px] font-bold text-maroon uppercase mb-1">New Preview</p>
                      <div className="w-16 h-16 border-2 border-maroon rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-maroon hover:bg-[#500000] rounded-xl shadow-lg shadow-maroon/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{editingItem ? "Updating..." : "Saving..."}</span>
                    </>
                  ) : (
                    editingItem ? "Update Sub Category" : "Save Sub Category"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
