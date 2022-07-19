const asyncHandler = require("express-async-handler");

const Vaccine = require("../models/vaccineModel");

// @desc    Add new vaccine
// @route   POST /add vaccine
// @access  admin
const addVaccine = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    price,
    stock,
    iamgeUrl,
    made_in,
    preservation,
    vaccine_schedule,
  } = req.body;

  if (!name || !type || !price) {
    res.status(400);
    throw new Error("Vui lòng điền thông tin đầy đủ");
  }

  const vaccine = await Vaccine.create({
    name,
    type,
    description,
    price,
    stock,
    iamgeUrl,
    made_in,
    preservation,
    vaccine_schedule,
  });

  if (vaccine) {
    res.status(201).json(vaccine);
  } else {
    res.status(400);
    throw new Error("Thêm vaccine thất bại");
  }
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateVaccine = asyncHandler(async (req, res) => {
  const vaccine = await Vaccine.findById(req.params.id);

  if (!vaccine) {
    res.status(400);
    throw new Error("Không tìm thấy vaccine");
  }

  const updatedVaccine = await Vaccine.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedVaccine);
});

// @desc    Delete vaccine
// @route   DELETE /api/vaccines/:id
// @access  Admin
const deleteVaccine = asyncHandler(async (req, res) => {
  const vaccine = await Vaccine.findById(req.params.id);

  if (!vaccine) {
    res.status(400);
    throw new Error("Không tìm thấy vaccine");
  }

  await vaccine.remove();

  res.status(200).json({ message: `Đã xóa vaccine với id: ${req.params.id}` });
});

// @desc    Get vaccines
// @route   GET /api/vaccines
// @access  public
const getVaccines = asyncHandler(async (req, res) => {
  const vaccines = await Vaccine.find({});

  res.status(200).json(vaccines);
});

// @desc    Get vaccines
// @route   GET /api/vaccines
// @access  public
const getVaccine = asyncHandler(async (req, res) => {
  const vaccine = await Vaccine.findById(req.params.id);

  if (!vaccine) {
    res.status(400);
    throw new Error("Không tìm thấy vaccine");
  }

  res.status(200).json(vaccine);
});

module.exports = {
  addVaccine,
  getVaccines,
  deleteVaccine,
  updateVaccine,
  getVaccine,
};
