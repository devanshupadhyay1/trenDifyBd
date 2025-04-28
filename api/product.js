const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const prisma = require("../lib/prisma");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ADD a new product
router.post("/", async (req, res) => {
  const { name, price, image, categoryId } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name, price: parseFloat(price), image, categoryId: Number(categoryId) },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// UPDATE a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, image, categoryId } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price: parseFloat(price), image, categoryId: Number(categoryId) },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// BATCH UPLOAD from products.json
router.post("/batch-upload", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/products.json");
    const data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);

    for (const prod of products) {
      const category = await prisma.category.findFirst({
        where: { name: prod.category },
      });

      if (category) {
        await prisma.product.create({
          data: {
            name: prod.name,
            price: prod.price,
            image: prod.image,
            categoryId: category.id,
          },
        });
      }
    }

    res.status(201).json({ message: "Products uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Batch upload failed" });
  }
});

module.exports = router;