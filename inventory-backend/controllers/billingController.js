const Product = require("../models/Product");

const processBilling = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate quantity
    const qty = parseInt(quantity);
    if (!productId || !qty || qty <= 0) {
      return res.status(400).json({ message: "Invalid product ID or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.quantity -= qty;
    await product.save();

    res.status(200).json({ message: "Billing successful", product });
  } catch (error) {
    console.error("Billing error:", error);
    res.status(500).json({ message: "Billing failed", error: error.message });
  }
};

module.exports = { processBilling };