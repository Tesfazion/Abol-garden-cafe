import { Order } from "../models/order.model";
import { MenuItem } from "../models/menuItem.model";
import { ApiError } from "../middleware/errorHandler";

// Valid forward-only status transitions — prevents skipped steps or reversion.
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING:          ["CONFIRMED", "CANCELLED"],
  CONFIRMED:        ["PREPARING",  "CANCELLED"],
  PREPARING:        ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED:        [],
  CANCELLED:        [],
};

interface CreateOrderInput {
  userId?: string;
  guestEmail?: string;
  guestName?: string;
  deliveryAddress: string;
  lines: { menuItemId: string; quantity: number }[];
}

export async function createOrder(input: CreateOrderInput) {
  if (input.lines.length === 0) {
    throw new ApiError(400, "Order must contain at least one item");
  }
  if (!input.userId && !input.guestEmail) {
    throw new ApiError(400, "Provide either an authenticated user or a guest email");
  }

  // Fetch menu items — server is the authoritative source of pricing
  const menuItemIds = input.lines.map((l) => l.menuItemId);
  const menuItems = await MenuItem.find({
    _id: { $in: menuItemIds },
    available: true,
  });

  if (menuItems.length !== new Set(menuItemIds).size) {
    throw new ApiError(400, "One or more items are unavailable or invalid");
  }

  const itemMap = new Map(menuItems.map((m) => [String(m._id), m]));
  let subtotal = 0;

  const items = input.lines.map((line) => {
    const menuItem = itemMap.get(line.menuItemId);
    if (!menuItem) throw new ApiError(400, `Item ${line.menuItemId} not found`);
    const unitPrice = menuItem.price;
    subtotal += unitPrice * line.quantity;
    return {
      menuItemId:   String(menuItem._id),
      menuItemName: menuItem.name,
      quantity:     line.quantity,
      unitPrice,
    };
  });

  return Order.create({
    userId:          input.userId,
    guestEmail:      input.guestEmail,
    guestName:       input.guestName,
    deliveryAddress: input.deliveryAddress,
    subtotal,
    items,
  });
}

export async function getOrder(id: string) {
  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");
  return order;
}

export async function listOrders(filter: { userId?: string; status?: string }) {
  return Order.find(filter).sort({ createdAt: -1 });
}

export async function updateOrderStatus(id: string, nextStatus: string) {
  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");

  const allowed = ALLOWED_TRANSITIONS[order.status] ?? [];
  if (!allowed.includes(nextStatus)) {
    throw new ApiError(
      400,
      `Cannot move order from ${order.status} to ${nextStatus}. ` +
      `Allowed next statuses: ${allowed.join(", ") || "none"}`
    );
  }

  order.status = nextStatus as typeof order.status;
  await order.save();
  return order;
}
