const router = require("express").Router();
// const bcrypt = require("bcrypt");
// const { check, validationResult } = require("express-validator");
// const cypher = require("../cypher");
// const { rounds } = require("../config");
const Vaccine = require("../models/vaccineModel.js");
// const { generateToken } = require("../middleware/auth");
// const validate = require("../middleware/validate");

const getAllVaccines = async (req, res) => {

  // const id = req.params.id;
  // const newUser = req.body;
  try {
    const vaccines = await Vaccine.getAllVaccines();
    // res.status(200).json(updatedUser);
    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500);
  }
};

const getRecommendedVaccines = async (req, res) => {

  const user_id = req.params.user_id;

  try {
    const vaccines = await Vaccine.getRecommendedVaccines(user_id);

    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500);
  }
};


module.exports = { getAllVaccines,getRecommendedVaccines };
