import { Router } from "express";
import {
  listMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  menuItemSchema,
} from "../controllers/menu.controller";
import { requireAuth, requireRole } from "../middleware/auth";
import { validateBody } from "../middleware/validate";

const router = Router();

// Public
router.get("/", listMenu);
router.get("/:id", getMenuItem);

// Staff/Admin only
router.post(
  "/",
  requireAuth,
  requireRole("STAFF", "ADMIN"),
  validateBody(menuItemSchema),
  createMenuItem
);
router.patch(
  "/:id",
  requireAuth,
  requireRole("STAFF", "ADMIN"),
  validateBody(menuItemSchema.partial()),
  updateMenuItem
);
router.delete(
  "/:id",
  requireAuth,
  requireRole("STAFF", "ADMIN"),
  deleteMenuItem
);

export default router;
