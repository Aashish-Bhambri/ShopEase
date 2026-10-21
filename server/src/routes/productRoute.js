import express from 'express';
import { createProduct, getBestSellers, getProductBySlug, getProducts } from '../controller/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/:slug", getProductBySlug);
router.post('/',createProduct)

export default router;