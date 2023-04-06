const { Schema, model } = require("mongoose");

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: Number },
});

module.exports = model("User", User);
