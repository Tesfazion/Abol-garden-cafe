"use client";

import { useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
  notes?: string;
}

export default function AdminOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Sample orders data
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2026-001",
      customer: {
        name: "Ahmed Mohammed",
        email: "ahmed.m@email.com",
        phone: "+251 91 234 5678",
      },
      items: [
        { name: "Ethiopian Coffee", quantity: 2, price: 85 },
        { name: "Ambasha Bread", quantity: 1, price: 45 },
      ],
      total: 215,
      status: "preparing",
      paymentStatus: "paid",
      createdAt: "2026-07-05T10:30:00",
      notes: "Extra sugar please",
    },
    {
      id: "2",
      orderNumber: "ORD-2026-002",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+251 91 876 5432",
      },
      items: [
        { name: "Cappuccino", quantity: 1, price: 75 },
        { name: "Croissant", quantity: 2, price: 55 },
      ],
      total: 185,
      status: "ready",
      paymentStatus: "paid",
      createdAt: "2026-07-05T11:15:00",
    },
    {
      id: "3",
      orderNumber: "ORD-2026-003",
      customer: {
        name: "Girma Tadesse",
        email: "girma.t@email.com",
        phone: "+251 92 345 6789",
      },
      items: [
        { name: "Doro Tibs", quantity: 1, price: 250 },
        { name: "Fresh Juice", quantity: 1, price: 45 },
      ],
      total: 295,
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: "2026-07-05T09:45:00",
    },
    {
      id: "4",
      orderNumber: "ORD-2026-004",
      customer: {
        name: "Emily Davis",
        email: "emily.d@email.com",
        phone: "+251 93 456 7890",
      },
      items: [
        { name: "Macchiato", quantity: 3, price: 70 },
        { name: "Cake Slice", quantity: 1, price: 85 },
      ],
      total: 295,
      status: "pending",
      paymentStatus: "pending",
      createdAt: "2026-07-05T12:00:00",
    },
  ]);

  const statusFilters = ["all", "pending", "confirmed", "preparing", "ready", "delivered", "cancelled"];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-purple-100 text-purple-800";
      case "ready": return "bg-green-100 text-green-800";
      case "delivered": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "refunded": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    revenue: orders.filter(o => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest mb-1">
              Order Management
            </h1>
            <p className="text-charcoal-light">
              Track and manage customer orders
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button className="btn btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
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
              <span className="text-sm text-charcoal-light">Total Orders</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.total}</p>
            <p className="text-xs text-success mt-1">↑ 8% from yesterday</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Pending</span>
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.pending}</p>
            <p className="text-xs text-charcoal-light mt-1">Need attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">In Progress</span>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.preparing}</p>
            <p className="text-xs text-charcoal-light mt-1">Being prepared</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Today's Revenue</span>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.revenue.toLocaleString()} ETB</p>
            <p className="text-xs text-success mt-1">↑ 15% from yesterday</p>
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
                  placeholder="Search by order number, customer name, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2 flex-wrap">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-heading font-medium text-sm transition-all capitalize ${
                    selectedStatus === status
                      ? "bg-brass text-white"
                      : "bg-gray-100 text-charcoal hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-heading font-semibold text-charcoal uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-heading font-semibold text-forest">{order.orderNumber}</div>
                      {order.notes && (
                        <div className="text-xs text-charcoal-light mt-1">Note: {order.notes}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-heading font-medium text-forest">{order.customer.name}</div>
                      <div className="text-sm text-charcoal-light">{order.customer.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-charcoal-light">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-heading font-semibold text-forest">{order.total} ETB</div>
                      <div className={`text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-light">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-brass hover:text-brass-dark font-heading font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-forest">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div>
                <h3 className="font-heading font-semibold text-forest mb-3">Order Information</h3>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-charcoal-light mb-1">Order Number</p>
                    <p className="font-heading font-semibold text-forest">{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-light mb-1">Order Time</p>
                    <p className="font-heading font-semibold text-forest">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-light mb-1">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-light mb-1">Payment</p>
                    <span className={`font-heading font-semibold capitalize ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-heading font-semibold text-forest mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-heading font-medium text-forest">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-charcoal-light">{selectedOrder.customer.email}</p>
                  <p className="text-sm text-charcoal-light">{selectedOrder.customer.phone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-heading font-semibold text-forest mb-3">Order Items</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-charcoal">Item</th>
                        <th className="px-4 py-3 text-center text-xs font-heading font-semibold text-charcoal">Qty</th>
                        <th className="px-4 py-3 text-right text-xs font-heading font-semibold text-charcoal">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-heading font-semibold text-charcoal">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 text-sm text-charcoal">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-charcoal text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-charcoal text-right">{item.price} ETB</td>
                          <td className="px-4 py-3 text-sm font-heading font-semibold text-forest text-right">
                            {item.quantity * item.price} ETB
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right font-heading font-semibold text-forest">Total:</td>
                        <td className="px-4 py-3 text-right font-heading text-lg font-bold text-forest">
                          {selectedOrder.total} ETB
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-heading font-semibold text-forest mb-3">Notes</h3>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-charcoal">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 btn btn-primary">
                  Print Receipt
                </button>
                <button className="flex-1 btn btn-outline">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
