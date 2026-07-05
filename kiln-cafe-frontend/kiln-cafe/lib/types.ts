export type MenuCategory = "coffee" | "bakes" | "plates" | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // in ETB (Ethiopian Birr)
  description: string;
  tastingNotes?: string[]; // e.g. ["stone fruit", "honey", "cardamom"]
  origin?: string; // for coffee: farm/region
  image: string;
  hot?: boolean; // "hot now" ember flag
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: string; // ISO date
  time: string; // HH:mm
  notes?: string;
}
