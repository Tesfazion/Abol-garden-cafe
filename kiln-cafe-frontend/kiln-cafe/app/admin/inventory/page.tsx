"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface InventoryItem {
  id: string;
  name: string;
  category: "Ingredients" | "Packaging" | "Supplies";
  currentStock: number;
  unit: string;
  minStock: number;
  supplier: string;
  cost: number;
  lastRestocked: string;
}

export default function InventoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample data
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Coffee Beans (Ethiopian)",
      category: "Ingredients",
      currentStock: 45,
      unit: "kg",
      minStock: 20,
      supplier: "Ethiopian Coffee Co.",
      cost: 850,
      lastRestocked: "2026-07-01",
    },
    {
      id: "2",
      name: "Milk (Fresh)",
      category: "Ingredients",
      currentStock: 15,
      unit: "liters",
      minStock: 30,
      supplier: "Local Dairy Farm",
      cost: 65,
      lastRestocked: "2026-07-04",
    },
    {
      id: "3",
      name: "Flour (All Purpose)",
      category: "Ingredients",
      currentStock: 80,
      unit: "kg",
      minStock: 25,
      supplier: "Grain Suppliers Ltd",
      cost: 35,
      lastRestocked: "2026-06-28",
    },
    {
      id: "4",
      name: "Disposable Cups (Large)",
      category: "Packaging",
      currentStock: 450,
      unit: "pieces",
      minStock: 200,
      supplier: "EcoPack Solutions",
      cost: 2.5,
      lastRestocked: "2026-07-03",
    },
    {
      id: "5",
      name: "Sugar",
      category: "Ingredients",
      currentStock: 18,
      unit: "kg",
      minStock: 20,
      supplier: "Sweet Suppliers",
      cost: 45,
      lastRestocked: "2026-06-30",
    },
    {
      id: "6",
      name: "Paper Napkins",
      category: "Supplies",
      currentStock: 280,
      unit: "packs",
      minStock: 100,
      supplier: "Supplies Direct",
      cost: 15,
      lastRestocked: "2026-07-02",
    },
  ]);

  const categories = ["all", "Ingredients", "Packaging", "Supplies"];

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock * 0.5) return "critical";
    if (item.currentStock <= item.minStock) return "low";
    return "good";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest mb-1">
              Inventory Management
            </h1>
            <p className="text-charcoal-light">
              Track stock levels and manage supplies
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Item
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Alert Cards */}
        {lowStockItems.length > 0 && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-heading font-semibold text-red-800 mb-1">Low Stock Alert</h3>
                <p className="text-sm text-red-700">
                  {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''} need restocking: {lowStockItems.map(i => i.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Total Items</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{inventory.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Low Stock</span>
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Categories</span>
              <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">3</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Total Value</span>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">
              {inventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0).toLocaleString()} ETB
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search items or suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-heading font-medium text-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-brass text-white"
                      : "bg-gray-100 text-charcoal hover:bg-gray-200"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Last Restocked
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-heading font-medium text-forest">{item.name}</div>
                        <div className="text-sm text-charcoal-light">{item.cost} ETB per {item.unit}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-charcoal">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-heading font-semibold text-forest">
                          {item.currentStock} {item.unit}
                        </div>
                        <div className="text-xs text-charcoal-light">Min: {item.minStock} {item.unit}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          status === "critical" ? "bg-red-100 text-red-800" :
                          status === "low" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {status === "critical" ? "🔴 Critical" :
                           status === "low" ? "⚠️ Low Stock" :
                           "✅ Good"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal-light">
                        {item.supplier}
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal-light">
                        {new Date(item.lastRestocked).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-brass hover:bg-brass/10 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
