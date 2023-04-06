const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Favourites = require("../models/Favourites");

function filterArray(item) {
  const products = [];
  item.map(function (el) {
    products.push({
      itemId: el.itemId,
      name: el.name,
      price: el.price,
      description: el.description,
      category: el.category,
    });
  });
  return products;
}

function filterArraySecond(item) {
  const products = [];
  item.map(function (el) {
    products.push({
      itemId: el.itemId,
      name: el.name,
      price: el.price,
      description: el.description,
      category: el.category,
      email: el.email,
    });
  });
  return products;
}

const removeProduct = async (req, res) => {
  const { itemId } = req.body;
  const product = await Product.findOne({ itemId });
  if (product === null) {
    res.json({ message: "There is no products with this name" }).status(400);
  }
  await Product.deleteOne({ itemId });
  res.json({ message: "Success" }).status(200);
};

const allProduct = async (req, res) => {
  const item = await Product.find();
  if (item.length === 0) {
    return res.json({ message: "There is no products" }).status(200);
  }
  const products = filterArray(item);
  res.json(products).status(200);
};

const sortProduct = async (req, res) => {
  const { sort } = req.body;
  const items = await Product.find();
  if (items.length === 0) {
    return res.json({ message: "There is no products" }).status(200);
  }
  if (sort == "down") {
    const sort = items.sort((a, b) => a.price - b.price);
    const products = filterArray(sort);
    return res.json(products).status(200);
  }
  if (sort == "up") {
    const sort = items.sort((a, b) => b.price - a.price);
    const products = filterArray(sort);
    return res.json(products).status(200);
  }
  console.log(typeof sort, sort);
  res.json({ message: "Some errors" }).status(400);
};

const productByCategory = async (req, res) => {
  const { category } = req.body;
  const item = await Product.find({ category });
  if (item.length === 0) {
    return res.json({ message: "There is no products here" }).status(400);
  }
  const products = filterArray(item);
  res.json(products).status(200);
};

const addToCart = async (req, res) => {
  const { itemId } = req.body;
  const item = await Product.findOne({ itemId });
  if (!item) {
    return res.json({ message: "Producst is not exist" }).status(400);
  }
  const isExist = await Cart.findOne({ itemId, email: req.email });
  if (isExist) {
    return res.json({ message: "This item is already in cart" }).status(400);
  }
  const { name, price, description, category } = item;
  const cartItem = new Cart({
    itemId,
    name,
    price,
    description,
    category,
    email: req.email,
  });
  cartItem.save();
  res.json({ message: "Success" }).status(200);
};

const removeItemFromCart = async (req, res) => {
  const { itemId } = req.body;
  const item = await Cart.findOne({ itemId, email: req.email });
  if (item == null) {
    return res.json({ message: "This product is not exist" });
  }
  await Cart.findOneAndDelete({ itemId, email: req.email });
  res.json({ message: "Success" }).status(200);
};

const getAllInCart = async (req, res) => {
  const item = await Cart.find({ email: req.email });
  if (item.length === 0) {
    return res.json({ message: "There is no products here" }).status(200);
  }
  const cart = filterArraySecond(item);
  res.json(cart).status(200);
};

const addToFavoutite = async (req, res) => {
  const { itemId } = req.body;
  const item = await Product.findOne({ itemId });
  if (!item) {
    return res.json({ message: "Producst is not exist" }).status(400);
  }
  const isExist = await Favourites.findOne({ itemId, email: req.email });
  if (isExist) {
    return res
      .json({ message: "This item is already in favourities" })
      .status(400);
  }
  const { name, price, description, category } = item;
  const favouriteItem = new Favourites({
    itemId,
    name,
    price,
    description,
    category,
    email: req.email,
  });
  favouriteItem.save();
  res.json({ message: "Success" }).status(200);
};

const removeFromFavourites = async (req, res) => {
  const { itemId } = req.body;
  const item = await Favourites.findOne({ itemId, email: req.email });
  if (!item) {
    return res
      .json({ message: "The product was not found in favorites" })
      .status(400);
  }
  await Favourites.findOneAndDelete({ itemId, email: req.email });
  res.json({ message: "Success" }).status(200);
};

const getFavourites = async (req, res) => {
  const item = await Favourites.find({ email: req.email });
  if (item.length === 0 || item === null) {
    return res.json({ message: "There are no products here" }).status(200);
  }
  const favourites = filterArraySecond(item);
  res.json(favourites).status(200);
};

module.exports = {
  removeProduct,
  allProduct,
  productByCategory,
  addToCart,
  getAllInCart,
  addToFavoutite,
  removeFromFavourites,
  getFavourites,
  removeItemFromCart,
  sortProduct,
};
