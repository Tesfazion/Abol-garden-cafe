"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { CartLine, MenuItem } from "./types";

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  function addItem(item: MenuItem) {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setOpen(true);
  }

  function removeItem(itemId: string) {
    setLines((prev) => prev.filter((l) => l.item.id !== itemId));
  }

  function updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.item.id === itemId ? { ...l, quantity } : l))
    );
  }

  function clear() {
    setLines([]);
  }

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0),
    [lines]
  );

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        setOpen,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        subtotal,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
