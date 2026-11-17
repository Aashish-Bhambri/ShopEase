import mongoose from "mongoose";
import Product from "../model/Product.js";

// 1. GET ALL PRODUCTS (Admin Table View)
export const getAdminProducts = async (req, res) => {
    try {
        const { search, category, stockStatus, page = 1, limit = 10 } = req.query;
        const query = {};

        // Search by name or brand
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } }
            ];
        }

        if (category) query.category = category;

        // Filter by inventory status
        if (stockStatus === "out_of_stock") {
            query.stock = { $lte: 0 };
        } else if (stockStatus === "low_stock") {
            query.stock = { $gt: 0, $lte: 5 }; // 5 or fewer items remaining
        } else if (stockStatus === "in_stock") {
            query.stock = { $gt: 5 };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [products, total] = await Promise.all([
            Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
            Product.countDocuments(query)
        ]);

        return res.status(200).json({
            success: true,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            products
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 2. GET SINGLE PRODUCT BY ID (For Edit Modal / Page)
export const getAdminProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. CREATE PRODUCT
export const createAdminProduct = async (req, res) => {
    try {
        const {
            name,
            brand,
            category,
            price,
            originalPrice,
            discountPercentage,
            description,
            image,
            images,
            colors,
            sizes,
            stock,
            featured
        } = req.body;

        // Generate base slug
        let baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        let slug = baseSlug;

        // Handle slug uniqueness
        let existingSlug = await Product.findOne({ slug });
        if (existingSlug) {
            slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
        }

        const product = new Product({
            name,
            slug,
            brand,
            category,
            price: Number(price),
            originalPrice: originalPrice ? Number(originalPrice) : Number(price),
            discountPercentage: discountPercentage ? Number(discountPercentage) : 0,
            description,
            image,
            images: images && images.length ? images : [image],
            colors: colors || [],
            sizes: sizes || [],
            stock: Number(stock) || 0,
            featured: Boolean(featured)
        });

        // Schema pre-save hook handles:
        // - discount percentage calculation
        // - inStock flag (stock > 0)
        const savedProduct = await product.save();

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: savedProduct
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

// 4. UPDATE PRODUCT
export const updateAdminProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Apply fields from body
        const updatableFields = [
            "name", "brand", "category", "price", "originalPrice",
            "discountPercentage", "description", "image", "images",
            "colors", "sizes", "stock", "featured", "isNewArrival"
        ];

        updatableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                product[field] = req.body[field];
            }
        });

        // Trigger mongoose save() to run pre-save recalculations
        const updatedProduct = await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

// 5. QUICK INLINE STOCK UPDATE
export const updateProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (stock === undefined || Number(stock) < 0) {
            return res.status(400).json({ success: false, message: "Valid non-negative stock count required" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.stock = Number(stock);
        product.inStock = Number(stock) > 0;
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            stock: product.stock,
            inStock: product.inStock
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 6. DELETE PRODUCT
export const deleteAdminProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 7. INVENTORY & PRODUCT STATS (For Dashboard Widgets)
export const getProductStats = async (req, res) => {
    try {
        const [total, outOfStock, lowStock, featured] = await Promise.all([
            Product.countDocuments(),
            Product.countDocuments({ stock: { $lte: 0 } }),
            Product.countDocuments({ stock: { $gt: 0, $lte: 5 } }),
            Product.countDocuments({ featured: true })
        ]);

        return res.status(200).json({
            success: true,
            stats: {
                totalProducts: total,
                outOfStock,
                lowStock,
                featuredProducts: featured
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};