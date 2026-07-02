import { Router } from "express";
import {
  postOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  patchOrderStatus,
  createOrderSchema,
  updateStatusSchema,
} from "../controllers/orders.controller";
import { requireAuth, requireRole, optionalAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";

const router = Router();

// Guests can order without an account; optionalAuth attaches a user if logged in.
router.post("/", optionalAuth, validateBody(createOrderSchema), postOrder);

router.get("/mine", requireAuth, getMyOrders);
router.get("/:id", requireAuth, getOrderById);

// Staff dashboard
router.get("/", requireAuth, requireRole("STAFF", "ADMIN"), getAllOrders);
router.patch(
  "/:id/status",
  requireAuth,
  requireRole("STAFF", "ADMIN"),
  validateBody(updateStatusSchema),
  patchOrderStatus
);

export default router;
