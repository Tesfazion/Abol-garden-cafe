import { MenuItem, IMenuItem } from "../models/menuItem.model";
import { ApiError } from "../middleware/errorHandler";

export async function listMenuItems(category?: string) {
  const query: Record<string, unknown> = { available: true };
  if (category) query.category = category.toUpperCase();
  return MenuItem.find(query).sort({ name: 1 });
}

export async function getMenuItemById(id: string) {
  const item = await MenuItem.findById(id);
  if (!item) throw new ApiError(404, "Menu item not found");
  return item;
}

export async function createMenuItemRecord(data: Partial<IMenuItem>) {
  return MenuItem.create(data);
}

export async function updateMenuItemRecord(id: string, data: Partial<IMenuItem>) {
  const item = await MenuItem.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, "Menu item not found");
  return item;
}

export async function softDeleteMenuItem(id: string) {
  const item = await MenuItem.findByIdAndUpdate(
    id,
    { available: false },
    { new: true }
  );
  if (!item) throw new ApiError(404, "Menu item not found");
}
