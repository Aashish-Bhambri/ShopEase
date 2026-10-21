// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import productRoute from "./src/routes/productRoute.js";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(serverDirectory, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

// Mount product API
app.use("/api/products", productRoute);

const startServer = async () => {
  const mongoUri = process.env.MONGO_URI?.trim();
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set. Add it to server/.env or the environment before starting the server.");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
  app.listen(5000, () => console.log("Server running on port 5000"));
};

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exitCode = 1;
});