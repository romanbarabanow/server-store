const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth.routes");
const productRoute = require("./routes/product.routes");
const applicationRoute = require("./routes/application.routes");
const commentaryRoute = require("./routes/commentary.route");
const pdfRoute = require("./routes/pdf.routes");

const app = express();

function server() {
  try {
    mongoose
      .connect("mongodb://mongodatabase:27017/expressmongo", {
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

    app.use("/api/auth", authRoute);
    app.use("/api", productRoute);
    app.use("/api", pdfRoute);
    app.use("/api", applicationRoute);
    app.use("/api", commentaryRoute);

    app.listen(8080, () => {
      console.log("Running...");
    });
  } catch (e) {
    console.log(e);
  }
}

server();
