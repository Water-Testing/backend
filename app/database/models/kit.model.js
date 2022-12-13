const { Schema, model } = require("../connection");

const kitSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  customerID: { type: Schema.Types.ObjectId, required: true },
  result: { type: String, required: true },
});
const Kit = model("TestKit", kitSchema);

module.exports = Kit;

