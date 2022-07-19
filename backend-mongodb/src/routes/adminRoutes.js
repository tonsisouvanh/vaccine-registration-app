const express = require("express");
const router = express.Router();
const {
  registerAdmin, loginAdmin, getMe
} = require("../controllers/adminController");
const { verifyAdmin } = require("../middleware/authMiddleware");


router.post("/register", registerAdmin);
router.post("/login",loginAdmin);
router.get("/profile",verifyAdmin, getMe);




module.exports = router;
