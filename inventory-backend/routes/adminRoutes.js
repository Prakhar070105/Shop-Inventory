const express = require("express");
const router = express.Router();
const {  adminLogin, updateProduct } = require("../controllers/adminController");


// Login route
router.post("/login", adminLogin);

// Register route
router.put("/product/:id", updateProduct);

module.exports = router;