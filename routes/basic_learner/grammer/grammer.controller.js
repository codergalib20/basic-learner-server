const Grammer = require("../../../models/basic_learner/grammer.model");

const createGrammer = async (req, res) => {
  try {
    const { grammer_name, name } = req.body;
    let name_path = name.toLowerCase().replace(/[^a-zA-Z]/g, "-");
    let grammer_name_path = grammer_name
      .toLowerCase()
      .replace(/[^a-zA-Z]/g, "-");
    let path = name_path + "-" + grammer_name_path;
    const exastingPath = await Grammer.findOne({ slug: path });
    if (exastingPath) {
      path = Math.floor(Math.random() * 1000) + "_" + path;
    }
    const makeData = {
      ...req.body,
      slug: path,
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
const getAllGrammer = async (req, res) => {
  try {
    const data = await Grammer.find();
    res.status(200).json({
      message: "Loaded all grammer",
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: "That was server error",
      error: err,
    });
  }
};
const getAllGrammarTitle = async (req, res) => {
  console.log(req.body);
  try {
    const data = await Grammer.find({ ...req.body });
    console.log(data);
    res.status(200).json({
      message: "Loaded all grammer",
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: "That was server error",
      error: err,
    });
  }
};
const getAGrammer = async (req, res) => {
  try {
    const data = await Grammer.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(200).json({
        message: "Grammer not found!",
      });
    }
    res.status(200).json({
      message: "Loaded new grammer",
      data,
    });
  } catch (err) {
    res.status(404).json({
      message: "Grammer Not found!",
      err,
    });
  }
};
const updateGrammer = async (req, res) => {
  try {
    const data = await Grammer.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Grammer updated",
      data,
    });
  } catch (err) {
    res.status(403).json({
      message: "Grammer not found!",
      error: err,
    });
  }
};
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
module.exports = {
  createGrammer,
  getAllGrammer,
  getAGrammer,
  updateGrammer,
  deleteGrammer,
  getAllGrammarTitle,
  getOneBySlug,
};
