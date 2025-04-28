const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

// Place a new order
router.post("/", async (req, res) => {
  try {
    const { email, total, items } = req.body;

    const order = await prisma.order.create({
      data: {
        email,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders (admin)
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;