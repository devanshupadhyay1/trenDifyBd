const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  // Dummy login logic
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "admin123") {
    return res.json({ token: "adminTokenExample123" });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;