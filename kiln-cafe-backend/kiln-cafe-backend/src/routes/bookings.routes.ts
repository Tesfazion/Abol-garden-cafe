import { Router } from "express";
import {
  postBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  patchBookingStatus,
  deleteBooking,
  createBookingSchema,
  updateBookingStatusSchema,
} from "../controllers/bookings.controller";
import { requireAuth, requireRole, optionalAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";

const router = Router();

router.post("/", optionalAuth, validateBody(createBookingSchema), postBooking);

router.get("/mine", requireAuth, getMyBookings);
router.get("/:id", requireAuth, getBookingById);
router.delete("/:id", requireAuth, deleteBooking); // customer cancels own booking

// Staff dashboard
router.get("/", requireAuth, requireRole("STAFF", "ADMIN"), getAllBookings);
router.patch(
  "/:id/status",
  requireAuth,
  requireRole("STAFF", "ADMIN"),
  validateBody(updateBookingStatusSchema),
  patchBookingStatus
);

export default router;
