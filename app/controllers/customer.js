require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Customer = require("../database/models/customer.model"); // import user model
const TestKit = require("../database/models/kit.model");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { Types } = require("../database/connection");
const customerSignupRouter = Router();

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
// file deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
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
    req.body.kitID = new Types.ObjectId();
    const customer = await Customer.create(req.body);
    const testKit = await TestKit.create({_id: Types.ObjectId(req.body.kitID), customerID: Types.ObjectId(customer._id), result:'not started'})
    // send new user as response
    const response = { customer, testKit };
    res.json(response);
  } catch (error) {
    //console.log(error);
    res.status(400).json({ error });
  }
});

// Login route to verify a user and get a token
customerSignupRouter.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await Customer.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.email }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = customerSignupRouter;
