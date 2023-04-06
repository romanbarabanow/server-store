const { Schema, model } = require("mongoose");

const Commentary = new Schema({
  itemId: { type: Number, required: true },
  author: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = model("Commentary", Commentary);
