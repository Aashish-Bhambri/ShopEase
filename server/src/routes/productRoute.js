import express from 'express';
import { createProduct, getBestSellers, getProductBySlug, getProducts } from '../controller/product.controller.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/:slug", getProductBySlug);
router.post('/', adminAuth, createProduct);

export default router;
