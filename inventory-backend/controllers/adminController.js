const Admin = require("../models/Admin");
const Product = require("../models/Product");

// Admin login controller
const adminLogin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const admin = await Admin.findOne({ phone, password });

    if (admin) {
      res.status(200).json({ message: "Login successful", admin });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
};

// Update product price and stock
const updateProduct = async (req, res) => {
  const { price, stock } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { price, stock },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err });
  }
};

module.exports = {
  adminLogin,
  updateProduct,
};