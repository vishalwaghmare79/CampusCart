import express from "express";
import { authRoutes } from "./routes/authRoutes.js";
import { categoryRoutes } from "./routes/categoryRoute.js";
import { productRoutes } from "./routes/productRoute.js";
import { wishlistRoutes } from "./routes/wishlistRoute.js";
import { orderRoutes } from "./routes/orderRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios"; // Keep if used inside routes

dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- API Routes ----------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/order", orderRoutes);

// ---------- Serve React Frontend ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files (after Docker build)
app.use(express.static(path.join(__dirname, "..", "public")));

// Handle all other routes by sending React index.html
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// ---------- Start Server ----------
const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running at http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to Database:", error.message);
  });
