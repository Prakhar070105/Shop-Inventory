const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("Product", productSchema);