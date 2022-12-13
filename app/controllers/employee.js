require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Employee = require("../database/models/employee.model.js"); // import user model
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const employeeSignupRouter = Router();

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
// file deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
const { SECRET = "secret" } = process.env;

// middleware that is specific to this router
employeeSignupRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

employeeSignupRouter.get("/", async (req, res) => {
  res.send("inside employee endpoint");
});

employeeSignupRouter.post("/signup", async (req, res) => {
  try {
    // hash the password
    // deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>, deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
    req.body.password = await bcrypt.hash(req.body.password, 15);
    // create a new employee
    const employee = await Employee.create(req.body);
    // send new customer as response
    res.json(employee);
  } catch (error) {
    //console.log(error);
    res.status(400).json({ error });
  }
});

// Login route to verify an employee and get a token
employeeSignupRouter.post("/login", async (req, res) => {
    try {
      // check if the user exists
      const employee = await Employee.findOne({ email: req.body.email });
      if (employee) {
        //check if password matches
        const result = await bcrypt.compare(req.body.password, employee.password);
        if (result) {
          // sign token and send it in response
          const token = jwt.sign({ username: employee.email }, SECRET);
          res.json({ token });
        } else {
          res.status(400).json({ error: "password doesn't match" });
        }
      } else {
        res.status(400).json({ error: "Employee doesn't exist" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  });
  
  module.exports = employeeSignupRouter;
  