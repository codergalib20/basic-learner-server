const Vocabulary = require("../../../models/basic_learner/vocabulary.model");

// Create a new Vocabulary
const addAVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.create(req.body);
    if (vocabulary) {
      res.status(201).json({
        message: "Vocabulary Created Successfully!",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "That was server error!",
      error: err,
    });
  }
};
// Get All Vocabulary
const getVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.find({});
    if (vocabulary) {
      res.status(200).json({
        message: "Load here all vocabulary",
        data: vocabulary,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "That was server error",
      error: err,
    });
  }
};

module.exports = {
  addAVocabulary,
  getVocabulary,
};
