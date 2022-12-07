const Vocabulary = require("../../../models/basic_learner/vocabulary.model");

// Create a new Vocabulary
const addAVocabulary = async (req, res) => {
  try {
    const { vocabulary } = req.body;
    const exastingVocabulary = await Vocabulary.findOne({ vocabulary });
    if (exastingVocabulary) {
      return res.status(403).json({
        message: "This vocabulary already added",
      });
    }

    let path = vocabulary.toLowerCase().replace(/[^a-zA-Z]/g, "-");
    const exastingSlug = await Vocabulary.findOne({ slug: path });
    if (exastingSlug) {
      path = Math.floor(Math.random() * 1000) + "_" + path;
    }
    const makeData = {
      ...req.body,
      slug: path,
    };
    const data = await Vocabulary.create(makeData);
    res.status(201).json({
      message: "Vocabulary added",
      data,
    });
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
// Get one by slug
const getOneBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await Vocabulary.findOne({ slug });
    if (data) {
      return res.status(200).json({
        message: "Grammer Loaded",
        data,
      });
    }
    res.status(404).json({
      error: "Data not found!",
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare is server error",
      err: error,
    });
  }
};
// Get all birds by pagination
const getAllVocabluaryByPagination = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const vocabulary = await Vocabulary.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Vocabulary.countDocuments();
    res.status(200).json({
      data: vocabulary,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalVocabularys: count,
    });
  } catch (error) {
    res.status(404).json({
      error: "Thare was server error!",
      err: error,
    });
  }
};
module.exports = {
  addAVocabulary,
  getVocabulary,
  getOneBySlug,
  getAllVocabluaryByPagination
};
