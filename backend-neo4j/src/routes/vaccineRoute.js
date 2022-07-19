const express = require("express");
const {
  getAllVaccines,
  getRecommendedVaccines,
} = require("../controllers/vaccineController.js");

const router = express.Router();

// * GET
// get all Vaccines
router.get("/", getAllVaccines);
router.get("/recommend-vaccines/:user_id", getRecommendedVaccines);


module.exports = router;
