const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors(
  { origin: ["https://tren-dify-fd.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
  }
));
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

// IMPORTANT: Use process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
