// src/scripts/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Product from "../model/Product.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(scriptDirectory, "../../.env") });

const seedProducts = async () => {
  try {
    const mongoUri = process.env.MONGO_URI?.trim();
    if (!mongoUri) {
      throw new Error("MONGO_URI is not set. Add it to server/.env or the environment before seeding.");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // 1. Read products from your JSON file
    const rawData = fs.readFileSync(resolve(scriptDirectory, "../data/shopease-products.json"), "utf-8");
    const { products } = JSON.parse(rawData);

    await Promise.all(products.map((product) => new Product(product).validate()));

    // 2. Replace existing products only after validating the full catalog
    await Product.deleteMany({});
    console.log("Old products cleared");

    // 3. Insert all products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products!`);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();