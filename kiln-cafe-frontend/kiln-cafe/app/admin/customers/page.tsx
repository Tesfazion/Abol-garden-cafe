"use client";

import { useState } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  lastOrder: string;
  status: "active" | "inactive";
  preferences?: string[];
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Sample customer data
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "Ahmed Mohammed",
      email: "ahmed.m@email.com",
      phone: "+251 91 234 5678",
      totalOrders: 45,
      totalSpent: 12450,
      joinedDate: "2026-01-15",
      lastOrder: "2026-07-04",
      status: "active",
      preferences: ["Ethiopian Coffee", "Injera"],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+251 91 876 5432",
      totalOrders: 32,
      totalSpent: 8960,
      joinedDate: "2026-02-20",
      lastOrder: "2026-07-03",
      status: "active",
      preferences: ["Cappuccino", "Pastries"],
    },
    {
      id: "3",
      name: "Girma Tadesse",
      email: "girma.t@email.com",
      phone: "+251 92 345 6789",
      totalOrders: 28,
      totalSpent: 7280,
      joinedDate: "2026-03-10",
      lastOrder: "2026-07-01",
      status: "active",
      preferences: ["Tibs", "Fresh Juice"],
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "+251 93 456 7890",
      totalOrders: 18,
      totalSpent: 5220,
      joinedDate: "2026-04-05",
      lastOrder: "2026-06-28",
      status: "active",
      preferences: ["Vegan Options"],
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.b@email.com",
      phone: "+251 94 567 8901",
      totalOrders: 12,
      totalSpent: 3840,
      joinedDate: "2026-05-12",
      lastOrder: "2026-06-25",
      status: "active",
    },
    {
      id: "6",
      name: "Fatima Ali",
      email: "fatima.a@email.com",
      phone: "+251 95 678 9012",
      totalOrders: 8,
      totalSpent: 2160,
      joinedDate: "2026-06-01",
      lastOrder: "2026-06-15",
      status: "inactive",
    },
  ]);

  const filters = ["all", "active", "inactive", "vip"];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    
    let matchesFilter = true;
    if (selectedFilter === "active") matchesFilter = customer.status === "active";
    if (selectedFilter === "inactive") matchesFilter = customer.status === "inactive";
    if (selectedFilter === "vip") matchesFilter = customer.totalSpent > 10000;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    vip: customers.filter(c => c.totalSpent > 10000).length,
    revenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest mb-1">
              Customer Management
            </h1>
            <p className="text-charcoal-light">
              View customer profiles, order history, and feedback
            </p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Total Customers</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.total}</p>
            <p className="text-xs text-success mt-1">↑ 12% this month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Active Customers</span>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.active}</p>
            <p className="text-xs text-charcoal-light mt-1">{((stats.active / stats.total) * 100).toFixed(0)}% of total</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">VIP Customers</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.vip}</p>
            <p className="text-xs text-charcoal-light mt-1">Spent &gt; 10,000 ETB</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Total Revenue</span>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.revenue.toLocaleString()} ETB</p>
            <p className="text-xs text-success mt-1">↑ 18% this month</p>
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
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-heading font-medium text-sm transition-all ${
                    selectedFilter === filter
                      ? "bg-brass text-white"
                      : "bg-gray-100 text-charcoal hover:bg-gray-200"
                  }`}
                >
                  {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Last Order
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
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center font-heading font-bold text-brass">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-heading font-medium text-forest">{customer.name}</div>
                          {customer.totalSpent > 10000 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brass/10 text-brass">
                              ⭐ VIP
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-charcoal">{customer.email}</div>
                      <div className="text-xs text-charcoal-light">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-heading font-semibold text-forest">{customer.totalOrders}</div>
                      <div className="text-xs text-charcoal-light">orders</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-heading font-semibold text-success">{customer.totalSpent.toLocaleString()} ETB</div>
                      <div className="text-xs text-charcoal-light">Avg: {Math.round(customer.totalSpent / customer.totalOrders)} ETB</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-light">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {customer.status === "active" ? "✅ Active" : "⚪ Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-brass hover:bg-brass/10 rounded-lg transition-colors" title="View Profile">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 text-sage hover:bg-sage/10 rounded-lg transition-colors" title="Send Message">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-charcoal-light">
            Showing {filteredCustomers.length} of {customers.length} customers
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-heading font-medium hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-brass text-white rounded-lg text-sm font-heading font-medium hover:bg-brass-dark transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-heading font-medium hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
