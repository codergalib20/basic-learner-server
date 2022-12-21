const Fruit = require("../../../models/basic_learner/fruits.model");
const slug = require("../../../utils/slug");

const createFruit = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    if (!name || !image) {
      return res.status(403).json({
        error: "All field are required",
      });
    }
    const findExaistFruit = await Fruit.findOne({ name });
    if (findExaistFruit) {
      return res.status(403).json({
        error: "Bird already exaist",
      });
    }
    const countFruit = await Fruit.countDocuments();
    const makeSlug = slug(name);
    const newFruit = new Fruit({
      name,
      description,
      image,
      slug: `${countFruit + 1}-${makeSlug}`,
    });
    const saveFruit = await newFruit.save();
    if (saveFruit) {
      res.status(201).json({
        message: "Fruit added successfully",
        data: saveFruit,
      });
    }
  } catch (err) {
    res.status(409).json({
      error: "Network error try again",
      err,
    });
  }
};
const getAllFruits = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const fruits = await Fruit.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Fruit.countDocuments();
    res.status(401).json({
      message: "Loaded Fruits",
      data: {
        fruits,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalFruit: count,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Network error occord",
      err,
    });
  }
};
const deleteFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Fruit.findOneAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({
        error: "Fruit not found",
      });
    }
    res.status(401).json({
      message: "Fruit delete successfully",
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
  getAllFruits,
  deleteFruit,
  createFruit,
};
