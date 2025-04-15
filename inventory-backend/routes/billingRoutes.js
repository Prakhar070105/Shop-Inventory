const express = require("express");
const router = express.Router();
const { processBilling } = require("../controllers/billingController");

router.post("/bill", processBilling);

module.exports = router;