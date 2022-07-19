const express = require("express");
const router = express.Router();
const {
  register,
  getHistory
} = require("../controllers/registrartionController");


router.post("/register", register);
router.get("/history", getHistory);

module.exports = router;
