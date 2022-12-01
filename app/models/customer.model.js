const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    add_1: String,
    add_2: String,
    city: String,
    state: String,
    country: String,
    phoneNum: String,
    cc: String,
    kitID: Number
  })
);

module.exports = Customer;
/**
 * -First Name {String}

  -Last Name {String}

  -Email Address {Email}

  -Password {String}

  -Address[Address 1, Address 2, State, City, Zip Code]

  -Financial Account[Credit/Debit Card]

  -Kit ID {INT}

  -Customer ID {INT}
 */