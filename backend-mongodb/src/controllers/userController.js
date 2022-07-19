const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongo = require("mongodb");



// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    password,
    phone,
    dob,
    sex,
    citizenId,
    number,
    street,
    sub_district,
    district,
    city,
  } = req.body;

  if (!fullname || !email || !password || !phone || !citizenId) {
    res.status(400);
    throw new Error("Please add all required fields");
  }
  //Check if user exists
  const userExists = await User.findOne({
    $or: [{ email }, { phone }, { citizenId }],
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const address = {
    number: number,
    street: street,
    sub_district: sub_district,
    district: district,
    city: city,
  };

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
    phone,
    dob,
    sex,
    citizenId,
    salt,
    address, // need to handle for adding address
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});



// @desc    Authenticate a user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      dob: user.dob,
      sex: user.sex,
      citizenId: user.citizenId,
      cart: user.cart,
      order: user.orders,
      address: user.address,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});



// @desc    Get user data
// @route   GET /profile
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get user data
// @route   GET /profile
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});




// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
};
