const Flower = require("../../../models/basic_learner/flowers.model");
const slug = require("../../../utils/slug");

const createFlower = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    if (!name || !image) {
      return res.status(403).json({
        error: "All field are required",
      });
    }
    const findExaistFlower = await Flower.findOne({ name });
    if (findExaistFlower) {
      return res.status(403).json({
        error: "Bird already exaist",
      });
    }
    const countFlower = await Flower.countDocuments();
    const makeSlug = slug(name);
    const newFlower = new Flower({
      name,
      description,
      image,
      slug: `${countFlower + 1}-${makeSlug}`,
    });
    const saveFlower = await newFlower.save();
    if (saveFlower) {
      res.status(201).json({
        message: "Flower added successfully",
        data: saveFlower,
      });
    }
  } catch (err) {
    res.status(409).json({
      error: "Network error try again",
      err,
    });
  }
};
const getAllFlowers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const flowers = await Flower.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Flower.countDocuments();
    res.status(401).json({
      message: "Loaded flowers",
      data: {
        flowers,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalFlower: count,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Network error occord",
      err,
    });
  }
};
const deleteFlower = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Flower.findOneAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({
        error: "Flower not found",
      });
    }
    res.status(401).json({
      message: "Flower delete successfully",
      data,
    });
  } catch (err) {
    res.status(201).json({
      error: "Network error please try again",
      err,
    });
  }
};

// Export handler
module.exports = {
  getAllFlowers,
  deleteFlower,
  createFlower,
};
