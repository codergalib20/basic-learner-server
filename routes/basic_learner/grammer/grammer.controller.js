const Grammer = require("../../../models/basic_learner/grammer.model");
const slug = require("../../../utils/slug");

// -------------------
// Add a New Grammer || POST
const createGrammer = async (req, res) => {
  try {
    const { grammer_parent, name } = req.body;
    const count = await Grammer.countDocuments();
    const makeSlug = slug(`${count}-${grammer_parent}-${name}`);
    const makeData = {
      ...req.body,
      slug: makeSlug,
      publish: false,
    };
    const data = await Grammer.create(makeData);
    res.status(201).json({
      message: "Grammer Add successfully!",
      data,
    });
  } catch (err) {
    res.status(403).json({
      message: "That was server error!",
      error: err,
    });
  }
};
// -------------------
// Add Tags in Grammer || POST - PUSH
const addTagInGrammer = async (req, res) => {
  try {
    const grammer = await Grammer.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { tags: req.body } },
      { new: true }
    );
    if (!grammer) {
      return res.status(404).json({
        error: "Grammer not found!",
      });
    }
    res.status(201).json({
      message: "Added a new tag",
      data: grammer,
    });
  } catch (err) {
    res.status(409).json({
      error: "Network error occurred",
      err,
    });
  }
};
// ------------------
// Get Grammer Parent
const getGrammerParent = async (req, res) => {
  try {
    const data = await Grammer.find({}).select("grammer_parent name slug");
    if (!data) {
      return res.status(403).json({
        error: "Grammer not show",
      });
    }
    res.status(200).json({
      message: "Loaded Grammer title",
      data,
    });
  } catch (err) {
    res.status(409).json({
      error: "Network error occurred",
      err,
    });
  }
};
// ------------------
// Update a grammer
const updateAGrammer = async (req, res) => {
  try {
    const data = await Grammer.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-tags");
    if (!data) {
      return res.status(409).json({
        error: "Grammer not found!",
      });
    }
    res.status(209).json({
      message: "Updated",
      data,
    });
  } catch (err) {
    res.status(409).json({
      error: "Network error occurred",
      err,
    });
  }
};
// ------------------
// Get All Draft Grammer or Unpublish Draft
const getDraftGrammer = async (req, res) => {
  try {
    const { status } = req.query;
    const data = await Grammer.find({ publish: status }).select(
      "name grammer_parent slug publish"
    );
    res.status(404).json({
      message: "Loaded",
      data,
    });
  } catch (err) {
    res.status(409).json({
      error: "Network error occurred",
      err,
    });
  }
};
// ------------------
// Delete A Grammer
const deleteGrammer = async (req, res) => {
  try {
    const data = await Grammer.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Your grammer deleted",
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: "Grammer not found!",
      error: err,
    });
  }
};
// Get one by slug
const getOneBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await Grammer.findOne({ slug });
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
const getAllGrammer = async (req, res) => {
  try {
    const data = await Grammer.find({});
    res.status(200).json({
      message: "Grammer loaded",
      data,
    });
  } catch (err) {
    res.status(403).json({
      error: "Network error occurred",
      err,
    });
  }
};
module.exports = {
  createGrammer,
  addTagInGrammer,
  getGrammerParent,
  updateAGrammer,
  getDraftGrammer,
  deleteGrammer,
  getOneBySlug,
  getAllGrammer
};
