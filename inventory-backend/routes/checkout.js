// routes/checkout.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product"); // Adjust if your Product model is elsewhere

router.post("/", async (req, res) => {
   console.log("Checkout API hit");
   
  const { items, upiId } = req.body;

  console.log("Received checkout request:", req.body);  

  if (!upiId || items.length === 0) {
    return res.status(400).json({ success: false, error: "Invalid request" });
  }

  try {
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }

      if (product.quantity < item.quantityToBuy) {
        return res.status(400).json({ success: false, error: `Not enough stock for ${product.name}` });
      }

      product.quantity -= item.quantityToBuy;
      await product.save();
    }

    return res.json({ success: true, message: "Inventory updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;