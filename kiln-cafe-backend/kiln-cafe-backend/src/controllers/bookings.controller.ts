import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  createBooking,
  listBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
} from "../services/bookings.service";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const createBookingSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  partySize: z.number().int().min(1).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD"),
  time: z.string().regex(timeRegex, "Expected HH:mm"),
  notes: z.string().max(500).optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"]),
});

export async function postBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await createBooking({ ...req.body, userId: req.user?.sub });
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

export async function getMyBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const bookings = await listBookings({ userId: req.user!.sub });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

export async function getAllBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const { status, date } = req.query;
    const bookings = await listBookings({
      status: status as any,
      date: date ? new Date(String(date)) : undefined,
    });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

export async function getBookingById(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await getBooking(req.params.id);
    res.json(booking);
  } catch (err) {
    next(err);
  }
}

export async function patchBookingStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await updateBookingStatus(req.params.id, req.body.status);
    res.json(booking);
  } catch (err) {
    next(err);
  }
}

export async function deleteBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await cancelBooking(req.params.id, req.user?.sub);
    res.json(booking);
  } catch (err) {
    next(err);
  }
}
