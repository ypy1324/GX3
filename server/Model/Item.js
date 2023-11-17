const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: String,
    expiryDate: Date,
  },
  { collection: "Items" }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = { Item };
