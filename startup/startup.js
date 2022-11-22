const express = require("express");
var signupRouter = require("../routes/signup");


module.exports = function (app) {
  app.use(express.json());

  app.use("/signup", signupRouter);
//   app.use("/router1", router1Router);
//   app.use("/router2", router2Router);
};
