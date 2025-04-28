const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Local frontend
  "https://tren-dify-fd.vercel.app", // Your Vercel frontend
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

// Health Check route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Export the app for Vercel
module.exports = app;