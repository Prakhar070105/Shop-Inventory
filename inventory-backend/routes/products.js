const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products by category (safe route: /category/:categoryName)
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add other product routes below (example: update product)
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { price, stock } = req.body;
  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { price, 
        quantity: stock, 
      },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;