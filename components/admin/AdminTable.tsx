"use client";

import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";

interface Column {
  header: string;
  key: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminTableProps {
  title: string;
  subtitle: string;
  addButtonText: string;
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  onAdd?: () => void;
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  filterActions?: React.ReactNode;
}

export default function AdminTable({ 
  title, 
  subtitle, 
  addButtonText, 
  columns, 
  data, 
  isLoading = false,
  onAdd,
  onView,
  onEdit,
  onDelete,
  filterActions
}: AdminTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    
    const s = searchTerm.toLowerCase();
    
    // Check all top-level values in the object
    return Object.values(item).some(val => {
      if (typeof val === 'string') return val.toLowerCase().includes(s);
      if (typeof val === 'number') return val.toString().includes(s);
      // Recursively check objects (like item.category.name)
      if (typeof val === 'object' && val !== null) {
        return Object.values(val).some(nestedVal => 
          typeof nestedVal === 'string' && nestedVal.toLowerCase().includes(s)
        );
      }
      return false;
    });
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h2>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{subtitle}</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-maroon text-white rounded-xl font-black text-sm shadow-xl shadow-maroon/20 hover:scale-105 transition-all"
        >
          <Plus size={18} />
          <span>{addButtonText}</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-gray-900">
            <span>All {title}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-400">{filteredData.length}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {filterActions}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl flex-1 md:w-64 focus-within:bg-white focus-within:ring-4 focus-within:ring-maroon/5 transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${title.toLowerCase()}...`} 
                className="bg-transparent border-none outline-none text-xs w-full font-medium"
              />
            </div>
            <button className="p-2.5 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-2 border-gray-100 border-t-maroon rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-gray-400 animate-pulse">Loading {title.toLowerCase()}...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-20 text-center">
                    <p className="text-sm font-bold text-gray-400 italic">No {title.toLowerCase()} found.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        {col.render ? col.render(item[col.key], item) : (
                          <span className="text-sm font-bold text-gray-700">{item[col.key]}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onView && (
                          <button 
                            onClick={() => onView(item)}
                            className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-gray-400 hover:text-blue-500 transition-all shadow-sm"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => onEdit?.(item)}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-gray-400 hover:text-maroon transition-all shadow-sm"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => onDelete?.(item)}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-gray-400 hover:text-red-500 transition-all shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="group-hover:hidden text-gray-300">
                        <MoreHorizontal size={18} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400">Showing 1 to {filteredData.length} of {filteredData.length} entries</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100 rounded-lg transition-all">Previous</button>
            <button className="px-4 py-2 text-xs font-bold bg-maroon text-white rounded-lg shadow-lg shadow-maroon/20">1</button>
            <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100 rounded-lg transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
