const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Catagory = mongoose.model("catagory", CatSchema);
Catagory.createIndexes();
module.exports = Catagory;
