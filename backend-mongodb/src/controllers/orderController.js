const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const { v4: uuidv4 } = require("uuid");

const createOrder = asyncHandler(async (req, res) => {
  const { userId, total, paymentType, status, vaccines } = req.body;

  const orderId = uuidv4();

  const order = await Order.create({
    userId: userId,
    orderId: orderId,
    total: total,
    paymentType: paymentType,
    status: status,
    vaccines: vaccines,
  });

  if (order) {
    await Cart.findOneAndRemove({ userId: userId });
    await User.updateOne({ userId: userId }, { $push: { orders: order._id } });
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("Tạo đơn hàng không thành công");
  }
});

module.exports = {
  createOrder,
};
