const mongoose = require("mongoose");

const fruitsSchema = new mongoose.Schema(
  {
    // Required
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      required: true,
      type: String,
    },
    // Optional
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Fruit = mongoose.model("Fruit", fruitsSchema);

module.exports = Fruit;
