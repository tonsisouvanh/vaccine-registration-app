const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
