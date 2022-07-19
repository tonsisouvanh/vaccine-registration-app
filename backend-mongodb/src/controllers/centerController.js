const asyncHandler = require("express-async-handler");
const Center = require("../models/centerModel");

const getCenters = asyncHandler(async (req, res) => {
  const vacCenters = await Center.find({});

  res.status(200).json(vacCenters);
});

module.exports = { getCenters };
