import express from 'express';
import { createProduct, getBestSellers, getProductBySlug, getProducts } from '../controller/product.controller.js';
import adminAuth from '../middleware/adminAuth.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

// 1. Best Sellers: Cache for 15 minutes (900 seconds)
router.get("/bestsellers", cacheMiddleware(900), getBestSellers);

// 2. Single Product Details: Cache for 1 hour (3600 seconds)
router.get("/:slug", cacheMiddleware(3600), getProductBySlug);

// 3. Product Catalog & Filters: Cache for 5 minutes (300 seconds)
router.get("/", cacheMiddleware(300), getProducts);

// 4. Create Product (Write operation)
router.post('/', adminAuth, createProduct);

export default router;