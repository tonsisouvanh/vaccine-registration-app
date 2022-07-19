const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: String,
    phone: { type: String, required: true },
    phone: { type: String },
    dob: { type: Date },
    sex: String,
    citizenId: { type: String, required: true },
    address: {
      number: String,
      street: String,
      sub_district: String,
      district: String,
      city: String,
    },
    // cart: [{ type: Schema.Types.ObjectId, ref: "vaccine", require: true }],
    orders: [{ type: Schema.Types.ObjectId, ref: "order", require: true }],
    vaccine_registration: [
      { type: Schema.Types.ObjectId, ref: "order", require: true },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
