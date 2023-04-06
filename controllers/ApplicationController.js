const Application = require("../models/Application");
const Product = require("../models/Product");

function filterTheArray(item) {
  const application = [];
  item.map(function (el) {
    application.push({
      itemId: el.itemId,
      name: el.name,
      price: el.price,
      description: el.description,
      category: el.category,
      progress: el.progress,
    });
  });
  return application;
}

const createRequest = async (req, res) => {
  const { itemId, name, price, category, description } = req.body;
  const isExist = await Application.findOne({ itemId });
  if (isExist) {
    return res.json({ message: "This request is already exist" }).status(400);
  }
  const request = new Application({
    itemId,
    name,
    price,
    category,
    description,
  });
  request.save();
  res.json({
    itemId,
    name,
    price,
    category,
    description,
    progress: "in progress",
  });
};

const rejectApplication = async (req, res) => {
  const { itemId } = req.body;
  const candidat = await Application.findOne({ itemId });
  if (candidat === null) {
    return res.json({ message: "There are no such applications" }).status(400);
  }
  if (candidat.progress === "accepted") {
    return res
      .json({ message: "This application is already accepted" })
      .status(400);
  }
  if (candidat.progress === "rejected") {
    return res
      .json({ message: "This application is already rejected" })
      .status(400);
  }
  await Application.findOneAndUpdate({ itemId }, { progress: "rejected" });
  res.json({ message: "Success" }).status(200);
};

const allApplications = async (req, res) => {
  const item = await Application.find();
  if (item.length === 0) {
    return res.json({ message: "There are no applications" }).status(200);
  }
  const applications = filterTheArray(item);
  res.json(applications).status(200);
};

const applicationsByCategory = async (req, res) => {
  const { filter } = req.body;
  const candidat = await Application.find({ progress: filter });
  if (candidat.length == 0) {
    return res.json({ message: "No application or such category" }).status(200);
  }
  const applications = filterTheArray(candidat);
  return res.json(applications).status(200);
};

const acceptApplication = async (req, res) => {
  const { itemId } = req.body;
  const candidat = await Application.findOne({ itemId });
  if (candidat === null) {
    return res.json({ message: "There are no such applications" }).status(400);
  }
  if (candidat.progress === "accepted") {
    return res
      .json({ message: "This application is already accepted" })
      .status(400);
  }
  if (candidat.progress === "rejected") {
    return res
      .json({ message: "This application is already rejected" })
      .status(400);
  }
  const isExist = await Product.findOne({ itemId });
  if (isExist) {
    return res.json({ message: "This product is already exist" }).status(400);
  }
  await Application.findOneAndUpdate({ itemId }, { progress: "accepted" });
  const product = new Product({
    itemId: candidat.itemId,
    name: candidat.name,
    price: candidat.price,
    description: candidat.description,
    category: candidat.category,
  });
  product.save();
  res.json({ message: "Success" }).status(200);
};

module.exports = {
  createRequest,
  rejectApplication,
  acceptApplication,
  allApplications,
  applicationsByCategory,
};
