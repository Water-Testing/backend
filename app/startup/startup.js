require("dotenv").config(); // load .env variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const cors = require("cors");
const customerSignupRouter = require("../controllers/customer");
const employeeSignupRouter = require("../controllers/employee");
module.exports = function (app) {
  // GLOBAL MIDDLEWARE
  app.use(cors()); // add cors headers
  app.use(morgan("tiny")); // log the request for debugging
  app.use(express.json()); // parse json bodies

  app.use("/customer", customerSignupRouter);
  app.use("/employee", employeeSignupRouter);

};
