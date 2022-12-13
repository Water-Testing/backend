const { Schema, model } = require("../connection");

//customer schema
const kitSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  customerID: { type: Schema.Types.ObjectId, required: true },
  result: { type: String, required: true },
});
const Kit = model("TestKit", kitSchema);

module.exports = Kit;

//-Test Result [True,False,Pending]
// -Customer ID