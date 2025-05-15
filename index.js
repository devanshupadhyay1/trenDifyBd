const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://tren-dify-fd.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Importing route files
const adminRoutes = require("./api/admin");
const checkoutRoutes = require("./api/checkout");
const productRoutes = require("./api/product.tsx");
const categoryRoutes = require("./api/categories");
const orderRoutes = require("./api/orders");

// Route usage
app.use("/api/admin", adminRoutes);
app.use("/api", checkoutRoutes);
app.use("/api/products.tsx", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Start server if not in serverless mode
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;