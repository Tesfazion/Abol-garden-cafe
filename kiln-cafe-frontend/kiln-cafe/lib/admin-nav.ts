export type AdminNavIcon = "home" | "orders" | "bookings" | "menu" | "inventory" | "customers" | "staff" | "delivery" | "reports" | "settings";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: AdminNavIcon;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "home" },
  { href: "/admin/orders", label: "Orders", icon: "orders" },
  { href: "/admin/bookings", label: "Reservations", icon: "bookings" },
  { href: "/admin/menu", label: "Menu", icon: "menu" },
  { href: "/admin/inventory", label: "Inventory", icon: "inventory" },
  { href: "/admin/customers", label: "Customers", icon: "customers" },
  { href: "/admin/staff", label: "Staff", icon: "staff" },
  { href: "/admin/delivery", label: "Delivery Tracking", icon: "delivery" },
  { href: "/admin/reports", label: "Reports", icon: "reports" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];
