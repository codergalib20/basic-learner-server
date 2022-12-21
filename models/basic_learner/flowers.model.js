const mongoose = require("mongoose");

const flowersSchema = new mongoose.Schema(
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

const Flower = mongoose.model("Flower", flowersSchema);

module.exports = Flower;
