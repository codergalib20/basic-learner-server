const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema(
  {
    vocabulary: {
      type: String,
      required: true,
      trim: true,
    },
    synonyms: {
      words: [],
      grammer: [
        {
          title: String,
          grammer: String,
          describe: String,
          words: [String],
        },
      ],
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
      required: true,
    },
    pronunciation: [
      {
        record: {
          type: String,
        },
        describe: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
module.exports = Vocabulary;
