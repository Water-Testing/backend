require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Customer = require("../database/models/customer.model"); // import user model
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const customerSignupRouter = Router();

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

// middleware that is specific to this router
customerSignupRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

customerSignupRouter.get("/", async (req, res) => {
  res.send("inside customer endpoint");
});

customerSignupRouter.post("/signup", async (req, res) => {
  try {
    // hash the password
    // deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>, deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const customer = await Customer.create(req.body);
    // send new user as response
    res.json(customer);
  } catch (error) {
    //console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = customerSignupRouter;
