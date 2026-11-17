// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import productRoute from "./src/routes/productRoute.js";
import adminRoute from "./src/routes/adminRoute.js";
import { connectRedis } from "./src/service/redis.js";


const serverDirectory = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(serverDirectory, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

let connectionPromise;

const connectToDatabase = () => {
  const mongoUri = process.env.MONGO_URI?.trim();
  if (!mongoUri) {
    return Promise.reject(
      new Error("MONGO_URI is not set. Add it to server/.env or the environment before starting the server.")
    );
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoUri).catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  return connectionPromise;
};

app.use("/api", async (req, res, next) => {
  try {
    await Promise.all([connectToDatabase(), connectRedis()]);
    next();
  } catch (error) {
    console.error("Connection failed:", error);
    next(error);
  }
});

// Mount product API
app.use("/api/products", productRoute);
app.use("/api", adminRoute);

// Root health-check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "ShopEase API Server is running",
    endpoints: {
      products: "/api/products",
      bestsellers: "/api/products/bestsellers"
    }
  });
});

export default app;

if (!process.env.VERCEL) {
  const port = process.env.PORT
  Promise.all([connectToDatabase(), connectRedis()])
    .then(() => {
      console.log("Connected to MongoDB");
      console.log("Connected to Redis");
      app.listen(Number(port) || 5000, () => console.log(`Server running at ${port}`));
    })
    .catch((error) => {
      console.error("Server startup failed:", error);
      process.exitCode = 1;
    });
}