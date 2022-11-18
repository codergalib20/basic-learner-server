const Grammer = require("../../models/grammer.model");

const createGrammer = async (req, res) => {
  try {
    const data = await Grammer.create(req.body);
    if (data) {
      return res.status(200).json({
        message: "Added a new grammer",
        data,
      });
    }
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

module.exports = {
  createGrammer,
  getAllGrammer,
  getAGrammer,
  updateGrammer,
  deleteGrammer,
};
