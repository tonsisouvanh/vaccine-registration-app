const express = require("express");
const router = express.Router();
const {
  addVaccine,
  getVaccines,
  getVaccine,
  deleteVaccine,
  updateVaccine,
} = require("../controllers/vacccineController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/create", verifyAdmin, addVaccine);
router.get("/", getVaccines);
router.get("/:id", getVaccine);
router.delete("/delete/:id", verifyAdmin, deleteVaccine);
router.put("/update/:id", verifyAdmin, updateVaccine);

module.exports = router;
