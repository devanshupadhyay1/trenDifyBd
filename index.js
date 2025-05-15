const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

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

// Attach Prisma to request (optional but useful in routes)
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Importing route files
const adminRoutes = require("./api/admin");
const checkoutRoutes = require("./api/checkout");
const productRoutes = require("./api/product");
const categoryRoutes = require("./api/categories");
const orderRoutes = require("./api/orders");

// Route usage
app.use("/api/admin", adminRoutes);
app.use("/api", checkoutRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// Start server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;