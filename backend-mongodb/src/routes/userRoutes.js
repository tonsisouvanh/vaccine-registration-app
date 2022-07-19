const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
} = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyUser, getMe);
router.get("/", verifyAdmin, getAllUsers);

module.exports = router;
