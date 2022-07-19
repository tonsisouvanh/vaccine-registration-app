const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/create-order", createOrder);

module.exports = router;
