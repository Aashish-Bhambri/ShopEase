import { Router } from "express";
import { login } from "../controller/admin.controller.js";

const router= Router()

router.post("/admin/login",login);
router.get("/admin/login",login);

export default router;