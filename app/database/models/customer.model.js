const { Schema, model } = require("../connection");

//customer schema
const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  add_1: { type: String, required: true },
  add_2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  phoneNum: { type: String, required: true },
  cc: { type: String, required: true },
  kitID: [{ type: Schema.Types.ObjectId, required: true }],
});
const Customer = model("Customer", customerSchema);

module.exports = Customer;
