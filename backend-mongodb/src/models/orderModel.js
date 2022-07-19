const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    vaccines: [
      {
        vaccineId: {
          type: String,
        },
        imgUrl: {
          type: String,
        },
        name: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
      },
    ],
    total: { type: Number, default: 0 },
    paymentType: { type: String },
    status: { type: String, default: "chưa thanh toán" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
