"use client";

import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "MANAGER" | "BARISTA" | "WAITER" | "DELIVERY";
  hireDate: string;
  status: "active" | "inactive";
  salary: number;
  shift: string;
  performance: number;
}

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [staff] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Abebe Kebede",
      email: "abebe.k@abolgardencafe.et",
      phone: "+251 91 111 2222",
      role: "MANAGER",
      hireDate: "2025-01-10",
      status: "active",
      salary: 15000,
      shift: "Morning (6AM-2PM)",
      performance: 95,
    },
    {
      id: "2",
      name: "Tigist Alemayehu",
      email: "tigist.a@abolgardencafe.et",
      phone: "+251 91 222 3333",
      role: "BARISTA",
      hireDate: "2025-03-15",
      status: "active",
      salary: 8000,
      shift: "Morning (6AM-2PM)",
      performance: 92,
    },
    {
      id: "3",
      name: "Solomon Tesfaye",
      email: "solomon.t@abolgardencafe.et",
      phone: "+251 91 333 4444",
      role: "BARISTA",
      hireDate: "2025-06-20",
      status: "active",
      salary: 7500,
      shift: "Afternoon (2PM-10PM)",
      performance: 88,
    },
    {
      id: "4",
      name: "Hanna Wolde",
      email: "hanna.w@abolgardencafe.et",
      phone: "+251 91 444 5555",
      role: "WAITER",
      hireDate: "2025-04-01",
      status: "active",
      salary: 6500,
      shift: "Morning (6AM-2PM)",
      performance: 90,
    },
    {
      id: "5",
      name: "Yohannes Girma",
      email: "yohannes.g@abolgardencafe.et",
      phone: "+251 91 555 6666",
      role: "WAITER",
      hireDate: "2025-08-10",
      status: "active",
      salary: 6000,
      shift: "Afternoon (2PM-10PM)",
      performance: 85,
    },
    {
      id: "6",
      name: "Marta Bekele",
      email: "marta.b@abolgardencafe.et",
      phone: "+251 91 666 7777",
      role: "DELIVERY",
      hireDate: "2026-01-05",
      status: "active",
      salary: 5500,
      shift: "Full Day",
      performance: 87,
    },
  ]);

  const roles = ["all", "ADMIN", "MANAGER", "BARISTA", "WAITER", "DELIVERY"];

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === "active").length,
    avgPerformance: Math.round(staff.reduce((sum, s) => sum + s.performance, 0) / staff.length),
    totalSalary: staff.reduce((sum, s) => sum + s.salary, 0),
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN": return "bg-purple-100 text-purple-800";
      case "MANAGER": return "bg-blue-100 text-blue-800";
      case "BARISTA": return "bg-brass/10 text-brass";
      case "WAITER": return "bg-green-100 text-green-800";
      case "DELIVERY": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "MANAGER":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "BARISTA":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case "WAITER":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case "DELIVERY":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest mb-1">
              Staff Management
            </h1>
            <p className="text-charcoal-light">
              Manage team members, roles, and schedules
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Staff Member
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Total Staff</span>
              <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.total}</p>
            <p className="text-xs text-success mt-1">↑ 2 new this month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Active</span>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.active}</p>
            <p className="text-xs text-charcoal-light mt-1">On duty today</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Avg Performance</span>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.avgPerformance}%</p>
            <p className="text-xs text-success mt-1">↑ 3% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal-light">Monthly Payroll</span>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-forest">{stats.totalSalary.toLocaleString()} ETB</p>
            <p className="text-xs text-charcoal-light mt-1">Total expenses</p>
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
                  placeholder="Search staff by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="flex gap-2 flex-wrap">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-lg font-heading font-medium text-sm transition-all ${
                    selectedRole === role
                      ? "bg-brass text-white"
                      : "bg-gray-100 text-charcoal hover:bg-gray-200"
                  }`}
                >
                  {role === "all" ? "All Roles" : role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center font-heading font-bold text-brass text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-forest">{member.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-charcoal-light">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-charcoal-light">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {member.phone}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-charcoal-light mb-1">Salary</p>
                  <p className="font-heading font-semibold text-forest">{member.salary.toLocaleString()} ETB</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal-light mb-1">Performance</p>
                  <p className="font-heading font-semibold text-success">{member.performance}%</p>
                </div>
              </div>

              {/* Shift & Hire Date */}
              <div className="space-y-2 mb-4 text-xs text-charcoal-light">
                <div className="flex items-center justify-between">
                  <span>Shift:</span>
                  <span className="font-heading font-medium text-charcoal">{member.shift}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hired:</span>
                  <span className="font-heading font-medium text-charcoal">{new Date(member.hireDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-heading font-medium hover:bg-gray-50 transition-colors">
                  Edit
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
