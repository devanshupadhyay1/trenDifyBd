const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://tren-dify-fd.vercel.app", // your frontend deployed URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Importing route files
const adminRoutes = require("./routes/admin");
const checkoutRoutes = require("./routes/checkout");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");

// Route usage
app.use("/api/admin", adminRoutes);
app.use("/api", checkoutRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

// Test route (optional, for health check)
app.get("/", (req, res) => {
  res.send("Backend Server is Running!");
});