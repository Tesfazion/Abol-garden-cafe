"use client";

import { useState, useEffect } from "react";

interface DeliveryDriver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: "available" | "delivering" | "offline";
  currentOrder?: string;
  location: {
    lat: number;
    lng: number;
  };
  lastUpdated: string;
}

interface DeliveryOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: number;
  total: number;
  driverId?: string;
  status: "pending" | "assigned" | "picked_up" | "delivered";
  destination: {
    lat: number;
    lng: number;
  };
  estimatedTime?: string;
}

export default function DeliveryTrackingPage() {
  const [selectedDriver, setSelectedDriver] = useState<DeliveryDriver | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);

  const [drivers, setDrivers] = useState<DeliveryDriver[]>([
    {
      id: "drv-1",
      name: "Marta Bekele",
      phone: "+251 91 666 7777",
      vehicle: "Motorcycle - AB 1234",
      status: "delivering",
      currentOrder: "ORD-2024-001",
      location: { lat: 9.0320, lng: 38.7469 },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "drv-2",
      name: "Yohannes Girma",
      phone: "+251 91 555 6666",
      vehicle: "Motorcycle - CD 5678",
      status: "available",
      location: { lat: 9.0250, lng: 38.7500 },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "drv-3",
      name: "Solomon Tesfaye",
      phone: "+251 91 333 4444",
      vehicle: "Car - EF 9012",
      status: "delivering",
      currentOrder: "ORD-2024-002",
      location: { lat: 9.0280, lng: 38.7520 },
      lastUpdated: new Date().toISOString(),
    },
  ]);

  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: "ord-1",
      orderNumber: "ORD-2024-001",
      customerName: "Abebe Kebede",
      customerAddress: "Bole, Addis Ababa",
      customerPhone: "+251 91 111 2222",
      items: 3,
      total: 450,
      driverId: "drv-1",
      status: "picked_up",
      destination: { lat: 9.0350, lng: 38.7600 },
      estimatedTime: "15 min",
    },
    {
      id: "ord-2",
      orderNumber: "ORD-2024-002",
      customerName: "Tigist Alemayehu",
      customerAddress: "Kazanchis, Addis Ababa",
      customerPhone: "+251 91 222 3333",
      items: 5,
      total: 680,
      driverId: "drv-3",
      status: "picked_up",
      destination: { lat: 9.0300, lng: 38.7450 },
      estimatedTime: "20 min",
    },
    {
      id: "ord-3",
      orderNumber: "ORD-2024-003",
      customerName: "Hanna Wolde",
      customerAddress: "Piazza, Addis Ababa",
      customerPhone: "+251 91 444 5555",
      items: 2,
      total: 320,
      status: "pending",
      destination: { lat: 9.0330, lng: 38.7380 },
    },
  ]);

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prevDrivers =>
        prevDrivers.map(driver => {
          if (driver.status === "delivering") {
            // Simulate movement (small random changes)
            return {
              ...driver,
              location: {
                lat: driver.location.lat + (Math.random() - 0.5) * 0.001,
                lng: driver.location.lng + (Math.random() - 0.5) * 0.001,
              },
              lastUpdated: new Date().toISOString(),
            };
          }
          return driver;
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = {
    activeDrivers: drivers.filter(d => d.status !== "offline").length,
    delivering: drivers.filter(d => d.status === "delivering").length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    totalDeliveries: orders.length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-success/10 text-success";
      case "delivering": return "bg-blue-100 text-blue-800";
      case "offline": return "bg-gray-100 text-gray-600";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "assigned": return "bg-purple-100 text-purple-800";
      case "picked_up": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const assignDriver = (orderId: string, driverId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, driverId, status: "assigned" as const } : order
    ));
    setDrivers(drivers.map(driver =>
      driver.id === driverId ? { ...driver, status: "delivering" as const, currentOrder: orders.find(o => o.id === orderId)?.orderNumber } : driver
    ));
    alert("Driver assigned successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest mb-1">
              Delivery Tracking
            </h1>
            <p className="text-charcoal-light">
              Real-time tracking of delivery drivers and orders
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
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
              <span className="text-sm text-charcoal-light">Active Drivers</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.activeDrivers}</p>
            <p className="text-xs text-success mt-1">Online now</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Currently Delivering</span>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.delivering}</p>
            <p className="text-xs text-charcoal-light mt-1">In progress</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Pending Orders</span>
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.pendingOrders}</p>
            <p className="text-xs text-yellow-600 mt-1">Awaiting assignment</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Total Orders</span>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.totalDeliveries}</p>
            <p className="text-xs text-charcoal-light mt-1">Today</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-heading text-xl font-bold text-forest">Live Map</h2>
                <p className="text-sm text-charcoal-light">Track delivery drivers in real-time</p>
              </div>
              
              {/* Map Placeholder with markers */}
              <div className="relative bg-gray-100 h-[600px] flex items-center justify-center">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50"></div>
                
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${i * 5}%` }} />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${i * 5}%` }} />
                  ))}
                </div>

                {/* Driver Markers */}
                {drivers.map((driver, index) => (
                  <div
                    key={driver.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
                    style={{
                      left: `${40 + index * 15}%`,
                      top: `${30 + index * 20}%`,
                    }}
                    onClick={() => setSelectedDriver(driver)}
                  >
                    {/* Pulse animation for delivering drivers */}
                    {driver.status === "delivering" && (
                      <div className="absolute inset-0 -m-2">
                        <div className="w-full h-full rounded-full bg-blue-400 animate-ping opacity-75"></div>
                      </div>
                    )}
                    
                    {/* Driver marker */}
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                      driver.status === "delivering" ? "bg-blue-500" :
                      driver.status === "available" ? "bg-green-500" : "bg-gray-400"
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    
                    {/* Driver name label */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs font-heading font-semibold">
                      {driver.name.split(' ')[0]}
                    </div>
                  </div>
                ))}

                {/* Destination Markers */}
                {orders.filter(o => o.status !== "delivered").map((order, index) => (
                  <div
                    key={order.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${50 + index * 10}%`,
                      top: `${50 + index * 15}%`,
                    }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-xs text-charcoal">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-charcoal">Delivering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-xs text-charcoal">Destination</span>
                  </div>
                </div>

                {/* Live Update Indicator */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-heading font-medium text-charcoal">Live Tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Drivers List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-heading text-lg font-bold text-forest">Drivers</h2>
              </div>
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                {drivers.map((driver) => (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedDriver?.id === driver.id
                        ? "border-brass bg-brass/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-forest">{driver.name}</h3>
                        <p className="text-xs text-charcoal-light">{driver.vehicle}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                        {driver.status}
                      </span>
                    </div>
                    {driver.currentOrder && (
                      <div className="text-xs text-charcoal-light">
                        Order: {driver.currentOrder}
                      </div>
                    )}
                    <div className="text-xs text-charcoal-light mt-1">
                      Updated: {new Date(driver.lastUpdated).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-heading text-lg font-bold text-forest">Orders</h2>
              </div>
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-forest text-sm">{order.orderNumber}</h3>
                        <p className="text-xs text-charcoal-light">{order.customerName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-light mb-2">
                      📍 {order.customerAddress}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-heading font-bold text-brass">{order.total} ETB</span>
                      {order.status === "pending" && (
                        <select
                          onChange={(e) => e.target.value && assignDriver(order.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded"
                          defaultValue=""
                        >
                          <option value="">Assign Driver</option>
                          {drivers.filter(d => d.status === "available").map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      )}
                      {order.estimatedTime && (
                        <span className="text-xs text-charcoal-light">⏱️ {order.estimatedTime}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
