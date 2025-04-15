const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express(); // Define app

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/groceryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

const billingRoutes = require("./routes/billingRoutes");
app.use("/api/billing", billingRoutes);

// Product Routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Checkout Routes
const checkoutRoutes = require("./routes/checkout");
app.use("/checkout", checkoutRoutes);

// Admin Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// Start server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});