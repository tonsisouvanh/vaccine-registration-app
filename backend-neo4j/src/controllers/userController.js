const router = require("express").Router();
// const bcrypt = require("bcrypt");
// const { check, validationResult } = require("express-validator");
// const cypher = require("../cypher");
// const { rounds } = require("../config");
const User = require("../models/userModel.js");
// const { generateToken } = require("../middleware/auth");
// const validate = require("../middleware/validate");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
  }
};


module.exports = { getUsers };
