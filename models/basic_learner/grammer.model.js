const mongoose = require("mongoose");

const grammerSchema = new mongoose.Schema(
  {
    grammer_name: String,
    order: Number,
    name: {
      required: [true, "You must need to field grammer name"],
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "You must need to field grammer description"],
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "You must need to add relative words"],
    },
    slug: {
      required: true,
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Grammer = mongoose.model("Grammer", grammerSchema);

module.exports = Grammer;
