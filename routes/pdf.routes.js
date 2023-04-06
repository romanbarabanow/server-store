const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const Application = require("../models/Application");

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

router.get("/pdf", async (req, res) => {
  const item = await Application.find();
  if (item.length === 0) {
    return res.json({ message: "There are no applications" }).status(200);
  }
  const applications = filterTheArray(item);
  const doc = new PDFDocument();
  let filename = "Заявки";
  filename = encodeURIComponent(filename) + ".pdf";
  res.setHeader(
    "Content-disposition",
    'attachment; filename="' + filename + '"'
  );
  res.setHeader("Content-type", "application/pdf");
  applications.forEach((el) => {
    doc.text(`${el.name}`);
    doc.text(`Item Id: ${el.itemId}`);
    doc.text(`Price: ${el.price}`);
    doc.text(`Description: ${el.description}`);
    doc.text(`Category: ${el.category}`);
    doc.text(`Progress: ${el.progress}`);
    doc.text("-");
    doc.text("-");
  });
  doc.pipe(res);
  doc.end();
});

module.exports = router;
