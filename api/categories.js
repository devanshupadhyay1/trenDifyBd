const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// ADD a new category
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to add category" });
  }
});

// DELETE a category
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;