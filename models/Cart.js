const { Schema, model } = require("mongoose");

const Cart = new Schema({
  itemId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = model("Cart", Cart);
