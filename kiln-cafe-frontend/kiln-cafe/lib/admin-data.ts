export interface MenuItemRecord {
  id: string;
  name: string;
  category: "coffee" | "drinks" | "plates" | "bakes";
  price: number;
  description: string;
  image: string;
  available: boolean;
  hot?: boolean;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
}

export interface ReservationRecord {
  id: string;
  guestName: string;
  partySize: number;
  slot: string;
  status: "pending" | "confirmed" | "declined";
  notes?: string;
}

export interface InventoryRecord {
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

export interface CustomerRecord {
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

export interface StaffMemberRecord {
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

export const dashboardQuickLinks = [
  { href: "/admin/orders", label: "Orders", description: "Confirm and handoff new orders" },
  { href: "/admin/bookings", label: "Reservations", description: "Review table requests" },
  { href: "/admin/menu", label: "Menu", description: "Adjust items and prices" },
  { href: "/admin/reports", label: "Reports", description: "Inspect weekly performance" },
];

export const menuCatalog: MenuItemRecord[] = [
  {
    id: "1",
    name: "Traditional Ethiopian Buna",
    category: "coffee",
    price: 350,
    description: "Ceremonial coffee with aromatic spice notes",
    image: "/images/menu/coffe and Tea/Traditional Ethiopian Buna (Coffee Ceremony).jpg",
    available: true,
    hot: true,
  },
  {
    id: "2",
    name: "Special Combo",
    category: "plates",
    price: 1290,
    description: "Signature mixed platter for sharing",
    image: "/images/menu/Main Dishes/Special Combo.jpg",
    available: true,
    hot: true,
  },
  {
    id: "3",
    name: "Fresh Fruit Juice",
    category: "drinks",
    price: 220,
    description: "Seasonal fruit juice prepared in-house",
    image: "/images/menu/Beverages/Fresh Fruit Juice.jpg",
    available: true,
  },
  {
    id: "4",
    name: "Cardamom Kouign-Amann",
    category: "bakes",
    price: 330,
    description: "Butter pastry with cardamom sweetness",
    image: "/images/menu/Bakes and desserts/Cardamom Kouign-Amann.jpg",
    available: false,
  },
];

export const ordersSeed: OrderRecord[] = [
  {
    id: "1",
    orderNumber: "ORD-2026-001",
    customer: { name: "Ahmed Mohammed", email: "ahmed.m@email.com", phone: "+251 91 234 5678" },
    total: 215,
    status: "preparing",
    paymentStatus: "paid",
    createdAt: "2026-07-05T10:30:00",
  },
  {
    id: "2",
    orderNumber: "ORD-2026-002",
    customer: { name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+251 91 876 5432" },
    total: 185,
    status: "ready",
    paymentStatus: "paid",
    createdAt: "2026-07-05T11:15:00",
  },
  {
    id: "3",
    orderNumber: "ORD-2026-003",
    customer: { name: "Girma Tadesse", email: "girma.t@email.com", phone: "+251 92 345 6789" },
    total: 295,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2026-07-05T09:45:00",
  },
  {
    id: "4",
    orderNumber: "ORD-2026-004",
    customer: { name: "Emily Davis", email: "emily.d@email.com", phone: "+251 93 456 7890" },
    total: 295,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2026-07-05T12:00:00",
  },
];

export const reservationsSeed: ReservationRecord[] = [
  { id: "1", guestName: "Selam Bekele", partySize: 4, slot: "18:30", status: "pending", notes: "Window table" },
  { id: "2", guestName: "Mulugeta T", partySize: 2, slot: "19:00", status: "confirmed" },
  { id: "3", guestName: "Netsanet H", partySize: 6, slot: "20:00", status: "declined" },
];

export const inventorySeed: InventoryRecord[] = [
  { id: "1", name: "Coffee Beans (Ethiopian)", category: "Ingredients", currentStock: 45, unit: "kg", minStock: 20, supplier: "Ethiopian Coffee Co.", cost: 850, lastRestocked: "2026-07-01" },
  { id: "2", name: "Milk (Fresh)", category: "Ingredients", currentStock: 15, unit: "liters", minStock: 30, supplier: "Local Dairy Farm", cost: 65, lastRestocked: "2026-07-04" },
  { id: "3", name: "Disposable Cups (Large)", category: "Packaging", currentStock: 450, unit: "pieces", minStock: 200, supplier: "EcoPack Solutions", cost: 2.5, lastRestocked: "2026-07-03" },
  { id: "4", name: "Paper Napkins", category: "Supplies", currentStock: 280, unit: "packs", minStock: 100, supplier: "Supplies Direct", cost: 15, lastRestocked: "2026-07-02" },
];

export const customersSeed: CustomerRecord[] = [
  { id: "1", name: "Ahmed Mohammed", email: "ahmed.m@email.com", phone: "+251 91 234 5678", totalOrders: 45, totalSpent: 12450, joinedDate: "2026-01-15", lastOrder: "2026-07-04", status: "active", preferences: ["Ethiopian Coffee", "Injera"] },
  { id: "2", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+251 91 876 5432", totalOrders: 32, totalSpent: 8960, joinedDate: "2026-02-20", lastOrder: "2026-07-03", status: "active", preferences: ["Cappuccino", "Pastries"] },
  { id: "3", name: "Girma Tadesse", email: "girma.t@email.com", phone: "+251 92 345 6789", totalOrders: 28, totalSpent: 7280, joinedDate: "2026-03-10", lastOrder: "2026-07-01", status: "active", preferences: ["Tibs", "Fresh Juice"] },
];

export const staffSeed: StaffMemberRecord[] = [
  { id: "1", name: "Abebe Kebede", email: "abebe.k@abolgardencafe.et", phone: "+251 91 111 2222", role: "MANAGER", hireDate: "2025-01-10", status: "active", salary: 15000, shift: "Morning (6AM-2PM)", performance: 95 },
  { id: "2", name: "Tigist Alemayehu", email: "tigist.a@abolgardencafe.et", phone: "+251 91 222 3333", role: "BARISTA", hireDate: "2025-03-15", status: "active", salary: 8000, shift: "Morning (6AM-2PM)", performance: 92 },
  { id: "3", name: "Solomon Tesfaye", email: "solomon.t@abolgardencafe.et", phone: "+251 91 333 4444", role: "WAITER", hireDate: "2025-06-20", status: "active", salary: 7500, shift: "Afternoon (2PM-10PM)", performance: 88 },
];

export const reportHighlights = [
  { label: "Best-selling item", value: "Special Combo" },
  { label: "Average ticket", value: "320 ETB" },
  { label: "Occupancy", value: "82%" },
];
