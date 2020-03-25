const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const userRoutes = require("./routes/user");
const materialRoutes = require("./routes/material");
const submissionRoute = require("./routes/submission");
//const collectorMaterialRoute = require("./routes/collectorMaterial");


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(
    "mongodb+srv://admin:pivruc-fipcy5-feqgoX@cluster0-idtz7.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed! : " + err);
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use("/images", express.static(path.join("backend/images")));
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
  });

  app.use("/api/user", userRoutes);
  app.use("/api/material", materialRoutes);
  app.use("/api/submission", submissionRoute);
  //app.use("/api/collectorMaterial", collectorMaterialRoute);














module.exports = app;
