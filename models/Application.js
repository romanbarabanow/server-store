const { Schema, model } = require("mongoose");

const Application = new Schema({
  itemId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  progress: { type: String, default: "in progress" },
});

module.exports = model("Application", Application);
