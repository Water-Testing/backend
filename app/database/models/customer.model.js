const { Schema, model } = require("../connection");

//customer schema
const customerSchema = new Schema({
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
});
const Customer = model("Customer", customerSchema);

module.exports = Customer;
