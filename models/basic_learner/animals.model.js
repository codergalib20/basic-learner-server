const mongoose = require("mongoose");

const animalsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Animal name is required"],
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model("Animal", animalsSchema);

module.exports = Animal;
