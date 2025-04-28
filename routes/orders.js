const express = require("express");
const router = express.Router();
const { prisma } = require("../lib/prisma");

// Place a new order
router.post("/", async (req, res) => {
  const { email, total, items } = req.body;
  
  try {
    const order = await prisma.order.create({
      data: {
        email,
        total: parseFloat(total),
        items: {
          create: items.map((item) => ({
            productId: Number(item.productId),
            quantity: Number(item.quantity),
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Failed to place order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders (admin view)
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;