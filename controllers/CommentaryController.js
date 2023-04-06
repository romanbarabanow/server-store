const Product = require("../models/Product");
const Commentary = require("../models/Commentary");

function filterArray(el) {
  const commentary = [];
  el.map(function (el) {
    commentary.push({
      id: el.id,
      itemId: el.itemId,
      author: el.author,
      email: el.email,
      text: el.text,
    });
  });
  return commentary;
}

const addCommentary = async (req, res) => {
  const email = req.email;
  // res.json(email);
  const { itemId, author, text } = req.body;
  const isProductExist = await Product.findOne({ itemId });
  if (isProductExist === null) {
    res.json({ message: "No such products" }).status(400);
  }
  const commentar = new Commentary({
    itemId,
    author,
    email,
    text,
  });
  commentar.save();
  res.json({ itemId, author, email, text }).status(200);
};

const allCommentary = async (req, res) => {
  const { itemId } = req.body;
  const items = await Commentary.find({ itemId });
  if (items.length === 0) {
    res.json({ message: "There are no commentary" });
  }
  const commentary = filterArray(items);
  res.json(commentary).status(200);
};

const removeCommentary = async (req, res) => {
  const { id } = req.body;
  const result = await Commentary.findOne({ email: req.email, _id: id });
  if (result === null) {
    res.json({ message: "This commentary is not exist" });
  }
  await Commentary.deleteOne({ _id: id });
  res.json({ message: "Success" }).status;
};

module.exports = {
  addCommentary,
  allCommentary,
  removeCommentary,
};
