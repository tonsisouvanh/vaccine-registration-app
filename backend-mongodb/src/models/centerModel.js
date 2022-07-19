const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CenterSchema = new Schema(
  {
    name: {type: String, required: true},
    address: { type: String, required: true}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("center", CenterSchema);
