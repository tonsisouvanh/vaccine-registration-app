const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Registration = require("../models/registrationModel");
const { format } = require("date-fns");
// @desc    Register new registration
// @route   POST /register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const {
    phone,
    fullname,
    email,
    dob,
    sex,
    citizenId,
    number,
    street,
    sub_district,
    district,
    city,
    vaccinesId,
    vaccination_date,
    center_name,
    address,
  } = req.body;

  // check if required fields are not empty
  if (!fullname || !email || !phone || !citizenId) {
    res.status(400);
    throw new Error("Vui lòng điền thông tin cần thiết");
  }

  const cus_address = {
    number,
    street,
    sub_district,
    district,
    city,
  };

  const vaccination_center = {
    center_name,
    address,
  };

  // Create registration
  const registration = await Registration.create({
    phone,
    fullname,
    dob,
    email,
    sex,
    citizenId,
    cus_address: cus_address,
    vaccinesId,
    vaccination_date: vaccination_date,
    vaccination_center: vaccination_center,
  });

  if (registration) {
    res.status(201).json({
      fullname: registration.fullname,
      email: registration.email,
      center: registration.vaccination_center,
      vaccines: vaccinesId,
      vaccination_date: vaccination_date,
      // vaccines_registered: vaccines_registered
    });
  } else {
    res.status(400);
    throw new Error("Thông tin đăng ký tiêm không hợp lệ");
  }
});



// @desc    Get registration data
// @route   GET /
// @access  Private
const getAllRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.find({}).populate("vaccinesId");
  res.status(200).json(registration);
});

// @desc    Get registration data
// @route   GET /history
// @access  Private
const getHistory = asyncHandler(async (req, res) => {
  const { phone, citizenId } = req.query;

  // check if required fields are not empty
  if (!phone || !citizenId) {
    res.status(400);
    throw new Error("Vui lòng điền số điện thoại và cmnd/cccd");
  }

  const registration = await Registration.find(
    {
      $or: [{ phone, citizenId }],
    },
    {
      phone: 0,
      fullname: 0,
      cus_address: 0,
      dob: 0,
      citizenId: 0,
      email: 0,
      sex: 0,
    }
  ).populate("vaccinesId");

  if (!registration || registration.length === 0) {
    res.status(400);
    throw new Error("Số điện thoại hoặc cmnd/cccd không đúng");
  }

  res.status(200).json(registration);
});


module.exports = {
  register,
  getAllRegistration,
  getHistory,
};
