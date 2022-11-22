const express = require("express");
const signupRouter = express.Router();

// middleware that is specific to this router
signupRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

signupRouter.post("/signup", (req, res) => {
  res.send("Birds home page");
});


module.exports = signupRouter;
