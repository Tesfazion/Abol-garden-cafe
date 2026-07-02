import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  listMenuItems,
  getMenuItemById,
  createMenuItemRecord,
  updateMenuItemRecord,
  softDeleteMenuItem,
} from "../services/menu.service";

export const menuItemSchema = z.object({
  name:         z.string().min(1).max(120),
  category:     z.enum(["COFFEE", "BAKES", "PLATES"]),
  price:        z.number().positive(),
  description:  z.string().min(1).max(500),
  tastingNotes: z.array(z.string()).optional(),
  origin:       z.string().optional(),
  image:        z.string().url(),
  hot:          z.boolean().optional(),
  available:    z.boolean().optional(),
});

export async function listMenu(req: Request, res: Response, next: NextFunction) {
  try {
    const { category } = req.query;
    const items = await listMenuItems(category as string | undefined);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await getMenuItemById(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function createMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await createMenuItemRecord(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await updateMenuItemRecord(req.params.id, req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function deleteMenuItem(req: Request, res: Response, next: NextFunction) {
  try {
    await softDeleteMenuItem(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
