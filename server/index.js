const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("./config/key.js");

const { Item } = require("./Model/Item.js");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening at http://localhost:${port}`);
      console.log("Connected to MongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/addItem", (req, res) => {
  const newItem = new Item({
    barcode: req.body.barcode,
    name: req.body.name,
    expiryDate: req.body.expiryDate,
  });
  Item.findOne({ barcode: newItem.barcode })
    .exec()
    .then((item) => {
      if (item) {
        res.status(200).json({ exist: true });
      } else {
        newItem.save().then(() => {
          res.status(200).json({ success: true });
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/itemslist", (req, res) => {
  Item.find()
    .sort({ expiryDate: 1 })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, itemsList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/deleteItem", (req, res) => {
  Item.deleteOne({ _id: req.body.id })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/updateItem", (req, res) => {
  let item = {
    barcode: req.body.barcode,
    name: req.body.name,
    expiryDate: req.body.expiryDate,
  };
  Item.updateOne({ _id: req.body.id }, { $set: item })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/barcodeDuplicate", (req, res) => {
  Item.findOne({ barcode: req.body.barcode })
    .exec()
    .then((item) => {
      if (item) {
        res.status(200).json({ match: true });
      } else {
        res.status(200).json({ match: false });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});
