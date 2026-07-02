import { Router } from "express";
import { register, login, registerSchema, loginSchema } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate";
import { authLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/register", authLimiter, validateBody(registerSchema), register);
router.post("/login", authLimiter, validateBody(loginSchema), login);

export default router;
