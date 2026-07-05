"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    cafeName: "Abole Garden Café",
    address: "Addis Ababa, Ethiopia",
    phone: "+251 11 234 5678",
    email: "info@abolgardencafe.et",
    description: "Authentic Ethiopian Coffee & Cuisine Experience",
    openingHours: {
      monday: "6:00 AM - 10:00 PM",
      tuesday: "6:00 AM - 10:00 PM",
      wednesday: "6:00 AM - 10:00 PM",
      thursday: "6:00 AM - 10:00 PM",
      friday: "6:00 AM - 11:00 PM",
      saturday: "7:00 AM - 11:00 PM",
      sunday: "7:00 AM - 9:00 PM",
    },
    brandColors: {
      primary: "#1E3A2A",
      secondary: "#C9A961",
      accent: "#8B4513",
    },
    currency: "ETB",
    taxRate: 15,
    serviceCharge: 10,
    notifications: {
      emailOrders: true,
      emailBookings: true,
      smsOrders: false,
      smsBookings: true,
      lowStockAlerts: true,
    },
    payment: {
      cashEnabled: true,
      mobileMoneyEnabled: true,
      cardEnabled: false,
    },
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const tabs = [
    { id: "general", label: "General", icon: "🏪" },
    { id: "branding", label: "Branding", icon: "🎨" },
    { id: "hours", label: "Hours", icon: "🕒" },
    { id: "payment", label: "Payment", icon: "💳" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest mb-1">
              Settings
            </h1>
            <p className="text-charcoal-light">
              Configure café information and preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-brass text-white"
                      : "text-charcoal hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-heading font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-heading text-xl font-bold text-forest mb-6">General Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                      Café Name
                    </label>
                    <input
                      type="text"
                      value={settings.cafeName}
                      onChange={(e) => setSettings({ ...settings, cafeName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                      Description
                    </label>
                    <textarea
                      value={settings.description}
                      onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                      >
                        <option value="ETB">ETB (Ethiopian Birr)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Branding Settings */}
            {activeTab === "branding" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-heading text-xl font-bold text-forest mb-6">Branding & Colors</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                      Logo Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <svg className="w-12 h-12 mx-auto text-charcoal-light mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-charcoal-light mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-charcoal-light">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                        Primary Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.brandColors.primary}
                          onChange={(e) => setSettings({
                            ...settings,
                            brandColors: { ...settings.brandColors, primary: e.target.value }
                          })}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.brandColors.primary}
                          onChange={(e) => setSettings({
                            ...settings,
                            brandColors: { ...settings.brandColors, primary: e.target.value }
                          })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                        Secondary Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.brandColors.secondary}
                          onChange={(e) => setSettings({
                            ...settings,
                            brandColors: { ...settings.brandColors, secondary: e.target.value }
                          })}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.brandColors.secondary}
                          onChange={(e) => setSettings({
                            ...settings,
                            brandColors: { ...settings.brandColors, secondary: e.target.value }
                          })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                        Accent Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.brandColors.accent}
                          onChange={(e) => setSettings({
                            ...settings,
                            brandColors: { ...settings.brandColors, accent: e.target.value }
                          })}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.brandColors.accent}
                          onChange={(e) => setSettings({
                            ...settings,
                            brandColors: { ...settings.brandColors, accent: e.target.value }
                          })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Opening Hours */}
            {activeTab === "hours" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-heading text-xl font-bold text-forest mb-6">Opening Hours</h2>
                <div className="space-y-4">
                  {Object.entries(settings.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-4">
                      <label className="w-32 text-sm font-heading font-medium text-charcoal capitalize">
                        {day}
                      </label>
                      <input
                        type="text"
                        value={hours}
                        onChange={(e) => setSettings({
                          ...settings,
                          openingHours: { ...settings.openingHours, [day]: e.target.value }
                        })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                        placeholder="e.g., 6:00 AM - 10:00 PM"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === "payment" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-heading text-xl font-bold text-forest mb-6">Payment Methods</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💵</span>
                      <div>
                        <p className="font-heading font-semibold text-forest">Cash Payment</p>
                        <p className="text-sm text-charcoal-light">Accept cash payments at the counter</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.payment.cashEnabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: { ...settings.payment, cashEnabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brass/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brass"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="font-heading font-semibold text-forest">Mobile Money</p>
                        <p className="text-sm text-charcoal-light">M-Pesa, Telebirr, etc.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.payment.mobileMoneyEnabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: { ...settings.payment, mobileMoneyEnabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brass/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brass"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💳</span>
                      <div>
                        <p className="font-heading font-semibold text-forest">Card Payment</p>
                        <p className="text-sm text-charcoal-light">Credit/Debit cards (requires gateway)</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.payment.cardEnabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: { ...settings.payment, cardEnabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brass/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brass"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-heading text-xl font-bold text-forest mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-heading font-semibold text-forest">Email - New Orders</p>
                      <p className="text-sm text-charcoal-light">Receive email notifications for new orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailOrders}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailOrders: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brass/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brass"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-heading font-semibold text-forest">Email - New Bookings</p>
                      <p className="text-sm text-charcoal-light">Receive email notifications for new reservations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailBookings}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailBookings: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brass/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brass"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-heading font-semibold text-forest">SMS - New Bookings</p>
                      <p className="text-sm text-charcoal-light">Receive SMS notifications for new reservations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.smsBookings}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, smsBookings: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brass/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brass"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-heading font-semibold text-forest">Low Stock Alerts</p>
                      <p className="text-sm text-charcoal-light">Get notified when inventory is running low</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.lowStockAlerts}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, lowStockAlerts: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brass/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brass"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="font-heading text-xl font-bold text-forest mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-semibold text-forest mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-heading font-medium text-charcoal mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brass focus:border-brass"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button className="btn btn-primary">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-heading font-semibold text-forest mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-heading font-medium text-forest">Enable 2FA</p>
                        <p className="text-sm text-charcoal-light">Add an extra layer of security</p>
                      </div>
                      <button className="btn btn-outline">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-heading font-semibold text-forest mb-4">Session Management</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-heading font-medium text-forest">Active Sessions</p>
                          <p className="text-sm text-charcoal-light">2 devices currently logged in</p>
                        </div>
                        <button className="text-red-600 hover:text-red-700 font-heading font-medium text-sm">
                          Sign Out All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
