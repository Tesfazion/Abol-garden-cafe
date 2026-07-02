import { Router, Request, Response, NextFunction } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { Order } from "../models/order.model";
import { Booking } from "../models/booking.model";

const router = Router();

router.use(requireAuth, requireRole("STAFF", "ADMIN"));

router.get("/summary", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const now       = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const [pendingOrders, todaysBookings, revenueResult] = await Promise.all([
      Order.countDocuments({ status: { $in: ["PENDING", "CONFIRMED", "PREPARING"] } }),

      Booking.countDocuments({
        date:   { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ["PENDING", "CONFIRMED"] },
      }),

      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfDay },
            status:    { $ne: "CANCELLED" },
          },
        },
        { $group: { _id: null, total: { $sum: "$subtotal" } } },
      ]),
    ]);

    res.json({
      pendingOrders,
      todaysBookings,
      revenueToday: (revenueResult[0]?.total as number | undefined) ?? 0,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
