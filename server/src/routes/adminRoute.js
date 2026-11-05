import { Router } from "express";
import { login, refreshAccessToken, getAdminProfile } from "../controller/admin.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = Router();

router.post("/admin/login", login);
router.post("/admin/refresh-token", refreshAccessToken);
router.get("/admin/me", adminAuth, getAdminProfile);

export default router;
