const express = require("express");
const router = express.Router();
const { addCart, updateCart,getCart } = require("../controllers/cartController");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/add-cart", verifyUser, addCart);
router.put("/update-cart/:id", verifyUser, updateCart);
router.get("/get-cart/:id", verifyUser, getCart);

module.exports = router;
