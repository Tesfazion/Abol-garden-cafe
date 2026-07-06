"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { menu } from "@/data/menu";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available?: boolean;
  hot?: boolean;
  tastingNotes?: string[];
  origin?: string;
}

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    menu.map(item => ({ ...item, available: true }))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    category: "coffee",
    price: 0,
    description: "",
    image: "",
    available: true,
    hot: false,
    origin: "",
    tastingNotes: "",
  });

  const categories = [
    { id: "all", label: "All Items" },
    { id: "coffee", label: "Coffee & Tea" },
    { id: "drinks", label: "Beverages" },
    { id: "plates", label: "Main Dishes" },
    { id: "bakes", label: "Bakes & Desserts" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: menuItems.length,
    coffee: menuItems.filter(i => i.category === "coffee").length,
    plates: menuItems.filter(i => i.category === "plates").length,
    available: menuItems.filter(i => i.available).length,
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "coffee": return "bg-brass/10 text-brass";
      case "drinks": return "bg-blue-100 text-blue-800";
      case "plates": return "bg-green-100 text-green-800";
      case "bakes": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.label : category;
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Open add modal
  const handleAddNew = () => {
    setFormData({
      name: "",
      category: "coffee",
      price: 0,
      description: "",
      image: "",
      available: true,
      hot: false,
      origin: "",
      tastingNotes: "",
    });
    setImagePreview("");
    setShowAddModal(true);
  };

  // Open edit modal
  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image,
      available: item.available || true,
      hot: item.hot || false,
      origin: item.origin || "",
      tastingNotes: item.tastingNotes?.join(", ") || "",
    });
    setImagePreview(item.image);
    setShowEditModal(true);
  };

  // Save new item
  const handleSaveNew = () => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: formData.price,
      description: formData.description,
      image: formData.image,
      available: formData.available,
      hot: formData.hot,
      origin: formData.origin || undefined,
      tastingNotes: formData.tastingNotes ? formData.tastingNotes.split(",").map(n => n.trim()) : undefined,
    };
    setMenuItems([...menuItems, newItem]);
    setShowAddModal(false);
    alert("Menu item added successfully!");
  };

  // Save edited item
  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    const updatedItems = menuItems.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          name: formData.name,
          category: formData.category,
          price: formData.price,
          description: formData.description,
          image: formData.image,
          available: formData.available,
          hot: formData.hot,
          origin: formData.origin || undefined,
          tastingNotes: formData.tastingNotes ? formData.tastingNotes.split(",").map(n => n.trim()) : undefined,
        };
      }
      return item;
    });
    setMenuItems(updatedItems);
    setShowEditModal(false);
    setEditingItem(null);
    alert("Menu item updated successfully!");
  };

  // Toggle availability
  const handleToggleAvailability = (itemId: string) => {
    const updatedItems = menuItems.map(item => {
      if (item.id === itemId) {
        return { ...item, available: !item.available };
      }
      return item;
    });
    setMenuItems(updatedItems);
  };

  // Delete item
  const handleDelete = (itemId: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
      setSelectedItem(null);
      alert("Menu item deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest mb-1">
              Menu Management
            </h1>
            <p className="text-charcoal-light">
              Manage menu items, prices, and availability
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Menu
            </button>
            <button
              onClick={handleAddNew}
              className="btn btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Total Items</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Coffee & Tea</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.coffee}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Main Dishes</span>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.plates}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Available</span>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.available}</p>
          </div>
        </div>

        {/* Filters & View Toggle */}
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
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-heading font-medium text-sm transition-all ${
                    selectedCategory === cat.id
                      ? "bg-brass text-white"
                      : "bg-gray-100 text-charcoal hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-brass text-white" : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-brass text-white" : "bg-gray-100 text-charcoal hover:bg-gray-200"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items - Grid View */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {item.hot && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      🔥 Hot
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 ${getCategoryColor(item.category)} text-xs px-2 py-1 rounded-full font-medium`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-forest text-lg mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-charcoal-light mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-brass">{item.price} ETB</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {item.available ? "Available" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 px-4 py-2 bg-brass text-white rounded-lg hover:bg-brass-dark transition-colors text-sm font-heading font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Menu Items - List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-heading font-semibold text-forest">
                            {item.name}
                            {item.hot && <span className="ml-2 text-red-500">🔥</span>}
                          </div>
                          <div className="text-sm text-charcoal-light line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-heading font-bold text-brass">{item.price} ETB</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {item.available ? "✅ Available" : "❌ Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-2 text-brass hover:bg-brass/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-sage hover:bg-sage/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleToggleAvailability(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Toggle Availability"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-forest">Menu Item Details</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image */}
              <div className="relative h-80 rounded-xl overflow-hidden mb-6 bg-gray-100">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
                {selectedItem.hot && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🔥 Hot Item
                  </span>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-forest mb-2">
                    {selectedItem.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedItem.category)}`}>
                      {getCategoryLabel(selectedItem.category)}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedItem.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {selectedItem.available ? "✅ Available" : "❌ Out of Stock"}
                    </span>
                  </div>
                  <p className="text-charcoal mb-4">{selectedItem.description}</p>

                  {selectedItem.origin && (
                    <div className="mb-4">
                      <span className="text-sm font-heading font-semibold text-charcoal-light">Origin:</span>
                      <p className="text-forest">{selectedItem.origin}</p>
                    </div>
                  )}

                  {selectedItem.tastingNotes && selectedItem.tastingNotes.length > 0 && (
                    <div>
                      <span className="text-sm font-heading font-semibold text-charcoal-light mb-2 block">Tasting Notes:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tastingNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-cream text-charcoal rounded-full text-sm"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="bg-brass/5 rounded-xl p-6 mb-4">
                    <span className="text-sm text-charcoal-light mb-2 block">Price</span>
                    <span className="text-4xl font-bold text-brass">{selectedItem.price} ETB</span>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleEdit(selectedItem)}
                      className="w-full btn btn-primary flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Item
                    </button>
                    <button
                      onClick={() => handleToggleAvailability(selectedItem.id)}
                      className="w-full btn btn-outline flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      Toggle Availability
                    </button>
                    <button
                      onClick={() => handleDelete(selectedItem.id)}
                      className="w-full btn text-red-600 border border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-forest">Add New Menu Item</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Item Image</label>
                <div className="flex gap-4">
                  {imagePreview && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-brass transition-colors flex flex-col items-center gap-2"
                    >
                      <svg className="w-8 h-8 text-charcoal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm text-charcoal">Click to upload image</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Item Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                  placeholder="e.g., Traditional Ethiopian Buna"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                >
                  <option value="coffee">Coffee & Tea</option>
                  <option value="drinks">Beverages</option>
                  <option value="plates">Main Dishes</option>
                  <option value="bakes">Bakes & Desserts</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Price (ETB)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                  rows={3}
                  placeholder="Describe the item..."
                />
              </div>

              {/* Origin (optional for coffee) */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Origin (Optional)</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                  placeholder="e.g., Yirgacheffe, Ethiopia"
                />
              </div>

              {/* Tasting Notes */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Tasting Notes (comma separated)</label>
                <input
                  type="text"
                  value={formData.tastingNotes}
                  onChange={(e) => setFormData({ ...formData, tastingNotes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                  placeholder="e.g., Floral, Citrus, Honey"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hot}
                    onChange={(e) => setFormData({ ...formData, hot: e.target.checked })}
                    className="w-4 h-4 text-brass focus:ring-brass border-gray-300 rounded"
                  />
                  <span className="text-sm text-charcoal">🔥 Hot Item</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 text-brass focus:ring-brass border-gray-300 rounded"
                  />
                  <span className="text-sm text-charcoal">Available</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-charcoal font-heading font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNew}
                  className="flex-1 px-6 py-3 bg-brass text-white rounded-lg font-heading font-medium hover:bg-brass-dark transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-forest">Edit Menu Item</h2>
              <button
                onClick={() => { setShowEditModal(false); setEditingItem(null); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Item Image</label>
                <div className="flex gap-4">
                  {imagePreview && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-brass transition-colors flex flex-col items-center gap-2"
                    >
                      <svg className="w-8 h-8 text-charcoal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm text-charcoal">Change image</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Item Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                >
                  <option value="coffee">Coffee & Tea</option>
                  <option value="drinks">Beverages</option>
                  <option value="plates">Main Dishes</option>
                  <option value="bakes">Bakes & Desserts</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Price (ETB)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                  rows={3}
                />
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Origin (Optional)</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>

              {/* Tasting Notes */}
              <div>
                <label className="block text-sm font-heading font-semibold text-charcoal mb-2">Tasting Notes (comma separated)</label>
                <input
                  type="text"
                  value={formData.tastingNotes}
                  onChange={(e) => setFormData({ ...formData, tastingNotes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hot}
                    onChange={(e) => setFormData({ ...formData, hot: e.target.checked })}
                    className="w-4 h-4 text-brass focus:ring-brass border-gray-300 rounded"
                  />
                  <span className="text-sm text-charcoal">🔥 Hot Item</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 text-brass focus:ring-brass border-gray-300 rounded"
                  />
                  <span className="text-sm text-charcoal">Available</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => { setShowEditModal(false); setEditingItem(null); }}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-charcoal font-heading font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-6 py-3 bg-brass text-white rounded-lg font-heading font-medium hover:bg-brass-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
