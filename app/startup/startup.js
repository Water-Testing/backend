require("dotenv").config(); // load .env variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const cors = require("cors");
var signupRouter = require("../routes/signup");

module.exports = function (app) {
  // GLOBAL MIDDLEWARE
  app.use(cors()); // add cors headers
  app.use(morgan("tiny")); // log the request for debugging
  app.use(express.json()); // parse json bodies

  app.use("/signup", signupRouter);
  //   app.use("/router1", router1Router);
  //   app.use("/router2", router2Router);
};
