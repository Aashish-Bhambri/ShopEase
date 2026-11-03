// src/controllers/productController.js
import mongoose from "mongoose";
import Product from "../model/Product.js";

// GET /api/products - Supports search, category, brand, price, & sort
export const getProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, search, sort, page = 1, limit = 12 } = req.query;

    const query = {};

    // Filters matching your UI sidebar
    if (category) query.category = category;
    if (brand) query.brand = { $in: brand.split(",") }; // e.g. brand=Nike,Adidas
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "price-low") sortOption = { price: 1 };
    if (sort === "price-high") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query).sort(sortOption).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/bestsellers - Featured items for homepage 
export const getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({ featured: true }).limit(4);
    res.json({ success: true, products: bestSellers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:slug - Single product details page (supports slug, ObjectId, or id)
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let product = await Product.findOne({ slug });

    if (!product && mongoose.isValidObjectId(slug)) {
      product = await Product.findById(slug);
    }

    if (!product) {
      product = await Product.findOne({ id: slug });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products - Admin creates a new single product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      originalPrice,
      description,
      image,
      images,
      colors,
      sizes,
      stock
    } = req.body;

    // Auto-generate slug from name if not provided
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const product = new Product({
      name,
      slug,
      brand,
      category,
      price,
      originalPrice,
      description,
      image,
      images: images || [image],
      colors: colors || [],
      sizes: sizes || [],
      stock: stock || 0
    });

    // The pre('save') hook runs here automatically:
    // It calculates discountPercentage and sets inStock = true/false
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
