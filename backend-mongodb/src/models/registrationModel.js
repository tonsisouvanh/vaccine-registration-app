const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegistrationScheme = new Schema(
  {
    phone: { type: String },
    fullname: { type: String },
    dob: { type: String },
    email: { type: String },
    sex: { type: String },
    citizenId: { type: String },
    status: { type: Boolean, default: false },
    cus_address: {
      number: String,
      street: String,
      sub_district: String,
      district: String,
      city: String,
    },
    vaccinesId: [
      { type: Schema.Types.ObjectId, ref: "vaccine", require: true },
    ],
    vaccination_date: { type: Date, required: true },
    vaccination_center: {
      center_name: { type: String, required: true },
      address: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("registration", RegistrationScheme);
