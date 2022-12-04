const mongoose = require("mongoose");

const birdsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Bird name is required"],
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bird = mongoose.model("Bird", birdsSchema);

module.exports = Bird;
