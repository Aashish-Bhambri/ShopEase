import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxlength: [160, "Product name cannot exceed 160 characters"]
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        brand: {
            type: String,
            required: [true, "Brand is required"],
            trim: true,
            index: true
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            index: true
        },
        subcategory: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },
        originalPrice: {
            type: Number,
            min: [0, "Original price cannot be negative"],
            default: null
        },
        discountPercentage: {
            type: Number,
            default: 0,
            min: [0, "Discount cannot be negative"],
            max: [100, "Discount cannot exceed 100%"]
        },
        currency: {
            type: String,
            default: "USD",
            uppercase: true,
            trim: true
        },
        image: {
            type: String,
            required: [true, "Primary product image is required"]
        },
        images: {
            type: [String],
            default: []
        },
        colors: {
            type: [String],
            default: []
        },
        sizes: {
            type: [String],
            default: []
        },
        features: {
            type: [String],
            default: []
        },
        specifications: [
            {
                label: { type: String, required: true, trim: true },
                value: { type: String, required: true, trim: true }
            }
        ],
        stock: {
            type: Number,
            required: [true, "Stock count is required"],
            min: [0, "Stock cannot be negative"],
            default: 0
        },
        inStock: {
            type: Boolean,
            default: true
        },
        freeShipping: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 0,
            min: [0, "Rating cannot be below 0"],
            max: [5, "Rating cannot exceed 5"]
        },
        reviewCount: {
            type: Number,
            default: 0,
            min: 0
        },
        featured: {
            type: Boolean,
            default: false,
            index: true
        },
        isNewArrival: {
            type: Boolean,
            default: false
        },
        tags: {
            type: [String],
            default: [],
            lowercase: true,
            trim: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

productSchema.pre("save", function (next) {
    if (!this.originalPrice) {
        this.originalPrice = this.price;
    }
    if (this.isModified("discountPercentage") && this.discountPercentage > 0) {
        const DiscountAmount = (this.originalPrice * this.discountPercentage) / 100;
        this.price = Math.round((this.originalPrice - DiscountAmount) * 100) / 100;
    }
    else if (this.originalPrice > this.price) {
        this.discountPercentage = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100
        );
    } else {
        this.discountPercentage = 0;
    }

    this.inStock = this.stock > 0;
    next();
})

productSchema.index({name:"text",brand:"text",tags:"text"});

export default mongoose.model("Product",productSchema);