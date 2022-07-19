const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

const addCart = asyncHandler(async (req, res) => {
  const { userId, ...vaccine } = req.body;
  const cartExists = await Cart.findOne({ userId: userId });

  // Check If user cart exists
  if (cartExists) {
    const vaccineExists = await Cart.findOne({
      "vaccines.vaccineId": vaccine.vaccineId,
    });
    // check if vaccine in cart exists, if not then add new one
    if (vaccineExists) {
      const updatedCart = await Cart.updateOne(
        { $and: [{ userId: userId, "vaccines.vaccineId": vaccine.vaccineId }] },
        {
          $inc: {
            "vaccines.$.quantity": vaccine.quantity,
          },
        }
      );
      res.status(200).json(updatedCart);
    } else {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: userId },
        { $addToSet: { vaccines: vaccine } }
      );
      res.status(200).json(updatedCart);
    }
  } else {
    const cartInput = {
      userId: userId,
      vaccines: [{ ...vaccine }],
    };

    const newCart = new Cart(cartInput);
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  }
});



const updateCart = asyncHandler(async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400);
    throw new Error("Không thành công");
  }
});



const deleteCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.id });
    if (cart) {
      return res.status(200).json({ message: "Cart has been deleted" });
    }
    res.status(200).json({ message: "Cart has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});



const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.id });
  console.log(cart);
  res.status(200).json(cart.vaccines);
});



module.exports = {
  addCart,
  getCart,
  updateCart,
  deleteCart,
};
