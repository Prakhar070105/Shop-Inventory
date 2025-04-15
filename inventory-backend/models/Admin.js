const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // You can hash later
});

module.exports = mongoose.model("Admin", adminSchema);