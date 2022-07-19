const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VaccineScheme = new Schema(
  {
    
    name: {type: String, required: true},

    type: {type: String, required: true},

    description: {type: String},

    price: {type:Number, default:0},

    stock: {type: Number, default: 0},

    imageUrl: {type: String},

    made_in: {type: String},

    preservation: {type: Array},

    vaccine_schedule: {type: Array}

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vaccine", VaccineScheme);
