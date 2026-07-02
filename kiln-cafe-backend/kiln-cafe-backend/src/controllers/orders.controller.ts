import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrderStatus,
} from "../services/orders.service";

export const createOrderSchema = z.object({
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(1).optional(),
  deliveryAddress: z.string().min(5).max(300),
  lines: z
    .array(
      z.object({
        menuItemId: z.string().uuid(),
        quantity: z.number().int().positive().max(50),
      })
    )
    .min(1),
});

export const updateStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ]),
});

export async function postOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await createOrder({
      ...req.body,
      userId: req.user?.sub,
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await getOrder(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await listOrders({ userId: req.user!.sub });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getAllOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const status = req.query.status as any;
    const orders = await listOrders(status ? { status } : {});
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function patchOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (err) {
    next(err);
  }
}
