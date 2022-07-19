const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");


// @desc    Register new admin
// @route   POST /register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { fullname, email, password, role, imgUrl } = req.body;

  if (!fullname || !email || !password || !role) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  // Check if admin exists
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin
  const admin = await Admin.create({
    fullname,
    email,
    password: hashedPassword,
    role,
    imgUrl,
    salt,
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      fullname: admin.fullname,
      email: admin.email,
      role: admin.role,
      imgUrl: admin.imgUrl,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});



// @desc    Authenticate a admin
// @route   POST /login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for admin email
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      fullname: admin.fullname,
      email: admin.email,
      role: admin.role,
      imgUrl: admin.imgUrl,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});



// @desc    Get admin data
// @route   GET /profile
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin);
});



// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};



module.exports = {
  registerAdmin,
  loginAdmin,
  getMe,
};
