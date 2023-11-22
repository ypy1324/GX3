const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    barcode: Number,
    name: String,
    expiryDate: Date,
  },
  { collection: "Items" }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = { Item };
